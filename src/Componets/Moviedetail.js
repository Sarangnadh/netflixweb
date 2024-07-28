import { Button, Grid, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { addDoc, collection, doc, getDocs } from 'firebase/firestore'
import { auth, database } from '../Firebase/setup';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Trailer from './Trailer';

function Moviedetail() {

    const [review, setReview] = useState("")

    const [reviewData, setReviewdata] = useState([])

    const location = useLocation()
    // console.log(location);
    const movieRef = doc(database, "movies", `${location.state.movie.id}`)
    const reviewRef = collection(movieRef, "Reviews")
    // console.log(auth);

    const addReview = async () => {
        try {
            auth.currentUser && await addDoc(reviewRef, {
                movieReview: review,
                email: auth.currentUser?.email,
                username: auth.currentUser?.displayName,
                profile_pic: auth.currentUser?.photoURL
            })
            auth.currentUser ? toast.success("Review added successfully", {
                theme: 'colored'
            })
                : toast.warning("Please Login")

        }
        catch (err) {
            console.error(err)
        }
    }

    const showReview = async () => {
        try {
            const data = await getDocs(reviewRef)
            const filterData = data.docs.map((doc) => ({
                ...doc.data(),
                id: doc.id
            }))
            setReviewdata(filterData)
        }
        catch (err) {
            console.error(err)
        }
    }

    useEffect(() => {
        showReview()
    }, [])
    // console.log(reviewData);
    return (
        <Grid container spacing={2} color={"white"}>
            <Grid item xs={8}>
                <div style={{
                    backgroundImage: `linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url(https://image.tmdb.org/t/p/original${location.state.movie?.backdrop_path})`,
                    height: "100vh", backgroundSize: "cover", backgroundRepeat: "no-repeat"
                }}>
                    <ToastContainer autoClose={2000} />
                    <div style={{ paddingTop: "300px", paddingLeft: "30px", paddingRight: "10px", fontFamily: "initial" }}>
                        <Grid container>
                            <h1 style={{ color: "red", fontSize: "50px" }}>{location.state.movie && location.state.movie.original_name || location.state.movie.original_title}</h1>
                        </Grid>

                        <div style={{ display: 'flex' }}>
                            <h4 style={{ color: "white" }} >Language : {location.state.movie?.original_language} - </h4>
                            <h4 style={{ color: "white" }} >Release date : {location.state.movie && location.state.movie.first_air_date || location.state.movie.release_date}</h4>
                        </div>

                        <Grid container>
                            <h2 style={{ color: "white", fontWeight: "100" }}>{location.state.movie?.overview}</h2>
                            <Trailer location={location} />
                            {/* <Button variant='contained' sx={{ color: "black", bgcolor: "white" }}>Play trailer</Button> */}
                        </Grid>

                    </div>

                </div>
            </Grid>

            {/* Reviews */}
            <Grid item xs={4}>
                <div >
                    {/* firstdiv */}
                    <Grid container>
                        <div>
                            <h4 style={{ color: "#147ADF" }}>ADD REVIEW</h4>
                            <TextField onChange={(e) => setReview(e.target.value)} sx={{ bgcolor: "white", borderRadius: "5px" }} size='small' label="Review" variant='outlined' />
                            <Button onClick={addReview} sx={{ ml: "10px", bgcolor: "red", color: "white" }} variant='contained'>Submit</Button>
                        </div>
                    </Grid>
                    {/* SecondDiv */}
                    <Grid container>
                        <div>
                            <h4 style={{ color: "#147ADF" }}>REVIEW</h4>
                            {reviewData.map((data) => {
                                return <>
                                    <div style={{ display: 'flex' }}>
                                        <img style={{ width: "50px", borderRadius: "30px" }} src={data.profile_pic} alt='Error' />
                                        <li style={{ color: 'white', paddingLeft: "10px" }}>{data.username}</li>

                                    </div>

                                    <h6 style={{ color: 'grey' }}>{data.movieReview}</h6>
                                </>



                            })

                            }


                        </div>
                    </Grid>

                </div>
            </Grid>





        </Grid>
    )
}

export default Moviedetail