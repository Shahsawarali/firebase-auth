import React from 'react'
import { signOut } from 'firebase/auth'
import { auth } from '../firebase/Firebase'
import './Private.css'

function Private() {

  function handleSignout(){
    signOut(auth)
    .then(() => {
      alert("Sign out successfully!")
    })
    .catch(error => alert(error.message))
  }
  return (
    <div className='private-container'>
      <header className='private-header'>
        <h1>welcome to Dashboard</h1>
      </header>
      <main  className='private-contant'>
        <h2>your profile</h2>
        <p>welcome to private  Dashboard. here you can manage your setting and preference.</p>
      </main>
      <footer className='private-footer'>
        <button onClick={handleSignout}>Signout</button>
      </footer>
    </div>
  )
}

export default Private
