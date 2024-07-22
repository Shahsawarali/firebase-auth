import React from 'react'
import { useState } from 'react'
import "./Home.css"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../firebase/Firebase.js'
import { useNavigate } from 'react-router-dom'

export default function Home() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [isSignInActive, setIsSignInActive] = useState(true)
    const [error ,SetError] = useState("");
    const navigate = useNavigate();

    function handleEmailChange(e)   {
        setEmail(e.target.value)
    }

    function handlePasswordChange(e)  {
        setPassword(e.target.value)
    }

    function handelMethodChange(){
        setIsSignInActive(!isSignInActive);
        SetError("");
    }

    function handleSignin(e){
        e.preventDefault();
        if(!email || !password){
            SetError("Please Enter email and password")
        }
        signInWithEmailAndPassword(auth,email,password)
        .then(Response =>{
            const user = Response.user;
            navigate("/private")
        })
    }

    function handleSignup(e){
        e.preventDefault();
        if(!email || !password){
            SetError("Please Enter email and password")
            console.log("no email password")
        }
        createUserWithEmailAndPassword(auth,email,password)
        .then(Response => {
            const user = Response.user;
            navigate("/private")
        })
        .catch(error =>{
            const errormessage =error.message;
            SetError(errormessage);
            console.log(errormessage)
        })
    }


  return (
    <div className='form-container'>
        <form className='form'>
            <h2>{isSignInActive ? <span style={{color:"green"}}>Signin</span> : <span style={{color:"#2196f3"}}>Signup</span>}</h2>

            <label htmlFor="email">Email:</label>
            <input type="email" id='email' placeholder='Enter your email' onChange={handleEmailChange} className='input-feild'/>
            <label htmlFor="password">password :</label>
            <input type="password" id='password' placeholder='your password' onChange={handlePasswordChange} className='input-feild'/>

    {error && <p className='error-massage'>{error}</p>}
            {isSignInActive ? (<button onClick={handleSignin} className='button sign-in-btn'>Signin</button>) : (<button onClick={handleSignup} className='button sign-up-btn'>Signup</button>)}

            <p className='form-switch'>
                {isSignInActive ? "Don't have an account?" : "Already have an account?"}
                <span onClick={handelMethodChange} className='form-switch-link'>
                {isSignInActive? "Signup" : "Signin"} 
                </span>
            </p>
            
            
        </form>
    </div>
  )
}
