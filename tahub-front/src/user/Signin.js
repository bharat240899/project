import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { signin, authenticate, isAuthenticated, verifyOtp } from '../auth';
import Layout from '../core/Layout';

const Signin = () => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        otp: '',
        error: '',
        loading: false,
        redirectToReferrer: false,
        isOtpSent: false,
    });

    const { email, password, otp, error, loading, redirectToReferrer, isOtpSent } = values;
    const { user } = isAuthenticated();

    const handleChange = (name) => (event) => {
        setValues({ ...values, error: false, [name]: event.target.value });
    };

    const clickSubmit = (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        
        signin({ email, password }).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error, loading: false });
            } else {
                setValues({ ...values, isOtpSent: true, loading: false });
            }
        });
    };

    const clickVerifyOtp = (event) => {
        event.preventDefault();
        verifyOtp({ email, otp }).then((data) => {
            if (data.error) {
                setValues({ ...values, error: data.error });
            } else {
                authenticate(data, () => {
                    setValues({ ...values, redirectToReferrer: true });
                });
            }
        });
    };

    const showError = () => (
        error && <div className="alert alert-danger">{error}</div>
    );

    const showLoading = () => (
        loading && <div className="alert alert-info"><h2>Loading...</h2></div>
    );

    const redirectUser = () => {
        if (redirectToReferrer) {
            const redirectPath = user ? 
                user.role === 1 ? '/admin/dashboard' :
                user.role === 2 ? '/instructor/dashboard' :
                user.role === 3 ? '/committee/dashboard' :
                '/user/dashboard' :
                '/';
            return <Redirect to={redirectPath} />;
        }
        if (isAuthenticated()) {
            return <Redirect to="/" />;
        }
    };

    return (
        <Layout title="Sign-In Page" description="Sign in here" className="container col-md-8 offset-md-2">
            {showLoading()}
            {showError()}
            {isOtpSent ? (
                <form>
                    <div className="form-group">
                        <label className="text-muted">Enter OTP</label>
                        <input 
                            onChange={handleChange('otp')} 
                            type="text" 
                            value={otp} 
                            className="form-control" 
                        />
                    </div>
                    <button onClick={clickVerifyOtp} className="btn btn-primary">Verify OTP</button>
                </form>
            ) : (
                <form>
                    <div className="form-group">
                        <label className="text-muted">Email</label>
                        <input 
                            onChange={handleChange('email')} 
                            type="email" 
                            value={email} 
                            className="form-control" 
                        />
                    </div>
                    <div className="form-group">
                        <label className="text-muted">Password</label>
                        <input 
                            onChange={handleChange('password')} 
                            type="password" 
                            value={password} 
                            className="form-control" 
                        />
                    </div>
                    <button onClick={clickSubmit} className="btn btn-primary">Sign in</button>
                </form>
            )}
            {redirectUser()}
        </Layout>
    );
};

export default Signin;
