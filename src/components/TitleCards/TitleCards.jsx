import React, {useEffect, useRef, useState} from 'react'
import './TitleCards.css'
import { Link } from 'react-router-dom'
import { FaHeart, FaRegHeart } from "react-icons/fa"
import Netflix_spinner from '../../assets/netflix_spinner.gif'

const TitleCards = ({title, category}) => {

    const [apiData, setApiData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [watchlist, setWatchlist] = useState(
      JSON.parse(localStorage.getItem("watchlist")) || []
    );
    const cardsRef = useRef();

    const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDMyODdhNjMzYzA5MDA3NjNjMGZmZjNkOGRlZTgzNSIsIm5iZiI6MTc4NDIxNDA3Mi44NTc5OTk4LCJzdWIiOiI2YTU4ZjIzOGM0NmRkODUzZDMwNzQ4ZTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zm2F2F2ARHipeZCurmGuvzkB6JfMHi94f-PMRGhr3rw'
  }
};

  const handleWheel = (event) => {
    event.preventDefault();
    cardsRef.current.scrollLeft += event.deltaY;
  }

  const handleScroll = () => {
    const container = cardsRef.current;
    if(!container || loading) return;
    const reachedEnd = container.scrollLeft + container.clientWidth >= container.scrollWidth - 100;

    if(reachedEnd) {
      setPage((prev) => prev + 1);
    }
  };

  const toggleWatchlist = (movie) => {
    const exists = watchlist.some(item => item.id === movie.id);

    let updatedWatchlist;
    if (exists) {
      updatedWatchlist = watchlist.filter (item => item.id !== movie.id);
    }
    else {
      updatedWatchlist = [...watchlist, movie];
    }

    setWatchlist(updatedWatchlist);
    localStorage.setItem("watchlist", JSON.stringify(updatedWatchlist));
  }

  const fetchMovies = () => {
    setLoading(true);
    setError("");

    fetch(
      `https://api.themoviedb.org/3/movie/${category? category:"now_playing"}?language=en-US&page=${page}`, options
    )
      .then((res) => {
        if(!res.ok) {
          throw new Error("Failed to fetch movies.");
        }
        return res.json();
       })
       .then((res) => {
        setApiData((prev) => [...prev, ...res.results]);
       })
       .catch(() => {
        setError("Unable to load moveies. Please try again.");
       })
       .finally(() => {
        setLoading(false);
       });
  };

  useEffect(() => {
    setApiData([]);
    setPage(1);
  }, [category]);

  useEffect(() => {
    fetchMovies();
    cardsRef.current?.addEventListener("wheel",handleWheel);
    cardsRef.current?.addEventListener("scroll", handleScroll);

    return () => {
      cardsRef.current?.removeEventListener("wheel",handleWheel);
      cardsRef.current?.removeEventListener("scroll",handleScroll);
    };
  }, [page, category]);
    
  return (
  <div className="title-cards">
    <h2>{title ? title : "Currently Airing"}</h2>

    {
      error && (
        <div className="error-message">
          <p> ⚠️ {error} </p>
          <button onClick={fetchMovies}> Retry </button>
        </div>
      )
    }

    {
      !error &&  (
        
        <>
          <div className="card-list" ref={cardsRef}>
      {apiData.map((card) => {
        return (
          <div className="card" key={card.id}>
            <Link to={`/player/${card.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${card.poster_path}`}
                alt=""
              />
            </Link>

            <p>{card.original_title}</p>

            <button onClick={(e) => {e.stopPropagation(); toggleWatchlist(card)}}>
              {watchlist.some(item => item.id === card.id)
                ? <FaHeart/>
                : <FaRegHeart/>}
            </button>
          </div>
        );
      })}
    </div>

    {
      loading && (
        <div className="loading-spinner">
          <img src={Netflix_spinner} alt="Loading..." />
        </div>
      )
    }
        </>
      )
    }
  </div>
);
}

export default TitleCards