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
  exit 0
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

echo "[build] Done"
