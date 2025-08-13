import express from "express";

const router = express.Router();

export let phonebook = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

router.get("/", (req, res) => {
  res.json(phonebook);
});

router.get("/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = phonebook.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(404).end();
  }
});

router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  phonebook = phonebook.filter((person) => person.id !== id);
  res.status(204).end();
});

router.post("/", (req, res) => {
  const person = req.body;
  const id = Math.floor(Math.random() * 1_000_000);
  const existingPerson = phonebook.find((p) => p.name === person.name);

  if (!person.name || !person.number) {
    return res.status(400).json({ error: "name and number are required" });
  }

  if (existingPerson) {
    return res.status(400).json({ error: "name must be unique" });
  }
  const newPerson = { id, name: person.name, number: person.number };
  phonebook.push(newPerson);
  res.json(newPerson);
});

export default router;
