import {useState} from 'react'
import { useQuery } from '@apollo/client'
import {ALL_PLAYLISTS} from '../queries'
import List from './List'


const Browse = () => {

  const {loading, error, data} = useQuery(ALL_PLAYLISTS)

  if(data)
  {console.log("all playlists data", data)}
    return (
    <div>
   
     {loading && <div>getting playlists</div>}
     {error && <div>oops error : {error.message}</div>}
     {data && 
     <div className='playlist-container'> {data.getAllPlaylists.map((pl)=>
      <List key ={pl.id} 
      playlist = {pl}
      user ={''}
      />)}
      </div>
      }
     
    </div>
    )
}

export default Browse