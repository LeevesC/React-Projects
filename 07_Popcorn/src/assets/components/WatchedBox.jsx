import { useMovie } from "../contexts/MovieContext";
import WatchedList from "./WatchedList";

function WatchedBox() {
  const { watched, isOpenWatched, setIsOpenWatched } = useMovie();
  
  const avgImdbRating = Math.floor(average(watched.map((movie) => movie.imdbRating))*10)/10;
  const avgRuntime = Math.floor(average(watched.map((movie) => movie.runtime))*10)/10;

  return (
    <>
      <button
        className="btn-toggle"
        onClick={() => setIsOpenWatched((open) => !open)}
      >
        {isOpenWatched ? "–" : "+"}
      </button>
      {isOpenWatched && (
        <>
          <div className="summary">
            <h2>Movies you watched</h2>
            <div>
              <p>
                <span>#️⃣</span>
                <span>{watched.length} movies</span>
              </p>
              <p>
                <span>⭐️</span>
                <span>{avgImdbRating}</span>
              </p>
              <p>
                <span>⏳</span>
                <span>{avgRuntime} min</span>
              </p>
            </div>
          </div>

          <ul className="list">
            {watched.map((movie) => (
              <WatchedList movie={movie} key={movie.imdbID} />
            ))}
          </ul>
        </>
      )}
    </>
  );
}

export default WatchedBox;

const average = (arr) =>
  arr.reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);
