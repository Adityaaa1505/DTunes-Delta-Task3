import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineHeart, AiOutlineStepBackward, AiOutlineStepForward } from "react-icons/ai"
import { FaPause, FaPlay } from 'react-icons/fa'
import { pauseMaster, playMaster, playSong } from '../../States/Actors/SongActor'
import { useGlobalContext } from "../../States/Context"
import "./SongBar.css"
import { songs } from '../Home/Home'

const SongBar = () => {
    const { masterSong, isPlaying } = useSelector((state) => state.mainSong)
    const { progress, setProgress, resetEverything, currTime, setCurrTime, duration, setDuration, songIdx, setSongIdx } = useGlobalContext()
    const dispatch = useDispatch()

    const handleMaster = () => {
        if (isPlaying) {
            dispatch(pauseMaster())
        }
        else {
            dispatch(playMaster())
        }
    }

    const addToLiked = async () => {
        let data = JSON.stringify({song_mp3:masterSong.mp3.src, song_title:masterSong.title, song_artist:masterSong.artist, song_thumbnail:masterSong.image})
        const res = await fetch("http://localhost:5000/api/playlist/like", {
            method:"POST",
            headers:{
                "Content-Type":"application/json",
                token:localStorage.getItem("token")
            },
            body:data,
        })
        let d = await res.json()
        console.log(d)
    }

    useEffect(() => {
        if (masterSong.mp3) {
            setDuration(formatTime(masterSong?.mp3?.duration))
            if (isPlaying) {
                masterSong?.mp3?.play()
            }
            else {
                masterSong?.mp3?.pause()
            }
        }
        if (isPlaying) {
            setInterval(() => {
                if (progress === 100){
                    dispatch(pauseMaster())
                    resetEverything()
                }
                else {
                    setProgress(Math.round((masterSong.mp3.currentTime / masterSong.mp3.duration) * 100))
                    setCurrTime(formatTime(masterSong.mp3.currentTime))
                }
            }, 1000)
        }
    }, [masterSong, isPlaying])

    const changeProgress = (e) => {
        setProgress(e.target.value)
        masterSong.mp3.currentTime = e.target.value * masterSong.mp3.duration /100
    }

    const formatTime = (duration) => {
        let min = Math.round(Math.floor(duration / 60))
        let sec = Math.round(duration % 60)
        return `${min < 10 ? "0" + min : min}:${sec < 10 ? "0" + sec: sec}`
    }

    const forwardSong = () => {
        if (songIdx >= 12-1 ) return
        if (masterSong.mp3){
            masterSong?.mp3?.pause()
            masterSong.mp3.currentTime = 0
        }
        resetEverything()
        setSongIdx(prevState => prevState + 1)
        dispatch(playSong(songs[songIdx+1]))
    }

    const backwardSong = () => {
        if (songIdx <= 0) return
        if (masterSong.mp3){
            masterSong?.mp3?.pause()
            masterSong.mp3.currentTime = 0
        }
        resetEverything()
        setSongIdx(prevState => prevState - 1)
        dispatch(playSong(songs[songIdx-1]))
    }

    return (
        <div className='fixed w-full flex justify-between items-center bottom-0 left-0 h-20 bg-black'>
            <div className="mx-3 w-1/5">
                <div className="flex items-center gap-1">
                    <img src = {masterSong?.image} alt="" className='h-16' />
                    <div className='px-3 w-3/4'>
                        <h3 className='font-semibold'>{masterSong?.title || "Pran"}</h3>
                        <span className='text-xs'>{masterSong?.artist || "Ritviz"}</span>
                    </div>
                    <div className='flex align-center'>
                        <button className=''>
                            <AiOutlineHeart  onClick={addToLiked} className='cursor-pointer hover:text-red-400'/>
                        </button>
                    </div>
                </div>
            </div>

            <div className='w-5/12'>
                <div className='flex gap-3 justify-center mb-1 items-center'>
                    <AiOutlineStepBackward className='text-xl' onClick={backwardSong}/>
                    {isPlaying ? (<button onClick={handleMaster} className='bg-white text-black rounded-[50%] p-2'><FaPause className='text-s'/></button>) : (<button onClick={handleMaster} className='bg-white text-black rounded-[50%] p-2'><FaPlay className='text-s'/></button>)}
                    <AiOutlineStepForward className='text-xl' onClick={forwardSong}/>
                </div>
                <div className='flex gap-1 items-center'>
                    <span className='text-xs'>{currTime}</span>
        
                    <input type="range" disabled={!masterSong.mp3} min={0} max={100} value={progress} onChange={changeProgress} className='w-full block' />
                    
                    <span className='text-xs'>{duration}</span>
                </div>
            </div>

            <div className='w-2/12 flex items-center gap-1'>
                {/* <HiSpeakerWave/>
                <HiSpeakerXMark/>
                <input type="range" min={0} max={100} className='w-3/5 block' /> */}
            </div>
        </div>
    )
}

export default SongBar