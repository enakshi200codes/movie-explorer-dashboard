import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './Watchlist.css';
import Navbar from '../../components/Navbar/Navbar';

const genres = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  53: "Thriller",
  10752: "War",
  37: "Western"
};

const Watchlist = () => {
  const [watchlist, setWatchlist] = useState([]);

  useEffect(() => {
    const savedMovies = JSON.parse(localStorage.getItem("watchlist")) || [];
    setWatchlist(savedMovies);
  }, []);

 const averageRating =
  watchlist.length > 0
    ? (
        watchlist.reduce((sum, movie) => sum + movie.vote_average, 0) /
        watchlist.length
      ).toFixed(1)
    : 0;

const genreCount = {};

watchlist.forEach((movie) => {
  movie.genre_ids.forEach((id) => {
    const name = genres[id];

    if (name) {
      genreCount[name] = (genreCount[name] || 0) + 1;
    }
  });
});

const topGenre =
  Object.entries(genreCount).sort((a, b) => b[1] - a[1])[0];

  return (

    <>

    <Navbar/>

    <div className="watchlist">
      <h1>My Watchlist</h1>

      <div className="watchlist-stats">
        <div className="stat-card">
          <h3>Total Movies</h3>
          <p>{watchlist.length}</p>
        </div>

        <div className="stat-card">
          <h3>Average Rating</h3>
          <p>{averageRating}</p>
        </div>

        <div className="stat-card">
          <h3>Top Genre</h3>
          <p>{topGenre? topGenre[0]:"NA"}</p>
        </div>
      </div>

      {watchlist.length === 0 ? (
        <p>Your watchlist is empty.</p>
      ) : (
        <div className="watchlist-grid">
          {watchlist.map((movie) => (
            <Link to={`/player/${movie.id}`} key={movie.id} className="watchlist-card">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.original_title}/>
              <p>{movie.original_title}</p>
            </Link>
          ))}
        </div>
      )}
    </div>
    </>
  );
};

export default Watchlist;