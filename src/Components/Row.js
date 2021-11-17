import axios, { imageUrl } from "../axios";
import React, { useEffect, useState } from "react";
import "../Row.css";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  const fetchData = async () => {
    const response = await axios.get(fetchUrl);
    setMovies(response?.data?.results);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const options = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1,
    },
  };

  const handleClick = (movie) => {
    console.log(movie);
    if (trailerUrl.length > 0) {
      setTrailerUrl("");
    } else {
      movieTrailer(movie?.name || movie?.title || "")
        .then((url) => {
          const urlParams = new URLSearchParams(new URL(url).search);
          console.log({ urlParams });
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => {
          console.log("Error:", error);
        });
    }
  };
  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies?.map((movie) => {
          return (
            <img
              key={movie?.id}
              onClick={() => handleClick(movie)}
              className={`row_poster ${isLargeRow && "row_posterLarger"}`}
              src={`${imageUrl}${
                isLargeRow ? movie?.poster_path : movie?.backdrop_path
              }`}
              alt={movie?.name}
            />
          );
        })}
      </div>
      {trailerUrl && <YouTube opts={options} videoId={trailerUrl} />}
    </div>
  );
}

export default Row;
