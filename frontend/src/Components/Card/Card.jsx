import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import { playSong, pauseSong } from '../../States/Actors/SongActor' 
import { useGlobalContext } from '../../States/Context'

const Card = ({ song, idx }) => {

  const { masterSong, isPlaying } = useSelector((state) => state.mainSong)
  const { resetEverything, setSongIdx } = useGlobalContext()
  const dispatch = useDispatch();

  const handlePlay = (song) => {
    setSongIdx(idx)
    if (isPlaying){
      masterSong.mp3.currentTime = 0;
      masterSong.mp3.pause();
      resetEverything()
    }
    dispatch(playSong(song))
  }
  const handlePause = () => {
    dispatch(pauseSong())
  }

  return (
    song && (
      <div className='card col-span-1 p-3 rounded-lg secondary_bg hover:bg-black/30'>
        {(masterSong.id === song.id && isPlaying) ? (<button onClick={handlePause}><img src={song.image} alt=""/></button>) : (<button onClick={() => handlePlay(song)}><img src={song.image} alt="" /></button>)}
        <h3 className='font-bold text-sm my-2'>{song.title}</h3>
        <p className='text-xs text-gray-300 my-1'>{song.artist}</p>
      </div>
      )
  )
}

export default Card