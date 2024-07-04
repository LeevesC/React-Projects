import { useMovie } from "../contexts/MovieContext";
import RatingStar from "./RatingStar";

function MovieDetail() {
  const {
    isDetailLoading,
    selectMovieId,
    setSelectMovieId,
    movieInfo,
    watched,
    addWatchedMovie,
    setUserRate,
    userRate,
  } = useMovie();
  const isWatched = watched
    .map((movie) => movie.imdbID)
    .includes(selectMovieId);
  const handleAddList = function () {
    if (!userRate) alert("Rate the movie before add to watched list");
    else addWatchedMovie();
  };

  if (isDetailLoading) return <div className="loader-animation"></div>;
  if (!isDetailLoading)
    return (
      <div className="details">
        <header>
          <img src={movieInfo.Poster} alt={`${movieInfo.Title} poster`} />
          <div className="details-overview">
            <h2>{movieInfo.Title}</h2>
            <p>
              {movieInfo.Released} | {movieInfo.Runtime}
            </p>
            <p>{movieInfo.Genre}</p>
            <p>⭐ {movieInfo.imdbRating} IMDB rating</p>
          </div>
        </header>
        <section>
          <div className="rating">
            {isWatched ? (
              <p>
                You rated with the moive{" "}
                {watched.find((e) => e.imdbID === movieInfo.imdbID)?.userRating}
              </p>
            ) : (
              <>
                <RatingStar
                  maxRating={10}
                  color={"#fcc419"}
                  size={"25px"}
                  onSetRating={setUserRate}
                />
                <button className="btn-add" onClick={handleAddList}>
                  + Add to list
                </button>
              </>
            )}
          </div>
          <p>{movieInfo.Plot}</p>
          <p>{movieInfo.Actors}</p>
          <p>Directed by {movieInfo.Director}</p>
        </section>
        <button className="btn-back" onClick={() => setSelectMovieId(null)}>
          &larr;
        </button>
      </div>
    );
}

export default MovieDetail;
