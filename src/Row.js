import React, { useState, useEffect } from 'react'
import instance from './instance'
import './Row.css'
import { Box, Card, CardMedia, Grid } from '@mui/material';
import { Link } from 'react-router-dom';
import { doc, setDoc } from 'firebase/firestore';
import { database } from './Firebase/setup';

const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl }) {

    const [movies, setMovies] = useState([])


    async function fetchData() {
        const request = await instance.get(fetchUrl)
        setMovies(request.data.results)
    }

    useEffect(() => {
        fetchData()
    }, [])
    console.log("our movies", movies);

    const addMovie = async (movie) => {
        console.log(movie);
        const movieRef = doc(database, "movies", `${movie.id}`)
        try {
            await setDoc(movieRef, {
                movieName: movie.original_name
            })

        }
        catch (err) {
            console.error(err)
        }
    }





    return (

        <div className='row'>
            <h1>{title}</h1>
            <Grid container spacing={2} style={{ paddingTop: "20px", paddingLeft: "20px", paddingRight: "20px" }}  >

                {movies.map((movie) => (
                    addMovie(movie),


                    <Grid item xs={2}>
                        <Box>
                            <Link to={"/MovieDetail"} state={{ movie: movie }}>
                                <Card className='rowposters' >
                                    <CardMedia component="img" image={`${base_url}${movie.poster_path}`}>

                                    </CardMedia>
                                </Card>
                            </Link>

                        </Box>
                    </Grid>



                ))
                }
            </Grid>

        </div>
    )
}

export default Row