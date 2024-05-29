import { useParams, useSearchParams } from "react-router-dom";
import { useCities } from "../../contexts/CitiesContext";
import styles from "./City.module.css";
import BackButton from "../BackButton";

function City() {
  const { id } = useParams();
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const { cities } = useCities();
  const city = cities.filter((c) => String(c.id) === id)[0];

  const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(date));

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>city name</h6>
        <h3>
          <span>{city.emoji}</span>
          {city.cityName}
        </h3>
      </div>
      <div className={styles.row}>
        <h6>You went to {city.cityName} on</h6>
        <p>{formatDate(city.date)}</p>
      </div>
      <div className={styles.row}>
        <h6>your notes</h6>
        <p>{city.notes}</p>
      </div>
      <div className={styles.row}>
        <h6>learn more</h6>
        <a href="www.google.com">Check out {city.cityName} on Wikipedia -></a>
      </div>
      <div className={styles.row}>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
