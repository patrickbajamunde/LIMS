import React, { useState, useEffect } from 'react'
import '../forms/styles/arf.css'
import axios from 'axios';
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';

function UpdateRequest() {

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

  const navigate = useNavigate();

  const [request, setRequest] = useState(client);// State to hold request data
  const [showModal, setShowModal] = useState(false);// state to modal activity
  const [sample, setSample] = useState([]);// State to hold sample details in an array
  const [sampleDetail, setSampleDetail] = useState({
    sampleDescription: "",
    parameterReq: "",
    methodReq: "",
    labCode: "",
    sampleCode: "",
  });// State to hold current state of sample details in the modal
  const [successMessage, setSuccessMessage] = useState("")
  const [editingIndex, setEditingIndex] = useState(null); // Track which sample is being edited
  const [isEditing, setIsEditing] = useState(false); // Track if we're in edit mode
  const { id } = useParams();

  //route back to previous page
  const location = useLocation();
  const backRoute = location.state?.from || "/Dco/Walkin/";

  const inputHandler = (e) => {
    const { name, value } = e.target;
    setRequest({ ...request, [name]: value });
  };

  const sampleInputHandler = (e) => {
    const { name, value } = e.target;
    setSampleDetail({ ...sampleDetail, [name]: value });
  }

  // Handler for opening modal to add new sample
  const openAddModal = () => {
    setSampleDetail({
      sampleDescription: "",
      parameterReq: "",
      methodReq: "",
      labCode: "",
      sampleCode: "",
    });
    setIsEditing(false);
    setEditingIndex(null);
    setShowModal(true);
  };

  // Handler for opening modal to edit existing sample
  const openEditModal = (index) => {
    const sampleToEdit = request.sampleDetails[index];
    setSampleDetail({
      sampleDescription: sampleToEdit.sampleDescription,
      parameterReq: sampleToEdit.parameterReq,
      methodReq: sampleToEdit.methodReq,
      labCode: sampleToEdit.labCode,
      sampleCode: sampleToEdit.sampleCode,
    });
    setEditingIndex(index);
    setIsEditing(true);
    setShowModal(true);
  };

  // Handler for deleting a sample
  const deleteSample = (index) => {
    if (window.confirm("Are you sure you want to delete this sample?")) {
      const updatedSamples = request.sampleDetails.filter((_, i) => i !== index);
      setRequest({
        ...request,
        sampleDetails: updatedSamples
      });
    }
  };

  // Enhanced submit handler for both adding and editing
  const sampleSubmit = (e) => {
    e.preventDefault();

    if (isEditing && editingIndex !== null) {
      // Update existing sample
      const updatedSamples = [...request.sampleDetails];
      updatedSamples[editingIndex] = sampleDetail;
      setRequest({
        ...request,
        sampleDetails: updatedSamples
      });
    } else {
      // Add new sample
      const updatedSamples = request.sampleDetails ? [...request.sampleDetails, sampleDetail] : [sampleDetail];
      setRequest({
        ...request,
        sampleDetails: updatedSamples
      });
    }

    // Reset and close modal
    setSampleDetail({
      sampleDescription: "",
      parameterReq: "",
      methodReq: "",
      labCode: "",
      sampleCode: "",
    });
    setShowModal(false);
    setIsEditing(false);
    setEditingIndex(null);
  }

  const submitForm = async (e) => {
    e.preventDefault();
    const form = { ...request };
    await axios.put(`http://localhost:8001/api/client/update/arf/${id}`, form,
      {
        withCredentials: true,
      }
    )
      .then((response) => {
        setSuccessMessage("Form updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
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
          receivedBy: "",
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    axios.get(`http://localhost:8001/api/client/getClient/${id}`)
      .then((response) => {
        setRequest(response.data)
      })
      .catch((error) => {
        console.error("Error fetching report details", error)
        setRequest(null)
      })
  }, [id]);

  function formatDateForInput(dateStr) {
    if (!dateStr) return "";
    const date = new Date(dateStr);
    return date.toISOString().split("T")[0];
  }

  return (

    <div className='d-flex reg-analysis'>
      <div className=' analysis container-fluid shadow-sm border bordered-darker mb-5'>
        <div className='row g-6'>
          <div className='message col-md-4'>
            {successMessage && (
              <div className="alert alert-success" role="alert">
                {successMessage}
              </div>
            )}
          </div>
          <div className='head bg-dark container'>

            <div className='mt-1'>
              <i className='bi bi-info-circle text-white fs-5 ms-1 me-1' />
              <span className='ms-2 fs-5 text-white'>Receiving Form</span>
            </div>
          </div>

          <form className='mt-4 mb-4' onSubmit={submitForm}>
            <div className='container-fluid mt-3 '>
              <div className='row mt-4'>
                <label for="clientType" className='col-md-3 col-form-label '>Type Of Client: </label>
                <div className='col-md-3'>
                  <select id='clientType' name="clientType" onChange={inputHandler} value={request.clientType} className='form-select'>
                    <option selected>Choose...</option>
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

                <label for="clientType" className='ItemNum col-md-3 col-form-label'>Request ID: </label>
                <div className='col-md-3 d-flex justify-content-end'>
                  <input type="text" className="form-control" id="requestId" name="requestId" onChange={inputHandler} value={request.requestId} placeholder="" />
                </div>
              </div>

              <div className='row mt-4'>
                <label for="clientType" className='col-md-3 col-form-label '>Transaction Date: </label>
                <div className='col-md-3'>
                  <div className="col-sm">
                    <input type="date" className="form-control" id="transactionDate" name='transactionDate' value={formatDateForInput(request.transactionDate)} onChange={inputHandler} placeholder="" />
                  </div>
                </div>

                <label for="clientType" className='testMethod col-md-3 col-form-label '>Received By: </label>
                <div className='col-md-3 '>
                  <select id='receivedBy' name='receivedBy' onChange={inputHandler} value={request.receivedBy} className='form-select'>
                    <option selected>Choose...</option>
                    <option value="Susan P. Bergantin">Susan P. Bergantin</option>
                    <option value="Jessa Mae M. Luces">Jessa Mae M. Luces</option>
                  </select>
                </div>
              </div>
            </div>

            <div className='container-fluid shadow-sm border border-secondary border-1 mt-3'>
            </div>

            <div className='container-fluid mt-3 '>
              <div className='row mt-4'>

                <label for="clientType" className='col-md-3 col-form-label '>Customer Name: </label>
                <div className='col-md-3'>
                  <div className="col-sm">
                    <input type="text" className="form-control" id="clientName" name='clientName' value={request.clientName} onChange={inputHandler} placeholder="" />
                  </div>
                </div>

                <label for="clientType" className='ItemNum col-md-3 col-form-label'>Contact No./Email: </label>
                <div className='col-md-3 d-flex justify-content-end'>
                  <input type="tel" className="form-control" id="mobile" name='clientEmail' value={request.clientEmail} onChange={inputHandler} placeholder="" />
                </div>
              </div>
              <div className='row mt-4'>
                <label for="clientType" className='col-md-3 col-form-label '>Address: </label>
                <div className='col-md-3'>
                  <div className="col-sm">
                    <input type="tel" className="form-control" id="clientAddress" name='clientAddress' value={request.clientAddress} onChange={inputHandler} placeholder="" />
                  </div>
                </div>

                <label for="clientType" className='testMethod col-md-3 col-form-label '>Gender: </label>
                <div className='col-md-3 '>
                  <select id='clientGender' name="clientGender" onChange={inputHandler} value={request.clientGender} className='form-select'>
                    <option selected>Choose...</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>
              </div>
              <div className='row mt-4'>
                <label for="clientType" className='col-md-3 col-form-label '>Date of Sample Disposal: </label>
                <div className='col-md-3'>
                  <div className="col-sm">
                    <input type="date" className="form-control" id="sampleDisposal" name='sampleDisposal' value={formatDateForInput(request.sampleDisposal)} onChange={inputHandler} placeholder="" />
                  </div>
                </div>

                <label for="clientType" className='ItemNum col-md-3 col-form-label'>Report due date: </label>
                <div className='col-md-3 d-flex justify-content-end'>
                  <input type="date" className="form-control" id="reportDue" name='reportDue' value={formatDateForInput(request.reportDue)} onChange={inputHandler} placeholder="" />
                </div>
              </div>
            </div>

            <div className='container-fluid border border-secondary border-1 mt-3'></div>


            <div className='container-fluid mt-3 mb-5'>
              <div className='d-flex justify-content-end'>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={openAddModal}>
                  <i className="bi bi-plus-lg me-2 fs-6"></i>Add Sample Details
                </button>
              </div>
              {/* Enhanced table with edit and delete buttons */}
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
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {request.sampleDetails && request.sampleDetails.length > 0 ? (
                        request.sampleDetails.map((sampleItem, index) => (
                          <tr key={index}>
                            <td>{sampleItem.labCode}</td>
                            <td>{sampleItem.sampleCode}</td>
                            <td>{sampleItem.sampleDescription}</td>
                            <td>{sampleItem.parameterReq}</td>
                            <td>{sampleItem.methodReq}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-primary me-2"
                                onClick={() => openEditModal(index)}
                                title="Edit Sample"
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => deleteSample(index)}
                                title="Delete Sample"
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </td>
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
            </div>
            <div className='col-md-6 gap-3 offset-md-6 d-flex justify-content-end pe-3'>
              <Link to={backRoute} type="button" className="btn btn-primary col-md-2">Back</Link>
              <button type="button" className="btn btn-primary col-md-2" onClick={submitForm}>Save</button>
            </div>
          </form>
        </div>
      </div>

      {/* Enhanced modal with dynamic title */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <form onSubmit={sampleSubmit} method="post">

                <div className="modal-header">
                  <h5 className="modal-title">
                    {isEditing ? 'Edit Sample Details' : 'Add Sample Details'}
                  </h5>
                  <button type="button" className="btn-close" onClick={() => setShowModal(false)}></button>
                </div>

                <div className="modal-body">

                  <div className="mb-3">
                    <label className='form-label'>Lab Code</label>
                    <input
                      type='text'
                      className='form-control'
                      name='labCode'
                      value={sampleDetail.labCode}
                      onChange={sampleInputHandler}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className='form-label'>Sample Code</label>
                    <input
                      type='text'
                      className='form-control'
                      name='sampleCode'
                      value={sampleDetail.sampleCode}
                      onChange={sampleInputHandler}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Sample Description</label>
                    <input
                      type="text"
                      className="form-control"
                      name="sampleDescription"
                      value={sampleDetail.sampleDescription}
                      onChange={sampleInputHandler}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Test Parameter Requested</label>
                    <input
                      type="text"
                      className="form-control"
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
                      className="form-control"
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
                    {isEditing ? 'Update' : 'Add'}
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

export default UpdateRequest