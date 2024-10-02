import React, { useEffect, useState } from "react";
import { AiOutlineComment } from "react-icons/ai";
import { FaHeart, FaRegHeart, FaShare, FaUserEdit } from "react-icons/fa";
import { HiUserAdd, HiUserRemove } from "react-icons/hi";
import axios from "axios";
import { signInSuccess } from "../redux/reducers/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";
const PostCard = ({ post }) => {
  const [owner, setOwner] = useState(null);
  const { currentUser } = useSelector((state) => state.user);
  const [showmore, setShowMore] = useState(false);
  const [liked, setLiked] = useState(false);
  const [click,setClick] = useState(false);
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const getPostOwner = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/post/${post.userId}/getUser`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        setOwner(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleAddFriend = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/user/${currentUser._id}/${post.userId}`,null,
        {
          withCredentials:true
        }
      );

      if (response.data) {
        console.log(response.data);
        setClick(false)
      }
    } catch (error) {
      console.log(error);
      setClick(false);
    }
  };
  
  const updateCurrentUser=async () =>{

    try {

      const response = await axios.get(`http://localhost:8000/api/user/getUser/${currentUser._id}`,{
        withCredentials:true,
        headers:{
          "Content-Type":"application/json"
        }
      })

      if(response.data){
        dispatch(signInSuccess(response.data));
      }
      
    } catch (error) {
       console.log(error);
    }
  }
  useEffect(()=>{
  
    updateCurrentUser();
    getPostOwner();
  },[click])
  const { comments, description, postPicturePath, likes } = post;
  const likesCount = Object.keys(likes).length;
  return (
    <div className=" flex flex-col gap-2 border-2 border-gray-700 p-2 rounded-md">
      <div className=" flex items-center gap-2 cursor-pointer" onClick={()=> navigate(`/userProfile/${post.userId}`)}>
        <img
          className=" w-10 h-10 rounded-full"
          src={owner ? owner.picturePath : ""}
          alt=""
        />
        <div className=" flex flex-1 justify-between items-center">
          <div className=" flex flex-col justify-center">
            <p className=" text-sm">
              {owner ? `${owner.firstName} ${owner.lastName}` : "Unknown"}
            </p>
            <p className=" text-[9px]">
              {owner ? owner.friends.length : 0} friends
            </p>
          </div>
          {currentUser._id === post.userId ? (
            <>
              <FaUserEdit className=" text-2xl text-teal-400 cursor-pointer " />
            </>
          ) : currentUser.friends.includes(post.userId) ? (
            <HiUserRemove onClick={()=>{
                           setClick(true)
                           handleAddFriend();

            }} className=" text-2xl text-red-400 cursor-pointer" />
          ) : (
            <HiUserAdd  onClick={()=>{
           setClick(true)
           handleAddFriend();
            }}className=" text-2xl text-teal-400 cursor-pointer" />
          )}
        </div>
      </div>
      {description.length > 80 && !showmore ? (
        <p className=" text-[16px]">
          {description.slice(0, 80)}{" "}
          <span
            className=" ml-[1px] text-[14px] opacity-65 cursor-pointer "
            onClick={() => setShowMore(true)}
          >
            show more...
          </span>{" "}
        </p>
      ) : (
        <p className=" text-[16px]">{description}</p>
      )}
      <img
        className="w-full h-[350px]  bg-contain rounded-lg"
        src={postPicturePath}
        alt=""
      />

      <hr />
      <div className=" flex px-2 justify-between">
        <div className=" flex items-center gap-1 cursor-pointer">
          {liked ? (
            <FaHeart
              className=" text-xl text-red-600"
              onClick={() => setLiked(liked ? false : true)}
            />
          ) : (
            <FaRegHeart
              className="text-xl  text-red-700"
              onClick={() => setLiked(liked ? false : true)}
            />
          )}
          <p className=" text-[16px]">{likesCount}</p>
        </div>
        <div className=" flex items-center gap-1 cursor-pointer">
          <AiOutlineComment className="text-xl" />
          <p className=" text-[16px]">{comments.length}</p>
        </div>
        <div className=" flex items-center gap-1 cursor-pointer">
          <FaShare className="text-xl" />
          <p className=" text-[16px]">{likesCount}</p>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
