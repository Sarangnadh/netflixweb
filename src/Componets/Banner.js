import React, { useEffect, useState } from 'react'
import instance from '../instance'
import requests from '../request'
import './Banner.css'
// import { Button } from '@mui/material
function Banner() {
    const [movie,setMovies]=useState([])

async function fetchData(){
    const request = await instance.get(requests.fetchNetflixOriginals)
    setMovies(request.data.results[
        Math.floor(Math.random() * request.data.results.length - 1)
    ])
}
useEffect(()=>{
    fetchData()
},[])

function truncate(str,n){
    return str?.length > n ? str.substr(0,n-1) + "... " : str ;
}
// console.log("Banner Movie is",movie)
  return (
    <header
    className='header'
    style={{
        backgroundSize:"cover",
        backgroundImage:`url(
            "https://image.tmdb.org/t/p/original/${movie.backdrop_path}"
        )`,
        backgroundPosition:"center  ",
        // height:"800px"
    }}>
<div className="banner__contents">
    <h1 className="banner__title" style={{color:"white",fontSize:"3rem",fontWeight:"800",paddingBottom:"0.3rem"}}>
        {movie?.title || movie?.name||movie?.original_name}
    </h1>
<h1 className="banner__desc">{truncate(movie?.overview,150)}</h1>


{/* <Button variant='contained' sx={{color:"black",bgcolor:"white",fontWeight:"bold"}}>View Trailer</Button> */}
</div>

    </header>  )
}

export default Banner