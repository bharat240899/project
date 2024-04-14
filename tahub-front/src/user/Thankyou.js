import React from 'react';
import check from '../assets/check.png';
import '../styles.css';
const ThankYou = () => {
    return (
        <div className="p-5 mt-5 success">
            <div className="row">
                <div className="col-md-6 offset-md-3 text-center mt-5">
                     <img src={check} alt="Success" className="img-fluid mt-4 success-icon" />
                    <h2>Your form has been successfully submitted!</h2>
                    <p>Thank you for submitting the form.</p>
                    <p className="mt-4">
                        <a href="/" className="btn btn-primary">Go back to Home</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ThankYou;
