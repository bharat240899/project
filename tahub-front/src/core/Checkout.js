import React, { useState, useEffect } from 'react';
import { getProducts, getBraintreeClientToken, processPayment, createOrder } from './apiCore';
import { emptyCart } from './cartHelpers';
import Card from './Card';
import { isAuthenticated } from '../auth';
import { Link } from 'react-router-dom';

const Checkout =({products}) =>{
    

    const getTotal = () => {
        return products.reduce((currentValue, nextValue) => {
            return currentValue + nextValue.count * nextValue.price;
        }, 0);
    };

    const showCheckout =()=>{
        return isAuthenticated()? (
            <a className='btn btn-info text-white' href="/payment">Checkout</a>
        ): ( 
            <Link to='/signin'><em>To Purchase Please</em> Signin</Link>
 
        )
    }

    return(
        <div>
      <h2>Total Value:${getTotal()}</h2>
        {showCheckout()}
    </div>
    );; 
}

export default Checkout;