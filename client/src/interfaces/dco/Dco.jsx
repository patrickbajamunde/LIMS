import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Outlet} from 'react-router-dom';
import './dco.css'
import Header from './components/Header'
import Sidebar from './components/Sidebar';

function Dco() {
  return (
    <div className='app-container'>
        <div className='header'>
            <Header />
        </div>
        <div>
            <Sidebar />
        </div>
        <div className='home' >
          <Outlet />
        </div>
    </div>
  )
}

export default Dco