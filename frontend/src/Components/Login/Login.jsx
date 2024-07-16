import React, { useEffect, useState } from 'react'
import "./Login.css"
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useDispatch, useSelector } from "react-redux" 
import { userActor } from "../../States/Actors/UserActor"
const Login = () => {
  const dispatch = useDispatch()
  const { user, isAuthenticated } = useSelector((state) => state.account)
  const [userDetails, setUserDetails] = useState({ username: "", password: ""})
  const navigate = useNavigate()

  const loginUser = async (e) => {
    e.preventDefault()
    const {password, username} = userDetails
    let d = JSON.stringify({password, username})
    const res = await fetch("http://localhost:5000/api/user/login", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: d
    })

    const data = await res.json()
    if (data.success){
      toast.success(data.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
        localStorage.setItem("token", JSON.stringify(data.token))
        dispatch(userActor(data.user))
        navigate("/")
    }
    else{
      toast.error(data.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "dark",
        });
    }
  }

  const onChange = (e) => {
    setUserDetails({...userDetails, [e.target.name]:e.target.value})
  }

  useEffect(() => {
    if (isAuthenticated){
      navigate("/")
    }
  }, [])

  return (
    <>
      <header>
        <div className='w-fit mx-auto'>
          <Link to={"/"}>
          <img width={250} src='/assets/Logo.png'></img>
        </Link>
        </div>
      </header>

      <div className="container">
        <div className=' bg-black w-1/2 mx-auto py-10'>
          <h1 className='text-center font-bold text-3xl my-10'>Login In to DTunes</h1>
          <form onSubmit={loginUser} className='my-10 w-fit mx-auto'>

            <div className='w-fit my-5'>
              <label htmlFor="username" className='text-xs'>Email or Username</label>
              <input type="text" name='username' value={userDetails.username} onChange={onChange} placeholder='Email or Username' className='text-s bg-[#121212] border border-gray block mx-auto pl-2 pr-10 my-1 py-3'/>
            </div>

            <div className='w-fit my-5'>
              <label htmlFor="password" className='text-xs'>Password</label>
              <input type="text" id="password" name='password' value={userDetails.password} onChange={onChange} placeholder='Password' className='text-s bg-[#121212] border border-gray block mx-auto pl-2 pr-10 my-1 py-3'/>
            </div>

            <div className='w-fit my-8'>
              <input type="type" value="Log In" readOnly onClick={loginUser} className='text-center cursor-pointer text-black bg-green-400 rounded-full border border-black block mx-auto px-6 my-1 py-3'/>
            </div>

            <div className='my-1 mt-3'>
              <Link to={"/password/forgot"} className='hover:underline'>Forgot your Password?</Link>
            </div>

            <div>Don't have an Account? <Link to={"/signup"} className='hover:underline'>Sign Up</Link>
            </div>

          </form>
        </div>
      </div>
    </>
  )
}

export default Login