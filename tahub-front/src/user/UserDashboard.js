import React from 'react';
import  { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';
import { getApplications } from './apiUser'; 

const Dashboard =() =>{

    const {user:{_id,fname,lname,email,role}} = isAuthenticated()
    const [userApplications, setUserApplications] = useState([]);
    const [jobNameFromLocalStorage, setJobNameFromLocalStorage] = useState('');
    const userLinks =() => {
        return (
            <div className="card">
                <h4 className="card-header">User Links</h4>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <Link className="nav-link" to="/user/dashboard/tapostings">My Jobs</Link>
                        </li>
                        <li className="list-group-item">
                        <Link className="nav-link" to={`/profile/${_id}`}>Update Profile</Link>                 
                        </li>
                      
                    </ul>
            </div>
        )
    }; 
    useEffect(() => {
        // Fetch user's applications when the component mounts
        getApplications(_id) // Pass the user ID to fetch specific user's applications
            .then(data => {
                setUserApplications(data);
            })
            .catch(error => {
                console.error('Error fetching user applications:', error);
            });
            const jobName = localStorage.getItem('jobName');
        if (jobName) {
            setJobNameFromLocalStorage(jobName);
        }
    }, [_id]);

    const userInfo=() =>{
        return(
            <div className="card mb-5">
            <h3 className ="card-header">User Information</h3>
            <ul className="list-group">
                <li className="list-group-item text-success">{fname}{lname}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">
                    {role ===1 ? 'Admin ' : 'TA User'}
                 </li>
            </ul>
        </div>
        )
    }

    const applicationHistory =() =>{
        return (
            <div className="card mb-5">
                <h3 className="card-header">My Applications</h3>
                <ul className="list-group">
                    {userApplications.map(application => (
                        <li key={application._id} className="list-group-item">
                            <div className="card border-0 bg-light rounded shadow">
                                {/* Render application details */}
                                <div className="card-body p-4">
                                    {/* Render application card details based on fetched data */}
                                    <h5 className="mb-4">Application Information:</h5>
                                    {/* Display application details similar to previous code */}
                                    {/* application.fname, application.lname, etc. */}
                                    <p className="card-text font-weight-bold">Course Applied for TA: {jobNameFromLocalStorage}</p>
                                    {localStorage.getItem(`status_${application._id}`) || 'Yet to review'}
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }



    return (
        <Layout title="Dashboard" description ={`Hello ${fname}${lname}.Welcome!`} className="container-fluid">
                <div className="row">
                    <div className="col-sm-3">
                        {userLinks()}
                    </div>
                    <div className="col-sm-9">
                        {userInfo()}
                        {applicationHistory()}
                    </div>
                </div>
 
            
        </Layout>
    )
}

export default Dashboard;