import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom';
import './styles/report.css'
import axios from 'axios';

function AddReport() {

  const reports = {
    sampleCode: "",
    sampleDescription:"",
    testParameter:"",
    testMethod:"",
    sampleResult:"",

  };

  const [sample, setSample] = useState (reports);
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const {name, value} = e.target;
    setSample({...sample, [name]: value});
  };

  const submitForm = async(e) =>{
    e.preventDefault();
    await axios.post("http://localhost:8001/api/samples", sample,
      {
        withCredentials: true,
      }
    )
    .then((response)=>{
        console.log("Report created successfully.")
        navigate("/Analysts/Report")
    })
    .catch((error)=>{
        console.log(error)
    })
}

  return (
    <div className='d-flex reg-analysis'>
        <div className=' analysis container-fluid shadow-sm border bordered-darker mb-5'>
          <div className='row g-6'>
            <div className='head bg-dark container'>
              
            <div className='mt-1'>
              <i className='bi bi-info-circle text-white fs-5 ms-1 me-1'/> 
                    <span className='ms-2 fs-5 text-white'>Test Reports</span>
              </div>
            </div>
            <form className='mt-1 mb-4' onSubmit={submitForm}>
              <div className='container-fluid mt-1 mb-5 '>
                <div className="description col mt-4 mb-4"> 
                      <label for="mobile" class="col-sm-2  col-form-label">Sample Description:</label> 
                      <div className="col-sm"> 
                          <textarea type="text" className="form-control" 
                              id="sampleDescrip"
                              name="sampleDescription"
                              onChange={inputHandler}
                              autoComplete='off'
                              placeholder='Enter Sample Description'
                          /> 
                      </div> 
                </div>
                  <div className='row mt-4'>
                  <label for="clientType" className='col-md-3 col-form-label '>Test Parameter Requested: </label>
                  <div className='col-md-3 '>
                    <select id='testParameter' name="testParameter" onChange={inputHandler} className='form-select' >
                      <option selected>Choose...</option>
                      <option value="Crude Protein">Crude Protein</option>
                      <option value="Moisture">Moisture</option>
                      <option value="3">Crude Fiber</option>
                      <option value="4">Crude Fat</option>
                      <option value="5">Crude Ash</option>
                      <option value="6">Calcium</option>
                      <option value="5">Total Phosporus</option>
                      <option value="5">Salt as Sodium Chloride</option>
                      <option value="5">Aflatoxin</option>
                    </select>
                  </div>
                  <label for="clientType" className='testMethod col-md-3 col-form-label '>Test Method Requested: </label>
                  <div className='col-md-3 '>
                    <select id='clientType' className='form-select'>
                      <option selected>Choose...</option>
                      <option value="1">Susan P. Bergantin</option>
                      <option value="2">Maria Coleen G. Lorbes</option>
                      <option value="3">Danica Mae B. Rodriguez</option>
                      <option value="4">Mary June M. Cadag</option>
                      <option value="5">Katrina Louise C. Gonzales</option>
                      <option value="6">Mellen B. Perion</option>
                      <option value="5">Kenneth H. Medenilla</option>
                    </select>
                  </div>
                  <label for="clientType" className='col-md-3 col-form-label mt-4'>Result: </label>
                  <div className='col-md-3 d-flex justify-content-end mt-4'>
                    <input type="text" className="date form-control" 
                      id="sampleResult" 
                      onChange={inputHandler}
                      name="sampleResult"
                      autoCorrect='off'
                      placeholder="Input Result"
                      /> 
                    
                  </div>
          
                  
                    <div className='row mt-3'>
                      <div className='col-md-6 offset-md-3 d-flex justify-content-center mt-4'>
                        <button type="submit" className="btn btn-primary col-md-2">Add Item</button>
                      </div>
                    </div>
                </div>
              </div>
              <div className='col-md-6 gap-3 offset-md-6 d-flex justify-content-end pe-3'>

                  <button type="submit" className="btn btn-primary col-md-2">Save</button>
              </div>
            </form>
          </div>
        </div>
    </div>
  )
}

export default AddReport
