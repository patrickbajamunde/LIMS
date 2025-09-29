import axios from "axios";
import React, { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom";


function SampleData() {

    const [sample, setSamples] = useState(null);
    const{id} = useParams();

    useEffect(()=> {
        axios.get(`http://localhost:8001/api/samples/${id}`)
        .then((response) => {
            setSamples(response.data);
        })
        .catch((error) => {
            console.error("Error fetching user:", error); // More descriptive error message
            setSamples(null);
        });
    }, [id]);
    return (
        <div className="d-flex reg-analysis">
            <div className="analysis container-fluid mb-5">
            <Link to ="/Analysts/Analysis" type="button" className="btn btn-secondary">
                Back
            </Link>
            <h3></h3>
                <div className="display-data">
                    {sample ? (
                        <>
                        <div className="inputGroup">
                            <label htmlFor="Description">Description:</label>
                            <p>{sample.sampleDescription}</p>
                        </div>

                        <div className="inputGroup">
                            <label htmlFor="Parameter">Parameter:</label>
                            <p>{sample.testParameter}</p>
                        </div>

                        <div className="inputGroup">
                            <label htmlFor="resulst">Results:</label>
                            <p>{sample.sampleResult}</p>
                        </div>
                    </>
                    ) : (
                        <p>Loading user details...{/* Or "User not found" if you prefer */}</p>
                    )}
                </div>
            </div>
        </div>
  )
}

export default SampleData