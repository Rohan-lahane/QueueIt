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
query findUser($id: String!)
{  
  findUser(id: $id){
      username
      id
  }     
}
`