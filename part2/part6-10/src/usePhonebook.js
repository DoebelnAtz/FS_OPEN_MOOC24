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

const generateId = () => {
  return Math.floor(Math.random() * 1000000).toString();
}

export const usePhonebook = () => {
  const { data: persons, refetch } = useGet("");
  const [toasts, setToasts] = useState([])

  const pushToast = (toast, type) => {
    const newToast = {
      id: generateId(),
      message: toast,
      type: type
    }
    setToasts(prev => [...prev, newToast])
    setTimeout(() => {
      setToasts(toasts.filter((t) => t.id !== newToast.id))
    }, 3000)
  }
  const createPerson = async (person) => {
    try {
      const existingPerson = persons.find((p) => p.name === person.name)
      if (existingPerson) {
        if (window.confirm(`${person.name} is already added to the phonebook, replace the old number with a new one?`)) {
          const updatedPerson = { ...existingPerson, number: person.number }
          await updatePerson(updatedPerson)
          pushToast(`${person.name} updated`, "success")
        }
      } else {
        await instance.post('', person)
        refetch();
        pushToast(`${person.name} added`, "success")
      }
    } catch (error) {
      pushToast(`Error adding person: ${error.message}`, "error")
    }
  };


  const updatePerson = async (person) => {
    try {
      await instance.put(`/${person.id}`, person)
      pushToast(`${person.name} updated`, "success")
      refetch();
    } catch (error) {
      pushToast(`Error updating person: ${error.message}`, "error")
    }
  }

  const deletePerson = async (person) => {
    if (window.confirm(`Delete ${person.name}?`)) {
      try {
        await instance.delete(`/${person.id}`)
        pushToast(`${person.name} deleted`, "success")
        refetch();
      } catch (error) {
        if (error.response.status === 404) {
          pushToast(`${person.name} not found`, "error")
        } else {
          pushToast(`Error deleting person: ${error.message}`, "error")
        }
      }
    }
  }

  return { persons, refetch, createPerson, updatePerson, deletePerson, toasts };

}