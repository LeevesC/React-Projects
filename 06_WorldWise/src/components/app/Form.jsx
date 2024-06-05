import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useCities } from "../../contexts/CitiesContext";
// other components and styles
import styles from "./Form.module.css";
import DatePicker from "react-datepicker";
import Button from "../Button";
import BackButton from "../BackButton";
import Message from "./Message";
import Spinner from "./Spinner";
import "react-datepicker/dist/react-datepicker.css";

function Form() {
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [emoji, setEmoji] = useState("");
  const [date, setDate] = useState(new Date());
  const [note, setNote] = useState("");
  const [geocodingError, setGeocodingError] = useState("");
  const [searchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const [isLoadingGeo, setIsLoadingGeo] = useState(true);
  const { createCity, isCityLoading } = useCities();
  const navigate = useNavigate();

  function handleAdd(e) {
    e.preventDefault();
    if (!cityName || !date) return;
    const newCity = {
      cityName,
      country,
      emoji,
      date,
      notes: note,
      position: { lat, lng },
    };
    createCity(newCity);
    if (!isCityLoading) navigate("/app/cities");
  }

  useEffect(
    function () {
      setIsLoadingGeo(true);
      try {
        fetch(
          `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${lat}&longitude=${lng}`
        )
          .then((res) => res.json())
          .then((data) => {
            // console.log(data);
            setCityName(data.city);
            setEmoji(convertToEmoji(data.countryCode));
            setCountry(data.countryName);
          });
      } catch (error) {
        setGeocodingError(error);
      } finally {
        setIsLoadingGeo(false);
      }
    },
    [lat, lng]
  );

  if (isLoadingGeo || isCityLoading) return <Spinner />;
  if (!cityName || geocodingError)
    return (
      <Message
        message={`That does not seem to be a city. Click somewhere else. ${geocodingError}`}
      />
    );
  return (
    <form className={styles.form}>
      <div className={styles.row}>
        <label htmlFor="cityName">City name</label>
        <input
          id="cityName"
          onChange={(e) => setCityName(e.target.value)}
          value={cityName}
        />
        <span className={styles.flag}>{emoji}</span>
      </div>

      <div className={styles.row}>
        <label htmlFor="date">When did you go to {cityName}?</label>
        <DatePicker
          id="date"
          onChange={(date) => setDate(date)}
          selected={date}
          dateFormat="dd/MM/yyyy"
        />
      </div>

      <div className={styles.row}>
        <label htmlFor="note">Notes about your trip to {cityName}</label>
        <textarea
          id="note"
          onChange={(e) => setNote(e.target.value)}
          value={note}
        />
      </div>

      <div className={styles.buttons}>
        <Button type="primary" onClick={(e) => handleAdd(e)}>
          Add
        </Button>
        <BackButton />
      </div>
    </form>
  );
}

export function convertToEmoji(countryCode) {
  const codePoints = countryCode
    .toUpperCase()
    .split("")
    .map((char) => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
}

export default Form;
