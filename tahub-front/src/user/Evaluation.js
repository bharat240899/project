import React, { useState, useEffect } from "react";
import Layout from "../core/Layout";
import { isAuthenticated } from "../auth";
import { Link } from "react-router-dom";
import { getUsers } from "./apiUser";
 
const Evaluation = () => {
    const [users, setUsers] = useState([]);

    const { user, token } = isAuthenticated();

    const loadUsers = () => {
        getUsers().then(data => {
            if (data.error) {
                console.log(data.error);
            } else {
                setUsers(data);
            }
        });
    };

    useEffect(() => {
        loadUsers();
    }, []);

    return (
        <Layout
            title="TA Postings"
            description="Browse below TA Job Postings"
            className="container-fluid"
        >
            <div className="row mb-4 pb-4">
                {users.map((u, i) => (
                    <div key={i} className="col-lg-4 col-md-6 col-12 mt-4 pt-2">
                        <div className="card border-0 bg-light rounded shadow">
                            <div className="card-body p-4">
                                <span className="badge rounded-pill bg-primary float-md-end mb-3 mb-sm-0">TA</span>
                                <h5>Name:{u.name}</h5>
                                <div className="mt-3">
                                    <p>Email:{u.email}</p>
                                </div>
                                <div className="mt-3">
                                    <Link className="btn btn-primary" to={`/dashboard/evaluate/${u._id}`}>Evaluate now</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </Layout>
    );
};

export default Evaluation;
