import {React,useState,useEffect }from "react";
import { HiUserAdd, HiUserRemove } from "react-icons/hi";
import { useSelector } from "react-redux";
import axios from "axios";
import { signInSuccess } from "../redux/reducers/userSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const FriendLists = ({ friend }) => {
  const [click, setClick] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);
  const updateCurrentUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/user/getUser/${currentUser._id}`,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data) {
        dispatch(signInSuccess(response.data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handleAddFriend = async () => {
    try {
      const response = await axios.patch(
        `http://localhost:8000/api/user/${currentUser._id}/${friend._id}`,
        null,
        {
          withCredentials: true,
        }
      );

      if (response.data) {
        console.log(response.data);
        setClick(false);
      }
    } catch (error) {
      console.log(error);
      setClick(false);
    }
  };

  useEffect(()=>{
    updateCurrentUser();
    
  },[click])
  return (
    <div className=" flex items-center gap-2 mb-2  cursor-pointer"  onClick={()=> navigate(`/userProfile/${friend._id}`)}>
      <img
        className=" w-10 h-10 rounded-full"
        src={friend.picturePath}
        alt=""
      />
      <div className=" flex flex-1 justify-between items-center">
        <div className=" flex flex-col justify-center">
          <p className=" text-md">{`${friend.firstName} ${friend.lastName}`}</p>
          <p className=" text-xs">{}</p>
        </div>
        {currentUser.friends.includes(friend._id) ? (
          <HiUserRemove
            className="cursor-pointer text-2xl text-red-600"
            onClick={() => {
              setClick(true);
              handleAddFriend();
            }}
          />
        ) : (
          <HiUserAdd
            className="cursor-pointer text-2xl"
            onClick={() => {
              setClick(true);
              handleAddFriend();
            }}
          />
        )}
      </div>
    </div>
  );
};

export default FriendLists;
