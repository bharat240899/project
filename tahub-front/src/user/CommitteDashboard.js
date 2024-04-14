import React from 'react';
import Layout from '../core/Layout';
import {isAuthenticated} from '../auth';
import {Link} from 'react-router-dom';


const CommitteDashboard =() =>{

    const {user:{_id,fname,lname,email,role}} = isAuthenticated()
    const committeLinks =() => {
        return (
            <div className="card">
                <h4 className="card-header">Committe Links</h4>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <Link className="nav-link" to="/committe/dashboard/applications">Review Applications</Link>
                        </li>
                    </ul>
            </div>
        )
    };

    const committeInfo=() =>{
        return(
            <div className="card mb-5">
            <h3 className ="card-header">User Information</h3>
            <ul className="list-group">
                <li className="list-group-item text-success">{fname}{lname}</li>
                <li className="list-group-item">{email}</li>
                <li className="list-group-item">
                    {role ===3 ? 'Committe ' : 'Registerd User'}
                 </li>
            </ul>
        </div>
        )
    }

  



    return (
        <Layout title="Dashboard" description ={`Hello ${fname}${lname}.Welcome!`} className="container-fluid">
                <div className="row">
                    <div className="col-md-3">
                        {committeLinks()}
                    </div>
                    <div className="col-md-9">
                        {committeInfo()}
                       
                    </div>
                </div>

            
        </Layout>
    )
} 

export default CommitteDashboard;