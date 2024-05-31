import { useParams } from "react-router-dom";
import { useCities } from "../../contexts/CitiesContext";
import { useEffect } from "react";

import styles from "./City.module.css";
import BackButton from "../BackButton";
import Spinner from "./Spinner";

const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

// main function, show city details
function City() {
  const { id } = useParams();
  const { getCity, currentCity, isCityLoading } = useCities();
  useEffect(
    function () {
      getCity(id);
    },
    [id]
  );
  // console.log(isCityLoading);
  if (isCityLoading) return <Spinner />;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>city name</h6>
        <h3>
          <span>{currentCity.emoji}</span>
          {currentCity.cityName}
        </h3>
      </div>
      <div className={styles.row}>
        <h6>You went to {currentCity.cityName} on</h6>
        <p>{formatDate(currentCity.date)}</p>
      </div>
      <div className={styles.row}>
        <h6>your notes</h6>
        <p>{currentCity.notes}</p>
      </div>
      <div className={styles.row}>
        <h6>learn more</h6>
        <a href="www.google.com">
          Check out {currentCity.cityName} on Wikipedia.
        </a>
      </div>
      <div className={styles.row}>
        <BackButton />
      </div>
    </div>
  );
}

export default City;
