import {API} from '../config';

export const createCategory =(userId,token,category)=>{
    //console.log(name,email,password)
    return fetch(`${API}/category/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    })
    .then(response =>{ 
        return response.json()
    })
    .catch(err =>{
        console.log(err);
    })

};
//

//products api

// export const createJob = (userId, token, data) => {
//     return fetch(`${API}/job/create/${userId}`, {
//         method: "POST",
//         headers: {
//             Accept: 'application/json',
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`
//         },
//         body: JSON.stringify(data)
       
//     })
//     .then(response => { 
//         if (!response.ok) {
//             throw new Error('Network response was not ok.');
//         }
//         return response.json();
//     })
//     .then(data => {
//         console.log(data); // Logging the response JSON
//         return data; // Returning the parsed JSON data
//     })
//     .catch(err => {
//         console.log('Error:', err);
//         throw err; // Re-throwing the error for handling elsewhere
//     });
// };
export const createJob =(userId,token,job)=>{
    //console.log(name,email,password)
    return fetch(`${API}/job/create/${userId}`,{
        method:"POST",
        headers:{
            Accept:'application/json',
            Authorization:`Bearer ${token}`
        },
        body:job
    })
    .then(response =>{ 
        return response.json()
    })
    .catch(err =>{
        console.log(err);
    });

};


export const getCategories = () => {
    return fetch(`${API}/categories`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};





/**
 * to perform crud on product
 * get all products
 * get a single product
 * update single product
 * delete single product
 */

 export const getProducts = () => {
    return fetch(`${API}/products?limit=undefined`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getPostings = () => {
    return fetch(`${API}/postings?limit=undefined`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deleteProduct = (productId, userId, token) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const deletePosting = (jobId, userId, token) => {
    return fetch(`${API}/job/${jobId}/${userId}`, {
        method: 'DELETE',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`
        }
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};


export const getProduct = productId => {
    return fetch(`${API}/product/${productId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
export const getPosting = jobId => {
    return fetch(`${API}/postings/${jobId}`, {
        method: 'GET'
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updatePostings= (jobId, userId, token, product) => {
    return fetch(`${API}/job/${jobId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};

export const updateProduct = (productId, userId, token, product) => {
    return fetch(`${API}/product/${productId}/${userId}`, {
        method: 'PUT',
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`
        },
        body: product
    })
        .then(response => {
            return response.json();
        })
        .catch(err => console.log(err));
};
