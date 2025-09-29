import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import axios from "axios";
import './styles/dataStyles.css'
import { Link } from "react-router-dom";
import PrintSample from "../generatepdf/PrintSample";
import { useNavigate } from "react-router-dom";

export default function DataAnalysis() {
    const [search, setSearch] = useState("");
    const [sample, setSample] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8001/api/userSamples",{
                    withCredentials: true,
                });
                setSample(response.data);
                setFilteredData(response.data); // Initialize the table with fetched data
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        };
        fetchData();
    }, []);
    

    const columns = [
        {
            name: "Item No.",
            selector: (row) => row.index,
            sortable: true,
        },
        {
            name: "Transaction Date",
            selector: (row) => row.transactionDate,
            sortable: true,
        },
        {
            name: "Lab Code",
            selector: (row) => row.sampleCode,
            sortable: true,
        },
        {
            name: "Sample Description",
            selector: (row) => row.sampleDescription,
        },
        {
            name: "Parameter",
            selector: (row) => row.testParameter,
            sortable: true,
        },
        {
            name: "Test Method",
            selector: (row) => row.testMethod,
            sortable: true,
        },
        {
            name: "Result",
            selector: (row) => row.sampleResult,
            sortable: true,
        },
        {
                    name: "Action",
                    cell: (row) => (
                        <div className="d-flex align-items-center gap-2">
                          <button type="button" class="btn p-0 border-0 "><i class="bi bi-trash text-danger "></i></button>
                          <button
                            type="button"
                            className="btn p-0 border-0"
                            onClick={() => setShowModal(true)}><i class="bi bi-pencil-square text-success "></i></button>
        
                          {showModal && (
                            <div
                            className="modal fade show"
                            style={{ display: "block", backgroundColor: "rgba(0,0,0,0.5)" }}
                            tabIndex="-1"
                            >
                            <div className="modal-dialog" role="document">
                                <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title" id="exampleModalLabel">
                                    Update entry
                                    </h5>
                                    
                                </div>
                                <div className="modal-body">
                                    <form>
                                    <div className="form-group">
                                        <label htmlFor="recipient-name" className="col-form-label">
                                        Sample Description:
                                        </label>
                                        <input
                                        type="text"
                                        className="form-control"
                                        id="recipient-name"
                                        />
                                    </div>
                                    <div className="form-group">
                                        <label for="clientType" className='col-form-label'>Parameter: </label>
                                        <div>
                                            <select id='clientType' className='form-select'>
                                            <option selected>Choose...</option>
                                                <option value="1">Crude Protein</option>
                                                <option value="2">Mpisture</option>
                                                <option value="3">Crude Fiber</option>
                                                <option value="4">Crude Fat</option>
                                                <option value="5">Crude Ash</option>
                                                <option value="6">Calcium</option>
                                                <option value="5">Total Phosporus</option>
                                                <option value="5">Salt as Sodium Chloride</option>
                                                <option value="5">Aflatoxin</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label for="clientType" className='col-form-label'>Status: </label>
                                        <div>
                                            <select id='clientType' className='form-select'>
                                            <option selected>Choose...</option>
                                                <option value="1">Status 1</option>
                                                <option value="2">Status 2</option>
                                                <option value="3">Status 3</option>
                                            </select>
                                        </div>
                                    </div>
                                    </form>
                                </div>
                                <div className="modal-footer">
                                    <button
                                    type="button"
                                    className="btn btn-secondary"
                                    onClick={() => setShowModal(false)}
                                    >
                                    Close
                                    </button>
                                    <button type="button" className="btn btn-primary">
                                    Update
                                    </button>
                                </div>
                                </div>
                            </div>
                            </div>
                        )}
                         <PrintSample sampleId={row._id}/>
                         <Link to={`/Analysts/display/${row._id}`} type="button" class="btn p-0 border-0 "><i class="bi bi-eye"></i></Link>
                        </div>
                      ),
                },
    ];

    const handleAction = (row) => {
        alert(`Action clicked for ${row.sampleDescription}`);
    };

    // Filter the data based on the search term
    useEffect(() => {
        const filtered = sample.filter((item) =>
            Object.values(item)
                .join(" ")
                .toLowerCase()
                .includes(search.toLowerCase())
        );
        setFilteredData(filtered);
    }, [search, sample]); // Dependency on `sample` ensures filtering works with fetched data

    const navigate = useNavigate();
    return (
        <React.Fragment>
            <h1>For Analysis</h1>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{padding: "5px" , width: "25%" }}
            />
                <button type="submit" className="new btn btn-primary row-md-3 ms-2" onClick={() => navigate("/Analysts/AddReport/")}>
                    Add Report
                </button>
            </div>

            <div>
                <DataTable
                    columns={columns}
                    data={filteredData.map((row, index) => ({...row, index: index + 1}))} // Now using filtered API data
                    noDataComponent="No data available"
                    pagination
                />
            </div>
        </React.Fragment>
    );
}
