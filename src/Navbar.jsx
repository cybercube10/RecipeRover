import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = () => {
  return (

   <div className="h-20 w-full flex items-center justify-around">
    <ul className='flex items-center justify-between gap-4'>
      <Link to='/'>Home</Link>
      <Link to='/Create'>Create</Link>
      <Link to='/Explore'>Explore</Link>
      <Link to='/favs'><i class="ri-heart-line"></i></Link>
    </ul>
   </div>
 
  )
}

export default Navbar
