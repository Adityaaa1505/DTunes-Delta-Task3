import React from 'react'
import Sidebar from '../Components/Sidebar/Sidebar'

const Layout = ({children}) => {
  return (
    <div className='flex gap-3'>
      <Sidebar />
      <div className='w-3/4'>{children}</div>
    </div>
  )
}

export default Layout