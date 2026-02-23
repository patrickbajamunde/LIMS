import React, { useState, useEffect } from 'react'
import '../forms/styles/arf.css'
import axios from 'axios';
import { useNavigate, useParams, Link, useLocation } from 'react-router-dom';
import { ArfAttachment } from '../components/modal/Modal';

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

  const availableParameters = [
    "Crude Protein",
    "Moisture",
    "Crude Fiber",
    "Crude Fat",
    "Crude Ash",
    "Calcium",
    "Total Phosphorus",
    "Salt as Sodium Chloride",
    "Complete Proximate",
    "AFLATOXIN",

  ];

  const methodList = (parameterReq) => {
    const methodTable = {
      "Crude Protein": "KJELDAHL (AOAC 2001.11)",
      "Moisture": "GRAVIMETRIC METHOD (AOAC 930.15)",
      "Crude Fiber": "GRAVIMETRIC METHOD (AOAC 962.09)",
      "Crude Fat": "SOXHLET PETROLEUM ETHER (AOAC 920.39)",
      "Crude Ash": "GRAVIMETRIC METHOd (AOAC 942.05)",
      "Calcium": "TITRIMETRIC METHOD (AOAC 927.05)",
      "Total Phosphorus": "MOLYBDOVANADATE METHOD",
      "Salt as Sodium Chloride": "MOHR (AOAC 971.27)",
      "AFLATOXIN": "ELISA VERTOX KIT (AOAC 990.34)",
      "Complete Proximate": "KJELDAHL (AOAC 2001.11), GRAVIMETRIC METHOD (AOAC 930.15, 962.09, 942.05), SOXHLET PETROLEUM ETHER (AOAC 920.39) "
    }

    return methodTable[parameterReq] || "";
  }

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

  const getMethodsForParameters = (parametersArray) => {
    return parametersArray.map(p => methodList(p)).filter(Boolean).join(", ");
  }


  const navigate = useNavigate();

  const [selectedParameters, setSelectedParameters] = useState([]);

  const [request, setRequest] = useState(client);// State to hold request data
  const [showModal, setShowModal] = useState(false);// state to modal activity
  const [ArfAttachmentModal, setArfAttachmentModal] = useState(false);
  const [sample, setSample] = useState([]);// State to hold sample details in an array
  const [sampleDetail, setSampleDetail] = useState({
    sampleDescription: "",
    parameterReq: "",
    methodReq: "",
    labCode: "",
    sampleCode: "",
  });// State to hold current state of sample details in the modal
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


  const arfAttachmentInputHandler = (name, value) => {
    setArfAttachment({ ...arfAttachment, [name]: value });
  }

  const arfAttachmentSubmit = (e) => {
    e.preventDefault();
    setArfAttachmentDetails(prev => [...prev, arfAttachment]);
    setArfAttachment({
      sampleDescription: "",
      parameterReq: "",
      methodReq: "",
      labCode: "",
      sampleCode: "",
    })
    setArfAttachmentModal(false);
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

  const editAttachment = (index) => {
    const attachmentToEdit = request.ArfAttachment[index];
    setArfAttachment({
      sampleDescription: attachmentToEdit.sampleDescription,
      Barangay: attachmentToEdit.Barangay,
      Municipality: attachmentToEdit.Municipality,
      Province: attachmentToEdit.Province,
      labCode: attachmentToEdit.labCode,
      sampleCode: attachmentToEdit.sampleCode,
      parameterReq: attachmentToEdit.parameterReq,
      methodReq: attachmentToEdit.methodReq,
    })
    setEditingIndex(index);
    setIsEditing(true);
    setArfAttachmentModal(true);

  }

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

  const deleteAttachmententry = (index) => {
    if (window.confirm("Are you sure you want to delete this sample?")) {
      const updatedAttachmentData = request.ArfAttachment.filter((_, i) => i !== index);
      setRequest({
        ...request,
        ArfAttachment: updatedAttachmentData
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
    setSelectedParameters([]); // reset checkbox selections
  }

  const submitUpdateAttachment = (e) => {
    e.preventDefault();

    if (isEditing && editingIndex !== null) {
      // Update existing sample
      const updatedAttachment = [...request.ArfAttachment];
      updatedAttachment[editingIndex] = arfAttachment;
      setRequest({
        ...request,
        ArfAttachment: updatedAttachment
      });
    } else {
      // Add new sample
      const updatedAttachment = request.ArfAttachment ? [...request.ArfAttachment, arfAttachment] : [arfAttachment];
      setRequest({
        ...request,
        ArfAttachment: updatedAttachment
      });
    }

    // Reset and close modal

    setArfAttachmentModal(false);
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

            <div className='container-fluid shadow-sm border border-secondary border-1 mt-3'>
            </div>

            <div className='card p-4 mb-3 shadow-sm border mt-3'>
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

            <div className='container-fluid border border-secondary border-1 mt-3'></div>


            <div className='card p-4 mb-3 shadow-sm border mt-3'>
              <h5 className='mb-4 text-primary fw-bold'>Sample Details</h5>
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

            <div className='card p-4 mb-3 shadow-sm border mt-3'>
              <h5 className='mb-4 text-primary fw-bold'>Analysis Request Form Attachment</h5>
              <div className='d-flex justify-content-end'>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setArfAttachmentModal(true)}>
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
                        <th>Barangay</th>
                        <th>Municipality</th>
                        <th>Province</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {request.ArfAttachment && request.ArfAttachment.length > 0 ? (
                        request.ArfAttachment.map((sampleItem, index) => (
                          <tr key={index}>
                            <td>{sampleItem.labCode}</td>
                            <td>{sampleItem.sampleCode}</td>
                            <td>{sampleItem.sampleDescription}</td>
                            <td>{sampleItem.Barangay}</td>
                            <td>{sampleItem.Municipality}</td>
                            <td>{sampleItem.Province}</td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-primary me-2"
                                onClick={() => editAttachment(index)}
                                title="Edit Sample"
                              >
                                <i className="bi bi-pencil"></i>
                              </button>
                              <button
                                type="button"
                                className="btn btn-sm btn-outline-danger"
                                onClick={() => deleteAttachmententry(index)}
                                title="Delete Sample"
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan="7" className="text-center">No samples added yet.</td>
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

      <ArfAttachment
        show={ArfAttachmentModal}
        onClose={() => setArfAttachmentModal(false)}
        ArfAttachment={arfAttachment}
        onChange={arfAttachmentInputHandler}
        onSubmit={submitUpdateAttachment}
        checkboxHandler={checkboxHandler}
        availableParameters={availableParameters}
        selectedParameters={selectedParameters}
      />

      {/* Enhanced modal with dynamic title */}
      {showModal && (
        <div className="modal fade show" style={{ display: 'block', background: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <form onSubmit={sampleSubmit} method="post">

                <div className="modal-header bg-primary text-white">
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