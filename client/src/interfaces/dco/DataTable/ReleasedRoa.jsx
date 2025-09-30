import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import GenerateRoa from "../generatePdf/GenerateRoa";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ReleasedRoa() {
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
                const response = await axios.get("http://localhost:8001/api/dbcontrol/released", {
                    withCredentials: true,
                });
                setclient(response.data);
                setFilteredData(response.data); // Initialize the table with fetched data
            } catch (error) {
                console.log("Error while fetching data", error);
            }
        };
        fetchData();
    }, []);

    //use updateReports API to change status of roa from "for release" to "released"
    const updateStatus = async (roaId, reportId) => {
        try {
            const confirmUpdate = window.confirm(`Do you want to release ${reportId}?`);
            if (!confirmUpdate) return;

            // Call the API to update the status to "Released"
            const response = await axios.put(
                `http://localhost:8001/api/report/update/report/${roaId}`,
                { status: "Released" },
                { withCredentials: true }
            );

            // Option 1: Refetch data from the server, or
            // Option 2: Update state locally; here we update the status in both filteredData and client arrays:
            setclient(prev => prev.map(item => item._id === roaId ? { ...item, status: "Released" } : item));
            setFilteredData(prev => prev.map(item => item._id === roaId ? { ...item, status: "Released" } : item));

            alert(`Report ${reportId} released successfully.`);
        } catch (error) {
            console.error("Error releasing report", error);
            alert("Failed to release ROA");
        }
    };



    const columns = [
        {
            name: "Item No.",
            selector: (row) => row.index,
            sortable: true,
        },
        {
            name: "Date Issued",
            selector: (row) => formatDate(row.dateIssued),
            sortable: true,
        },
        {
            name: "Report I.D.",
            selector: (row) => row.reportId,
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
                    {row.roaDetails.map(param => param.sampleDescription)}
                </div>
            ),
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
                    {row.roaDetails.map(param => param.sampleParam)}
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
                    {row.roaDetails.map(param => param.testMethod)}
                </div>
            ),
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.status,
            cell: (row) => (
                <div className="d-flex justify-content-center">
                    <button className={`btn btn-sm ${row.status === "Released" ? "btn-success" : row.status === "For release" ? "btn-primary" : "btn-secondary"} text-white`} disabled>
                        {row.status}
                    </button>
                </div>
            )
        },
        {
            name: "Action",
            cell: (row) => (
                <div className="d-flex align-items-center gap-2">
                    
                    <GenerateRoa roaId={row._id} 
                        icon={<i className="bi bi-box-arrow-down text-primary"></i>}
                        disabledIcon={<i className="bi bi-box-arrow-down text-secondary"></i>}
                    />
                    <Link to={`/Dco/reportDetails/${row._id}`} state={{ from: '/Dco/Released/' }} type="button" className="btn p-0 border-0"><i class="bi bi-eye"></i></Link>
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
            <h1>Released ROA</h1>
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: "10px", padding: "5px", width: "25%" }}
            />
            <button type="submit" className="new btn btn-primary row-md-3 ms-2" onClick={() => navigate("/Dco/RoaForm/")}>
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
