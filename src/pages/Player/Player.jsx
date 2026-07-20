import React, { useEffect, useState } from 'react'
import './Player.css'
import back_arrow_icon from '../../assets/back_arrow_icon.png'
import { useNavigate, useParams } from 'react-router-dom'

const Player = () => {

  const{id} = useParams();
  const navigate =  useNavigate();

  const [apiData, setApiData] = useState({
    name: "",
    key:"",
    published_at:"",
    typeof:""
  })

  const [movieData, setMovieData] = useState({
    overview:"",
    runtime: 0,
    original_language: "",
    genres: [],
    popularity: 0,
    vote_count: 0,
    title: ""
  })

  const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwZDMyODdhNjMzYzA5MDA3NjNjMGZmZjNkOGRlZTgzNSIsIm5iZiI6MTc4NDIxNDA3Mi44NTc5OTk4LCJzdWIiOiI2YTU4ZjIzOGM0NmRkODUzZDMwNzQ4ZTYiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.zm2F2F2ARHipeZCurmGuvzkB6JfMHi94f-PMRGhr3rw'
  }
};

useEffect(()=>{
  fetch(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, options)
  .then(res => res.json())
  .then(res => setApiData(res.results[0]))
  .catch(err => console.error(err));
  fetch(`https://api.themoviedb.org/3/movie/${id}?language=en-US`, options)
  .then((res) => {
    console.log("Status:", res.status);
    return res.json();
  })
  .then((data) => {
    console.log("Movie Data:", data);
    setMovieData(data);
  })
  .catch((err) => console.error("Fetch Error:", err));
},[id])

  return (
    <div className='player'>
      <img src={back_arrow_icon} alt="" onClick={()=>{navigate(-1)}}/>
      {apiData.key && (<iframe className="player-video" src={`https://www.youtube.com/embed/${apiData.key}`} title='trailer' frameBorder='0' allowFullScreen></iframe>)}
      <div className="player-info">
        <p>{apiData.published_at?.slice(0,10)}</p>
        <p>{apiData.name}</p>
        <p>{apiData.type}</p>
      </div>

      <div className="movie-details">
        <h2>{movieData.title}</h2>

        <div className="detail-item">
          <h3>Overview</h3>
          <p>{movieData.overview}</p>
        </div>

        <div className="detail-item">
          <h3>Runtime</h3>
          <p>{movieData.runtime} min</p>
        </div>

        <div className="detail-item">
          <h3>Language</h3>
          <p>
            {
              movieData.original_language? new Intl.DisplayNames(["en"], { type: "language"}).of(
                movieData.original_language
              ):""
            }
          </p>
        </div>

        <div className="detail-item"> 
          <h3>Genres</h3>
          <p>{movieData.genres.map((genre) => genre.name).join(" • ")}</p>
        </div>

        <div className="detail-item">
          <h3>Popularity</h3>
          <p>{movieData.popularity.toFixed(0)}</p>
        </div>

        <div className="detail-item">
          <h3>Vote Count</h3>
          <p>{movieData.vote_count.toLocaleString()}</p>
        </div>
      </div>
    </div>
  )
} 

export default Player