import React from 'react'
import Layout from '../../Layout/Layout'
import NavBar from '../NavBar/NavBar'
import { useGlobalContext } from '../../States/Context'
import Card  from "../Card/Card"
import SongBar from '../SongBar/SongBar'

const Search = () => {
  const { filteredSongs } = useGlobalContext()
  return (
    <Layout>
        <NavBar/>
        {(filteredSongs?.length > 0) ? <div className='grid tertiary_bg p-4  my-5 mb-10 pb-10 grid-cols-5 gap-6'>
      {filteredSongs.map((song, i) => {
        return <Card key={song.id} idx={i} song={song} />
      })}
    </div> : (<div/>)}
      <SongBar/>
    </Layout>
  )
}

export default Search