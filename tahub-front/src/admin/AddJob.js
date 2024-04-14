import React, { useState, useEffect } from 'react';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { createJob,getCategories,  } from './apiAdmin';

const AddJob = () => {
    const { user, token } = isAuthenticated();
    const [values, setValues] = useState({
        coursename: '',
        jobid: '',
        description: '',
        category: '',
        deadline: '',
        loading: false,
        error: '',
        categories: [],
        createdJob: '',
        redirectToProfile: false,
        formData: new FormData(),
    });

    const {
        coursename,
        jobid,
        description,
        category,
        deadline,
        loading,
        error,
        categories,
        createdJob,
        formData,
    } = values;

    // Load categories and set form data
    const init = () => {
        getCategories().then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                setValues({
                    ...values,
                    categories: data,
                });
            }
        });
    };

    useEffect(() => {
        init();
    }, []);

    const handleChange = (name) => (event) => {
        const value = event.target.value;
        // Create a new FormData object
        const updatedFormData = new FormData();
        // Append existing formData to the new FormData object
        for (let [key, val] of formData.entries()) {
            updatedFormData.append(key, val);
        }
        // Set the new form field value
        updatedFormData.set(name, value);
        // Update the state with the new formData and field value
        setValues({ ...values, error: '', formData: updatedFormData, [name]: value });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: '', loading: true });
    
        createJob(user._id, token, formData)
            .then((data) => {
                if (data.error) {
                    setValues({ ...values, error: data.error, loading: false });
                    // Log the error received from the API
                    console.error('Error creating job:', data.error);
                } else {
                    setValues({
                        ...values,
                        coursename: '',
                        jobid: '',
                        description: '',
                        category: '',
                        deadline: '',
                        loading: false,
                        createdJob: data.name,
                    });
                    // Log the success message or updated data
                    console.log('Job created:', data);
                }
            })
            .catch((error) => {
                console.log('Network error:', error);
                setValues({ ...values, error: 'Network error', loading: false });
            });
    };

    const newPostForm = () => (
        <form className="mb-3" onSubmit={clickSubmit}>
            <h4>Post a Job</h4>
            <div className="form-group">
                <label className="text-muted">Course Name</label>
                <input
                    onChange={handleChange('coursename')}
                    type="text"
                    className="form-control"
                    value={coursename}
                />
            </div>
            <div className="form-group">
                <label className="text-muted">Job ID</label>
                <input
                    onChange={handleChange('jobid')}
                    type="text"
                    className="form-control"
                    value={jobid}
                />
            </div>
    
            <div className="form-group">
                <label className="text-muted">Description</label>
                <textarea
                    onChange={handleChange('description')}
                    className="form-control"
                    value={description}
                />
            </div>
    
            <div className="form-group">
                <label className="text-muted">Category</label>
                <select
                    onChange={handleChange('category')}
                    className="form-control"
                    value={category}
                >
                    <option>Please select</option>
                    {categories.map((c, i) => (
                        <option key={i} value={c.name}>
                            {c.name}
                        </option>
                    ))}
                </select>
            </div>
    
            <div className="form-group">
                <label className="text-muted">Deadline</label>
                <input
                    type="date"
                    onChange={handleChange('deadline')}
                    className="form-control"
                    value={deadline}
                />
            </div>
    
            <button className="btn btn-primary">Create Job</button>
        </form>
    );
    

    const showError = () => (
        <div className="alert alert-danger" style={{ display: error ? '' : 'none' }}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdJob ? '' : 'none' }}>
            <h2>{createdJob} is created!</h2>
        </div>
    );

    const showLoading = () =>
        loading && (
            <div className="alert alert-success">
                <h2>Loading...</h2>
            </div>
        );

    return (
        <Layout title="Add a new job" description={`Hello ${user.name}, ready to add a new job?`}>
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showLoading()}
                    {showSuccess()}
                    {showError()}
                    {newPostForm()}
                </div>
            </div>
        </Layout>
    );
};

export default AddJob;
