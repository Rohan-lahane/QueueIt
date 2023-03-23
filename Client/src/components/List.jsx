import React, {useState} from 'react'
import { useQuery } from '@apollo/client'
import { GET_PLAYLIST_BY_ID } from '../queries'
import '../styles/Playlist.css'

const AddSongForm =({addTo, setCounter})=>{

  
    const [link, setLink] = useState('')
    const [platform, setPlatform] = useState('')

    const handleClick =()=>
    {
        
        console.log("handleclick link", typeof(link), "platform: ", typeof(platform))
        const song= {
            link: link,
            platform: platform
        }
        console.log("songg set: ", song)
        setCounter(1)
        setLink('')
    }

    return(
        <>
        linnk: 
        <input
          value={link}
          onChange={({ target }) => setLink(target.value)}
        />

    Platform: 
        <select value={platform} onChange={(e)=>{
            console.log("dropdown:", e.target.value)
            setPlatform(e.target.value)}}>
          <option value="">Platform: </option>
          <option value='spotify'>Spotify</option>
          <option value='youtube'>Youtube</option>
        </select>

        <button onClick={handleClick}>song++</button>
        
        </>
        
    )
}

const List = (props) => {

  
    console.log("list props: ", props)
    const [songForm, setSongForm] = useState(false)
    const {loading, error, data} = useQuery(GET_PLAYLIST_BY_ID, {variables: {var: props.id}})
    const [open, setOpen] = useState(false)
    const [counter, setCounter] = useState(0)

  return (
    <div className='playlist'>
        {counter}
        {loading && <>loadingg</>}
        {error && <>error getting plalist details: {error.message}</>}
        {data && <>{data.getPlaylistById.title}</>}
        {
            data&& <>{
            open? <>
            <button onClick={()=>setOpen(false)} >close playlist</button>
            show songs
            <div>
            {
            (songForm)?
            <> 
            <button onClick ={()=>setSongForm(false)} >cancel</button>
            <AddSongForm addTo={props.id} 
                setCounter={(val)=>{
                console.log("setcounter", val)
                setCounter(counter+val)}} 
            /> 
            </>
            : <> { (props.user === data.getPlaylistById.creator)&& <button onClick={()=>setSongForm(true)}>add song</button> } </>
            
            }
            </div>
            </>
            : 
            <>
                <h4 onClick={()=>setOpen(true)} >{props.id} andd: {props.user}</h4>
            </>
            }
            </>
        }
    </div>
  )
}



export default List

