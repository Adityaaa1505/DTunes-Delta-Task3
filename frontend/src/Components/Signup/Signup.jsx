import React, { useEffect, useState } from 'react'
import "./Signup.css" 
import { Link, useNavigate } from 'react-router-dom' 
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';

const Signup = () => {

  const [userDetails, setUserDetails] = useState({ username: "",  email: "", password: ""})
  const navigate = useNavigate()
  const isAuthenticated = useSelector((state) => state.account)

  const registerUser = async (e) => {
    e.preventDefault()
    const {email, password, username} = userDetails
    let d = JSON.stringify({email, password, username})
    const res = await fetch("http://localhost:5000/api/user/register", {
      method: "POST",
      headers: {"Content-Type":"application/json"},
      body: d
    })

    const data = await res.json()
    if (data.success){
      setUserDetails(({ username: "",  email: "", password: ""}))
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
        navigate("/")
        localStorage.setItem("token", JSON.stringify(data.token))
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

  // useEffect(() => {
  //   if (isAuthenticated){
  //     navigate("/")
  //   }
  // }, [])

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
          <h1 className='text-center font-bold text-3xl mt-10'>Sign Up to DTunes</h1>
          <h1 className='text-center font-bold text-l'>Pssst... It's Free</h1>
          <form onSubmit={registerUser} className='mt-5 w-fit mx-auto'>

            <div className='w-fit'>
              <label htmlFor="email" className='text-xs'>What's your Email</label>
              <input type="text" id="email" name='email' value={userDetails.email} onChange={onChange} placeholder='Enter your Email' className='text-s bg-[#121212] border border-gray block mx-auto pl-2 pr-10 my-1 py-3'/>
            </div>

            <div className='w-fit mt-5'>
              <label htmlFor="password" className='text-xs'>Create your Password</label>
              <input type="text" id="password" name='password' value={userDetails.password} onChange={onChange} placeholder='Create your Password' className='text-s bg-[#121212] border border-gray block mx-auto pl-2 pr-10 my-1 py-3'/>
            </div>

            <div className='w-fit mt-5'>
              <label htmlFor="username" className='text-xs'>What should we call you?</label>
              <input type="text" id="username" name='username' value={userDetails.username} onChange={onChange} placeholder='Enter a Profile Name' className='text-s bg-[#121212] border border-gray block mx-auto pl-2 pr-10 my-1 py-3'/>
            </div>

            <div className='w-fit mt-5 mb-1'>
              <input type="type" onClick={registerUser} value={"Sign Up"} readOnly className='text-center cursor-pointer text-black bg-green-400 rounded-full border border-black block mx-auto px-6 my-1 py-3'/>
            </div>
            <div>Already have an Account? <Link to={"/login"} className='text-green-400 hover:underline'>Log In</Link></div>

          </form>
        </div>
      </div>
    </>
  )
}

export default Signup