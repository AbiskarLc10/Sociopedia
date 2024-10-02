import React, { useState,useEffect } from "react";
import FriendLists from "./FriendLists";
import { useSelector } from "react-redux";
import axios from "axios";

const HomeRightComponent = () => {

  const {currentUser} = useSelector((state)=>state.user);
  const [friends,setFriends] = useState([]);

  const getUserFriends = async () =>{

    try {
      
      const response = await axios.get(`http://localhost:8000/api/user/${currentUser._id}/friends`,{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      })

      if(response.data){
        setFriends(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(()=>{

    getUserFriends();
  },[])
  return (
    <div className=" flex flex-col text-gray-700 dark:text-gray-200 gap-4 lg:gap-10 items-center ">
      <div className=" flex flex-col gap-4 border-gray-600 border-2 rounded-lg  shadow-lg p-4 w-full lg:w-[290px]">
        <div className=" flex justify-between">
          <p className=" text-sm font-bold">Sponsored</p>
          <p className=" text-[12px]">Create Ad</p>
        </div>
        <img
          className=" w-full h-[300px] lg:h-[200px] rounded-lg"
          src="data:image/png;base64,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"
          alt=""
        />
        <div className=" flex justify-between">
          <p className=" lg:text-sm font-bold">Abiskar Sports</p>
          <p className=" text-[12px]">abisports@gmail.com</p>
        </div>
        <p className=" text-[12px] text-start">you are welcome to the sports center of Abiskar. You can get every sports products you want </p>
      </div>
      <div className=" flex flex-col gap-4 border-gray-600 border-2 rounded-lg  shadow-lg p-4 w-full lg:w-[290px]">
           <p className=" text-md font-bold">Friend Lists</p>
           {
            friends.map((friend,index)=>{
              return  <FriendLists key={friend._id} friend={friend}/>
            })
           }
          
      </div>
    </div>
  );
};

export default HomeRightComponent;
