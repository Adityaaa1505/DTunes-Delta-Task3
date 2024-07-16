import React, { useState } from 'react'
import { FaAngleLeft, FaAngleRight, FaUser } from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { songs } from "../Home/Home"
import { useGlobalContext } from "../../States/Context"
import { logOutUser } from '../../States/Actors/UserActor'

const NavBar = () => {
    const { user, isAuthenticated } = useSelector((state) => state.account)
    const location = useLocation()
    const [query, setQuery] = useState("")
    const { setFilteredSongs } = useGlobalContext()
    const filterSongs = (e) => {
        setQuery(e.target.value)
        const fil = songs.filter((song) => {
            if (song.title.toLowerCase().includes(e.target.value.toLowerCase()) || song.artist.toLowerCase().includes(e.target.value.toLowerCase()))
                return song
        })
        setFilteredSongs(fil)
    }

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutUser = (e) => {
        localStorage.removeItem("token")
        navigate("/login")
        dispatch(logOutUser())
    }

    return (
        <div className='flex justify-between items-center mx-3'>
            <div className='w-fit justify-between items-center flex mt-2'>
                <span className='mx-2 font-bold'><FaAngleLeft /></span>
                <span className='mx-2 font-bold'><FaAngleRight /></span>
                {location.pathname === "/search" &&
                    <div className='w-fit flex'>
                        <input type="text" value={query} onChange={filterSongs} placeholder='Search Songs/Artists' autoComplete='off' className=' text-s bg-[#121212] rounded-full block mx-auto pl-2 pr-10 my-1 py-3' />
                    </div>
                }
            </div>
            <div className='flex justify-between ut-4 my-2 gap-4'>{console.log(isAuthenticated)}
                {!isAuthenticated ? (<div className='flex items-center justify-between gap-3 font-bold'><Link to={'/Signup'} className='bg-black rounded-full text-white font-bold px-5 py-2'>Sign Up</Link>
                    <Link to={'/login'} className='bg-white rounded-full text-black font-bold px-5 py-2'>Log In</Link></div>) : (<div className='flex items-center justify-between gap-3 font-bold'><FaUser />{user.username}<button onClick={logoutUser} className='bg-white rounded-full text-black font-bold px-5 py-2'>Log Out</button></div>)}
            </div>
        </div>
    )
}

export default NavBar


