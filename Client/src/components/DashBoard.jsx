import React, { useEffect, useState } from 'react'
import { from, useQuery, useSubscription, useLazyQuery } from '@apollo/client'
import {ME, FIND_USER, PLAYLIST_ADDED, ADD_PLAYLIST} from '../queries'

import CreatePlForm from './CreatePlForm'
import  List from './List'
import '../styles/Playlist.css'
import PlaylistForm from './PlaylistForm'

const DashBoard = ({userId}) => {
  const [form, setForm] = useState(false)
  const [list, setList] = useState([])

  

  const [findUser,result] = useLazyQuery(FIND_USER, 
    {
      onCompleted: (data)=> setList(data.findUser.playlists)
    })

  const updateForm=()=>{
    console.log("update form called, toggling values") 
    setForm(false)
  }
  
  console.log("stringg ", typeof(userId),userId )
  const{loading, error, data} = useQuery(FIND_USER,{ variables: {id : userId} } )

const updateCount=(num)=>
  {
  console.log("setting new listusing count : ", num)
  setList(num)
  }

  useEffect(() => {
    if (data) {
      console.log("finduser sucessfull", data.findUser)
      setList(data.findUser.playlists);
    }
  }, [data]);
  if(loading) return <>loadinggg....</>
  if(error) return <>error is  : {error.message}</>
  

  console.log("finduser ", data.findUser, "list is noww: \n",list)
  return (
    <>
    <h1>DashBoard for {data.findUser.username} </h1>
   {
    
    form ? <div>
    <button onClick={()=>setForm(!form)}>close</button>
    <CreatePlForm creator ={data.findUser} 
    setForm={()=>updateForm()} 
    setCount ={(val)=>updateCount(val)}
    form={form}
    list = {list}
    // UpdateList ={()=>UpdateList}
    
    />
    </div>
    :<button onClick={()=>setForm(!form)}>create new </button>
   }
 
   {
    list.map((pl)=> <List key={pl} id={pl} user={userId}/>)
   }

<PlaylistForm />
    </>
  )
}

export default DashBoard