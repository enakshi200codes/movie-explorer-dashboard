import React, {useState, useEffect} from "react";
import "./search.css";
import { Link } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import { useSearchParams } from "react-router-dom";
import netflix_spinner from "../../assets/netflix_spinner.gif"
import down_arrow_icon from "../../assets/down_arrow_icon.png"

const Search = () => {

const [searchParams, setSearchParams] = useSearchParams();
const [query, setQuery] = useState(
  searchParams.get("q") || ""
);
const [movies, setMovies] = useState([]);
const [loading, setLoading] = useState(false);
const [sortBy, setSortBy] = useState("");
const [isSorting, setIsSorting] = useState(false);

const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDMyODdhNjMzYzA5MDA3NjNjMGZmZjNkOGRlZTgzNSIsIm5iZiI6MTc4NDIxNDA3Mi44NTc5OTk4LCJzdWIiOiI2YTU4ZjIzOGM0NmRkODUzZDMwNzQ4ZTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zm2F2F2ARHipeZCurmGuvzkB6JfMHi94f-PMRGhr3rw'
  }
};

useEffect(() => {
  if (query.trim() === "") {
    setMovies([]);
    setLoading(false);
    return;
  }

  setLoading(true);

  const timer = setTimeout(() => {

    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&include_adult=false&language=en-US&page=1`,
      options
    )
      .then((res) => res.json())
      .then((data) => {
        setMovies(data.results);
      })
      .catch((err) => console.error(err))
      .finally(() => {
        setLoading(false);
      });

  }, 500);

  return () => clearTimeout(timer);

}, [query]);

const sortedMovies = [...movies];

if (sortBy === "rating") {
  sortedMovies.sort((a,b) => b.vote_average - a.vote_average);
}

if (sortBy === "date") {
  sortedMovies.sort((a,b) => new Date(b.release_date) - a.release_date);
}

if(sortBy === "title") {
  sortedMovies.sort((a,b) => a.title.localeCompare(b.title));
}

  return (
  <>
    <Navbar />

    <div className="search-page">

      <div className="search-header">
        <h1>{query ? "Search Results" : "Search Movies"}</h1>
        <div className="search-box">
          <span className="search-icon">🔍</span>
          <input autoFocus
          type="text"
          placeholder="Search by movie title..."
          className="search-input"
          value={query}
          onChange={(e) => {
            const value = e.target.value;
            setQuery(value);
            setSearchParams(value? {q:value}:{}, { replace: true });
          }}
        />
        </div>
        
        <div className="sort-container">
           <select className="sort-select" value={sortBy} onChange={(e) => {const value = e.target.value; 
                                                                              setIsSorting(true);
                                                                              setTimeout(() => {
                                                                                setSortBy(value);

                                                                                setTimeout(() => {
                                                                                  setIsSorting(false);
                                                                                }, 150);
                                                                              }, 150);
                                                                               }}>
          <option value="">Sort By</option>
          <option value="rating">Rating (High to Low)</option>
          <option value="date">Release Date (Newest to Oldest)</option>
          <option value="title">Title (A to Z)</option>
        </select>

        <img src={down_arrow_icon} alt="" className="sort-arrow" />
        </div>
      </div>

      <div className={`search-results ${isSorting? "sorting":""}`}>

  {loading ? (
    <div className="search-spinner">
      <img src={netflix_spinner} alt="Loading..." />
    </div>
  ) : movies.length > 0 ? (
    sortedMovies
      .filter((movie) => movie.poster_path)
      .map((movie) => (
        <Link
          to={`/player/${movie.id}`}
          className="search-card"
          key={movie.id}
        >
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <p>{movie.title}</p>
        </Link>
      ))
  ) : (
    query.trim() !== "" && (
      <div className="no-results">
        No movies found.
      </div>
    )
  )}

</div>

    </div>
  </>
);
};

export default Search;