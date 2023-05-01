import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";


export default function People() {

  const [trendingPersons, settrendingPersons] = useState([]);

  let getTrendingPersons = async () => {
    let { data } = await axios.get(
      "https://api.themoviedb.org/3/trending/person/day?api_key=29e85bca2ecb27d35f3f95b99ae26edc"
    );
    settrendingPersons(data.results);
    console.log(data.results);
  };

  useEffect(() => {
    getTrendingPersons();
  }, []);



  return (

    <>
         <div className="row  py-4 gy-3">
        <div className="welcome col-md-3">
          <div className="brdr w-25 mb-3"></div>
          <h3>Trending <br />Persons <br /> To watch now</h3>
          <p className="text-muted mb-3">Most watched Persons by days</p>
          <div className="brdr"></div>
        </div>
        {trendingPersons.slice(0, 10).map((item, index) => (
          <>
            <div key={index} className="col-md-2">
            <Link className="nav-link" to={`/Details/${item.id}/${item.media_type}`}>

              <div className="item position-relative">
                <img
                  className="w-100"
                  src={`https://image.tmdb.org/t/p/original${item.profile_path}`}
                  alt=""
                />
                <h6 className="h6">
                  {item.name}
                </h6>
              </div>
              </Link>

            </div>
          </>
        ))}
      </div>
    
    
    
    </>
  )
}
