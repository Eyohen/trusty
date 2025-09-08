import React, { useState } from 'react';
import { Upload, Clock, Users, FileText, Star, CheckCircle, ArrowRight, Menu, X, Calculator, Play, Shield, Zap, Globe } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

// Admin Dashboard Layout Component
const DashboardLayout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const sidebarItems = [
    { 
      id: 'analytics', 
      label: 'Analytics', 
      icon: <CheckCircle className="h-5 w-5" />,
      path: '/admin-analytics'
    },
    { 
      id: 'transcripts', 
      label: 'Transcripts', 
      icon: <FileText className="h-5 w-5" />,
      path: '/admin-transcripts'
    },
    { 
      id: 'users', 
      label: 'Users', 
      icon: <Users className="h-5 w-5" />,
      path: '/admin-users'
    },
    { 
      id: 'orders', 
      label: 'Orders', 
      icon: <Clock className="h-5 w-5" />,
      path: '/admin-orders'
    },
  ];

  // Function to handle navigation
  const handleNavigation = (path) => {
    navigate(path);
    setIsSidebarOpen(false); // Close mobile sidebar after navigation
  };

  // Function to check if current route is active
  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="lg:hidden p-2 rounded-md text-gray-400 hover:text-gray-600"
              >
                <Menu className="h-6 w-6" />
              </button>
              <div className="flex items-center space-x-2">
                <Shield className="h-6 w-6 text-purple-600" />
                <span className="text-xl font-bold text-purple-600">Admin Portal</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">Admin User</span>
              <button
                onClick={() => navigate('/admin-login')}
                className="text-purple-600 hover:text-purple-700"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Sidebar */}
        <div className={`${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transition-transform duration-300 ease-in-out`}>
          <div className="flex flex-col h-full pt-5 pb-4">
            <div className="flex-1 px-3 space-y-1">
              {sidebarItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => handleNavigation(item.path)}
                  className={`${
                    isActiveRoute(item.path)
                      ? 'bg-purple-100 text-purple-700'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full`}
                >
                  {item.icon}
                  <span className="ml-3">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Overlay for mobile */}
        {isSidebarOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-gray-600 bg-opacity-75 z-40"
            onClick={() => setIsSidebarOpen(false)}
          ></div>
        )}

        {/* Main content */}
        <div className="flex-1 lg:ml-0">
          <main className="p-6">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
