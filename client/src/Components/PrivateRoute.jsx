import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Outlet,Navigate } from 'react-router-dom';
import Cookies from "js-cookie"
import { signOutSuccess } from '../redux/reducers/userSlice';

const PrivateRoute = () => {

    const token = Cookies.get("token");
    const {currentUser} = useSelector((state)=> state.user);
 const dispatch = useDispatch();

    useEffect(()=>{

        if(!token){
            dispatch(signOutSuccess());
        }
    },[token])
 return(
    <>
    {
        currentUser?
        <Outlet/>:<Navigate to={"/login"}/>
    }
    </>
 )
}

export default PrivateRoute