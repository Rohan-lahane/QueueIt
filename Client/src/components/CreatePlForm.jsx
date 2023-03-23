import React, {useState, useEffect} from 'react'
import { useMutation } from '@apollo/client'
import { ADD_PLAYLIST } from '../queries'


const CreatePlForm = ({creator,setForm, list, setCount}) => {
    const [title, setTitle] = useState('')
  
  
    const [ addPlaylist, result ] = useMutation(ADD_PLAYLIST)
    const creatorId = creator._id
    const submitPlaylistForm = async (event) => {
      event.preventDefault()
      console.log("new playlist submited: ", title, creatorId) 
      addPlaylist({ variables: { title, creatorId } })
      
      setTitle('')
    }

    useEffect(()=>{
        if(result.data)
        {
          
          const newlist= list.concat(result.data.addPlaylist.id)
          console.log("add playlist data", result.data.addPlaylist.id, newlist)
          setForm()
          setCount(newlist)
       
        }
    },[result.data])

    return (
      <div>
      <form onSubmit={submitPlaylistForm}>
        title <input
          value={title}
          onChange={({ target }) => setTitle(target.value)}
        />
      <button type='submit'>add playlist</button>
      {result.loading && <>making your playlist</>}
      {result.error && <>oops, {result.error.message} </>}
      
      
    </form>
    </div>
    )
  }
  
export default CreatePlForm