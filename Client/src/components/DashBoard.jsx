import React from 'react'
import { useQuery } from '@apollo/client'
import {ME, FIND_USER} from '../queries'
import List from './List'

const DashBoard = ({userId}) => {

const str = userId
 console.log("stringg ", typeof(userId),userId )
  const{loading, error, data} = useQuery(FIND_USER,{ variables: {id : userId} } )

  if(loading) return <>loadinggg....</>
  if(error) return <>error is  : {error.message}</>

  console.log("finduser ", data.findUser)
  return (
    <>
    <h1>DashBoard for {data.findUser.username} </h1>
    {data.findUser.playlists.map((pl)=> <li key={pl} >{pl}</li>)}
    </>
  )
}

export default DashBoard