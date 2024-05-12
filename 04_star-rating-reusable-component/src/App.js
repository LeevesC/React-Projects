import { useState } from "react";
import StarRating from "./StarRating";

function App() {
  const [rating, setRating] = useState(0);
  function handleRating(value) {
    setRating(value);
    console.log(value);
  }

  return (
    <StarRating
      maxRating={10}
      size={32}
      color="#e9bf26"
      onValue={handleRating}
    />
  );
}

export default App;
