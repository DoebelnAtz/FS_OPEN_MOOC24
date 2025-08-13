import express from "express";
import morgan from "morgan";
import personsRouter from "./routes/persons.js";
import { phonebook } from "./routes/persons.js";

const app = express();
const PORT = 3001;

morgan('tiny')
morgan.token('post', (req) => !!req.body ? JSON.stringify(req.body) : '')

app.use(morgan(function (tokens, req, res) {
  if (tokens.method(req, res) === 'POST'){
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms',
      tokens.post(req, res)
    ].filter(Boolean).join(' ')
  } else {
    return [
      tokens.method(req, res),
      tokens.url(req, res),
      tokens.status(req, res),
      tokens.res(req, res, 'content-length'), '-',
      tokens['response-time'](req, res), 'ms'
    ].filter(Boolean).join(' ')
  }
}))
app.use(express.json());

app.use("/api/persons", personsRouter);

app.get("/info", (req, res) => {
  res.send(`<p>Phonebook has info for ${phonebook.length} people</p>
  <p>${new Date()}</p>`);
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
