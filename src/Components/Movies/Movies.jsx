import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Movies() {
  const [trendingMovies, settrendingMovies] = useState([]);

  let getTrendingMovies = async () => {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/movie/day?api_key=29e85bca2ecb27d35f3f95b99ae26edc"
    );
    settrendingMovies(data.results);
    console.log(data.results);
  };

  useEffect(() => {
    getTrendingMovies();
  }, []);

  return (
    <>
      <div className="row  py-4 gy-3">
        <div className="col-md-3 welcome">
          <div className="brdr w-25 mb-3"></div>
          <h3>Trending <br />Movies <br /> To watch now</h3>
          <p className="text-muted mb-3">Most watched movies by days</p>
          <div className="brdr"></div>
        </div>
        {trendingMovies.slice(0, 10).map((item, index) => (
          <>
            <div key={index} className="col-md-2">
              <Link className="nav-link" to={`/Details/${item.id}/${item.media_type}`}>
              <div className="item position-relative">
                <img
                  className="w-100"
                  src={`https://image.tmdb.org/t/p/original${item.poster_path}`}
                  alt=""
                />
                <h6 className="h6">
                  {item.title}
                </h6>
                <span className="position-absolute top-0 end-0 p-2 bg-info ">{item.vote_average.toFixed(1)}</span>
              </div>
              </Link>
            </div>
          </>
        ))}
      </div>
    </>
  );
}
