import { useMovie } from "../contexts/MovieContext";

function NavBar() {
  const { query, setQuery, movies, fetchMovies } = useMovie();

  const handleSubmit = function (e) {
    e.preventDefault();
    fetchMovies(query);
  };

  return (
    <nav className="nav-bar">
      <div className="logo">
        <span role="img">🍿</span>
        <h1>usePopcorn</h1>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <input
          className="search"
          type="text"
          placeholder="Search movies..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </form>
      <p className="num-results">
        Found <strong>{movies ? movies.length : "0"}</strong> results
      </p>
    </nav>
  );
}

export default NavBar;
