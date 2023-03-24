import {gql} from '@apollo/client'



const PLAYLIST_DATA = gql`
fragment PlaylistData on Playlist{
  title
  id
  creator
  songs {
    title
    link
    platform
  }
}
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const CREATE_USER = gql`
mutation createUser($username: String!, $password: String!)
{
    createUser(username: $username, password: $password)  {
        value
      }
}
`

export const ADD_PLAYLIST =gql`
mutation addPlaylist($title: String!, $creatorId: String!)
{
  addPlaylist(title: $title, creatorId: $creatorId)
  {
    title
    id
    creator
    songs {
      title
      link
      platform
    }
  }
}
`

export const ME = gql`
query me
{  
  me{
      username
      id
  }
      
}
`

export const FIND_USER = gql`
query findUser ($id: String!)
{  
  findUser(id: $id){
      _id
      username 
      playlists  
  }     
}
`

export const FIND_PLAYLIST = gql`
query findPlaylist($title: String!)
{
  findPlaylist(title: $title)
  {
   id
   title
   creator
  }
}
`
export const GET_PLAYLIST_BY_ID = gql`
query getPlaylistById($var: String!)
{
  getPlaylistById(var: $var)
  {
   id
   title
   creator
   songs{
    title
    link
    platform
   }
  }
}
`

export const ADD_SONG = gql`

mutation addSong($playlistId: String, $title: String, $link: String, $platform: String )
{
  addSong(playlistId: $playlistId, title: $title, link: $link, platform: $platform)
  {
    
    title
    creator
    songs{
      title
      link
      platform
    }
  }
  
}
`

export const ALL_PLAYLISTS = gql`
query getAllPlaylists
{
  getAllPlaylists
  {
   id
   title
   creator
  }
}
`


export const PLAYLIST_ADDED =gql`
subscription{
  playlistAdded{
    ...PlaylistData
  }
  ${PLAYLIST_DATA}
}
`



