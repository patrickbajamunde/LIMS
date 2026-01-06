import React from 'react'
import '../forms/styles/arf.css'
import axios from 'axios';
import { useState, useEffect } from 'react';
import { RoaModal } from '../components/modal/Modal';
import { useParams, useLocation, useNavigate } from 'react-router-dom';

function GenerateRoa() {

    const defReportId = () => {
        const now = new Date()
        const year = now.getFullYear();
        const month = String(now.getMonth() + 1).padStart(2, '0')

        const rfcal = 'RFCAL'
        const roa = 'ROA';

        const numberSeries = '0000';
        return `${year}-${month}-${rfcal}-${roa}-${numberSeries}`
    }

    const report = {
        customerName: "",
        customerAddress: "",
        customerContact: "",
        dateReceived: "",
        datePerformed: "",
        dateIssued: "",
        reportId: defReportId(),
        analyzedBy: "",
        analyzedBy2: "",
        status: "For release"
    }

    const analystPRC = (analyzedBy) => {
        const PrcTable = {
            "Katrina Louise C. Gonzales": "0015522",
            "Danica Mae B. Rodriguez": "0015235",
            "Mellen B. Perion": "0015215",
        }
        return PrcTable[analyzedBy] || "";
    }

    const designation = (analyzedBy) => {
        const DesignationTable = {
            "Katrina Louise C. Gonzales": "Chemist",
            "Danica Mae B. Rodriguez": "Chemist",
            "Mellen B. Perion": "Chemist",
        }
        return DesignationTable[analyzedBy] || "";
    }

    const [result, setResult] = useState(report);
    const [dateFrom, setDateFrom] = useState('');
    const [dateTo, setDateTo] = useState('');
    const [showModal, setShowModal] = useState(false)
    const [roaReport, setRoaReport] = useState([]) //holds sample details in an array
    const [attachmentData, setAttachmentData] = useState([]);
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
            const position = designation(value);
            setResult({
                ...result,
                [name]: value,
                analystPRC: prc,
                position: position
            });
        } else if (name === 'analyzedBy2') {
            const prc = analystPRC(value);
            const position = designation(value);
            setResult({
                ...result,
                [name]: value,
                analystPRC2: prc,
                position2: position
            });
        }

        else if (name === 'datePerformedFrom') {
            setDateFrom(value);
        }
        else if (name === 'datePerformedTo') {
            setDateTo(value);
        }
        else {
            setResult({ ...result, [name]: value });
        }
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
    ]

    const methodList = (sampleParam) => {
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

        return methodTable[sampleParam] || "";
    }

    const checkboxHandler = (e) => {
        const { value, checked } = e.target;
        setSelectedParameters(prev => {
            const next = checked ? [...prev, value] : prev.filter(p => p !== value);

            // update the modal draft sampleDetail so the inputs show current selection
            setReportDetails(prevDetail => ({
                ...prevDetail,
                sampleParam: next.join(", "),
                testMethod: getMethodsForParameters(next)
            }));

            return next;
        });
    }

    const getMethodsForParameters = (parametersArray) => {
        return parametersArray.map(p => methodList(p)).filter(Boolean).join(", ");
    }

    const [selectedParameters, setSelectedParameters] = useState([]);

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
        const reportToEdit = roaReport[index];
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
            const updatedReport = roaReport.filter((_, i) => i !== index); // Changed from result.roaDetails
            setRoaReport(updatedReport); // Update roaReport state directly
        }
    }

    const reportSubmit = (e) => {
        if (isEditing && editingIndex !== null) {
            // Update existing entry
            const updatedReport = roaReport.map((item, index) =>
                index === editingIndex ? reportDetails : item
            );
            setRoaReport(updatedReport);
        } else {
            // Add new entry
            setRoaReport([...roaReport, reportDetails]);
        }

        // Reset form
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
        const form = { ...result, roaDetails: roaReport };
        await axios.post("http://localhost:8001/api/report/newReport", form, {
            withCredentials: true,
        })
            .then((response) => {
                setRoaReport([])
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
                console.log("Report created successfully.")
            })
            .catch((error) => {
                console.log(error)
            })
    }


    useEffect(() => {
        axios.get(`http://localhost:8001/api/client/getClient/${id}`)
            .then((response) => {
                const clientData = response.data;
                const mapSampleDetails = clientData.sampleDetails.map(index => ({
                    labCode: index.labCode,
                    sampleCode: index.sampleCode,
                    sampleDescription: index.sampleDescription,
                    sampleParam: index.parameterReq,
                    testMethod: index.methodReq
                }))

                const arfAttachmentData = clientData.ArfAttachment.map(index => ({
                    labCode: index.labCode,
                    sampleCode: index.sampleCode,
                    sampleDescription: index.sampleDescription,
                    sampleParam: index.parameterReq,
                    testMethod: index.methodReq,
                    Barangay: index.Barangay,
                    Municipality: index.Municipality,
                    Province: index.Province,
                }))

                const combineData = [...mapSampleDetails, ...arfAttachmentData]

                setResult(prevResult => ({
                    ...prevResult,
                    customerName: clientData.clientName,
                    customerAddress: clientData.clientAddress,
                    customerContact: clientData.clientEmail,
                }))

                setRoaReport(combineData);
            })
            .catch((error) => {
                console.error("Error fetching report details", error)
                setResult(null)
            })
    }, [id]);

    return (
        <div className='d-flex mt-3'>
            <div className=' analysis card container-fluid shadow-sm border bordered-darker mb-5'>
                <div className='row g-6'>
                    <div className='head container rounded-top' style={{ backgroundColor: '#003e8fff' }}>
                        <div className='mt-1'>
                            <i className='bi bi-info-circle text-white fs-5 ms-1 me-1' />
                            <span className='ms-2 fs-5 text-white'>ROA Form</span>
                        </div>
                    </div>

                    <form className='mt-4 mb-4' onSubmit={submitForm}>
                        <div className='card p-4 mb-3 shadow-sm border'>
                            <h5 className='mb-4 text-primary fw-bold'>Report Details</h5>
                            <div className="row g-4">
                                <div className="col-md-6">
                                    <label className='form-label'>Report Id: </label>
                                    <input type="tel" className="date form-control border border-dark" name='reportId' id='reportId' onChange={inputHandler} value={result.reportId} placeholder="" />
                                </div>
                                <div className="col-md-6">
                                    <label className='form-label '>Analyzed By: </label>
                                    <select className='form-select border border-dark' name='analyzedBy' onChange={inputHandler} value={result.analyzedBy}>
                                        <option defaultValue="Choose...">Choose...</option>
                                        <option value="Katrina Louise C. Gonzales">Katrina Louise C. Gonzales</option>
                                        <option value="Mellen B. Perion">Mellen B. Perion</option>
                                        <option value="Danica Mae B. Rodriguez">Danica Mae B. Rodriguez</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className='form-label '>Date Issued: </label>
                                    <input type="date" className="date form-control border border-dark" name='dateIssued' onChange={inputHandler} value={result.dateIssued} placeholder="" />
                                </div>

                                <div className="col-md-6">
                                    <label className='form-label '>Analyzed By: </label>
                                    <select className='form-select border border-dark' name='analyzedBy2' onChange={inputHandler} value={result.analyzedBy2}>
                                        <option defaultValue="Choose...">Choose...</option>
                                        <option value="Katrina Louise C. Gonzales">Katrina Louise C. Gonzales</option>
                                        <option value="Mellen B. Perion">Mellen B. Perion</option>
                                        <option value="Danica Mae B. Rodriguez">Danica Mae B. Rodriguez</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <label className='form-label '>Date Received: </label>
                                    <input type="date" className="date form-control border border-dark" name='dateReceived' onChange={inputHandler} value={result.dateReceived} placeholder="" />
                                </div>
                                <div className="col-md-6">
                                    <div className="col">
                                        <div className='col-md'>
                                            <div className='row'>
                                                <label className="col-md-3 col-form-label">Date Performed:</label>
                                                <div className='col-md-9'>
                                                    <input type="text" className="date form-control border border-dark" id="datePerformed" name="datePerformed" onChange={inputHandler} value={result.datePerformed} placeholder="" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className=" row mt-4">

                                            {/*FROM*/}
                                            <div className="col-sm-5">
                                                <div className="row ">
                                                    <label className="col-sm-4 col-form-label">From</label>
                                                    <div className="col-md-8">
                                                        <input
                                                            type="date"
                                                            className="form-control border border-dark"
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
                                                    <label className="col-sm-4 col-form-label">To</label>
                                                    <div className="col-md-8">
                                                        <input
                                                            type="date"
                                                            className="form-control border border-dark"
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



                        </div>

                        {/*BORDER*/}
                        <div className='container-fluid shadow-sm border border-secondary border-1 mt-3 mb-3'>
                        </div>

                        {/*Customer Details*/}
                        <div className='card p-4 mb-3 shadow-sm border'>
                            <h5 className='mb-4 text-primary fw-bold'>Customer Details</h5>
                            <div className='row g-4'>
                                <div className="col-md-6">
                                    <label htmlFor="clientType" className='form-label'>Client/Customer Name: </label>
                                    <input type="tel" className="date form-control border border-dark" name='customerName' onChange={inputHandler} value={result.customerName} placeholder="" />
                                </div>
                                <div className="col-md-6">
                                    <label className='form-label'>Contact No./Email: </label>
                                    <input type="tel" className="form-control border border-dark" id="mobile" name='customerContact' onChange={inputHandler} value={result.customerContact} placeholder="" />
                                </div>
                                <div className="col-md-6">
                                    <label htmlFor="clientType" className='form-label '>Address: </label>
                                    <input type="tel" className="date form-control border border-dark" name='customerAddress' onChange={inputHandler} value={result.customerAddress} placeholder="" />
                                </div>
                            </div>
                        </div>

                        {/*BORDER*/}
                        <div className='container-fluid border border-secondary border-1 mt-3 mb-3'></div>

                        {/*ROA Details*/}

                        <div className='card p-4 mb-3 shadow-sm border'>
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
                                            {roaReport && roaReport.length > 0 ? (
                                                roaReport.map((reportItem, index) => (
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
                        </div>


                        <div className='col-md-6 gap-3 offset-md-6 d-flex justify-content-end pe-3'>
                            <button type='button' className="btn btn-primary text-white fw-bold" onClick={() => navigate(backRoute)}>
                                <span className='text-white fw-bold ps-4 pe-4'>Back</span>
                            </button>
                            <button className="btn btn-primary col-md-2">Save</button>
                        </div>
                    </form>

                </div>
            </div>
            <RoaModal
                show={showModal}
                onClose={() => setShowModal(false)}
                reportDetails={reportDetails}
                onChange={reportInputHandler}
                onSubmit={reportSubmit}
                availableParameters={availableParameters}
                selectedParameters={selectedParameters}
                checkboxHandler={checkboxHandler}
            />
        </div>
    )
}

export default GenerateRoa