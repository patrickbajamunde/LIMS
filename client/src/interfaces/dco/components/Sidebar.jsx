import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom';
import './styles/sidebar.css';
import image1 from '../Components/images/DA2.png';

function Sidebar() {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    const handleLogout = () => {
        fetch('http://localhost:8001/api/auth/logout', {
            method: 'POST',
            credentials: 'include',
        })
            .then(res => res.json())
            .then(data => {
                if (data.success) {
                    setUser(null)
                    navigate('/') // Redirect to login page on successful logout
                }
            })
    }

    return (
        <div>
            <div className={`text-white position-fixed top-0 start-0 h-100 d-flex flex-column`}
                style={{ width: '230px', zIndex: 1000, backgroundColor: '#38406eff' }}>

                {/* Header Section */}
                <div className="pt-1 border-bottom mx-2 mb-2">
                    <div className='row justify-content-center'>
                        <div className="col-2 me-2">
                            <img src={image1} alt="description" className='image-style' />
                        </div>
                        <div className="col d-flex justify-items-center mb-2 ">
                            <span className='fw-bold fs-3'>ILMS</span>
                        </div>
                    </div>
                </div>

                {/* Scrollable Navigation Section */}
                <div className="flex-grow-1 overflow-auto px-3 sidebar-scroll" style={{ paddingBottom: '0' }}>
                    <ul className="nav flex-column">
                        <li className='nav-item'>
                            <Link to="Home" className='nav-link text-white sidebar-link'>
                                <i className='bi bi-house-door-fill text-white fs-5 ms-2 me-2' />
                                <span className='ms-2'>Home</span>
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="Arf/" className='nav-link text-white sidebar-link'>
                                <i className='bi bi-file-earmark-plus-fill text-white fs-5 ms-2 me-3' />
                                <span>Receiving Form</span>
                            </Link>
                        </li>
                        <li className='nav-item'>
                            <Link to="RoaForm/" className='nav-link text-white sidebar-link'>
                                <i className='bi bi-file-earmark-text-fill text-white fs-5 ms-2 me-3' />
                                <span>ROA Form</span>
                            </Link>
                        </li>
                        <li className='nav-item mt-2'>
                            <button className='btn btn-link sidebar-link ms-2 text-white text-decoration-none w-100 text-start' type='button' data-bs-toggle='collapse' data-bs-target='#homeSubmenu' aria-expanded='false' aria-controls='homeSubmenu'>
                                <i className='bi bi-archive-fill text-white fs-5 me-3 ms-1' />
                                ARF
                                <i className='bi bi-caret-down-fill float-end me-3 mt-1' />
                            </button>
                            <div className='collapse' id='homeSubmenu'>
                                <ul className='list-unstyled ms-5'>
                                    <li>
                                        <Link className="nav-link text-white mt-2 sidebar-link" to="Walkin/">Walk-in</Link>
                                    </li>
                                    <li>
                                        <Link className='nav-link text-white sidebar-link' to="Regulatory/">Regulatory</Link>
                                    </li>
                                    <li>
                                        <Link className='nav-link text-white sidebar-link' to="CornProgram/">Corn Program</Link>
                                    </li>
                                    <li>
                                        <Link className='nav-link text-white sidebar-link' to="LGU/">LGU</Link>
                                    </li>
                                    <li>
                                        <Link className='nav-link text-white sidebar-link' to="Research/">Research</Link>
                                    </li>
                                    <li>
                                        <Link className='nav-link text-white sidebar-link' to="HVCrops/">High Value Crops</Link>
                                    </li>
                                    <li>
                                        <Link className='nav-link text-white sidebar-link' to="Rice Program/">Rice Program</Link>
                                    </li>
                                    <li>
                                        <Link className='nav-link text-white sidebar-link' to="Government Agency/">Govt. Agency</Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                        <li className='nav-item mt-2'>
                            <button className='btn btn-link sidebar-link text-white text-decoration-none w-100 text-start' type='button' data-bs-toggle='collapse' data-bs-target='#roaList' aria-expanded='false' aria-controls='roaList'>
                                <i className='bi bi-journal-text text-white fs-5 me-3 ms-3' />
                                ROA
                                <i className='bi bi-caret-down-fill float-end me-2 mt-1' />
                            </button>
                            <div className='collapse' id='roaList'>
                                <ul className='list-unstyled ms-5'>
                                    <li>
                                        <Link className='nav-link text-white mt-2 sidebar-link' to='ForRelease/'> For Release </Link>
                                    </li>
                                    <li>
                                        <Link className='nav-link text-white mt-2 sidebar-link' to='Released/'> Released </Link>
                                    </li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>

                {/* Sign Out Section - Fixed at Bottom */}
                <div className="border-top p-1 mx-2 mb-2">
                    <div className='sidebar-link p-2 ms-2 d-flex align-items-center'>
                        <button type="submit" className='btn p-0 w-100 border-0 text-white text-start' onClick={handleLogout}>
                            <i className='bi bi-box-arrow-right me-2'></i>
                            Sign Out
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Sidebar