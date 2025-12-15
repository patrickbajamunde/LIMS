import React, { useState } from 'react'
import './styles/arf.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ArfAttachment } from '../components/modal/Modal';

function Arf() {

  const client = {
    requestId: "",
    clientType: "",
    clientName: "",
    clientAddress: "",
    clientEmail: "",
    clientGender: "",
    sampleDisposal: "",
    reportDue: "",
    transactionDate: "",
    receivedBy: "",
  }

  const customerCategory = (clientType) => {
    const categoryMap = {
      "Regulatory": "RG",
      "Rice Program": "RP",
      "Corn Program": "CP",
      "High Value Crops Program": "HV",
      "Research Division": "RD",
      "LGU": "LG",
      "Student": "ST",
      "Private": "PR",
      "Farmer": "FR",
      "Government Agency": "GA",
      "Research": "RS"
    }
    return categoryMap[clientType] || "";
  }

  const [request, setRequest] = useState(client); // State to hold request data

  const [showModal, setShowModal] = useState(false);// state to modal activity
  const [ArfAttachmentModal, setArfAttachmentModal] = useState(false);
  const [sample, setSample] = useState([]); // State to hold sample details in an array
  const [sampleDetail, setSampleDetail] = useState({
    sampleDescription: "",
    parameterReq: "",
    methodReq: "",
    labCode: "",
    sampleCode: "",
  }); // State to hold current state of sample details in the modal

  const [arfAttachmentDetails, setArfAttachmentDetails] = useState([]);
  const [arfAttachment, setArfAttachment] = useState({
    sampleDescription: "",
    parameterReq: "",
    methodReq: "",
    labCode: "",
    sampleCode: "",
    Barangay: "",
    Municipality: "",
    Province: "",
  })

  // Available parameters list
  const availableParameters = [
    "Crude Protein",
    "Moisture",
    "Crude Fiber",
    "Crude Fat",
    "Crude Ash",
    "Calcium",
    "Total Phosphorus",
    "Salt as Sodium Chloride",
    "AFLATOXIN"
  ];

  // Build methods string from selected parameters
  const methodList = (parameterReq) => {
    const methodTable = {
      "Crude Protein": "KJELDAHL (AOAC 2001.11)",
      "Moisture": "GRAVIMETRIC METHOD (AOAC 930.15)",
      "Crude Fiber": "GRAVIMETRIC METHOD (AOAC 962.09)",
      "Crude Fat": "SOXHLET PETROLEUM ETHER (AOAC 2003.06)",
      "Crude Ash": "GRAVIMETRIC METHOd (AOAC 942.05)",
      "Calcium": "TITRIMETRIC METHOD (AOAC 927.05)",
      "Total Phosphorus": "MOLYBDOVANADATE METHOD",
      "Salt as Sodium Chloride": "MOHR (AOAC 971.27)",
      "AFLATOXIN": "ELISA VERTOX KIT (AOAC 990.34)"
    }

    return methodTable[parameterReq] || "";
  }

  const getMethodsForParameters = (parametersArray) => {
    return parametersArray.map(p => methodList(p)).filter(Boolean).join(", ");
  }

  const [selectedParameters, setSelectedParameters] = useState([]);

  // checkbox handler — toggles selection and updates sampleDetail.parameterReq & methodReq
  const checkboxHandler = (e) => {
    const { value, checked } = e.target;
    setSelectedParameters(prev => {
      const next = checked ? [...prev, value] : prev.filter(p => p !== value);

      // update the modal draft sampleDetail so the inputs show current selection
      setSampleDetail(prevDetail => ({
        ...prevDetail,
        parameterReq: next.join(", "),
        methodReq: getMethodsForParameters(next)
      }));

      setArfAttachment(prev => ({
        ...prev,
        parameterReq: next.join(", "),
        methodReq: getMethodsForParameters(next)
      }))

      return next;
    });
  }

  const [successMessage, setSuccessMessage] = useState("")

  const requestIdGenerator = (clientType) => {
    const getCategoryId = customerCategory(clientType)
    if (!getCategoryId) return '';

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');

    const rfcal = 'RFCAL';
    const ar = 'AR';

    const defaultSequence = '0000';
    return `${year}-${month}-${rfcal}-${ar}-${defaultSequence}-${getCategoryId}`;
  }


  const inputHandler = (e) => {
    const { name, value } = e.target;

    if (name === 'clientType') {
      const categoryId = requestIdGenerator(value);
      setRequest({
        ...request,
        clientType: value,
        requestId: categoryId,
      });
    } else {
      setRequest({ ...request, [name]: value });
    }
  };

  // Handler for modal sample inputs
  const sampleInputHandler = (e) => {
    const { name, value } = e.target;
    setSampleDetail({ ...sampleDetail, [name]: value });
  }

  const arfAttachmentInputHandler = (name, value) => {
    setArfAttachment({ ...arfAttachment, [name]: value });
  }
  const arfAttachmentSubmit = (e) => {
    e.preventDefault();
    setArfAttachmentDetails(prev => [...prev, arfAttachment]);
    setArfAttachmentModal(false);
  }

  // Handler for submitting sample details
  const sampleSubmit = (e) => {
    e.preventDefault();

    // ensure parameterReq/methodReq are taken from selectedParameters if not manually set
    const finalSample = {
      ...sampleDetail,
      parameterReq: sampleDetail.parameterReq || selectedParameters.join(", "),
      methodReq: sampleDetail.methodReq || getMethodsForParameters(selectedParameters)
    };

    setSample(prev => [...prev, finalSample]); // add new sampleDetail to samples array
    setSampleDetail({
      sampleDescription: "",
      parameterReq: "",
      methodReq: "",
      labCode: "",
      sampleCode: "",
    }); // reset the inputs of sampleDetails
    setSelectedParameters([]); // reset checkbox selections
    setShowModal(false); // close modal after adding sample
  }

  const submitForm = async (e) => {
    e.preventDefault();
    const form = { ...request, sampleDetails: sample, ArfAttachment: arfAttachmentDetails };
    await axios.post("http://localhost:8001/api/client/newClient", form,
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        setSample([]); // Clear sample details after submission
        setArfAttachmentDetails([]);
        setRequest({
          requestId: "",
          clientType: "",
          clientName: "",
          clientAddress: "",
          clientEmail: "",
          clientGender: "",
          sampleDisposal: "",
          reportDue: "",
          transactionDate: "",
          receivedBy: ""
        }); // Reset request form
        setSuccessMessage("Form submitted successfully!");

        setTimeout(() => setSuccessMessage(""), 3000);
      })
      .catch((error) => {
        console.log(error)
      })
  }

  return (

    <div className='d-flex mt-3 '>
      <div className=' analysis card container-fluid shadow-sm border bordered-darker  mb-5'>
        <div className='row g-6'>
          <div className='message col-md-4'>
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}
          </div>
          <div className='head container rounded-top' style={{ backgroundColor: '#003e8fff' }}>

            <div className='mt-1'>
              <i className='bi bi-info-circle text-white fs-5 ms-1 me-1' />
              <span className='ms-2 fs-5 text-white'>Receiving Form</span>
            </div>
          </div>

          <form className='mt-4 mb-4' onSubmit={submitForm}>
            <div className='card p-4 mb-3 shadow-sm border'>
              <h5 className='mb-4 text-primary fw-bold'>Request Details</h5>
              <div className="row g-4">
                <div className="col-md-6">
                  <label className='form-label '>Type Of Client: </label>
                  <select id='clientType' name="clientType" onChange={inputHandler} value={request.clientType} className='form-select border border-dark'>
                    <option defaultValue>Choose...</option>
                    <option value="Regulatory">Regulatory</option>
                    <option value="Corn Program">Corn Program</option>
                    <option value="Rice Program">Rice Program</option>
                    <option value="LGU">LGU</option>
                    <option value="Student">Student</option>
                    <option value="Private">Private</option>
                    <option value="Farmer">Farmer</option>
                    <option value="Government Agency">Government Agency</option>
                    <option value="High Value Crops Program">High Value Crops Program</option>
                    <option value="Research">Research</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className='form-label'>Request ID: </label>
                  <input type="text" className="form-control border border-dark" id="requestId" name="requestId" onChange={inputHandler} value={request.requestId} placeholder="" />
                </div>

                <div className="col-md-6">
                  <label className='form-label '>Transaction Date: </label>
                  <input type="date" className="form-control border border-dark" id="transactionDate" name='transactionDate' value={request.transactionDate} onChange={inputHandler} placeholder="" />
                </div>

                <div className="col-md-6">
                  <label className='form-label '>Recevied By: </label>
                  <select id='receivedBy' name='receivedBy' onChange={inputHandler} value={request.receivedBy} className='form-select border border-dark'>
                    <option defaultValue>Choose...</option>
                    <option value="Susan P. Bergantin">Susan P. Bergantin</option>
                    <option value="Jessa Mae M. Luces">Jessa Mae M. Luces</option>
                  </select>
                </div>

                <div className="col-md-6"></div>
              </div>
            </div>

            <div className='container-fluid shadow-sm border border-secondary border-1 mt-3 mb-3'>
            </div>

            <div className='card p-4 mb-3 shadow-sm border'>
              <h5 className='mb-4 text-primary fw-bold'>Customer Details</h5>
              <div className='row g-4'>
                <div className="col-md-6">
                  <label className='form-label '>Customer Name: </label>
                  <input type="text" className="form-control border border-dark" id="clientName" name='clientName' value={request.clientName} onChange={inputHandler} placeholder="" />
                </div>

                <div className="col-md-6">
                  <label className='form-label'>Contact No./Email: </label>
                  <input type="tel" className="form-control border border-dark" id="mobile" name='clientEmail' value={request.clientEmail} onChange={inputHandler} placeholder="" />
                </div>

                <div className="col-md-6">
                  <label className='form-label '>Address: </label>
                  <input type="tel" className="form-control border border-dark" id="clientAddress" name='clientAddress' value={request.clientAddress} onChange={inputHandler} placeholder="" />
                </div>

                <div className="col-md-6">
                  <label className='form-label '>Gender: </label>
                  <select id='clientGender' name="clientGender" onChange={inputHandler} value={request.clientGender} className='form-select border border-dark'>
                    <option defaultValue>Choose...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="col-md-6">
                  <label className='form-label '>Date of Sample Disposal: </label>
                  <input type="date" className="form-control border border-dark" id="sampleDisposal" name='sampleDisposal' value={request.sampleDisposal} onChange={inputHandler} placeholder="" />
                </div>

                <div className="col-md-6">
                  <label className='form-label'>Report due date: </label>
                  <input type="date" className="form-control border border-dark" id="reportDue" name='reportDue' value={request.reportDue} onChange={inputHandler} placeholder="" />
                </div>
              </div>
            </div>

            <div className='container-fluid border border-secondary border-1 mt-3 mb-3'></div>


            <div className='card p-4 mb-3 shadow-sm border'>
              <h5 className='mb-4 text-primary fw-bold'>Sample Details</h5>
              <div className='d-flex justify-content-end'>
                <button
                  type="button"
                  className="btn btn-primary" onClick={() => setShowModal(true)}>
                  <i className="bi bi-plus-lg me-2 fs-6"></i>Add Sample Details
                </button>
              </div>

              {/* Table for displaying sample info */}
              <div className="row mt-2">
                <div className="col-12">
                  <table className="table table-bordered">
                    <thead className="table-primary">
                      <tr>
                        <th>Lab Code</th>
                        <th>Sample Code</th>
                        <th>Sample Description</th>
                        <th>Test Parameter Requested</th>
                        <th>Test Method Requested</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sample.length > 0 ? (
                        sample.map((sampleItem, index) => (
                          <tr key={index}>
                            <td>{sampleItem.labCode}</td>
                            <td>{sampleItem.sampleCode}</td>
                            <td>{sampleItem.sampleDescription}</td>
                            <td>{sampleItem.parameterReq}</td>
                            <td>{sampleItem.methodReq}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="5" className="text-center">No samples added yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* ...existing form fields below... */}
            </div>

            {/*ARF Attachment Form */}
            <div className='card p-4 mb-3 shadow-sm border'>
              <h5 className='mb-4 text-primary fw-bold'>Analysis Request Form Attachment</h5>
              <div className='d-flex justify-content-end'>
                <button
                  type="button"
                  className="btn btn-primary" onClick={() => setArfAttachmentModal(true)}>
                  <i className="bi bi-plus-lg me-2 fs-6"></i>Add Sample Details
                </button>
              </div>

              {/* Table for displaying sample info */}
              <div className="row mt-2">
                <div className="col-12">
                  <table className="table table-bordered">
                    <thead className="table-primary">
                      <tr>
                        <th>Lab Code</th>
                        <th>Sample Code</th>
                        <th>Sample Description</th>
                        <th>Barangay</th>
                        <th>Municipality</th>
                        <th>Province</th>
                      </tr>
                    </thead>
                    <tbody>
                      {arfAttachmentDetails.length > 0 ? (
                        arfAttachmentDetails.map((sampleItem, index) => (
                          <tr key={index}>
                            <td>{sampleItem.labCode}</td>
                            <td>{sampleItem.sampleCode}</td>
                            <td>{sampleItem.sampleDescription}</td>
                            <td>{sampleItem.Barangay}</td>
                            <td>{sampleItem.Municipality}</td>
                            <td>{sampleItem.Province}</td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="6" className="text-center">No samples added yet.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              {/* ...existing form fields below... */}
            </div>


            <div className='col-md-6 gap-3 offset-md-6 d-flex justify-content-end pe-3'>
              <button type="button" className="btn btn-primary col-md-2" onClick={submitForm}>Save</button>
            </div>
          </form>
        </div>
      </div>

      <ArfAttachment
        show={ArfAttachmentModal}
        onClose={() => setArfAttachmentModal(false)}
        ArfAttachment={arfAttachment}
        onChange={arfAttachmentInputHandler}
        onSubmit={arfAttachmentSubmit}
        availableParameters={availableParameters}
        selectedParameters={selectedParameters}
        checkboxHandler={checkboxHandler}
      />


      {showModal && (
        <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={sampleSubmit} method="post">

                <div className="modal-header bg-primary text-white">
                  <h5 className="modal-title">Add Sample Details</h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>

                <div className="modal-body">

                  <div>
                    <label className='form-label'>Lab Code</label>
                    <input
                      type='text'
                      className='form-control border border-dark'
                      name='labCode'
                      value={sampleDetail.labCode}
                      onChange={sampleInputHandler}
                    />
                  </div>

                  <div>
                    <label className='form-label'>Sample Code</label>
                    <input
                      type='text'
                      className='form-control border border-dark'
                      name='sampleCode'
                      value={sampleDetail.sampleCode}
                      onChange={sampleInputHandler}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Sample Description</label>
                    <input
                      type="text"
                      className="form-control border border-dark"
                      name="sampleDescription"
                      value={sampleDetail.sampleDescription}
                      onChange={sampleInputHandler}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label fw-bold">Test Parameters</label>
                    <div className="row g-1">
                      {availableParameters.map((parameter, index) => (
                        <div className="form-check col-4 mb-2 " key={index}>
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={`parameter-${index}`}
                            value={parameter}
                            checked={selectedParameters.includes(parameter)}
                            onChange={checkboxHandler}
                            style={{
                              width: '1.15rem',
                              height: '1.15rem',
                              WebkitAppearance: 'checkbox',
                              MozAppearance: 'checkbox',
                              appearance: 'auto',
                              accentColor: '#0d6efd'
                            }}
                          />
                          <label className="form-check-label" htmlFor={`parameter-${index}`}>
                            {parameter}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Test Parameter Requested</label>
                    <input
                      type="text"
                      className="form-control border border-dark"
                      name="parameterReq"
                      value={sampleDetail.parameterReq}
                      onChange={sampleInputHandler}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Test Method Requested</label>
                    <input
                      type="text"
                      className="form-control border border-dark"
                      name="methodReq"
                      value={sampleDetail.methodReq}
                      onChange={sampleInputHandler}
                      required
                    />
                  </div>
                </div>
                <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>

  )
}

export default Arf