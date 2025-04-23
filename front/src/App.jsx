import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar/Navbar';
import Home from './pages/Home/Home';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import CustomerLayout from './pages/Customer/CustomerLayout';
import CustomerViewBills from './pages/Customer/CustomerViewBills';
import CustomerUpdateProfile from './pages/Customer/CustomerUpdateProfile';
import CustomerProfile from './pages/Customer/CustomerProfile';
import CustomerTopUpWallet from './pages/Customer/CustomerTopUpWallet';
import CustomerAnalytics from './pages/Customer/CustomerAnalytics';


import BillerLayout from './pages/Biller/BillerLayout';
import BillerViewBills from './pages/Biller/BillerViewBills';
import BillerGenerateBill from './pages/Biller/GenerateBill';
import BillerUpdateProfile from './pages/Biller/BillerUpdateProfile';
import BillerProfile from './pages/Biller/BillerProfile';
 import EditBill         from './pages/Biller/EditBill';
import BillerAnalytics from './pages/Biller/BillerAnalytics';
import BillerUploadBills from './pages/Biller/BillerUploadBills';

import AdminLayout from './pages/Admin/AdminLayout';
import AdminAnalytics from './pages/Admin/AdminAnalytics';
import AdminProfile from './pages/Admin/AdminProfile';
import AdminViewCustomers from './pages/Admin/AdminViewCustomers';
import AdminViewBillers from './pages/Admin/AdminViewBillers';
import AdminViewBills from './pages/Admin/AdminViewBills';
import AdminEditRequests from './pages/Admin/AdminEditRequests';
import CustomerHistory from './pages/Customer/CustomerHistory';
import BillerHistory   from './pages/Biller/BillerHistory';
function App() {
  return (
    <Router>
      {}
      <div className="min-h-screen bg-gray-100">
        {}
        <div className="container mx-auto pt-16 px-4">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/auth/login" element={<Login />} />
            <Route path="/auth/signup" element={<Signup />} />
            
            <Route path="/customer" element={<CustomerLayout />}>
              <Route index element={<CustomerViewBills />} />
              <Route path="view-bills" element={<CustomerViewBills />} />
              <Route path="update-profile" element={<CustomerUpdateProfile />} />
              <Route path="profile"        element={<CustomerProfile />} />    
              <Route path="topup-wallet" element={<CustomerTopUpWallet />} />
              <Route path="analytics" element={<CustomerAnalytics />} />
              <Route path="history"   element={<CustomerHistory />} />

            </Route>

            <Route path="/biller" element={<BillerLayout />}>
              <Route index element={<BillerViewBills />} />
              <Route path="view-bills" element={<BillerViewBills />} />
              <Route path="generate-bill" element={<BillerGenerateBill />} />
              <Route path="profile" element={<BillerProfile />} />
              <Route path="analytics" element={<BillerAnalytics />} />
              <Route path="history"   element={<BillerHistory />} />

                      <Route path="edit-bill"     element={<EditBill />} />
                      <Route path="upload-bills" element={<BillerUploadBills />} />
              <Route path="update-profile" element={<BillerUpdateProfile />} />
  <Route path="profile" element={<BillerProfile />} />
              </Route>

            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<AdminViewCustomers />} />
              <Route path="profile"        element={<AdminProfile />} />
              <Route path="analytics" element={<AdminAnalytics />} />

              <Route path="view-customers" element={<AdminViewCustomers />} />
              <Route path="view-billers" element={<AdminViewBillers />} />
              <Route path="view-bills" element={<AdminViewBills />} />
              <Route path="edit-requests" element={<AdminEditRequests />} />
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
