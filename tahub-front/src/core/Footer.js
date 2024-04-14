import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

const Footer = () => {
    return (
        <footer className=" footer-main  text-light text-center">
            <div className="footer bg-primary mt-5 pt-5">
                <div className="row">
                    <div className="col-md-3">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/signin" className="text-light">Sign In</Link></li>
                            <li><Link to="/signup" className="text-light">Sign Up</Link></li>
                            <li><Link to="//user/dashboard" className="text-light">My Profile</Link></li>
                            <li><Link to="/user/dashboard" className="text-light">Apply</Link></li>
                        </ul>
                    </div>
                    <div className="col-md-6">
                    <ul className="list-unstyled">
                    <h5>Contact Us</h5>
                            <li>Phone: (561)-111 9980</li>
                            <li>Email: supporttahub@nu.edu</li>
                        </ul>
                    </div>
                    <div className="col-md-3">
                        <h5>Legal</h5>
                        <ul className="list-unstyled">
                            <li><Link to="/agreement" className="text-light">Copyright & Agreement</Link></li>
                        </ul>
                    </div>
                </div>
                <hr className="bg-light" />
                <div className="row">
                    <div className="col">
                        <p className="m-0">© 2023 TA HUB at North University. All rights reserved.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default  Footer;