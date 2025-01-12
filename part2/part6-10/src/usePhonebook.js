import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "http://localhost:3001/persons";
const instance = axios.create({
  baseURL: baseUrl,
});

const useGet = (path) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const refetch = async () => {
    try {
      setIsLoading(true);
      const data = await instance.get(path);
      setData(data.data);
    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }


  useEffect(() => {
    refetch();
  }, [path]);

  return { data, isLoading, error, refetch };
};

export const usePhonebook = () => {
  const { data: persons, refetch } = useGet("");

  const createPerson = async (person) => {
    const existingPerson = persons.find((person) => person.name === person.name)
    if (existingPerson) {
      if (window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`)) {
        const updatedPerson = { ...existingPerson, number: person.number }
        await updatePerson(updatedPerson)
      }
    } else {
      await instance.post('', person)
      refetch();
    }
  };

  const updatePerson = async (person) => {
    await instance.put(`/${person.id}`, person)
    refetch();
  }

  const deletePerson = async (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      await instance.delete(`/${person.id}`)
      refetch();
    }
  }

  return { persons, refetch, createPerson, updatePerson, deletePerson };
}