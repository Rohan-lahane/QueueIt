import { useState } from 'react'
// import jwt from 'jsonwebtoken'
import jwtDecode from 'jwt-decode'

import AuthForm from './components/AuthForm'
import Browse from './components/Browse'
import DashBoard from './components/DashBoard'
import './styles/App.css'
import { CREATE_USER, LOGIN , ME} from './queries'
import { useQuery, useMutation } from '@apollo/client'



function App() {
  const [token, setToken] = useState(null)
  // const {loading, error, data} = useQuery(ME)
  
  
  
  const logout = () => {
    setToken(null)
    localStorage.clear()
    // client.resetStore()
  }

  if(!token){
  return (

    <div className="App">
      <h1>QueueIt</h1>
      <div className="intro">
          Welcome to QueueIt, All your music, In one place. 
          About us : 
      </div>
      <AuthForm setToken= {setToken}/>
      <Browse/>

      <DashBoard userId={'64165124b2e3ea8dfb85ec3f'}/>
    </div>

  )
  }

  const decodedToken = jwtDecode(token)
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
