import React from 'react'
import Row from '../Row';
import requests from '../request';
function Home() {
  return (
    <div className="App">
    <Row title="Netflix Originals" fetchUrl={requests.fetchNetflixOriginals} />
    <Row title="Trending Now" fetchUrl={requests.fetchTrending} />
    <Row title="Top Rated" fetchUrl={requests.fetchTopRated} />
    <Row title="Action Movies" fetchUrl={requests.fetchActionMovies} />
    <Row title="Comedy Movies " fetchUrl={requests.fetchComedyMovies} />
    <Row title="Horror Movies " fetchUrl={requests.fetchHorrorMovies} />
    <Row title="Romance Movies " fetchUrl={requests.fetchRomanceMovies} />

  </div>

  );
}

export default Home