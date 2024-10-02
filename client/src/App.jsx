import React from 'react'
import Header from './Components/Header'
import { Route, Routes } from 'react-router-dom'
import SignUp from './Components/SignUp'
import Login from './Components/Login'
import PrivateRoute from "./Components/PrivateRoute"
import Home from './Components/Home'
import Profile from './Components/Profile'
import UserPostProfile from './Components/UserPostProfile'

const App = () => {
  return (
    <>
    <Header/>
    <Routes>
      <Route path='/' element={<></>}/>
      <Route path='/signup' element={<SignUp/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route element={<PrivateRoute/>}>
               <Route path='/feed' element={<Home/>}/>
               <Route path='/setting' element={<Profile/>}/>
               <Route path='/userProfile/:userId' element={<UserPostProfile/>}/>
      </Route>
    </Routes>
    </>
  )
}

export default App