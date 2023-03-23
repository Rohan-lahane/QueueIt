import { useEffect, useState } from 'react'
import { ME, FIND_PLAYLIST } from '../queries'
import { useLazyQuery, useMutation } from '@apollo/client'

import List from './List'





const PlaylistForm = () => {

    const [title, setTitle] = useState('')
    const [playList, setPlayList] = useState([])
    // const [creator, setCreator] = useState('rohann')
    const [findPlaylist,{loading, data}] = useLazyQuery(FIND_PLAYLIST, 
      {onCompleted: (data)=> setPlayList(data.findPlaylist)})
    
    
      const submitSearch = async (event) => {
      event.preventDefault()
      console.log("Search submited:", title, typeof(title) ) 
      findPlaylist({variables: {title}})
      setTitle('')       
      
      }

      // useEffect(()=>{
       
      // }, [result.data])
    

  return (
    <div>


      what are you looking for ? 
    <form onSubmit={submitSearch}>
      
    title <input
      value={title}
      onChange={({ target }) => setTitle(target.value)}
    />

    {/* creator <input
      value={creator}
      onChange={({ target }) => setCreator(target.value)}
    />
   */}
  <button type='submit'> search </button>


</form>

{playList.map((pl)=> <List key={pl.id} id={pl.id} user={''} />)}
<>thats all the playlists that matched you search, 
   if that's not what you were looking for, use different keyworkds,
   or browse from our collection of playlists. 
</>
</div>
  )
  }

export default PlaylistForm