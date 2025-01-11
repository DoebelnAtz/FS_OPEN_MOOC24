import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newContact, setNewContact] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");

  const handleNameChange = (event) => {
    setNewContact({ ...newContact, name: event.target.value });
  };

  const submitName = (event) => {
    event.preventDefault();
    if (persons.some((person) => person.name === newContact.name)) {
      alert(`${newContact.name} is already in the phonebook`);
    } else {
      setPersons([...persons, newContact]);
      setNewContact({ name: "", number: "" });
    }
  };

  const handleNumberChange = (event) => {
    setNewContact({ ...newContact, number: event.target.value });
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const filteredPersons = persons.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        newContact={newContact}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        submitName={submitName}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} />
    </div>
  );
};

const Filter = ({ filter, handleFilterChange }) => {
  return (
    <div>
      filter shown with <input value={filter} onChange={handleFilterChange} />
    </div>
  );
};

const PersonForm = ({
  newContact,
  handleNameChange,
  handleNumberChange,
  submitName,
}) => {
  return (
    <form onSubmit={submitName}>
      <div>
        <label>
          name: <input value={newContact.name} onChange={handleNameChange} />
        </label>
        <label>
          number:{" "}
          <input value={newContact.number} onChange={handleNumberChange} />
        </label>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};

const Persons = ({ persons }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
        </div>
      ))}
    </div>
  );
};

export default App;
