import React, { useEffect } from 'react'
import Layout from '../../Layout/Layout'
import Card from '../Card/Card'
import SongBar from '../SongBar/SongBar';
import NavBar from '../NavBar/NavBar';
import { useGlobalContext } from '../../States/Context';

export const songs = [
  {
    id: Math.random() * Date.now(),
    title: "Riha",
    artist: "Anuv Jain",
    mp3: new Audio("/assets/mp3/Riha.mp3"),
    image:"/assets/Riha.jpeg"
  },
  {
    id: Math.random() * Date.now(),
    title: "Baaraat",
    artist: "Ritviz",
    mp3: new Audio("/assets/mp3/Baaraat.mp3"),
    image:"/assets/Baaraat.jpeg"
  },
  {
    id: Math.random() * Date.now(),
    title: "You Belong With Me",
    artist: "Taylor Swift",
    mp3: new Audio("/assets/mp3/You Belong With Me.mp3"),
    image:"/assets/You Belong With Me.jpeg"
  },
  {
    id: Math.random() * Date.now(),
    title: "Bekhayali",
    artist: "Arjit Singh",
    mp3: new Audio("/assets/mp3/Bekhayali.mp3"),
  image:"/assets/Bekhayali.jpeg"
  },
  {
    id: Math.random() * Date.now(),
    title: "Gul",
    artist: "Anuv Jain",
    mp3: new Audio("/assets/mp3/Gul.mp3"),
    image:"/assets/Gul.jpeg"
  },
  {
    id: Math.random() * Date.now(),
    title: "Liggi",
    artist: "Ritviz",
    mp3: new Audio("/assets/mp3/Liggi.mp3"),
    image:"assets/Liggi.jpeg"
  },
  {
    id: Math.random() * Date.now(),
    title: "Love Story",
    artist: "Taylor Swift",
    mp3: new Audio("/assets/mp3/Love Story.mp3"),
    image:"/assets/Love Story.jpeg"
  },
  {
    id: Math.random() * Date.now(),
    title: "Tum Hi Ho",
    artist: "Arjit Singh",
    mp3: new Audio("/assets/mp3/Tum Hi Ho.mp3"),
    image:"/assets/Tum Hi Ho.jpeg"
  },
  {
    id: Math.random() * Date.now(),
    title: "Mishri",
    artist: "Anuv Jain",
    mp3: new Audio("/assets/mp3/Mishri.mp3"),
    image:"/assets/Mishri.jpeg"
  },
  {
    id: Math.random() * Date.now(),
    title: "Khamoshi",
    artist: "Ritviz",
    mp3: new Audio("/assets/mp3/Khamoshi.mp3"),
    image:"/assets/Khamoshi.jpeg"
  },
  {
    id: Math.random() * Date.now(),
    title: "Willow",
    artist: "Taylor Swift",
    mp3: new Audio("/assets/mp3/Willow.mp3"),
    image:"/assets/Willow.jpeg"
  },
  {
    id: Math.random() * Date.now(),
    title: "Rihaa",
    artist: "Arjit Singh",
    mp3: new Audio("/assets/mp3/Rihaa.mp3"),
    image:"/assets/Rihaa.jpeg"
  }
]

const Home = () => {
  const {getUser} = useGlobalContext()
  useEffect(() => {
    getUser()
  }, [])
  return <Layout>
    <NavBar />
    <div className='grid tertiary_bg p-4  my-5 mb-10 pb-10 grid-cols-5 gap-6'>
      {songs.map((song, i) => {
        return <Card key={song.id} idx={i} song={song} />
      })}
    </div>
    <SongBar />
  </Layout>
}

export default Home