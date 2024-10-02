import {React,useState,useEffect, useContext} from 'react'
import UserCard from './UserCard'
import ScrollFeedPosts from './ScrollFeedPosts'
import HomeRightComponent from './HomeRightComponent'
import { useDispatch } from 'react-redux'
import { setPosts } from '../redux/reducers/userSlice'
import axios from 'axios'
import { stateContext } from '../Context/stateContext'
const Home = () => {
  const dispatch = useDispatch();
  const {toggleProfile} = useContext(stateContext);

  const getAllPosts = async () =>{

    try {
      
      const response = await axios.get(`http://localhost:8000/api/post/getAllPosts`,{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      });
    
      if(response.data){
        dispatch(setPosts(response.data));
      }
    } catch (error) {
      console.log(error.response.data.message);
    }
  }

  useEffect(()=>{
     getAllPosts();
  },[])
  return (
    <div className={`flex flex-col lg:flex-row gap-8 mt-2 mx-2 pb-4 md:mx-12 lg:gap-5 lg:mt-4 lg:mx-8 min-h-screen ${toggleProfile?"blur-sm":""}`}>
      <UserCard/>
      <ScrollFeedPosts/>
      <HomeRightComponent/>
    </div>
  )
}

export default Home