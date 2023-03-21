import {gql} from '@apollo/client'


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