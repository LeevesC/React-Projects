import { useMovie } from "./assets/contexts/MovieContext";

import MovieList from "./assets/components/MovieList";
import NavBar from "./assets/components/NavBar";
import WatchedBox from "./assets/components/WatchedBox";
import MovieDetail from "./assets/components/MovieDetail";

export default function App() {
  const {
    movies,

    isListLoading,
    selectMovieId,
    fetchError,
  } = useMovie();
  return (
    <>
      <NavBar />
      <div className="main">
        <div className="box">
          {isListLoading && <div className="loader-animation"></div>}
          {fetchError && <p className="error">{fetchError}</p>}
          {!movies && !isListLoading && !fetchError && (
            <p className="error">Search movies from Search Bar</p>
          )}
          {!isListLoading && !fetchError && movies && <MovieList />}
        </div>

        <div className="box">
          {selectMovieId && !fetchError ? <MovieDetail /> : <WatchedBox />}
        </div>
      </div>
    </>
  );
}
