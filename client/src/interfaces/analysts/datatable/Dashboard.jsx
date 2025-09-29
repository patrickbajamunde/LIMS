import React, { useState } from "react";
import DataTable from "react-data-table-component";


const data = [
        {
            itemNo: 1,
            transactionDate: "2024-10-01",
            requestNo: "REQ-001",
            status: "Released",
        },
    ];
export default function Dashboard() {
    const [search, setSearch] = useState("");
    const [filteredData, setFilteredData] = useState([]);

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
            name: "Status",
            selector: (row) => row.status,
            sortable: true,
        },
    ];


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
    }, [search]);

    return (
        <React.Fragment>
            <h1>Recent Transactions</h1>
            <input
                type="text"
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ marginBottom: "10px", padding: "5px", width: "25%", border:"none", boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}
            />

            <div style={{ boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)" }}>
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