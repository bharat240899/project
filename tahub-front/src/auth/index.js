import { API } from '../config';

// Signup function
export const signup = (user) => {
    return fetch(`${API}/signup`, {
        method: "POST",
        headers: {
            Accept: 'application/json',
            "Content-Type": "application/json"
        },
        body: JSON.stringify(user)
    })
    .then(response => response.json())
    .catch(err => console.error('Signup Error:', err));
};

// Signin function
export const signin = (user) => {
    return fetch('http://localhost:8000/api/signin', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    .then(response => response.json())
    .catch(err => console.error('Signin Error:', err));
};

// OTP verification function
export const verifyOtp = (data) => {
    return fetch('http://localhost:8000/api/verify-otp', {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => response.json())
    .catch(err => console.error('Verify OTP Error:', err));
};

// Save token to local storage
export const authenticate = (data, next) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem('jwt', JSON.stringify(data));
        next();
    }
};

// Check if authenticated and retrieve role
export const isAuthenticated = () => {
    if (typeof window === 'undefined') return false;

    const jwt = localStorage.getItem('jwt');
    if (jwt) {
        const userData = JSON.parse(jwt);
        return {
            token: userData.token,
            user: userData.user,
            role: userData.role,
        };
    }
    return false;
};

// Signout function
export const signout = (next) => {
    if (typeof window !== 'undefined') {
        localStorage.removeItem('jwt');
        next();
        return fetch('http://localhost:8000/api/signout', {
            method: 'GET',
        })
        .then(() => console.log('Signout successful'))
        .catch(err => console.error('Signout Error:', err));
    }
};
