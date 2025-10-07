import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import TestPdf from "../generatePdf/testPdf";
import axios from "axios";
import { Link } from "react-router-dom";

export default function HVCrops() {
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [client, setclient] = useState([]);

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8001/api/client/userRequest", {
                    withCredentials: true,
                });

                const regOnly = response.data.filter(clientData => clientData.clientType === "High Value Crops Program");
                setclient(regOnly);
                setFilteredData(regOnly); // Initialize the table with fetched data
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        };
        fetchData();
    }, []);
    const deletRequest = async (arfId) => {
        try {
            //confirm first if the user wants to delete the data
            const confirmDelete = window.confirm("Are you sure you want to delete this request?");
            if (!confirmDelete) return;

            //if confirmDelete is true send a DELETE request from the API
            await axios.delete(`http://localhost:8001/api/client/delete/arf/${arfId}`, {
                withCredentials: true,
            });


            // this function creates a new array excluding the item whose ._id is equal to the arfId thus "deleting" the item
            setclient(prev => prev.filter(item => item._id !== arfId));
            setFilteredData(prev => prev.filter(item => item._id !== arfId));

            alert("Request deleted successfully.");
        } catch (error) {
            console.error("Error deleting request", error);
            alert("Failed to delete the request.");
        }

    };

    const columns = [
        {
            name: "Item No.",
            selector: (row) => row.index,
            sortable: true,
        },
        {
            name: "Transaction Date",
            selector: (row) => formatDate(row.transactionDate),
            sortable: true,
        },
        {
            name: "Request No.",
            selector: (row) => row.requestId,
            sortable: true,
        },
        {
            name: "Sample Description",
            cell: (row) => (
                <div style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap", // This is the key change: prevents text from wrapping
                    maxWidth: "200px"
                }}>
                    {row.sampleDetails.map(s => s.sampleDescription)}
                </div>
            )
        },
        {
            name: "Parameter",
            cell: (row) => (
                <div style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap", // This is the key change: prevents text from wrapping
                    maxWidth: "200px"
                }}>
                    {row.sampleDetails.map(s => s.parameterReq)}
                </div>
            ),
            sortable: true,
        },
        {
            name: "Test Method",
            cell: (row) => (
                <div style={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap", // This is the key change: prevents text from wrapping
                    maxWidth: "200px"
                }}>
                    {row.sampleDetails.map(s => s.methodReq)}
                </div>
            ),
            sortable: true,
        },

        {
            name: "Action",
            cell: (row) => (
                <div className="d-flex align-items-center gap-2">
                    <button type="button" className="btn p-0 border-0 " onClick={() => deletRequest(row._id)}><i className="bi bi-trash text-danger "></i></button>
                    <Link
                        to={`/Dco/updateArf/${row._id}`}
                        state={{from: '/Dco/HVCrops/'}}
                        type="button"
                        className="btn p-0 border-0"><i className="bi bi-pencil-square text-success "></i>
                    </Link>
                    <TestPdf
                        requestId={row._id}
                        icon={<i className="bi bi-box-arrow-down text-primary"></i>}
                        disabledIcon={<i className="bi bi-box-arrow-down text-secondary"></i>}
                    />
                    <Link to={`/Dco/requestDetails/${row._id}`} state={{from: '/Dco/HVCrops/'}} type="button" className="btn p-0 border-0"><i class="bi bi-eye"></i></Link>
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


    const handleAction = (row) => {
        alert(`Action clicked for ${row.sampleDescription}`);
    };

    // Filter the data based on the search term
    React.useEffect(() => {
        const filtered = client.filter((item) =>
            Object.values(item)
                .join(" ")
                .toLowerCase()
                .includes(search.toLowerCase())
        );
        setFilteredData(filtered);
    }, [search, client]);

    const navigate = useNavigate();
    return (
        <React.Fragment>
            <h1>High Value Crops</h1>
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: "10px", padding: "5px", width: "25%" }}
            />
            <button type="submit" className="new btn btn-primary row-md-3 ms-2" onClick={() => navigate("/Dco/Arf")}>
                Add
            </button>

            <div>
                <DataTable
                    columns={columns}
                    data={filteredData.map((row, index) => ({ ...row, index: index + 1 }))} // Now using filtered API data
                    noDataComponent="No data available"
                    pagination
                />
            </div>
        </React.Fragment>
    );
}
