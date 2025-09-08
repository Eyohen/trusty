import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'coinley-checkout/dist/style.css'

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';


// Admin Pages

import DashboardLayout from './components/DashboardLayout';
import UserDashboard from './pages/UserDashboard';
import AdminAnalytics from './pages/AdminAnalytics';
import AdminOrders from './pages/AdminOrders';
import Checkout from './pages/Checkout';
import AdminTranscripts from './pages/AdminTranscripts';
import AdminLogin from './pages/AdminLogin';
import AdminUsers from './pages/AdminUsers';



const AdminRoute = ({ children }) => {
  // const { isAuthenticated, isAdmin, loading } = useAuth();

  // if (loading) {
  //   return (
  //     <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
  //       <div className='animate-spin rounded-full h-12 w-12 border-b-2 border-red-600'></div>
  //     </div>
  //   );
  // }


  return (
    <DashboardLayout>
      {children}
    </DashboardLayout>
  );
};



function App() {
  return (


    <div className="App">
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/checkout" element={<Checkout />} />

      <Route path="/admin-login" element={<AdminLogin />} />

      
        {/* Admin Routes - All wrapped with AdminRoute/DashboardLayout */}
        <Route
          path="/admin-analytics"
          element={
            <AdminRoute>
              <AdminAnalytics />
            </AdminRoute>
          }
        />

        <Route
          path="/admin-orders"
          element={
            <AdminRoute>
              <AdminOrders />
            </AdminRoute>
          }
        />

        <Route
          path="/admin-transcripts"
          element={
            <AdminRoute>
              <AdminTranscripts />
            </AdminRoute>
          }
        />

        <Route
          path="/admin-users"
          element={
            <AdminRoute>
              <AdminUsers />
            </AdminRoute>
          }
        />

 
        {/* Catch all route */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>


  );
}

export default App;