import React, { useEffect, useState } from 'react'
import {useParams} from 'react-router-dom'
import axios from "axios";

export default function Details() {
const [itemDetails, setItemDetails] = useState({})
let params=useParams()
console.log(params);

let getItemDetails=async()=>{

  let {data}=await axios.get(`https://api.themoviedb.org/3/${params.mediatype}/${params.id}?api_key=29e85bca2ecb27d35f3f95b99ae26edc&language=en-US`)
  setItemDetails(data)
console.log(data);
}

useEffect(() => {
  getItemDetails()
}, [])


  return (
<>
<div className="row mt-5">
  <div className="col-md-3">
    {params.mediatype =='person'?
  <img  className="w-100" src={`https://image.tmdb.org/t/p/original${itemDetails.profile_path}`} alt="" /> :
  <img
  className="w-100"
  src={`https://image.tmdb.org/t/p/original${itemDetails.poster_path}`}

  alt=""
/> 
  }

  </div>
  <div className="col-md-9">
    <h2>{itemDetails.title}{itemDetails.name}</h2>
    <p className="text-muted my-3 w-75">{itemDetails.overview}{itemDetails.biography}</p>
  </div>
</div>


</>

    )
}
