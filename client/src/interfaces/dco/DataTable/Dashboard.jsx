import React, { useState, useEffect } from "react";
import DataTable from "react-data-table-component";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Dashboard() {
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [activities, setActivities] = useState([]);

    const formatDate = (dateStr) => {
        if (!dateStr) return "";
        const date = new Date(dateStr);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get("http://localhost:8001/api/activity/recentActivities");
                setActivities(response.data);   
                setFilteredData(response.data);
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
            width: "120px",
        },
        {
            name: "Transaction Date",
            selector: (row) => formatDate(row.createdAt),
            sortable: true,
        },
        {
            name: "Request No.",
            selector: (row) => row.itemId,
            sortable: true,
        },

        {
            name: "Document",
            selector: (row) => row.fileType,
            sortable: true,
        },

        {
            name: "User",
            selector: (row) => row.userName,
            sortable: true,
        },
        {
            name: "Status",
            selector: (row) => row.action,
            sortable: true,
            cell: (row) => (
                <span className={`badge ${row.status === "Approved" ? "bg-success" : "bg-secondary"}`}>
                    {row.action}
                </span>
            ),
        },
    ];

    React.useEffect(() => {
        const filtered = activities.filter((item) =>
            Object.values(item)
                .join(" ")
                .toLowerCase()
                .includes(search.toLowerCase())
        );
        setFilteredData(filtered);
    }, [search, activities]);

    const customStyles = {
        headRow: {
            style: {
                backgroundColor: "#339399",
                color: "#fff",
                fontSize: "17px",
                fontWeight: "bold",
                fontFamily: 'Calibri, sans-serif',
            },
        },
        rows: {
            style: {
                fontSize: "1rem",
                minHeight: "48px",
                
            },
        },
        cells: {
            style: {
                 fontFamily: 'Calibri, sans-serif',
                 fontSize: '16px',
                
            },
        },
        pagination: {
            style: {
                borderTop: '1px solid #e5e5e5',
            },
        },
    };

    const navigate = useNavigate();
    return (
        <div className="card shadow-sm p-2 mb-4">
            <h2 className="mb-3 text-dark   " style={{fontFamily:'Calibri, sans-serif', fontWeight:'bold'}}>Recent Activity</h2>
            <input
                type="text"
                className="form-control mb-3"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ maxWidth: "300px" }}
            />
            <DataTable
                columns={columns}
                data={filteredData.map((row, index) => ({ ...row, index: index + 1 }))}
                noDataComponent="No data available"
                pagination
                paginationPerPage={5}
                paginationRowsPerPageOptions={[5, 10]}
                striped
                customStyles={customStyles}
            />
        </div>
    );
}