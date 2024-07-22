import { BrowserRouter,Routes, Route } from "react-router-dom"
import Home from "./Pages/Home"
import Private from "./Pages/Private"
import { useEffect, useState } from "react"
import { onAuthStateChanged } from "firebase/auth"
import {auth} from "./firebase/Firebase"
import ProtectedRoute from "./commponents/ProtectedRoute"
import Spinner from 'react-bootstrap/Spinner';

function App() {
 
  const [user, setuser] = useState(null)
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() =>{
   const unsubscribe = onAuthStateChanged(auth, (user) =>{
      setuser(user);
      setIsFetching(false)

    })
    return () => unsubscribe();

  }, [])

  if(isFetching) {
    return <Spinner animation="grow" />;
  }
  return (
    <>
      <BrowserRouter>
       <Routes>
         <Route path="/" element={<Home />} />
         <Route path="/private" element={<ProtectedRoute user={user}><Private/> </ProtectedRoute>}/>
       </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
