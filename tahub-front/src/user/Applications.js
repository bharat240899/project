import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { getApplications } from "./apiUser";
import {Link} from 'react-router-dom';
const Applications = () => {
    const [applications, setApplications] = useState([]);
    const [jobNameFromLocalStorage, setJobNameFromLocalStorage] = useState('');
    useEffect(() => {
        getApplications().then((data) => {
            setApplications(data);
            console.log(data);
        });
        const jobName = localStorage.getItem('jobName');
        if (jobName) {
            setJobNameFromLocalStorage(jobName);
        }
    }, []);

    const displayPdfInNewTab = (resumeData) => {
        try {
            if (!resumeData) {
                return;
            }

            const pdfData = atob(resumeData);
            const uint8Array = new Uint8Array(pdfData.length);
            for (let i = 0; i < pdfData.length; i++) {
                uint8Array[i] = pdfData.charCodeAt(i);
            }

            const blob = new Blob([uint8Array], { type: "application/pdf" });
            const url = URL.createObjectURL(blob);

            // Open PDF in a new tab
            window.open(url, '_blank');

        } catch (error) {
            console.error("Error opening PDF in new tab:", error);
        }
    };
    const handleSelect = (applicationId) => {
        // Logic for selecting an application
        alert(`Selected application with ID: ${applicationId} TA USER will get this status update`);
        const selectionStatus = 'Selected'; 

        // Store the selection status in local storage
        localStorage.setItem(`status_${applicationId}`, selectionStatus);
    };

    const handleReject = (applicationId) => {
        // Logic for rejecting an application
        alert(`Application is rejected with ID: ${applicationId} TA USER will get this status update`);
        const rejectionStatus = 'Rejected';

        // Store the rejection status in local storage
        localStorage.setItem(`status_${applicationId}`, rejectionStatus);
    };
    return (
        <Layout title="Applications">
            <div className="col-lg-4 col-md-6 col-12 mt-4 pt-2">
                {applications.map((application) => (
                    <div key={application._id} className="card border-0 bg-light rounded shadow">
                        <div className="card-body p-4">
                            <h5 className="mb-4">Applicant Profile:</h5>
                            <p className="card-title font-weight-bold">
                                {application.fname} {application.laname}
                            </p>
                            <p className="card-text font-weight-bold">Z-number: {application.znumber}</p>
                            <p className="card-text font-weight-bold">Course Applied for TA: {jobNameFromLocalStorage}</p>
                            {application.relevant_courses && (
                                <p className="card-text font-weight-bold">
                                    Relevant courses: {application.relevant_courses}
                                </p>
                            )}
                            <a
                                href="#"
                                style={{ textDecoration: 'underline', cursor: 'pointer' }}
                                onClick={(e) => {
                                    e.preventDefault();
                                    displayPdfInNewTab(application.resume);
                                }}
                            >
                                Click here to view resume in new tab
                            </a>
                            <button
                                className="btn btn-success mt-2 mr-2"
                                onClick={() => handleSelect(application._id)}
                            >
                                Select
                            </button>
                            <button
                                className="btn btn-danger mt-2"
                                onClick={() => handleReject(application._id)}
                            >
                                Reject
                            </button>
                        </div>
                    </div>
                ))}

            </div>
        </Layout>
    );
};

export default Applications;
