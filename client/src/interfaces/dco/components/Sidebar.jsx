import React from 'react'
import "./styles/sidebar.css";
import {Link } from 'react-router-dom';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import  image1 from '../Components/images/DA2.png';

function Sidebar() {
  return (
    <div className='side2 d-flex sidebar flex-column flex-shrink-0'>
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
                    <Link to="Arf/" className='nav-link text-white'>
                        <i className='bi bi-file-earmark text-white fs-5 ms-2 me-3' />
                        <span>Receiving Form</span>
                    </Link>
                </li>
                <li className='nav-item '>                    
                    <Link to="RoaForm/" className='nav-link text-white'>
                        <i className='bi bi-file-earmark text-white fs-5 ms-2 me-3' />
                        <span>ROA Form</span>
                    </Link>
                </li>   
                <ul className='list-unstyled components'>
                    <li>
                        <a href='#homeSubmenu' data-bs-toggle='collapse' aria-expanded='false' className='dropdown-toggle ms-2 mt-2 text-white'>
                        <i className='bi bi-files text-white fs-5 me-3' />
                            Reports</a>

                        <ul className='collapse list-unstyled' id='homeSubmenu'>
                        <li>
                            <Link className="nav-link ms-5 text-white mt-2 " to="Walkin/">Walk-in</Link>
                        </li>
                        <li>
                            <Link className='nav-link ms-5 text-white' to="Regulatory/">Regulatory</Link>
                        </li>
                        <li>
                            <Link className='nav-link ms-5 text-white' to="CornProgram/">Corn Program</Link>
                        </li>
                        <li>
                            <Link className='nav-link ms-5 text-white' to="LGU/">LGU</Link>
                        </li>
                        <li>
                            <Link className='nav-link ms-5 text-white' to="Research/">Research</Link>
                        </li>
                        <li>
                            <Link className='nav-link ms-5 text-white' to="HVCrops/">High Value Crops</Link>
                        </li>
                        <li>
                            <Link className='nav-link ms-5 text-white' to="Rice Program/">Rice Program</Link>
                        </li>
                        <li>
                            <Link className='nav-link ms-5 text-white' to="Government Agency/">Goverment Agency</Link>
                        </li>
                        </ul>
                    </li>
                </ul>

                <ul className='list-unstyled components'>
                    <li>
                        <a href = '#roaList' data-bs-toggle ='collapse' aria-expanded =' false' className='dropdown-toggle ms-2 mt-2 text-white'>
                            ROA
                        </a>
                        <ul className='collapse list-unstyled' id='roaList'>
                            <li>
                                <Link className='nav-link ms-5 text-white mt-2' to = 'ForRelease/'> For Release </Link>
                            </li>
                            <li>
                                <Link className='nav-link ms-5 text-white mt-2' to = 'Released/'> Released </Link>
                            </li>
                        </ul>
                    </li>
                </ul>

            </ul>

        </div>
  )
}

export default Sidebar