import {React,useContext} from "react";
import { BsFileEarmarkPost } from "react-icons/bs";
import { ImExit } from "react-icons/im";
import {useNavigate,Navigate} from "react-router-dom";
import {stateContext} from "../Context/stateContext"
import {signOutSuccess} from "../redux/reducers/userSlice"
import { useDispatch, useSelector } from 'react-redux';
import axios from "axios";
import { MdOutlineSettings } from "react-icons/md";
const HeaderToggleInfo = ({text}) => {
    const {setLogin,setToggleProfile} = useContext(stateContext);
    const {currentUser} = useSelector((state)=> state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate()
    const signOutUser = async (id) => {
        try {
          const response = await axios.delete(
            `http://localhost:8000/api/auth/signout/${id}`,
            {
              headers: {
                "Content-Type": "application/json",
              },
              withCredentials: true,
            }
          );
    
          if (response.data) {
            dispatch(signOutSuccess());
            setLogin(false);
            setToggleProfile(false);
            <Navigate to={"/login"} />;
          }
        } catch (error) {
          console.log(error);
        }
      };
    
  return (
    <div className="p-1 flex gap-4 items-center hover:bg-gray-200 dark:hover:bg-gray-500 rounded-md cursor-pointer">
      <div className=" w-10 h-10 flex justify-center items-center rounded-full dark:bg-gray-800 bg-gray-200">
      
      {
        text==="signout"?<ImExit className=" text-xl" />: text==="settings"?<MdOutlineSettings className=" text-xl"/>: <BsFileEarmarkPost className=" text-xl" />
      }  
      </div>
      {
        text==="signout"?
        <p className=" capitalize" onClick={()=> signOutUser(currentUser._id)}>{text}</p>: text==="settings"? <p className=" capitalize" onClick={()=> navigate("/setting")}>{text}</p>: <p>{text}</p>
      }
     
    </div>
  );
};

export default HeaderToggleInfo;
