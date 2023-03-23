import {useState} from 'react'
import { useQuery } from '@apollo/client'
import {ALL_PLAYLISTS} from '../queries'
import List from './List'


const Browse = () => {

  const {loading, error, data} = useQuery(ALL_PLAYLISTS)
    return (
    <div>
   
      <h2> All Playlists:  </h2>
      {loading && <>getting playlists</>}
     {error && <>oops error : {error.message}</>}
     {data && data.getAllPlaylists.map((pl)=>
      <List key ={pl.id} 
      id = {pl.id}
      user ={''}
      />)}
     
    </div>
    )
}

export default Browse