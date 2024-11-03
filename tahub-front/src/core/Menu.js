import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { signout, isAuthenticated } from '../auth';

const isActive = (history, path) => {
    return history.location.pathname === path ? { color: "#ff9900" } : { color: '#ffffff' };
};

const Menu = ({ history }) => {
    const auth = isAuthenticated(); // Call once and store the result

    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history, '/')} to="/">Home</Link>
                </li>
                
                {auth && (
                    <>
                        {auth.role === 0 && (
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history, '/user/dashboard')} to="/user/dashboard">Dashboard</Link>
                            </li>
                        )}
                        {auth.role === 1 && (
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history, '/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
                            </li>
                        )}
                        {auth.role === 2 && (
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history, '/instructor/dashboard')} to="/instructor/dashboard">Dashboard</Link>
                            </li>
                        )}
                        {auth.role === 3 && (
                            <li className="nav-item">
                                <Link className="nav-link" style={isActive(history, '/committee/dashboard')} to="/committee/dashboard">Dashboard</Link>
                            </li>
                        )}
                        <li className="nav-item">
                            <a
                                href="/"
                                className="nav-link"
                                style={{ cursor: 'pointer', color: '#ffffff' }}
                                onClick={() => signout(() => history.push('/'))}
                            >
                                Signout
                            </a>
                        </li>
                    </>
                )}
                
                {!auth && (
                    <>
                        <li className="nav-item">
                            <Link className="nav-link" style={isActive(history, '/signin')} to="/signin">Signin</Link>
                        </li>
                        <li className="nav-item">
                            <Link className="nav-link text-end" style={isActive(history, '/signup')} to="/signup">Signup</Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    );
};

Menu.propTypes = {
    history: PropTypes.object.isRequired
};

export default withRouter(Menu);
