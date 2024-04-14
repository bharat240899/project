import React,{Fragment} from 'react';
import {Link,withRouter} from 'react-router-dom';
import {signout,isAuthenticated} from '../auth'
import {itemTotal,wishListTotal} from './cartHelpers';


const isActive = (history,path) =>{
    if(history.location.pathname ===path) {
        return { color:"#ff9900"};
    }
    else{
        return { color:'#ffffff'};
    }
}


const Menu =({history}) =>{
    return(
        <div>
        <ul className="nav nav-tabs bg-dark">
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history,'/')} to="/">Home</Link>
            </li>
            {/* <li className="nav-item">
                <Link className="nav-link" style={isActive(history,'/shop')} to="/shop">Shop</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history,'/cart')} to="/cart"><i className="fa fa-shopping-cart" aria-hidden="true"></i>Cart{''}
                    <sup>
                        <small className='cart-badge'>{itemTotal()}</small>
                    </sup>
                </Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link" style={isActive(history,'/wishList')} to="/wishList">WishList{''}
                    <sup>
                        <small className='cart-badge'>{wishListTotal()}</small>
                    </sup>
                </Link>
            </li> */}
            
            {isAuthenticated() && isAuthenticated().user.role ===0 &&(
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history,'/user/dashboard')} to="/user/dashboard">Dashboard</Link>
                </li> 
            )}


            {isAuthenticated() && isAuthenticated().user.role ===1 &&(
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history,'/admin/dashboard')} to="/admin/dashboard">Dashboard</Link>
                </li> 
            )}  
             {isAuthenticated() && isAuthenticated().user.role ===2 &&(
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history,'/instructor/dashboard')} to="/instructor/dashboard">Dashboard</Link>
                </li> 
            )}  
            {isAuthenticated() && isAuthenticated().user.role ===3 &&(
                <li className="nav-item">
                    <Link className="nav-link" style={isActive(history,'/committe/dashboard')} to="/committe/dashboard">Dashboard</Link>
                </li> 
            )}  




            {!isAuthenticated() && (
                <Fragment>
                    <li className="nav-item">
                <Link className="nav-link" style={isActive(history,'/signin')} to="/signin">Signin</Link>
            </li>
            <li className="nav-item">
                <Link className="nav-link text-end" style={isActive(history,'/signup')} to="/signup">Signup</Link>
            </li>
                </Fragment>
               
            )}
           {isAuthenticated() &&(
                <li className="nav-item">
                <a  href="/" className="nav-link" 
                style={{cursor:'pointer',color:'#ffffff'}} 
                onClick={()=>signout(()=>{
                    history.push('/')

                })}>Signout
                </a>
            </li>
           )}

        </ul>
    </div>
    )
    
}

export default withRouter(Menu);