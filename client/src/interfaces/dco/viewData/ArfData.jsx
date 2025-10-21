import React from 'react'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { Link, useParams, useLocation } from 'react-router-dom'
import image1 from '../Components/images/ILD.png';
import './styles/arfData.css'
import TestPdf from "../generatePdf/testPdf";


function ArfData() {

    const [requestData, setRequestData] = useState(null);
    const { id } = useParams();
    const location = useLocation();
    const backRoute = location.state?.from || "/Dco/Walkin/";

    useEffect(() => {
        axios.get(`http://localhost:8001/api/client/getClient/${id}`)
            .then((response) => {
                setRequestData(response.data)
            })
            .catch((error) => {
                console.error("Request not found", error)
                setRequestData(null)
            })
    }, [id]);

    function formatDate(dateStr) {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    return (
        <>
            <div className='d-flex pt-3'>
                <div className='col card border-0 shadow-sm analysis container-fluid mb-5  '>

                    {requestData ? (
                        <>
                            <div className='row card-header text-white ' style={{ backgroundColor: '#003e8fff' }}>
                                <div className="col-auto rounded-circle justify-content-center d-flex align-items-center px-3 bg-white bg-opacity-25">
                                    <i className='bi bi-file-earmark-text fs-1' />
                                </div>
                                <div className="col ">
                                    <div className="row">
                                        <span className='fw-bold fs-2 '>Analysis Request Form</span>
                                        <span className='fs-5 text-decoration-underline'>Request ID: {requestData.requestId}</span>
                                    </div>
                                </div>
                            </div>

                            {/*Client Information */}
                            <div className='row p-3'>
                                <span className='fs-3 px-1 d-flex justify-items-center'><i className='bi bi-person fs-2 me-2 text-success ' />Customer Information</span>
                            </div>
                            <div className='row m-1 p-1 gap-5'>
                                <div className='col'>
                                    <div className='row g-3'>
                                        <div className='card pt-2 pb-2 ps-3'>
                                            <span className='fw-bold text-secondary'>CUSTOMER NAME</span>
                                            <span className='fs-5 fw-semibold'>{requestData.clientName}</span>
                                        </div>
                                        <div className="card pt-2 pb-2 ps-3">
                                            <span className='fw-bold text-secondary'><i className='bi bi-envelope-fill me-2' />CONTACT</span>
                                            <span className='fs-5 fw-semibold'>{requestData.clientEmail}</span>
                                        </div>
                                        <div className="card pt-2 pb-2 ps-3">
                                            <span className='fw-bold text-secondary'>RECEIVED BY</span>
                                            <span className='fs-5 fw-semibold'>{requestData.receivedBy}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className='col'>
                                    <div className='row g-3'>
                                        <div className='card pt-2 pb-2 ps-3'>
                                            <span className='fw-bold text-secondary'><i className='bi bi-geo-alt-fill me-2' />ADDRESS</span>
                                            <span className='fs-5 fw-semibold'>{requestData.clientAddress}</span>
                                        </div>
                                        <div className="card pt-2 pb-2 ps-3">
                                            <span className='fw-bold text-secondary'>CUSTOMERT TYPE</span>
                                            <span className='fs-5 fw-semibold'>{requestData.clientType}</span>
                                        </div>
                                        <div className="card pt-2 pb-2 ps-3">
                                            <span className='fw-bold text-secondary'>GENDER</span>
                                            <span className='fs-5 fw-semibold'>{requestData.clientGender}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Important Dates */}
                            <div className='row p-3 pb-0'>
                                <span className='fs-3 px-1 d-flex justify-items-center'>
                                    <i className='bi bi-calendar-event fs-2 me-2 text-primary' />
                                    Important Dates
                                </span>
                            </div>
                            <div className="row m-1 p-3 gap-5">
                                <div className="col">
                                    <div className='row pt-3 pb-3 border-start border-4 border-primary bg-primary bg-opacity-25 rounded'>
                                        <span className='fw-bold fs-5 text-primary'>Transaction Date</span>
                                        <span>{formatDate(requestData.transactionDate)}</span>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className='row pt-3 pb-3 border-start border-4 border-warning bg-warning bg-opacity-25 rounded'>
                                        <span className='fw-bold fs-5 text-warning'>Sample Disposal</span>
                                        <span>{formatDate(requestData.sampleDisposal)}</span>
                                    </div>
                                </div>

                                <div className="col">
                                    <div className='row pt-3 pb-3 border-start border-4 border-danger bg-danger bg-opacity-25 rounded'>
                                        <span className='fw-bold fs-5 text-danger'>Report Due Date</span>
                                        <span>{formatDate(requestData.reportDue)}</span>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <p>Loading user details...{/* Or "User not found" if you prefer */}</p>
                    )}

                    {/* Sample Details Table */}
                    <div className='row p-3 pb-0'>
                        <span className='fs-3 px-1 d-flex justify-items-center'>
                            <i className='bi bi-file-medical fs-2 me-2 text-danger' />
                            Sample Details
                        </span>
                    </div>
                    <div className='col-12 p-4 '>
                        <div className="table-responsive rounded">
                            <table className='table table-striped table-borderless table-hover'>
                                <thead className='tableHead'>
                                    <tr className='text-center'>
                                        <th>Lab Code</th>
                                        <th>Sample Code</th>
                                        <th>Sample Description</th>
                                        <th>Parameter Requested</th>
                                        <th>Test Method Requested</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {requestData && requestData.sampleDetails.length > 0 ? (
                                        requestData.sampleDetails.map((requestItems, index) => (
                                            <tr className="text-center" key={index}>
                                                <td className='text-primary fw-bold'>{requestItems.labCode}</td>
                                                <td className='text-success fw-bold'>{requestItems.sampleCode}</td>
                                                <td>{requestItems.sampleDescription}</td>
                                                <td className='col-1 text-center'>{requestItems.parameterReq}</td>
                                                <td className='col-5'>{requestItems.methodReq}</td>
                                            </tr>
                                        ))
                                    ) :
                                        (
                                            <tr>
                                                <td colSpan="6" className="text-center">No data available</td>
                                            </tr>
                                        )}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="d-flex flex-wrap gap-2 justify-content-center pb-4">
                        <div className="btn btn-primary text-white">
                            <TestPdf requestId={requestData ? requestData._id : null}
                                icon={<span className='text-white fw-bold'>Generate PDF</span>}
                            />
                        </div>
                        <button className="btn btn-success fw-bold">
                            <Link
                                to={`/Dco/updateArf/${id}`}
                                type="button"
                                className="btn p-0 border-0 text-white fw-bold">Edit Request
                            </Link>
                        </button>
                        <button className="btn btn-danger fw-bold">
                            <Link to={backRoute} type="button" className="btn p-0 border-0 d-flex align-items-center gap-2">
                                <span className='text-white fw-bold ps-4 pe-4'>Back</span>
                            </Link>
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ArfData