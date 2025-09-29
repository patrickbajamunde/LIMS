import React, { useState } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";


export default function DataRoa() {
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
            name: "Transaction Date",
            selector: (row) => row.transactionDate,
            sortable: true,
        },
        {
            name: "Request No.",
            selector: (row) => row.requestNo,
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
            name: "Status",
            selector: (row) => row.status,
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

    const [data, setData] = useState([
        {
            itemNo: 1,
            transactionDate: "2024-10-01",
            requestNo: "REQ-001",
            sampleDescription: "Sample A",
            parameter: "pH Level",
            testMethod: "Method 1",
        },
        {
            itemNo: 2,
            transactionDate: "2024-10-02",
            requestNo: "REQ-002",
            sampleDescription: "Sample B",
            parameter: "Conductivity",
            testMethod: "Method 2",
        },
        {
            itemNo: 3,
            transactionDate: "2024-10-03",
            requestNo: "REQ-003",
            sampleDescription: "Sample C",
            parameter: "Conductivity",
            testMethod: "Method 3",
        },
        {
            itemNo: 4,
            transactionDate: "2024-10-04",
            requestNo: "REQ-004",
            sampleDescription: "Sample D",
            parameter: "Conductivity",
            testMethod: "Method 4",
        },
    ]);

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
            <h1>ROA</h1>
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: "10px", padding: "5px", width: "25%" }}
            />
            <button type="submit" className="new btn btn-primary row-md-3 ms-2" onClick={() => navigate("/Receiving")}>
                Add
            </button>

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