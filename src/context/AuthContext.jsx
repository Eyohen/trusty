// context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { URL } from '../url';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Initialize auth state from localStorage on app start
  useEffect(() => {
    const initializeAuth = () => {
      try {
        const storedToken = localStorage.getItem('trusty_token');
        const storedUser = localStorage.getItem('trusty_user');

        if (storedToken && storedUser) {
          const parsedUser = JSON.parse(storedUser);
          setToken(storedToken);
          setUser(parsedUser);
          setIsAuthenticated(true);
          
          // Set default axios authorization header
          axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
        }
      } catch (error) {
        console.error('Error initializing auth:', error);
        // Clear corrupted data
        localStorage.removeItem('trusty_token');
        localStorage.removeItem('trusty_user');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = (authToken, userData) => {
    try {
      // Store in state
      setToken(authToken);
      setUser(userData);
      setIsAuthenticated(true);

      // Store in localStorage
      localStorage.setItem('trusty_token', authToken);
      localStorage.setItem('trusty_user', JSON.stringify(userData));

      // Set default axios authorization header
      axios.defaults.headers.common['Authorization'] = `Bearer ${authToken}`;

      console.log('User logged in successfully:', userData);
    } catch (error) {
      console.error('Error during login:', error);
    }
  };

  // Logout function
  const logout = () => {
    try {
      // Clear state
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);

      // Clear localStorage
      localStorage.removeItem('trusty_token');
      localStorage.removeItem('trusty_user');

      // Remove axios authorization header
      delete axios.defaults.headers.common['Authorization'];

      console.log('User logged out successfully');
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Update user profile
  const updateUser = (updatedUserData) => {
    try {
      const newUserData = { ...user, ...updatedUserData };
      setUser(newUserData);
      localStorage.setItem('trusty_user', JSON.stringify(newUserData));
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  // Check if user is admin
  const isAdmin = () => {
    return user?.role === 'admin';
  };

  // Check if user is verified
  const isVerified = () => {
    return user?.isVerified === true;
  };

  // Refresh user data from server
  const refreshUser = async () => {
    if (!token) return;

    try {
      const response = await axios.get(`${URL}/api/auth/me`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const userData = response.data.user;
      setUser(userData);
      localStorage.setItem('trusty_user', JSON.stringify(userData));
      
      return userData;
    } catch (error) {
      console.error('Error refreshing user data:', error);
      
      // If token is invalid, logout user
      if (error.response?.status === 401) {
        logout();
      }
      
      throw error;
    }
  };

  // Get authorization headers for API calls
  const getAuthHeaders = () => {
    if (!token) return {};
    
    return {
      Authorization: `Bearer ${token}`
    };
  };

  // Check if token is expired (basic check)
  const isTokenExpired = () => {
    if (!token) return true;

    try {
      // Decode JWT payload (basic decoding without verification)
      const payload = JSON.parse(atob(token.split('.')[1]));
      const currentTime = Date.now() / 1000;
      
      return payload.exp < currentTime;
    } catch (error) {
      console.error('Error checking token expiry:', error);
      return true;
    }
  };

  // Auto logout when token expires
  useEffect(() => {
    if (token && isTokenExpired()) {
      console.log('Token expired, logging out...');
      logout();
    }
  }, [token]);

  const value = {
    // State
    user,
    token,
    loading,
    isAuthenticated,
    
    // Functions
    login,
    logout,
    updateUser,
    refreshUser,
    getAuthHeaders,
    
    // Utility functions
    isAdmin,
    isVerified,
    isTokenExpired
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;