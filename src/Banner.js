import React, { useEffect, useState } from "react";
import axios, { imageUrl } from "./axios";
import requests from "./request";
import "./Banner.css";

function Banner() {
  const [movie, setMovie] = useState(null);

  const fetchData = async () => {
    const response = await axios.get(requests?.fetchNetflixOriginals);
    if (response?.data?.results !== undefined) {
      setMovie(
        response?.data?.results[
          Math.floor(Math.random() * response?.data?.results?.length - 1)
        ]
      );
    } else {
      console.log("error");
    }
  };

  const truncate = (str, n) => {
    return str?.length > n ? str?.substr(0, n - 1) + "..." : str;
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url(${imageUrl}${movie?.backdrop_path})`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner_buttons">
          <button className="banner_button"> Play </button>
          <button className="banner_button"> My List </button>
        </div>

        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>
      <div className="banner--fadeBottom" />
    </header>
  );
}

export default Banner;
