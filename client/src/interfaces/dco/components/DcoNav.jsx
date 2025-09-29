import {useState} from 'react'
import { useNavigate } from 'react-router-dom';

function DcoNav() {

    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    const handleLogout = () => {
    fetch('http://192.168.254.110:8001/api/auth/logout', {
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
        <nav className='navbar navbar-expand-lg navbar-dark bg-dark'>
            <div className='container-fluid'>
                <button className='navbar-toggler' data-bs-toggle="collapse"
                    data-bs-target="#navbarm" aria-controls='navbarm' aria-expanded="false"
                        aria-label='Toggle navigation'>
                            <span className='navbar-toggler-icon'></span>
                </button>
                <div className="collapse navbar-collapse justify-content-md-start" id='navbarm'>
                    <ul className='navbar-nav'>
                        <li className='nav-item mx-2'> 
                            <a className="nav-link text-white">LIMS (DCO)</a>
                        </li>
                    </ul>
                </div>
            </div>
            <div>
                <button type="submit" className='btn btn-primary' onClick={handleLogout}>Logout</button>
            </div>
        </nav>
    </div>
  )
}

export default DcoNav