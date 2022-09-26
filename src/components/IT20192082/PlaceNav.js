import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <nav className='navbar'>
      <div className='nav-center'>
        <ul className='nav-links'>
          <li>
            <Link to='/'>home</Link>
          </li>
        </ul>
      </div>
    </nav>
  )
}