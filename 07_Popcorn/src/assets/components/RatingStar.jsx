import { useState } from "react";

function RatingStar({ maxRating, color, size, onSetRating }) {
  const [currStar, setCurrStar] = useState(0);
  const [myRate, setMyRate] = useState(0);
  const handleCurrStar = function (num) {
    setCurrStar(num);
  };
  const handleRate = function (num) {
    setMyRate(num);
    onSetRating(num);
  };
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "10px",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
        }}
      >
        {Array.from({ length: maxRating }, (_, i) => (
          <Star
            key={i}
            index={i}
            currStar={currStar}
            handleCurrStar={handleCurrStar}
            color={color}
            size={size}
            myRate={myRate}
            handleRate={handleRate}
          />
        ))}
      </div>
      <p>{currStar ? currStar : myRate}</p>
    </div>
  );
}

export default RatingStar;

function Star({
  index,
  currStar,
  handleCurrStar,
  color,
  size,
  myRate,
  handleRate,
}) {
  const currValue = currStar ? currStar : myRate;
  return (
    <a
      href="#"
      onMouseEnter={() => handleCurrStar(index + 1)}
      onMouseLeave={() => handleCurrStar(myRate)}
      onClick={() => handleRate(index + 1)}
      style={{
        height: size,
      }}
    >
      {index < currValue ? (
        <FillingStar color={color} size={size} />
      ) : (
        <OutlineStar color={color} size={size} />
      )}
    </a>
  );
}

function OutlineStar({ color, size }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke={color}
      height={size}
      width={size}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="{2}"
        d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
      />
    </svg>
  );
}

function FillingStar({ color, size }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill={color}
      stroke={color}
      height={size}
      width={size}
    >
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}
