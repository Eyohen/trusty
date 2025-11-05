

import React, { useState, useEffect } from 'react';
import { Upload, Clock, Users, FileText, Star, CheckCircle, ArrowRight, Menu, X, Calculator, Play, Shield, Zap, Globe } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

// Checkout Page Component
const Checkout = () => {
  const [orderDetails, setOrderDetails] = useState({
    duration: 45,
    speakers: 2,
    turnaroundTime: '1.5days',
    timestampFrequency: 'none',
    isVerbatim: false
  });
  const [customerInfo, setCustomerInfo] = useState({
    name: '',
    email: ''
  });
  const [pricing, setPricing] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [order, setOrder] = useState(null);

  const navigate = useNavigate();
  const location = useLocation();
  const { user, getAuthHeaders } = useAuth();

  // Get file and duration from navigation state
  const uploadedFile = location.state?.file;
  const uploadedDuration = location.state?.audioDuration;

  useEffect(() => {
    // Pre-fill customer info from user data
    if (user) {
      setCustomerInfo({
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        email: user.email || ''
      });
    }

    // Set duration from uploaded file if available
    if (uploadedDuration && uploadedDuration > 0) {
      setOrderDetails(prev => ({
        ...prev,
        duration: uploadedDuration
      }));
    }
  }, [user, uploadedDuration]);

  // Calculate pricing whenever order details change
  useEffect(() => {
    calculatePricing();
  }, [orderDetails]);

  // Calculate pricing based on current settings
  const calculatePricing = async () => {
    try {
      const response = await axios.get(`${URL}/api/orders/pricing`, {
        params: {
          duration: orderDetails.duration,
          speakers: orderDetails.speakers,
          turnaroundTime: orderDetails.turnaroundTime,
          timestampFrequency: orderDetails.timestampFrequency,
          isVerbatim: orderDetails.isVerbatim
        }
      });

      setPricing(response.data.pricing);
    } catch (error) {
      console.error('Pricing calculation error:', error);
      setError('Failed to calculate pricing');
    }
  };

  // Update order details and recalculate pricing
  const updateOrderDetail = (field, value) => {
    const newDetails = { ...orderDetails, [field]: value };
    setOrderDetails(newDetails);
    
    // Recalculate pricing after a short delay
    setTimeout(() => {
      calculatePricing();
    }, 300);
  };

  // Create order before payment
  const createOrder = async () => {
    try {
      setLoading(true);
      setError('');

      const response = await axios.post(`${URL}/api/orders/create`, {
        duration: orderDetails.duration,
        speakers: orderDetails.speakers,
        turnaroundTime: orderDetails.turnaroundTime,
        timestampFrequency: orderDetails.timestampFrequency,
        isVerbatim: orderDetails.isVerbatim,
        customerInfo
      }, {
        headers: getAuthHeaders()
      });

      setOrder(response.data.order);
      return response.data;
    } catch (error) {
      console.error('Create order error:', error);

      // Handle validation errors from backend
      if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        const errorMessages = error.response.data.errors.map(err => err.msg).join('. ');
        setError(errorMessages);
      } else {
        setError(error.response?.data?.message || 'Failed to create order');
      }
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Handle Paystack payment
  const handlePayment = async () => {
    try {
      // Validate customer info
      if (!customerInfo.name || !customerInfo.email) {
        setError('Please fill in all customer information');
        return;
      }

      // Check if PaystackPop is loaded
      if (!window.PaystackPop) {
        setError('Payment system not loaded. Please refresh the page and try again.');
        return;
      }

      // Create order first
      const orderData = await createOrder();

      // Initialize Paystack payment
      const handler = window.PaystackPop.setup({
        key: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_live_d2600cd411e787df1135a9b161447361dd0aa805',
        email: customerInfo.email,
        amount: Math.round(pricing.totalPrice * 100), // Convert to cents (for USD)
        currency: 'USD',
        ref: orderData.paymentReference,
        metadata: {
          custom_fields: [
            {
              display_name: "Order ID",
              variable_name: "order_id",
              value: orderData.order.id
            },
            {
              display_name: "Duration",
              variable_name: "duration",
              value: `${orderDetails.duration} minutes`
            }
          ]
        },
        callback: async function(response) {
          // Payment successful
          try {
            await verifyPayment(orderData.paymentReference, response.reference, response);
          } catch (error) {
            console.error('Payment verification error:', error);
            alert('Payment verification failed. Please contact support.');
          }
        },
        onClose: function() {
          // Payment cancelled
          console.log('Payment cancelled');
        }
      });

      handler.openIframe();

    } catch (error) {
      console.error('Payment initialization error:', error);
    }
  };

  // Verify payment after Paystack success
  const verifyPayment = async (paymentReference, paystackReference, paymentData) => {
    try {
      setLoading(true);

      const response = await axios.post(`${URL}/api/orders/verify-payment`, {
        paymentReference,
        paystackReference,
        paymentData
      }, {
        headers: getAuthHeaders()
      });

      // Payment verified successfully
      alert('Payment successful! Your order has been created.');
      
      // Navigate to file upload if there's a file, otherwise to dashboard
      if (uploadedFile) {
        navigate('/upload-transcript', {
          state: {
            file: uploadedFile,
            orderId: response.data.order.id
          }
        });
      } else {
        navigate('/user-dashboard');
      }

    } catch (error) {
      console.error('Payment verification error:', error);

      // Handle validation errors from backend
      if (error.response?.data?.errors && Array.isArray(error.response.data.errors)) {
        const errorMessages = error.response.data.errors.map(err => err.msg).join('. ');
        setError(errorMessages);
      } else {
        setError(error.response?.data?.message || 'Payment verification failed. Please contact support.');
      }
    } finally {
      setLoading(false);
    }
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2
    }).format(amount || 0);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-white">
      <nav className="bg-white shadow-sm border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-purple-600" />
              <span className="text-xl font-bold text-purple-600">ZenTranscript</span>
            </div>
            <button
              onClick={() => navigate('/user-dashboard')}
              className="text-purple-600 hover:text-purple-700 transition-colors"
            >
              ← Back to Dashboard
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-600">{error}</p>
          </div>
        )}
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Pricing Configuration */}
          <div className="lg:col-span-2 space-y-6">
            {/* File Info */}
            {uploadedFile && (
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4">Uploaded File</h2>
                <div className="bg-purple-50 rounded-lg p-4">
                  <p><strong>Name:</strong> {uploadedFile.name}</p>
                  <p><strong>Size:</strong> {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                  <p><strong>Type:</strong> {uploadedFile.type}</p>
                  {uploadedDuration && (
                    <p><strong>Detected Duration:</strong> {uploadedDuration} minutes</p>
                  )}
                </div>
                {uploadedDuration && (
                  <div className="mt-3 text-sm text-purple-600">
                    <CheckCircle className="h-4 w-4 inline mr-1" />
                    Duration auto-detected and set below. You can adjust if needed.
                  </div>
                )}
              </div>
            )}

            {/* Transcription Settings */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Transcription Settings</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
                  <input
                    type="number"
                    value={orderDetails.duration}
                    onChange={(e) => updateOrderDetail('duration', parseInt(e.target.value) || 0)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    min="1"
                    max="10080"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Number of Speakers</label>
                  <select
                    value={orderDetails.speakers}
                    onChange={(e) => updateOrderDetail('speakers', parseInt(e.target.value))}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value={2}>1 - 2 Speakers</option>
                    <option value={3}>3+ Speakers</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Turnaround Time</label>
                  <select
                    value={orderDetails.turnaroundTime}
                    onChange={(e) => updateOrderDetail('turnaroundTime', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="3days">3 Days</option>
                    <option value="1.5days">1.5 Days</option>
                    <option value="6-12hrs">6-12 Hours</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Timestamp Frequency</label>
                  <select
                    value={orderDetails.timestampFrequency}
                    onChange={(e) => updateOrderDetail('timestampFrequency', e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="none">No Timestamp</option>
                    <option value="speaker">No speaker</option>
                    <option value="2min">Every 2 Minutes</option>
                    <option value="30sec">Every 30 Seconds</option>
                    <option value="10sec">Every 10 Seconds</option>
                  </select>
                </div>
              </div>

              <div className="mt-6">
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={orderDetails.isVerbatim}
                    onChange={(e) => updateOrderDetail('isVerbatim', e.target.checked)}
                    className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm font-medium text-gray-700">Full Verbatim</span>
                </label>
              </div>
            </div>

            {/* Customer Information */}
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Customer Information</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <input
                    type="text"
                    value={customerInfo.name}
                    onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="John Doe"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <input
                    type="email"
                    value={customerInfo.email}
                    onChange={(e) => setCustomerInfo({...customerInfo, email: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="john@example.com"
                    required
                  />
                </div>

              </div>
            </div>
          </div>

          {/* Order Summary & Payment */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>
              
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">{orderDetails.duration} minutes</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Speakers:</span>
                  <span className="font-medium">{orderDetails.speakers}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Turnaround:</span>
                  <span className="font-medium">
                    {orderDetails.turnaroundTime === '1.5days' ? '1.5 Days' : 
                     orderDetails.turnaroundTime === '6-12hrs' ? '6-12 Hours' : '3 Days'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Timestamps:</span>
                  <span className="font-medium">
                    {orderDetails.timestampFrequency === 'none' ? 'No Timestamp' :
                     orderDetails.timestampFrequency === 'speaker' ? 'No speaker' :
                     orderDetails.timestampFrequency === '2min' ? 'Every 2 Minutes' :
                     orderDetails.timestampFrequency === '30sec' ? 'Every 30 Seconds' : 'Every 10 Seconds'}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Verbatim:</span>
                  <span className="font-medium">{orderDetails.isVerbatim ? 'Yes' : 'No'}</span>
                </div>
              </div>

              {pricing && (
                <div className="border-t border-gray-200 pt-4 mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-gray-600">Rate per minute:</span>
                    <span className="font-medium">${pricing.rate}</span>
                  </div>
                  <div className="flex justify-between text-lg font-bold text-purple-600">
                    <span>Total:</span>
                    <span>{formatCurrency(pricing.totalPrice)}</span>
                  </div>
                </div>
              )}

              <div className="bg-purple-50 rounded-lg p-4 mb-6">
                <div className="flex items-center space-x-2 mb-2">
                  <Shield className="h-5 w-5 text-purple-600" />
                  <span className="font-semibold text-purple-800">Secure Payment</span>
                </div>
                <p className="text-sm text-purple-600">
                  Your payment is secured by Paystack with 256-bit SSL encryption.
                </p>
              </div>

              <button
                onClick={handlePayment}
                disabled={loading || !pricing}
                className="w-full bg-purple-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? 'Processing...' : `Pay ${formatCurrency(pricing?.totalPrice || 0)} with Paystack`}
              </button>

              <div className="mt-4 text-center text-xs text-gray-600">
                <p>By proceeding, you agree to our Terms of Service and Privacy Policy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;