import React, { useState, useEffect } from 'react';
import './styles/home.css'
import { FaCartArrowDown, FaUserAlt, FaSafari, FaTasks, FaCar } from 'react-icons/fa';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/js/dist/dropdown';
import 'bootstrap/js/dist/collapse';
import image2 from '../Components/images/goverment.png';
import image3 from '../Components/images/corn.png';
import image4 from '../Components/images/search.png';
import image5 from '../Components/images/walk.png';
import Dashboard from '../DataTable/Dashboard';
import axios from "axios";


function Home() {

  const [regCount, setRegCount] = useState(0);
  const [cornCount, setCornCount] = useState(0);
  const [lguCount, setlguCount] = useState(0);
  const [resCount, setResCount] = useState(0);
  const [walkinCount, setWalkinCount] = useState(0);
  const [HvcCount, setHvcCount] = useState(0);
  const [riceCount, setRiceCount] = useState(0);
  const [GaCount, setGaCount] = useState(0);

  useEffect(() => {
    const fetchRegCount = async () => {
      try {
        const resReg = await axios.get("http://192.168.254.110:8001/api/dbcontrol/countReg", {
          withCredentials: true,
        })
        const resCorn = await axios.get("http://192.168.254.110:8001/api/dbcontrol/countCorn", {
          withCredentials: true,
        })
        const resLgu = await axios.get("http://192.168.254.110:8001/api/dbcontrol/countLgu", {
          withCredentials: true,
        })
        const resResearch = await axios.get("http://192.168.254.110:8001/api/dbcontrol/countResearch", {
          withCredentials: true,
        })
        const resWalk = await axios.get("http://192.168.254.110:8001/api/dbcontrol/countWalkin", {
          withCredentials: true,
        })
        const resHVC = await axios.get("http://192.168.254.110:8001/api/dbcontrol/countHVC", {
          withCredentials: true,
        })
        const resRice = await axios.get("http://192.168.254.110:8001/api/dbcontrol/countRice",{
          withCredentials: true,
        })
        const resGovtAgency = await axios.get("http://192.168.254.110:8001/api/dbcontrol/countGovtAgency",{
          withCredentials: true,
        })

        setRegCount(resReg.data.count);
        setCornCount(resCorn.data.count);
        setlguCount(resLgu.data.count);
        setResCount(resResearch.data.count);
        setWalkinCount(resWalk.data.count);
        setHvcCount(resHVC.data.count);
        setRiceCount(resRice.data.count);
        setGaCount(resGovtAgency.data.count);
      } catch (error) {
        console.log("Error while fetching data", error);
      }
    }
    fetchRegCount();
  }, []);


  return (
    <div className='d-flex container-fluid home'>
      <div className='content container-fluid mt-1'>

        {/* Old Dashboard Cards*/}
        {/*}
        <div className='row d-flex flex-nowrap'>
          <div className='col mb-3'>
            <div className='parent-cont p-3 bg-light shadow-sm d-flex justify-content-around border'>
              <div>
                <h3 className='fs-2'>{walkinCount}</h3>
                <p className='fs-5'>Walk-in</p>
              </div>
              <div>
                <img src={image5} alt="description" className='corn-style' />
              </div>
              <div className='view1 d-flex container '>
                <Link className='text-white nav-link ms-auto' to="/Dco/Walkin/">view more</Link>
              </div>
            </div>
          </div>
          <div className='col mb-3'>
            <div className='parent-cont p-3 bg-light shadow-sm d-flex justify-content-around border'>
              <div>
                <h3 className='fs-2'>{regCount}</h3>
                <p className='fs-5'>Regulatory</p>
              </div>
              <i className='bi bi-person p-3 fs-1'></i>
              <div className='view2 d-flex container '>
                <Link className='text-white nav-link ms-auto' to="/Dco/Regulatory/">view more</Link>
              </div>
            </div>
          </div>
          <div className='col mb-3'>
            <div className='parent-cont p-3 bg-light shadow-sm d-flex justify-content-around border'>
              <div>
                <h3 className='fs-2'>{cornCount}</h3>
                <p className='fs-5'>Corn Program</p>
              </div>
              <div>
                <img src={image3} alt="description" className='corn-style' />
              </div>
              <div className='view3 d-flex container '>
                <Link className='text-white nav-link ms-auto' to="/Dco/Corn%20Program/">view more</Link>
              </div>
            </div>
          </div>
          <div className='col mb-3'>
            <div className='parent-cont p-3 bg-light shadow-sm d-flex justify-content-around border'>
              <div>
                <h3 className='fs-2'>{lguCount}</h3>
                <p className='fs-5'>LGU</p>
              </div>
              <div>
                <img src={image2} alt="description" className='image2-style' />
              </div>
              <div className='view4 d-flex container'>
                <Link className='text-white nav-link ms-auto' to="/Dco/LGU/">view more</Link>
              </div>
            </div>
          </div>
          <div className='col mb-3'>
            <div className='parent-cont p-3 bg-light shadow-sm d-flex justify-content-around border'>
              <div>
                <h3 className='fs-2'>{resCount}</h3>
                <p className='fs-5'>Research</p>
              </div>
              <div>
                <img src={image4} alt="description" className='image2-style' />
              </div>
              <div className='view5 d-flex container'>
                <Link className='text-white nav-link ms-auto' to="/Dco/Research/">view more</Link>
              </div>
            </div>
          </div>
        </div>
        {*/}

        {/*NEW DASHBOARD CARDS DESIGN ROW 1*/}
        <div className='row d-flex'>

          {/*WALIK-IN CARD */}
          <div className='col mb-3'>
            <div className='container border border-2 bg-light p-0 shadow-sm rounded'>
              <div className='d-flex align-items-center mb-3 ms-4 mt-3'>
                <div className='me-3'>
                  <h3 className='fs-2'>{walkinCount}</h3>
                  <p className='fs-5 mb-0'>Walk-in</p>
                </div>
                <div className='ms-4'>
                  <img
                    src={image5}
                    alt="description"
                    className='image2-style'
                    style={{ maxWidth: '150px', height: 'auto' }}
                  />
                </div>
              </div>
              <div
                className='d-flex container rounded-bottom-1'
                style={{ backgroundColor: "#339399", }}
              >
                <Link
                  className='text-white nav-link ms-auto p-0'
                  to="/Dco/Walkin/"
                >
                  view more
                </Link>
              </div>
            </div>
          </div>
          
          {/*REGULATORY CARD */}
          <div className='col mb-3'>
            <div className='container border border-2 bg-light p-0 shadow-sm rounded'>
              <div className='d-flex align-items-center mb-3 ms-4 mt-3'>
                <div className='me-3'>
                  <h3 className='fs-2'>{regCount}</h3>
                  <p className='fs-5 mb-0'>Regulatory</p>
                </div>
                <i className='bi bi-person fs-1'></i>
              </div>
              <div
                className='d-flex container rounded-bottom-1'
                style={{ backgroundColor: "#C7CF6F", }}
              >
                <Link
                  className='text-white nav-link ms-auto p-0'
                  to="/Dco/Regulatory/"
                >
                  view more
                </Link>
              </div>
            </div>
          </div>


          {/*CORN PROGRAM CARD */}
          <div className='col mb-3'>
            <div className='container border border-2 bg-light p-0 shadow-sm rounded'>
              <div className='d-flex align-items-center mb-3 ms-4 mt-3'>
                <div className='me-3'>
                  <h3 className='fs-2'>{cornCount}</h3>
                  <p className='fs-5 mb-0'>Corn Program</p>
                </div>
                <div className='ms-4'>
                  <img
                    src={image3}
                    alt="description"
                    className='image2-style'
                    style={{ maxWidth: '150px', height: 'auto' }}
                  />
                </div>
              </div>
              <div
                className='d-flex container rounded-bottom-1'
                style={{ backgroundColor: "#777CFF", }}
              >
                <Link
                  className='text-white nav-link ms-auto p-0'
                  to="/Dco/Corn%20Program/"
                >
                  view more
                </Link>
              </div>
            </div>
          </div>


          {/*LGU CARD */}
          <div className='col mb-3'>
            <div className='container border border-2 bg-light p-0 shadow-sm rounded'>
              <div className='d-flex align-items-center mb-3 ms-4 mt-3'>
                <div className='me-3'>
                  <h3 className='fs-2'>{lguCount}</h3>
                  <p className='fs-5 mb-0'>LGU</p>
                </div>
                <div className='ms-4'>
                  <img
                    src={image4}
                    alt="description"
                    className='image2-style'
                    style={{ maxWidth: '150px', height: 'auto' }}
                  />
                </div>
              </div>
              <div
                className='d-flex container rounded-bottom-1'
                style={{ backgroundColor: "#EC8187", }}
              >
                <Link
                  className='text-white nav-link ms-auto p-0'
                  to="/Dco/LGU/"
                >
                  view more
                </Link>
              </div>
            </div>
          </div>
          
        </div>


        {/*NEW DASHBOARD CARDS DESIGN ROW 2*/}
        <div className='row d-flex'>

          {/*HIGH VALUE CROPS CARD */}
          <div className='col mb-3 '>
            <div className='container border border-2 bg-light p-0 shadow-sm rounded'>
              <div className='d-flex align-items-center mb-3 ms-4 mt-3'>
                <div className='me-3'>
                  <h3 className='fs-2'>{HvcCount}</h3>
                  <p className='fs-5 mb-0'>High Value Crops</p>
                </div>
                <div className='ms-4'>
                  <img
                    src={image4}
                    alt="description"
                    className='image2-style'
                    style={{ maxWidth: '150px', height: 'auto' }}
                  />
                </div>
              </div>
              <div
                className='d-flex container rounded-bottom-1'
                style={{ backgroundColor: "#ff3a3aff", }}
              >
                <Link
                  className='text-white nav-link ms-auto p-0'
                  to="/Dco/Research/"
                >
                  view more
                </Link>
              </div>
            </div>
          </div>
          
          {/*RICE PROGRAM */}
          <div className='col mb-3 '>
            <div className='container border border-2 bg-light p-0 shadow-sm rounded'>
              <div className='d-flex align-items-center mb-3 ms-4 mt-3'>
                <div className='me-3'>
                  <h3 className='fs-2'>{riceCount}</h3>
                  <p className='fs-5 mb-0'>Rice Program</p>
                </div>
                <div className='ms-4'>
                  <img
                    src={image4}
                    alt="description"
                    className='image2-style'
                    style={{ maxWidth: '150px', height: 'auto' }}
                  />
                </div>
              </div>
              <div
                className='d-flex container rounded-bottom-1'
                style={{ backgroundColor: "#8925fcff", }}
              >
                <Link
                  className='text-white nav-link ms-auto p-0'
                  to="/Dco/Research/"
                >
                  view more
                </Link>
              </div>
            </div>
          </div>


          {/*GOVERNMENT AGENCY */}
          <div className='col mb-3 '>
            <div className='container border border-2 bg-light p-0 shadow-sm rounded'>
              <div className='d-flex align-items-center mb-3 ms-4 mt-3'>
                <div className='me-3'>
                  <h3 className='fs-2'>{GaCount}</h3>
                  <p className='fs-5 mb-0'>Gov. Agency</p>
                </div>
                <div className='ms-4'>
                  <img
                    src={image4}
                    alt="description"
                    className='image2-style'
                    style={{ maxWidth: '150px', height: 'auto' }}
                  />
                </div>
              </div>
              <div
                className='d-flex container rounded-bottom-1'
                style={{ backgroundColor: "#84d7f8ff", }}
              >
                <Link
                  className='text-white nav-link ms-auto p-0'
                  to="/Dco/Research/"
                >
                  view more
                </Link>
              </div>
            </div>
          </div>
          
          {/*RESEARCH CARD */}
          <div className='col mb-3'>
            <div className='container border border-2 bg-light p-0 shadow-sm rounded'>
              <div className='d-flex align-items-center mb-3 ms-4 mt-3'>
                <div className='me-3'>
                  <h3 className='fs-2'>{resCount}</h3>
                  <p className='fs-5 mb-0'>Research</p>
                </div>
                <div className='ms-4'>
                  <img
                    src={image4}
                    alt="description"
                    className='image2-style'
                    style={{ maxWidth: '150px', height: 'auto' }}
                  />
                </div>
              </div>
              <div
                className='d-flex container rounded-bottom-1'
                style={{ backgroundColor: "#FCA625", }}
              >
                <Link
                  className='text-white nav-link ms-auto p-0'
                  to="/Dco/Research/"
                >
                  view more
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/*RECENT TRANSACTIONS */}
        <div>
          <div className="row">
            <div className="col-md">
              <Dashboard />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

export default Home;
