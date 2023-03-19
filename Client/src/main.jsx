import React from 'react'
import ReactDOM from 'react-dom/client'
import {ApolloClient, ApolloProvider, InMemoryCache, createHttpLink} from '@apollo/client'
import {setContext} from '@apollo/client/link/context'

import App from './App'
import './styles/index.css'

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('queueit-user-token')
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : null,
    }
  }
})

const httpLink = createHttpLink({
  uri: 'http://localhost:4000',
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})

// client.query({query})
// .then((response)=> console.log(response.data))

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
  <ApolloProvider client = {client} >
    <App />
  </ApolloProvider>
  // </React.StrictMode>,
)
