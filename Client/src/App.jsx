import { useState } from 'react'
// import jwt from 'jsonwebtoken'
import jwtDecode from 'jwt-decode'

import AuthForm from './components/AuthForm'
import Browse from './components/Browse'
import DashBoard from './components/DashBoard'
import PlaylistForm from './components/PlaylistForm'
import './styles/App.css'
import { CREATE_USER, LOGIN , ME} from './queries'
import { useQuery, useMutation } from '@apollo/client'
import ReactPlayer from 'react-player'
import {Spotify} from 'react-spotify-embed'


function App() {
  const [token, setToken] = useState('')
  
  // const {loading, error, data} = useQuery(ME)
  // console.log('tokennnnn  ', localStorage.queueitUserToken)
  
  
  const logout = () => {
    setToken(null)
    localStorage.clear()
    // client.resetStore()
  }

  

  const updatePlayList = (pl) =>
  {
    setPlayList([...playList, pl])
  }

  if(localStorage.length===0){
  return (

    

  <div className="App">
  <div >
   
      </div>
      <h1>QueueIt</h1>
      <div className="intro">
          Welcome to QueueIt, All your music, In one place. 
          About us : 
      </div>
      <AuthForm setToken= {setToken}/>
   
      <PlaylistForm />
      <Browse/>
   
    </div>

  )
  }

  const decodedToken = jwtDecode(localStorage.queueitUserToken)
  console.log("tokenns, ", token,"decoded : ", decodedToken)

return(
  <>
  {decodedToken.username} logged in lololl
    <button onClick={logout}>logout</button>
    <DashBoard userId={decodedToken.id}/>
  </>
)

   
  

}

export default App
