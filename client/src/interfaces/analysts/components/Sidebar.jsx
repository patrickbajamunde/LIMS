import React from 'react'
import "./styles/Sidebar.css"
import {Link } from 'react-router-dom';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import  image1 from '../Components/images/DA2.png';

function Sidebar() {
  return (
    <div className='side d-flex sidebar flex-column flex-shrink-0'>
            <ul className='components nav nav-pills flex-column mb-auto px-0 mt-3'> 
                <div>
                    <img src={image1} alt="description" className='image-style'/>
                </div>
                <li className='nav-item '>                    
                    <Link to="Home" className='nav-link text-white'>
                    <i className='bi bi-house text-white fs-5 ms-2 me-2'/> 
                    <span className='ms-2'>Home</span>
                    </Link>
                </li>
                
                <li className='nav-item '>                    
                    <Link to="Report" className='nav-link text-white'>
                        <i className='bi bi-file-earmark text-white fs-5 ms-2 me-3' />
                        <span>Test Reports</span>
                    </Link>
                </li>
                <li className='nav-item '>                    
                    <Link to="Roa" className='nav-link text-white'>
                        <i className='bi bi-file-earmark text-white fs-5 ms-2 me-3' />
                        <span>ROA</span>
                    </Link>
                </li>
                <li className='nav-item '>                    
                    <Link to="Analysis" className='nav-link text-white'>
                        <i className='bi bi-file-earmark text-white fs-5 ms-2 me-3' />
                        <span>Analysis</span>
                    </Link>
                </li>

                

            </ul>

        </div>
  )
}

export default Sidebar