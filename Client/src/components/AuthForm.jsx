import { useState, useEffect } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN, CREATE_USER } from '../queries'




const LoginForm = ({setToken}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      console.log("could not login: ", error )
    }
  })

  useEffect(() => {

    console.log("login result data =>",result.data)
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('queueitUserToken', token)
    }
  }, [result.data]) 


  const submitLogin = async (event) => {
    event.preventDefault()
    console.log("Login submited: ", username, password) 
    login({ variables: { username, password } })
  }
  return (
    <div>
    <form onSubmit={submitLogin}>
      
      username <input
        value={username}
        onChange={({ target }) => setUsername(target.value)}
      />
   
    
      password <input
        type='password'
        value={password}
        onChange={({ target }) => setPassword(target.value)}
      />
    
    <button type='submit'>login</button>
  </form>
  </div>
  )
}

const SignUpForm = ({setToken}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [ createUser, result ] = useMutation(CREATE_USER, {
    onError: (error) => {
      console.log("could not login: ", error )
    }
  })

  useEffect(() => {
    console.log("signup result data =>",result.data)
    if ( result.data ) {
      const token = result.data.createUser.value
      setToken(token)
      localStorage.setItem('queueitUserToken', token)
    }
  }, [result.data]) 

  const submitSignUp = async (event) => {
    event.preventDefault()
    console.log("Sign submited: ", username, password) 
    createUser({variables: {username, password}})
  }
  return (
    <div>
    <form onSubmit={submitSignUp}>
      
        username <input
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
     
      
        password <input
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
        />
      
      <button type='submit'>SignUp</button>
    </form>
  </div>
  )
}

const AuthForm = ({setToken}) => {
  const [form, setForm] = useState(true)
  const handleToggleForm =() => {
    setForm(!form)
  }

  return(
    <>
       <h2>{form ? 'Login' : 'Sign Up'}</h2>

       {form ? <LoginForm setToken={setToken}/> 
       : <SignUpForm setToken={setToken} />}

       <button onClick={handleToggleForm}>
        {form? 'switch to sign in': 'swith to login'}
       </button>
    </>
  )

}

export default AuthForm