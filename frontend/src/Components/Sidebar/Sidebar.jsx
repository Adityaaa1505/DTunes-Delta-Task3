import React, { useEffect, useState } from 'react'
import { BiLibrary, BiSolidHome } from "react-icons/bi"
import { FiSearch } from "react-icons/fi"
import { FaHeart, FaPlus } from "react-icons/fa"
import { Link } from 'react-router-dom'

const Sidebar = () => {

  const [playlists, setPlaylists] = useState([])

  const getPlaylists = async () => {
    const res = await fetch("http://localhost:5000/api/playlist", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
    let d = await res.json()
    console.log(d)
    setPlaylists(d.playlists)
  }

  useEffect(() => {
    getPlaylists()
  }, [])

  return (
    <div className='w-1/4 sidebar h-screen'>

      <div className='logo w-[36%] mx-auto'>
        <img src="assets/Logo.png" alt="" />
      </div>

      <div className='nav secondary_bg rounded-lg px-4 py-2'>
        <Link to="/" className='flex items-center gap-4'>
          <BiSolidHome className='font-bold' />
          <span>Home</span>
        </Link>
        <Link to="/search" className='flex mt-4 items-center gap-4'>
          <FiSearch className='font-bold' />
          <span>Search</span>
        </Link>
      </div>

      <div className='your_library flex flex-col my-2 secondary_bg rounded-lg px-4 py-2'>
        <div className='flex justify-between items-center gap-4'>
          <div className='flex items-center gap-4'>
            <BiLibrary className='font-bold' />
            <span>Your Library</span>
          </div>
          <button className='hover:bg-black/55 rounded-[50%] p-2'>
            <FaPlus className='font-bold' />
          </button>
        </div>
        <div>
          {playlists.map(p => {
            return <li key={p._id} className='flex items-center my-3'>
              <img src="likedPlaylist.png" className='mx-3'/>
              <h3 className='font-semibold mx-1'>{p.title}</h3>
              <div className='mx-1 text-white/60'>{p.songs.length}</div>
            </li>
          })}
        </div>
        <div className='flex justify-between ut-4 mt-10 mb-5 gap-4'>
          <Link to={"/login"} className='bg-white rounded-full text-black font-bold px-5 py-2'>Create Playlist</Link>
        </div>
      </div>

      <div className='w-fit bar text-center px-4 py-2'>
        Made with ❤️ by Aditya
      </div>

    </div>
  )
}

export default Sidebar