import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import axios from "axios";
import PostCard from './PostCard';
const UserPostProfile = () => {


  const [user,setUser]  = useState(null)
  const [posts,setPosts] = useState([]);
    const {userId} = useParams();
    console.log(userId);


    // Getting the posts of the users from the user id
    const getUserPosts = async () =>{
      try {
        
        const response = await axios.get(`http://localhost:8000/api/post/${userId}/posts`,
          {
            withCredentials:true,
            headers:{
              "Content-Type":"application/json"
            }
          }
        )

        if(response.data){
          console.log(response.data)
          setPosts(response.data);
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    }

    // getting user details axios request
    const getUserFromPost = async() =>{

      try {
        
        const response = await axios.get(`http://localhost:8000/api/post/${userId}/getUser`,{
          withCredentials:true,
          headers:{
            "Content-Type":"application/json"
          }
        })

        if(response.data){

          console.log(response.data);
          setUser(response.data)
        }
      } catch (error) {
        console.log(error.response.data.message)
      }
    }

    useEffect(()=>{
   getUserFromPost();
   getUserPosts()
    },[])
  return (
    <div className='min-h-screen lg:max-w-4xl flex flex-col lg:mx-auto pb-11 mt-2 items-center'>
      <div className='relative shrink-0 w-full'>

         <img src={user?user.picturePath:""} className=' w-full h-[350px] bg-cover  lg:h-[400px] lg:bg-contain rounded-lg' alt="" />
         <div className=' absolute bottom-[-60px] left-5 w-40 h-40 border-gray-600 border-2 rounded-full flex justify-center items-center'>
         <img src={user?user.picturePath:""} className=' w-36 h-36 rounded-full ' alt="" />
         </div>
        
      </div>
      <div className=' flex justify-start p-4 mt-16 w-full flex-col'>
        <p className=' text-2xl text-start font-bold'>{user?`${user.firstName} ${user.lastName}`:""}</p>
        <p>{user?user.friends.length:0} <span className=' text-gray-400'>friends</span></p>
      </div>
      <hr  className=' border-[1px] border-gray-200 w-full'/>
      <div>
        <p className=' text-2xl font-bold'>User Posts</p>
         <div className=' mt-3 p-2  flex flex-col gap-3'>
           {
            posts.map((post)=>{

              return <PostCard post={post}/>

            })
           }
         </div>
      </div>
    </div>
  )
}

export default UserPostProfile