import express from "express";
import personsRouter from "./routes/persons.js";
import { phonebook } from "./routes/persons.js";

const app = express();
const PORT = 3001;

app.use(express.json());

app.use("/api/persons", personsRouter);

app.get("/info", (req, res) => {
  res.send(`<p>Phonebook has info for ${phonebook.length} people</p>
  <p>${new Date()}</p>`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
