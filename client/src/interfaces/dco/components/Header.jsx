import React from 'react'
import './styles/header.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import DcoNav from '../components/DcoNav'

function Header() {
  return (
    <div className='header'>
        <DcoNav />
    </div>
  )
}

export default Header