// import { set } from 'mongoose'
// import React from 'react'

// const PlaylistForm = () => {

//     const [title, setTitle] = useState('')
//     // const [password, setPassword] = useState('')
  
//     const [ findPlaylist, result ] = useMutation(FIND_PLAYLIST, {
//       onError: (error) => {
//         console.log("could not find Playlist: ", error )
//       }
//     })
  
//     useEffect(() => {
  
//       console.log("playlist result data =>",result.data)
//       if ( result.data ) {
//         const songs = result.data.findPlaylist.songs
//         setSongList()
//       }
//     }, [result.data]) 
  
  
//     const submitLogin = async (event) => {
//       event.preventDefault()
//       console.log("Login submited: ", username, password) 
//       login({ variables: { username, password } })
//     }

//   return (
//     <div> <form onSubmit={submitLogin}>
      
//     username <input
//       value={username}
//       onChange={({ target }) => setUsername(target.value)}
//     />
 
  
//     password <input
//       type='password'
//       value={password}
//       onChange={({ target }) => setPassword(target.value)}
//     />
  
//   <button type='submit'>login</button>
// </form></div>
//   )
// }

// export default PlaylistForm