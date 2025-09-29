import React, { useState } from "react";
import DataTable from "react-data-table-component";
import './styles/DataStyles.css'
import { useNavigate } from "react-router-dom";

export default function TestReport() {
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [showModal, setShowModal] = useState(false);

    const columns = [
        {
            name: "Item No.",
            selector: (row) => row.itemNo,
            sortable: true,
        },
        {
            name: "Date conducted",
            selector: (row) => row.DateConducted,
            sortable: true,
        },
        {
            name: "Sample Description",
            selector: (row) => row.sampleDescription,
        },
        {
            name: "Parameter",
            selector: (row) => row.parameter,
            sortable: true,
        },
        {
            name: "Test Method",
            selector: (row) => row.testMethod,
            sortable: true,
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="d-flex align-items-center gap-2">
                  <button type="button" class="btn p-0 border-0 " onClick={() => handleDelete(row)}><i class="bi bi-trash text-danger "></i></button>
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
                  
                </div>
              ),
        },
    ];

    const handleDelete = (row) => {
        const confirmDelete = window.confirm(
            `Are you sure you want to delete ${row.sampleDescription}?`
        );
        if (confirmDelete) {
            const updatedData = data.filter((item) => item.itemNo !== row.itemNo);
            setData(updatedData);
        }
    };

    const [data, setData] = useState (
        [
            {
                itemNo: 1,
                DateConducted: "2024-10-01",
                sampleDescription: "Sample A",
                parameter: "pH Level",
                testMethod: "Method 1",
            },
            {
                itemNo: 2,
                DateConducted: "2024-10-02",
                sampleDescription: "Sample B",
                parameter: "Conductivity",
                testMethod: "Method 2",
            },
            {
                itemNo: 3,
                DateConducted: "2024-10-03",
                sampleDescription: "Sample C",
                parameter: "Salinity",
                testMethod: "Method 3",
            },
            {
                itemNo: 3,
                DateConducted: "2024-10-03",
                sampleDescription: "Sample D",
                parameter: "Salinity",
                testMethod: "Method 3",
            },
            {
                itemNo: 3,
                DateConducted: "2024-10-03",
                sampleDescription: "Sample E",
                parameter: "Salinity",
                testMethod: "Method 3",
            },
            {
                itemNo: 3,
                DateConducted: "2024-10-03",
                sampleDescription: "Sample F",
                parameter: "Salinity",
                testMethod: "Method 3",
            },
            {
                itemNo: 3,
                DateConducted: "2024-10-03",
                sampleDescription: "Sample G",
                parameter: "Salinity",
                testMethod: "Method 3",
            },
           
        ]
    );

    const handleAction = (row) => {
        alert(`Action clicked for ${row.sampleDescription}`);
    };

    // Filter the data based on the search term
    React.useEffect(() => {
        const filtered = data.filter((item) =>
            Object.values(item)
                .join(" ")
                .toLowerCase()
                .includes(search.toLowerCase())
        );
        setFilteredData(filtered);
    }, [search, data]);

    const navigate = useNavigate();

    return (
        
        <React.Fragment>
            <h1>RFCAL Test Reports</h1>
            <div style={{ display: "flex", alignItems: "center", marginBottom: "10px" }}>
                <input
                    type="text"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    style={{ padding: "5px", width: "25%" }}
                />
                <button type="submit" className="new btn btn-primary row-md-3 ms-2" onClick={() => navigate("/Analysts/AddReport/")}>
                    Add Report
                </button>
            </div>

            <div>
            <DataTable
                columns={columns}
                data={filteredData}
                noDataComponent="No data available"
                pagination
            />

            </div>
        </React.Fragment>
    );
}
