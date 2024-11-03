import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Signin from './user/Signin';
import Signup from './user/Signup';
import Home from './core/Home';
import Dashboard from './user/UserDashboard';
import AdminDashboard from './user/AdminDashboard';
import CommitteDashboard from './user/CommitteDashboard';
import InstructorDashboard from './user/InstructorDashboard';
import PrivateRoute from './auth/PrivateRoute';
import AdminRoute from './auth/AdminRoute';
import InstructorRoute from './auth/InstructorRoute';
import CommitteRoute from './auth/CommitteRoute';
import AddCategory from './admin/AddCategory';
import AddJob from './admin/AddJob';
import Shop from './core/Shop';
import Dummy from './core/dummy';
import DisplayFormDataInTable from './core/DisplayFormDataInTable';
import pageNotFound from './core/pageNotFound';
import Postings from './user/Postings';
import Product from './core/Product';
import Cart from './core/Cart';
import Payment from './core/Payment';
import WishList from './core/WishList';
import ManageJobs from './admin/ManageJobs';
import UpdateProduct from './admin/UpdateJob';
import Profile from './user/Profile';
import ThankYou from './user/Thankyou';
import Form from './user/Form';
import Agreement from './core/Agreement';
import Evaluation from './user/Evaluation';
import Applications from './user/Applications';
import GradeForm from './user/GradeForm';

const RoutePaths = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/shop" exact component={Shop} />
                <Route path="/signin" exact component={Signin} />
                <Route path="/signup" exact component={Signup} />
                <Route path="/payment" exact component={Payment} />
                <Route path="/dummy" exact component={Dummy} />
                <Route path="/product/:productId" exact component={Product} />
                <Route path="/table" exact component={DisplayFormDataInTable} />
                <Route path="/cart" exact component={Cart} />
                <Route path="/wishList" exact component={WishList} />
                <Route path="/agreement" exact component={Agreement} />
                
                <AdminRoute path="/admin/dashboard" exact component={AdminDashboard} />
                <AdminRoute path="/create/category" exact component={AddCategory} />
                <AdminRoute path="/job/create" exact component={AddJob} />
                <AdminRoute path="/admin/jobs" exact component={ManageJobs} />
                <AdminRoute path="/admin/update/:jobId" exact component={UpdateProduct} />
                
                <InstructorRoute path="/instructor/dashboard" exact component={InstructorDashboard} />
                <InstructorRoute path="/dashboard/evaluate" exact component={Evaluation} />
                <InstructorRoute path="/dashboard/evaluate/:userId" exact component={GradeForm} />
                
                <CommitteRoute path="/committe/dashboard" exact component={CommitteDashboard} />
                <CommitteRoute path="/committe/dashboard/applications" exact component={Applications} />
                
                <PrivateRoute path="/profile/:userId" exact component={Profile} />
                <PrivateRoute path="/user/dashboard/tapostings" exact component={Postings} />
                <PrivateRoute path="/user/dashboard" exact component={Dashboard} />
                <PrivateRoute path="/user/dashboard/apply/:jobId" exact component={Form} />
                <PrivateRoute path="/form/success" exact component={ThankYou} />

                <Route path='*' exact component={pageNotFound} />
            </Switch>
        </BrowserRouter>
    );
};

export default RoutePaths;
