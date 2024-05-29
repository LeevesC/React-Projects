import { useCities } from "../../contexts/CitiesContext";
import CountryItem from "./CountryItem";
import styles from "./CountryList.module.css";
import Message from "./Message";
import Spinner from "./Spinner";

function CountryList() {
  const { cities, isLoading } = useCities();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map." />
    );
  
  // extract unrepeated countries. 
  const countries = cities.reduce(
    (acc, curr) =>
      acc.map((city) => city.country).includes(curr.country)
        ? [...acc]
        : [...acc, curr],
    []
  );

  return (
    <ul className={styles.countryList}>
      {isLoading ? (
        <Spinner />
      ) : (
        countries.map((city) => <CountryItem city={city} key={city.id} />)
      )}
    </ul>
  );
}

export default CountryList;
