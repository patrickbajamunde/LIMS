import React from 'react'
import '../forms/styles/arf.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { RoaModal } from '../components/modal/Modal';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

function UpdateReport() {

  const report = {
    customerName: "",
    customerAddress: "",
    customerContact: "",
    dateReceived: "",
    datePerformed: "",
    dateIssued: "",
    reportId: "",
    analyzedBy: ""
  }

  const [result, setResult] = useState(report);
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [showModal, setShowModal] = useState(false)
  const [roaReport, setRoaReport] = useState([]) //holds sample details in an array
  const [reportDetails, setReportDetails] = useState({
    labCode: '',
    sampleCode: '',
    sampleDescription: '',
    sampleParam: '',
    result: '',
    testMethod: ''
  });// state of report details before change in the modal
  const [editingIndex, setEditingIndex] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();

  const location = useLocation();
  const backRoute = location.state?.from || "/Dco/Walkin/";
  const navigate = useNavigate();

  const inputHandler = (e) => {
    const { name, value } = e.target;
    if (name === 'analyzedBy' || name === 'datePerformed') {
      const prc = analystPRC(value);
      setResult({
        ...result,
        [name]: value,
        analystPRC: prc,
      });
    } else if (name === 'datePerformedFrom') {
      setDateFrom(value);
    }
    else if (name === 'datePerformedTo') {
      setDateTo(value);
    }
    else {
      setResult({ ...result, [name]: value });
    }
  }

  const formatDateRange = (fromDate, toDate) => {
    const from = new Date(fromDate);
    const to = new Date(toDate);

    const fromMonth = from.toLocaleDateString('en-US', { month: 'long' });
    const fromDay = from.getDate();
    const fromYear = from.getFullYear();

    const toMonth = to.toLocaleDateString('en-US', { month: 'long' });
    const toDay = to.getDate();
    const toYear = to.getFullYear();

    // Same month and year: "January 15 - 20, 2024"
    if (fromMonth === toMonth && fromYear === toYear) {
      return `${fromMonth} ${fromDay} - ${toDay}, ${fromYear}`;
    }
    // Same year, different months: "January 15 - February 20, 2024"
    else if (fromYear === toYear) {
      return `${fromMonth} ${fromDay} - ${toMonth} ${toDay}, ${fromYear}`;
    }
    // Different years: "December 15, 2023 - January 20, 2024"
    else {
      return `${fromMonth} ${fromDay}, ${fromYear} - ${toMonth} ${toDay}, ${toYear}`;
    }
  };

  const addDateRange = () => {
    if (dateFrom && dateTo) {
      const dateRange = formatDateRange(dateFrom, dateTo);
      const currentDates = result.datePerformed ? result.datePerformed + ', ' : '';

      setResult(prev => ({
        ...prev,
        datePerformed: currentDates + dateRange
      }));
      setDateFrom('');
      setDateTo('');
    }
  };

  const reportInputHandler = (name, value) => {
    setReportDetails(prev => ({ ...prev, [name]: value }));
  }


  const openEditModal = (index) => {
    const reportToEdit = result.roaDetails[index];
    setReportDetails({
      labCode: reportToEdit.labCode,
      sampleCode: reportToEdit.sampleCode,
      sampleDescription: reportToEdit.sampleDescription,
      sampleParam: reportToEdit.sampleParam,
      result: reportToEdit.result,
      testMethod: reportToEdit.testMethod
    });
    setEditingIndex(index);
    setIsEditing(true);
    setShowModal(true)
  };

  const deleteReport = (index) => {
    if (window.confirm("Are you sure you want to delete this report?")) {
      const updatedReport = result.roaDetails.filter((_, i) => i !== index);
      setResult({
        ...result,
        roaDetails: updatedReport
      });
    }
  }

  const submitReport = (e) => {
    e.preventDefault();

    if (isEditing && editingIndex !== null) {
      const updatedReport = [...result.roaDetails];
      updatedReport[editingIndex] = reportDetails
      setResult({
        ...result,
        roaDetails: updatedReport
      });
    } else {
      const updatedReport = result.roaDetails ? [...result.roaDetails, reportDetails] : [reportDetails];
      setResult({
        ...result,
        roaDetails: updatedReport
      });
    }
    setReportDetails({
      labCode: '',
      sampleCode: '',
      sampleDescription: '',
      sampleParam: '',
      result: '',
      testMethod: ''
    });
    setShowModal(false);
    setIsEditing(false);
    setEditingIndex(null);
  }

  const closeModal = () => {
    setReportDetails({
      labCode: '',
      sampleCode: '',
      sampleDescription: '',
      sampleParam: '',
      result: '',
      testMethod: ''
    });
    setShowModal(false);
    setIsEditing(false);
    setEditingIndex(null);
  }

  const submitForm = async (e) => {
    e.preventDefault();
    const form = { ...result };
    await axios.put(`http://localhost:8001/api/report/update/report/${id}`, form, {
      withCredentials: true,
    })
      .then((response) => {
        setResult({
          customerName: "",
          customerAddress: "",
          customerContact: "",
          dateReceived: "",
          datePerformed: "",
          dateIssued: "",
          reportId: "",
          analyzedBy: ""
        })
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    axios.get(`http://localhost:8001/api/report/reportData/${id}`)
      .then((response) => {
        setResult(response.data)
      })
      .catch((error) => {
        console.error("Error fetching report details", error)
        setResult(null)
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
          <div className='head bg-dark container'>

            <div className='mt-1'>
              <i className='bi bi-info-circle text-white fs-5 ms-1 me-1' />
              <span className='ms-2 fs-5 text-white'>ROA Form</span>
            </div>
          </div>
          <form className='mt-4 mb-4' onSubmit={submitForm}>
            <div className='container-fluid mt-3 '>
              <div className='row mt-4'>
                <label htmlFor="clientType" className='col-md-3 col-form-label'>Report Id: </label>
                <div className='col-md-3 d-flex justify-content-end'>
                  <input type="tel" className="date form-control" name='reportId' onChange={inputHandler} value={result.reportId} placeholder="" />
                </div>

                <label htmlFor="clientType" className='testMethod col-md-3 col-form-label '>Analyzed By: </label>
                <div className='col-md-3 d-flex justify-content-end'>
                  <select className='form-select' name='analyzedBy' onChange={inputHandler} value={result.analyzedBy}>
                    <option defaultValue="Choose...">Choose...</option>
                    <option value="Katrina Louise C. Gonzales">Katrina Louise C. Gonzales</option>
                    <option value="Mellen B. Perion">Mellen B. Perion</option>
                    <option value="Danica Mae B. Rodriguez">Danica Mae B. Rodriguez</option>
                  </select>
                </div>
              </div>





              <div className='row mt-4'>


                <div className='col-md '>

                  {/*Date Issued*/}
                  <div className='row'>
                    <label className='col-md-6 col-form-label '>Date Issued: </label>
                    <div className='col-md-6'>
                      <div className="row-sm">
                        <input type="date" className="date form-control" name='dateIssued' onChange={inputHandler} value={result.dateIssued} placeholder="" />
                      </div>
                    </div>
                  </div>

                  {/*Date Received*/}
                  <div className='row mt-4'>
                    <label className='col-md-6 col-form-label '>Date Received: </label>
                    <div className='col-md-6'>
                      <div className="row-sm">
                        <input type="date" className="date form-control" name='dateReceived' onChange={inputHandler} value={result.dateReceived} placeholder="" />
                      </div>
                    </div>
                  </div>

                </div>

                {/*Date Performed*/}
                <div className="col">
                  <div className='col-md'>
                    <div className='row'>
                      <label className="datePerformed col-md-6 col-form-label">Date Performed:</label>
                      <div className='col-md-6'>
                        <input type="text" className="date form-control" id="datePerformed" name="datePerformed" onChange={inputHandler} value={result.datePerformed} placeholder="" />
                      </div>
                    </div>
                  </div>

                  <div className="fromTo row mt-4">

                    {/*FROM*/}
                    <div className="col-sm-5">
                      <div className="row ">
                        <label className="col-sm-4 col-form-label">From</label>
                        <div className="col-md-8">
                          <input
                            type="date"
                            className="form-control"
                            id="datePerformedFrom"
                            name="datePerformedFrom"
                            onChange={inputHandler}
                            value={dateFrom}

                          />
                        </div>
                      </div>
                    </div>

                    {/*TO*/}
                    <div className="col-sm-5">
                      <div className="row ">
                        <label className="col-sm-4 col-form-label ">To</label>
                        <div className="col-md-8">
                          <input
                            type="date"
                            className="form-control"
                            id="datePerformedTo"
                            name="datePerformedTo"
                            onChange={inputHandler}
                            value={dateTo}

                          />
                        </div>
                      </div>
                    </div>

                    {/*BUTTON*/}
                    <div className='col-sm d-flex align-items-center justify-content-center'>
                      <button type='button' className='btn btn-primary' onClick={addDateRange}><i className="bi bi-plus-lg fs-8"></i></button>
                    </div>
                  </div>
                </div>

              </div>
            </div>

            <div className='container-fluid shadow-sm border border-secondary border-1 mt-3'>
            </div>

            <div className='container-fluid mt-3 '>
              <div className='row mt-4'>
                <label htmlFor="clientType" className='col-md-3 col-form-label '>Client/Customer Name: </label>
                <div className='col-md-3'>
                  <div className="col-sm">
                    <input type="tel" className="date form-control" name='customerName' onChange={inputHandler} value={result.customerName} placeholder="" />
                  </div>
                </div>
                <label className='ItemNum col-md-3 col-form-label'>Contact No./Email: </label>
                <div className='col-md-3 d-flex justify-content-end'>
                  <input type="tel" className="form-control" id="mobile" name='customerContact' onChange={inputHandler} value={result.customerContact} placeholder="" />
                </div>
              </div>
              <div className='row mt-4'>
                <label htmlFor="clientType" className='col-md-3 col-form-label '>Address: </label>
                <div className='col-md-3'>
                  <div className="col-sm">
                    <input type="tel" className="date form-control" name='customerAddress' onChange={inputHandler} value={result.customerAddress} placeholder="" />
                  </div>
                </div>
              </div>
            </div>

            <div className='container-fluid border border-secondary border-1 mt-3'></div>


            <div className='d-flex justify-content-end mt-3'>
              <button
                type="button"
                className="btn btn-primary" onClick={() => setShowModal(true)}>
                <i className="bi bi-plus-lg me-2 fs-6"></i>Add Sample Details
              </button>
            </div>

            {/*Table for ROA Details */}
            <div className="row mt-2">
              <div className="col-12">
                <table className="table table-bordered">
                  <thead className="table-primary">
                    <tr className='text-center'>
                      <th>LAB CODE</th>
                      <th>SAMPLE CODE</th>
                      <th>SAMPLE DESCRIPTION</th>
                      <th>PARAMETER</th>
                      <th>RESULT</th>
                      <th>TEST METHOD</th>
                      <th>ACTION</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.roaDetails && result.roaDetails.length > 0 ? (
                      result.roaDetails.map((reportItem, index) => (
                        <tr key={index}>
                          <td>{reportItem.labCode}</td>
                          <td>{reportItem.sampleCode}</td>
                          <td>{reportItem.sampleDescription}</td>
                          <td>{reportItem.sampleParam}</td>
                          <td>{reportItem.result}</td>
                          <td>{reportItem.testMethod}</td>
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
                              onClick={() => deleteReport(index)}
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

            <div className='col-md-6 gap-3 offset-md-6 d-flex justify-content-end pe-3'>
              <button type="button" className="btn btn-primary col-md-2" onClick={() => navigate(backRoute)}>Back</button>
              <button type="submit" className="btn btn-primary col-md-2" onClick={submitForm}>Save</button>
            </div>
          </form>

        </div>
      </div>
      <RoaModal
        show={showModal}
        onClose={closeModal}
        reportDetails={reportDetails}
        onChange={reportInputHandler}
        onSubmit={submitReport}
      />
    </div>
  )
}

export default UpdateReport