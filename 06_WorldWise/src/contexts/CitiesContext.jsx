import { createContext, useContext, useEffect, useState } from "react";
import cityData from "../../data/cities.json";
// initiate context
const CitiesContext = createContext();
// context element
function CitiesProvider({ children }) {
  const [cities, setCities] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(function () {
    setIsLoading(true);
    setTimeout(() => {
      setCities(cityData.cities);
      setIsLoading(false);
    }, 1500);
  }, []);

  function createCity(newCity) {
    setCities([...cities, newCity]);
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        setCities,
        isLoading,
        createCity,
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
