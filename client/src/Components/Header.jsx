import React, { useContext, useEffect, useState } from "react";
import {
  HiMoon,
  HiSearch,
  HiChat,
  HiBell,
  HiQuestionMarkCircle,
  HiChevronDown,
  HiSun,
} from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { toggleTheme } from "../redux/reducers/themeSlice";
import { Button, TextInput } from "flowbite-react";
import { useLocation, useNavigate } from "react-router-dom";
import { stateContext } from "../Context/stateContext";
import HeaderToggleComponent from "./HeaderToggleComponent";

const Header = () => {

  const {login} = useContext(stateContext);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname;
  const { mode } = useSelector((state) => state.theme);
  const { currentUser } = useSelector((state) => state.user);
const [fname,setFname] = useState("")
  const dispatch = useDispatch();
 const {toggleProfile,setToggleProfile} = useContext(stateContext);
  useEffect(()=>{
    if(!currentUser){
      setToggleProfile(false);
    }else{

      setFname(`${currentUser.firstName} ${currentUser.lastName}`)
    }
  },[currentUser])

  return (
    <>
      <nav className="w-[100%] flex px-2 items-center gap-4 justify-between lg:px-8 md:px-12 h-[60px] shadow-lg">
        <div className="p-1 flex items-center gap-4">
          <p className=" text-2xl text-sky-500 font-bold cursor-pointer" onClick={()=> navigate("/feed")}>Sociopedia</p>
          <form action="" className=" hidden md:block  relative">
            <TextInput type="text" placeholder="Search..." />
            <HiSearch className="text-2xl absolute right-2 top-2 cursor-pointer" />
          </form>
        </div>

        {currentUser ? (
          <div className=" h-[inherit] flex text-2xl cursor-pointer md:gap-5  items-center gap-3 ">
            {mode === "light" ? (
              <HiMoon
                className=" hover:drop-shadow-sm "
                onClick={() => dispatch(toggleTheme())}
              />
            ) : (
              <HiSun
                className=" hover:text-orange-300"
                onClick={() => dispatch(toggleTheme())}
              />
            )}
            <HiChat />
            <HiBell />
            <HiQuestionMarkCircle />
            <div onMouseEnter={() => setToggleProfile(true)}  >

            <img src={currentUser.picturePath} className=" w-10 h-10 rounded-full" alt="" srcSet="" />
            </div>
          </div>
        ) : (
          <>
            <Button
              gradientDuoTone={"purpleToBlue"}
              outline
              onClick={() => navigate(path === "/login" ? "/signup" : "/login")}
            >
              {path === "/login" ? "Sign Up" : "Login"}
            </Button>
          </>
        )}
      </nav>
      {toggleProfile  && (
        <HeaderToggleComponent  />
      )}
    </>
  );
};

export default Header;
