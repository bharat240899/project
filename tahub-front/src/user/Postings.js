    import React, { useState, useEffect } from "react";
    import Layout from "../core/Layout";
    import { isAuthenticated } from "../auth";
    import { Link } from "react-router-dom";
    import {deletePosting,getPostings } from "../admin/apiAdmin";

    const Postings = ({ jobs: currentJobs, setJobs:updateJobs  }) => {
        

        const { user, token } = isAuthenticated();
        const [jobs, setJobs] = useState([]);
        const loadJobs = () => {
            getPostings().then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    setJobs(data);
                }
            });
        };

        const destroy = jobId => {
            deletePosting(jobId, user._id, token).then(data => {
                if (data.error) {
                    console.log(data.error);
                } else {
                    loadJobs();
                }
            });
        };

        useEffect(() => {
            loadJobs();
        }, []);

        return (
            <Layout
                title="TA Postings"
                description="Browse below TA Job Postings"
                className="container-fluid"
            >
            <div className="row mb-4 pb-4">
                {jobs.map((p, i) => (
                    <div key={i} className="col-lg-4 col-md-6 col-12 mt-4 pt-2">
                        <div className="card border-0 bg-light rounded shadow">
                            <div className="card-body p-4">
                                <span className="badge rounded-pill bg-primary float-md-end mb-3 mb-sm-0">Open</span>
                                <h5>{p.coursename}</h5>
                                <div className="mt-3">
                                    <span className="text-muted d-block"><i className="fa fa-university" aria-hidden="true"></i> <a href="#" target="_blank" className="text-muted"> NU,Texas</a></span>
                                    <span className="text-muted d-block"><i className="fa fa-map-marker" aria-hidden="true"></i> USA</span>
                                </div>
                                <div className="mt-3">
                                    <p>{p.description}</p>
                                </div>
                                <div className="mt-3">
                                    <Link className="btn btn-primary" 
                                    onClick={() => localStorage.setItem('jobName', `${p.coursename}`)}
                                    to={`/user/dashboard/apply/${p._id}`}>Apply now</Link>
                                
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            </Layout>
        );
    };

    export default Postings;
