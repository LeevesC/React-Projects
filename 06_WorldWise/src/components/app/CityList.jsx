import { useCities } from "../../contexts/CitiesContext";
// other components and styles
import styles from "./CityList.module.css";
import Spinner from "./Spinner";
import CityItem from "./CityItem";
import Message from "./Message";

function CityList() {
  const { cities, isListLoading } = useCities();
  if (isListLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add your first city by clicking on a city on the map." />
    );
  return (
    <ul className={styles.cityList}>
      {isListLoading ? (
        <Spinner />
      ) : (
        cities.map((city) => <CityItem city={city} key={city.id} />)
      )}
    </ul>
  );
}

export default CityList;
