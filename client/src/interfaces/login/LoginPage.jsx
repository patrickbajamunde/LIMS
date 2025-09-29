import React, {useState} from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';

function LoginPage() {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('http://192.168.254.110:8001/api/auth/login',{
        email,
        password,
      },{
        withCredentials: true,
      })
      // Check for a success property or token in the response
      if (res.status === 200 && res.data && res.data.success) {
          const role = res.data.role
          console.log("Role: ", role);
          if (role === 'dco'){
            navigate("/Dco/Home")
          }
          else if (role === 'analyst'){
            navigate("/Analysts/Home")
          }
          else{
            setError('User role is not recognized.')
          }
      } else {
        setError('Login failed. Please check your credentials.')
      }
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <div>
        <form onSubmit={handleLogin}>
          <label>Username</label>
          <input type='email' value={email} onChange={e => setEmail(e.target.value)} required className='form-control mb-4'></input>
          <label>Password</label>
          <input type='password' value={password} onChange={e => setPassword(e.target.value)} required className='form-control mb-4'></input>

          <button type='submit' className='btn btn-primary w-100 mb-4'>
            Login
          </button>
          {error && <div style={{ color: 'red' }}>{error}</div>}
        </form>
    </div>
  )
}

export default LoginPage