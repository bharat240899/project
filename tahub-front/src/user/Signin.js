import React,{useState} from 'react';
import { Redirect} from 'react-router-dom'
import Layout from '../core/Layout'
import {signin,authenticate,isAuthenticated} from '../auth';


const Signin =() =>{
    const [values,setValues] =useState({
      
        email:'jon@mail.com',
        password:'jonboy7',
        error:'',
        loading:false,
        redirectToReferrer:false
    });
    const {email,password,loading,error,redirectToReferrer}=values;
    const {user} =isAuthenticated()

    const handleChange=name =>event=>{
        setValues({...values,error:false,[name]:event.target.value})

    }
   

    const clickSubmit =(event)=>{
        event.preventDefault()
        setValues({...values,error:false,loading:true});
        signin({email,password})
        .then(data =>{
            if(data.error){
                setValues({...values,error:data.error,loading:false});
            }
            else{
               authenticate(data,()=>{
                setValues({
                    ...values,
                    redirectToReferrer:true
                })
               })
            }
        })
    }

    const signInForm =() =>(
    
        <form>
            

            <div className="form-group">
                <label className="text-muted">Email</label>
                <input
                    onChange={handleChange('email')} 
                    type="email"
                    value={email}
                    className="form-control"/>
            </div>
            <div className="form-group">
                <label className="text-muted">Password</label>
                <input 
                    onChange={handleChange('password')}  
                    type="password" 
                    value={password}
                    className="form-control"/>
            </div>
            <button onClick={clickSubmit} className="btn btn-primary">Sign in</button>
        </form>
    );
    const showError = ()=>(
        <div className="alert alert-danger" style={{display:error ? '':'none'}}>
            {error}
        </div>
    )
    const showLoading = ()=>
        loading &&(
            <div 
            className="alert alert-info" >
                <h2>Loading...</h2>
           
            </div>
        )
        
       
    
    const redirectUser =() =>{
        if(redirectToReferrer){
           if(user && user.role ===1){
            return <Redirect to="/admin/dashboard" />
           }
           else if (user && user.role === 2) {
            // Redirect to the instructor dashboard if the user is an instructor
            return <Redirect to="/instructor/dashboard" />;
           }
           else if (user && user.role === 3) {
            // Redirect to the instructor dashboard if the user is an instructor
            return <Redirect to="/committe/dashboard" />;
           }
           else{
            return <Redirect to="/user/dashboard" />
           }
           
        }
        if(isAuthenticated()){
            return <Redirect to="/"/>
        }
    }

   return (
       
    <Layout title="Sign-In Page" className="container col-md-8 offset-md-2" description ="Signin Here and apply for the latest employment oppourtunities ">
       {showLoading()}
       {showError()}
       {signInForm() }
       {redirectUser()}
      {/* JSON.stringify(values) */}
    </Layout> 


   );

   
};
export default Signin;





