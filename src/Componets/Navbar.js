import { Button } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { auth } from '../Firebase/setup'
import { signOut } from 'firebase/auth'
import { ToastContainer, toast } from 'react-toastify';
  import 'react-toastify/dist/ReactToastify.css';

function Navbar() {
  const navigate = useNavigate()

const logout =async()=>{
  try{
    await signOut(auth)
    setTimeout(()=>navigate("/"),2000)
    
    toast.success("Successfully Loggedout",{
    theme:"dark"
         })

   

  }
  catch(err)
  {
    console.error(err)
  }
}


  const signinClick = () => {
    navigate("/")
  }
  return (

    <div style={{ display: "flex", justifyContent: "space-between", padding: "20px" }}>
      <img style={{ width: "90px", marginTop: "5px",backgroundImage:`linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7))` }} src='https://upload.wikimedia.org/wikipedia/commons/thumb/0/08/Netflix_2015_logo.svg/1198px-Netflix_2015_logo.svg.png' alt='notfit' />
   
   <ToastContainer  autoClose={2000} />
    {auth.currentUser?.emailVerified ?<Button onClick={logout} color='error' variant='contained' >Logout</Button>
    :<Button onClick={signinClick} color='error' variant='contained' style={{ marginLeft: "79%" }}>SignIn</Button>
  }


    </div>
  )
}

export default Navbar