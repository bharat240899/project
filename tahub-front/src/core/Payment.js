import React from 'react';

const  Payment =()=>{
    return(
       
       <div className='border border-warning m-5'>
           <h3 className='text-center mt-2 text-danger'>Payment Gateway</h3>
            <div className="row mt-5 ml-5 mb-4">
                  <div className="col-md-6 ">
                      <h5>Pay using  <a href='https://www.paypal.com/in/signin'><button className='btn btn-primary'>Paypal</button></a></h5>
                      <h5>Pay using  <a href='https://razorpay.com/upi/'><button className='btn btn-primary'>UPI</button></a></h5>
                      <h5>Pay using <a></a><button className='btn btn-primary'>DEBIT/CREDIT</button></h5>
                        
                  </div>
                  <div className="col-md-6">
                      <h5>Pay using <a href='https://www.americanexpress.com/en-in/account/login'><button className='btn btn-primary'>American Express</button></a></h5>
                      <h5>Pay using  <a href=''><button className='btn btn-primary'>VISA PAYMENTS</button></a></h5>
                      <h5>Pay using<button className='btn btn-primary'>NET BANKING</button></h5>
                        
                  </div>
        </div>

       </div>
    )
}
export default Payment;