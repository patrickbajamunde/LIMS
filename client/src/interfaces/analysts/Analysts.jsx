import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Outlet} from 'react-router-dom';
import './Analysts.css'
import Header from './components/Header'
import Sidebar from '../Analysts/Components/Sidebar'

function Analysts() {
  return (
    <div className='app-container'>
        <div className='header'>
            <Header />
        </div>
        <div>
            <Sidebar />
        </div>
        <div className='home'>
            <Outlet/>
        </div>
    </div>
  )
}

export default Analysts