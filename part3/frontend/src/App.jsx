import { useState } from "react";
import { usePhonebook } from "./usePhonebook";
import "./app.css";

const App = () => {
  const { persons, refetch, createPerson, deletePerson, toasts } =
    usePhonebook();

  const [newContact, setNewContact] = useState({ name: "", number: "" });
  const [filter, setFilter] = useState("");

  const handleNameChange = (event) => {
    setNewContact({ ...newContact, name: event.target.value });
  };

  const submitName = (event) => {
    event.preventDefault();
    createPerson(newContact);
    setNewContact({ name: "", number: "" });
  };

  const handleNumberChange = (event) => {
    setNewContact({ ...newContact, number: event.target.value });
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };
  const filteredPersons = persons?.filter((person) =>
    person.name.toLowerCase().includes(filter.toLowerCase())
  );

  const renderToasts = () => {
    return toasts.map((toast, index) => (
      <div className={`toast ${toast.type}`} key={index}>
        {toast.message}
      </div>
    ));
  };
  return (
    <div>
      <h2>Phonebook</h2>
      {renderToasts()}
      <Filter filter={filter} handleFilterChange={handleFilterChange} />
      <h2>add a new</h2>
      <PersonForm
        newContact={newContact}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        submitName={submitName}
      />
      <h2>Numbers</h2>
      <Persons persons={filteredPersons} deletePerson={deletePerson} />
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

const Persons = ({ persons, deletePerson }) => {
  return (
    <div>
      {persons.map((person) => (
        <div key={person.name}>
          {person.name} {person.number}
          <button onClick={() => deletePerson(person)}>delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;
