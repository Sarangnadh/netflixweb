import { Button } from '@mui/material'
import { signInWithPopup } from 'firebase/auth'
import React from 'react'
import { auth, googleauth } from '../Firebase/setup'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';
function Signin() {
const navigate =useNavigate()

  const googleSignin = async () => {
    try {
      await signInWithPopup(auth, googleauth)
      setTimeout(()=>{
        auth.currentUser?.emailVerified &&  navigate("/home")

      },2000)
      toast.success("Successfully SignedIn",{
        theme:"dark"
             })


    }
    catch (err) {
      console.error(err)
    }
  }


  console.log(auth.currentUser);
  return (
    <div style={{ backgroundColor: "#181818", height: "100vh", padding: "20px" }}>
      <ToastContainer autoClose={2000} />

      <img style={{ position:"fixed", width: "40%", height: "100px",marginTop:"170px" }} src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png'  alt='movie'/>
      <div style={{ position: "fixed", left: "45%", top: "35%" }}>
        <Button onClick={googleSignin} variant='contained' color='error'>Signin in with Google</Button>
        <br />
        <h2 style={{ color: "white" }}>Let's start <br /> to explore movies<br /> from here.</h2>
      </div>
    </div>
  )
}

export default Signin