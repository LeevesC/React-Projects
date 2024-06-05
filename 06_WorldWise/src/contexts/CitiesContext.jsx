/* eslint-disable react/prop-types */
import { createContext, useContext, useEffect, useState } from "react";
// initiate context
const CitiesContext = createContext();
// context element
function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [isListLoading, setIsListLoading] = useState(true);
  const [isCityLoading, setIsCityLoading] = useState(true);
  const [currentCity, setCurrentCity] = useState({});

  useEffect(() => {
    async function fetchData() {
      try {
        setIsListLoading(true);
        const res = await fetch("http://localhost:3000/cities", {
          method: "GET",
        });
        const data = await res.json();
        setCities(data);
      } catch (error) {
        console.log(`error ${error}`);
      } finally {
        setIsListLoading(false);
      }
    }
    fetchData();
  }, []);

  async function getCity(id) {
    try {
      setIsCityLoading(true);
      const res = await fetch(`http://localhost:3000/cities/${id}`);
      const data = await res.json();
      setCurrentCity(data);
    } catch (error) {
      console.log(`error ${error}`);
    } finally {
      setIsCityLoading(false);
    }
  }

  async function createCity(newCity) {
    try {
      setIsCityLoading(true);
      const res = await fetch("http://localhost:3000/cities", {
        method: "POST",
        body: JSON.stringify(newCity),
        headers: { "Content-Type": "application/json" },
      });
      const data = await res.json();
      setCities((cities) => [...cities, data]);
    } catch (error) {
      console.log(`error ${error}`);
    } finally {
      setIsCityLoading(false);
    }
  }

  async function deleteCity(id) {
    try {
      setIsCityLoading(true);
      await fetch(`http://localhost:3000/cities/${id}`, { method: "DELETE" });
      setCities((cities) => cities.filter((c) => c.id !== id));
    } catch (error) {
      console.log(`error ${error}`);
    } finally {
      setIsCityLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isListLoading,
        isCityLoading,
        currentCity,
        getCity,
        createCity,
        deleteCity
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}
// use context
function useCities() {
  const context = useContext(CitiesContext);
  return context;
}

export { CitiesProvider, useCities };
