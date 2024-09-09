import React ,  { useState , useEffect } from 'react'
import { useDispatch } from "react-redux";
import { Footer , Header } from './components/index';
import  {login,logout}  from './store/authslice';
import './index.css';
import {fetchUserData} from './appwrite/auth';
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
function App() {
  const [loading , setloading] = useState(true)
  const dispatch = useDispatch()
  useEffect(()=>{
    fetchUserData()
    .then((userData)=>{
      console.log(userData)
      console.log(null == true)
      if(userData){
        console.log("user found")
        console.log({userData})
        dispatch(login({userData}))

        // agr niche vale k tarike se likha to authslice m status.userData  m data jayega hi nhii undefined ayega
        // dispatch(login(userData))
      
      }
      else{
        console.log("usernotfound")
        dispatch(logout())
      }
    })
    .finally(()=>setloading(false))
  },[])
  return (
    <div  >
    
    <Header></Header>
    <div className="min-h-screen">
    <Outlet/>
    </div>
    <ToastContainer 
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    <Footer></Footer>
    </div>
  ) 
}
export default App
