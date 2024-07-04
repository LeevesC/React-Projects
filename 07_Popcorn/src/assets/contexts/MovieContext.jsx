import { createContext, useContext, useState } from "react";

const KEY = "6e45ebdb";
const tempWatchedData = [
  {
    imdbID: "tt1375666",
    Title: "Inception",
    Year: "2010",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BMjAxMzY3NjcxNF5BMl5BanBnXkFtZTcwNTI5OTM0Mw@@._V1_SX300.jpg",
    runtime: 148,
    imdbRating: 8.8,
    userRating: 10,
  },
  {
    imdbID: "tt0088763",
    Title: "Back to the Future",
    Year: "1985",
    Poster:
      "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_SX300.jpg",
    runtime: 116,
    imdbRating: 8.5,
    userRating: 9,
  },
];

const MovieContext = createContext();

function MovieProvider({ children }) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState(null);
  const [watched, setWatched] = useState(tempWatchedData);
  const [selectMovieId, setSelectMovieId] = useState(null);
  const [movieInfo, setMovieInfo] = useState(null);
  const [isOpenMovies, setIsOpenMovies] = useState(true);
  const [isOpenWatched, setIsOpenWatched] = useState(true);
  const [userRate, setUserRate] = useState(0);
  const [isListLoading, setIsListLoading] = useState(false);
  const [isDetailLoading, setIsDetailLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const fetchMovies = async (name) => {
    setIsListLoading(true);
    try {
      const res = await fetch(
        `http://www.omdbapi.com/?apikey=${KEY}&s=${name}` // interstellar
      );
      if (!res.ok) throw new Error("🤯 Internet Error 🤯");
      const data = await res.json();
      // console.log(data.Response);
      if (data.Response === "False") throw new Error("🤯 Movies do not exist");
      setMovies(data.Search);
    } catch (error) {
      setFetchError(error.message);
    } finally {
      setIsListLoading(false);
    }
  };

  const fetchMovieInfo = async (id) => {
    setIsDetailLoading(true);
    try {
      const res = await fetch(`http://www.omdbapi.com/?apikey=${KEY}&i=${id}`);
      if (!res.ok) throw new Error("🤯 Internet Error 🤯");
      const data = await res.json();
      if (!data.Response) throw new Error("🤯 Movie does not exist");
      // console.log(data);
      setMovieInfo(data);
    } catch (error) {
      console.error(`An error occurs 🤯🤯🤯 ${error}`);
    } finally {
      setIsDetailLoading(false);
    }
  };

  const addWatchedMovie = function () {
    const movieData = {
      imdbID: movieInfo.imdbID,
      Title: movieInfo.Title,
      Year: movieInfo.Released,
      Poster: movieInfo.Poster,
      runtime: Number(movieInfo.Runtime.split(" ").at(0)),
      imdbRating: Number(movieInfo.imdbRating),
      userRating: userRate,
    };
    // console.log(movieData);
    tempWatchedData.push(movieData);
    setSelectMovieId(null);
  };

  return (
    <MovieContext.Provider
      value={{
        movies,
        setMovies,
        isListLoading,
        watched,
        isOpenMovies,
        setIsOpenMovies,
        isOpenWatched,
        setIsOpenWatched,
        query,
        setQuery,
        fetchMovies,
        isDetailLoading,
        selectMovieId,
        setSelectMovieId,
        fetchMovieInfo,
        movieInfo,
        addWatchedMovie,
        userRate,
        setUserRate,
        fetchError,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
// use context
function useMovie() {
  const context = useContext(MovieContext);
  return context;
}

export { MovieProvider, useMovie };
