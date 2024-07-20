import { useMovie } from "../contexts/MovieContext";

function MovieList() {
  const {
    fetchMovieInfo,
    setSelectMovieId,
    selectMovieId,
    isOpenMovies,
    setIsOpenMovies,
    movies,
  } = useMovie();

  return (
    <>
      <button
        className="btn-toggle"
        onClick={() => setIsOpenMovies((open) => !open)}
      >
        {isOpenMovies ? "–" : "+"}
      </button>
      {isOpenMovies && (
        <ul className="list list-movies">
          {movies.map((movie) => (
            <li
              onClick={() => {
                fetchMovieInfo(movie.imdbID);
                setSelectMovieId(movie.imdbID);
              }}
              style={{
                backgroundColor: movie.imdbID === selectMovieId && "#343a40",
              }}
              key={movie.imdbID}
            >
              <img src={movie.Poster} alt={`${movie.Title} poster`} />
              <h3>{movie.Title}</h3>
              <div>
                <p>
                  <span>🗓</span>
                  <span>{movie.Year}</span>
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
}

export default MovieList;
