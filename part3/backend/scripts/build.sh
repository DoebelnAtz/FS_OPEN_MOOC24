#!/usr/bin/env bash
set -euo pipefail

# Resolve directories
script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
backend_dir="$(cd "$script_dir/.." && pwd)"
frontend_dir="$(cd "$backend_dir/../frontend" && pwd)"

clean_flag="${1-}"

echo "[build] Backend dir: $backend_dir"
echo "[build] Frontend dir: $frontend_dir"

# Optional clean
if [[ "$clean_flag" == "--clean" ]]; then
  echo "[build] Cleaning backend dist directory"
  rm -rf "$backend_dir/dist"
  rm -rf "$backend_dir/build"
fi

echo "[build] Installing backend dependencies"
(cd "$backend_dir" && npm install)

echo "[build] Installing frontend dependencies"
(cd "$frontend_dir" && npm install)

echo "[build] Building frontend"
(cd "$frontend_dir" && npm run build)

echo "[build] Copying frontend build to backend/dist"
rm -rf "$backend_dir/dist"
cp -R "$frontend_dir/dist" "$backend_dir/dist"

echo "[build] Creating backend build artifact (build/)"
rm -rf "$backend_dir/build"
mkdir -p "$backend_dir/build"
cp "$backend_dir/index.js" "$backend_dir/build/index.js"
cp "$backend_dir/package.json" "$backend_dir/build/package.json"
cp -R "$backend_dir/routes" "$backend_dir/build/routes"
cp -R "$backend_dir/dist" "$backend_dir/build/dist"

echo "[build] Installing production dependencies in build/"
(cd "$backend_dir/build" && npm install --omit=dev)

echo "[build] Done"


