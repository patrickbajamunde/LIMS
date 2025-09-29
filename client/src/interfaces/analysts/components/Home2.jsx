import React from 'react';
import './styles/Home2.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import Dashboard from '../DataTable/Dashboard';
import  image5 from '../components/images/walk.png';

function Home2() {
  return (
    <div className='d-flex container-fluid home'>
      <div className='content container-fluid mt-1'>
        <div className='row d-flex'>
          <div className='col-sm-3 mb-3'>
            <div className='parent-cont p-3 bg-light shadow-sm d-flex justify-content-around border'>
              <div>
                <h3 className='fs-2'>0</h3>
                <p className='fs-5'>For Analysis</p>
              </div>
              <div>
                    <img src={image5} alt="description" className='corn-style'/>
                </div>
              <div className='view1 d-flex container '>
                <Link className='text-white nav-link ms-auto' to="/Analysis">view more</Link>
              </div>
            </div>
          </div>
          <div className='col-sm-3 mb-3'>
            <div className='parent-cont p-3 bg-light shadow-sm d-flex justify-content-around border'>
              <div>
                <h3 className='fs-2'>0</h3>
                <p className='fs-5'>For Signatory</p>
              </div>
              <i className='bi bi-person p-3 fs-1'></i>
              <div className='view2 d-flex container '>
              <Link className='text-white nav-link ms-auto' to="/Regulatory">view more</Link>
              </div>
            </div>
          </div>
          
        </div>
        <div>
            <div className="row">
              <div className="col-md-8">
                <Dashboard />
              </div>
              <div className="notifcont container-fluid col-md-4">
                <div className="bg-light shadow-sm border">
                  <div className='notif container'>
                  <p>Notification</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
      </div>
    </div>
  );
}

export default Home2;
