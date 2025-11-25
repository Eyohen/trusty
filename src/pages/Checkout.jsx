

import React, { useState, useEffect } from 'react';
import { Upload, Clock, Users, FileText, Star, CheckCircle, ArrowRight, Menu, X, Calculator, Play, Shield, Zap, Globe, AlertCircle } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { usePaystackPayment } from 'react-paystack';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

// Checkout Page Component
/**
 * PAYSTACK INTEGRATION NOTES:
 * - Using react-paystack library for reliable payment processing
 * - Script loaded via index.html: <script src="https://js.paystack.co/v1/inline.js"></script>
 * - Test key: pk_test_... (for development)
 * - Live key: pk_live_... (for production - set in .env)
 * - Currency: USD (configured in Paystack dashboard)
 * - Amount must be in cents (multiply by 100)
 */
const Checkout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, getAuthHeaders } = useAuth();

  // Get file and duration from navigation state
  const uploadedFile = location.state?.file;
  const uploadedDuration = location.state?.audioDuration;

  // Initialize with uploaded duration if available
  const [orderDetails, setOrderDetails] = useState({
    duration: uploadedDuration && uploadedDuration > 0 ? uploadedDuration : 45,
    speakers: 2,
    turnaroundTime: '3days',
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
  const [paymentReference, setPaymentReference] = useState(null);
  const [isPaystackReady, setIsPaystackReady] = useState(false);

  useEffect(() => {
    // Pre-fill customer info from user data
    if (user) {
      setCustomerInfo({
        name: `${user.firstName || ''} ${user.lastName || ''}`.trim(),
        email: user.email || ''
      });
    }
  }, [user]);

  // Debug: Log environment configuration on mount
  useEffect(() => {
    console.log('=== PAYSTACK DEBUG INFO ===');
    console.log('Environment:', import.meta.env.MODE);
    console.log('API URL:', import.meta.env.VITE_URL);
    console.log('Paystack Key Present:', !!import.meta.env.VITE_PAYSTACK_PUBLIC_KEY);
    console.log('Paystack Key Type:', import.meta.env.VITE_PAYSTACK_PUBLIC_KEY?.startsWith('pk_test_') ? 'TEST' :
                import.meta.env.VITE_PAYSTACK_PUBLIC_KEY?.startsWith('pk_live_') ? 'LIVE' : 'UNKNOWN');
    console.log('=========================');
  }, []);

  // Check if Paystack script is loaded
  useEffect(() => {
    let attempts = 0;
    const maxAttempts = 50; // 5 seconds total

    const checkPaystackScript = () => {
      attempts++;

      if (window.PaystackPop) {
        console.log('✅ Paystack script loaded successfully');
        setIsPaystackReady(true);
      } else if (attempts < maxAttempts) {
        // Retry after a short delay
        setTimeout(checkPaystackScript, 100);
      } else {
        console.error('❌ Paystack script failed to load after 5 seconds');
        setError('Payment system failed to load. Please refresh the page and try again.');
      }
    };

    checkPaystackScript();
  }, []);

  // Calculate pricing whenever order details change
  useEffect(() => {
    calculatePricing();
  }, [orderDetails]);

  // Calculate pricing based on current settings - UPDATED WITH NEW RATES
  const calculatePricing = () => {
    try {
      // Base rates per minute based on verbatim type, speakers, and turnaround
      let rate = 0;

      // Round up duration to nearest minute (as per new calculation)
      const roundedDuration = Math.ceil(orderDetails.duration);

      if (!orderDetails.isVerbatim) {
        // CLEAN VERBATIM
        if (orderDetails.speakers === 2) {
          const cleanVerbatim2Speakers = {
            '3days': 0.9,
            '1.5days': 1.2,
            '6-12hrs': 1.5
          };
          rate = cleanVerbatim2Speakers[orderDetails.turnaroundTime] || 0.9;
        } else if (orderDetails.speakers === 3) {
          const cleanVerbatim3Speakers = {
            '3days': 1.25,
            '1.5days': 1.6,
            '6-12hrs': 1.95
          };
          rate = cleanVerbatim3Speakers[orderDetails.turnaroundTime] || 1.25;
        }
      } else {
        // FULL VERBATIM
        if (orderDetails.speakers === 2) {
          const fullVerbatim2Speakers = {
            '3days': 1.2,
            '1.5days': 1.5,
            '6-12hrs': 1.8
          };
          rate = fullVerbatim2Speakers[orderDetails.turnaroundTime] || 1.2;
        } else if (orderDetails.speakers === 3) {
          const fullVerbatim3Speakers = {
            '3days': 1.6,
            '1.5days': 1.95,
            '6-12hrs': 2.3
          };
          rate = fullVerbatim3Speakers[orderDetails.turnaroundTime] || 1.6;
        }
      }

      // Timestamp frequency modifier
      const timestampRates = {
        'none': 0.0,
        'speaker': 0.3,
        '2min': 0.2,
        '30sec': 0.4,
        '10sec': 0.6
      };

      rate += timestampRates[orderDetails.timestampFrequency] || 0.0;

      // Calculate total price (rounded duration in minutes * rate per minute)
      const totalPrice = roundedDuration * rate;

      setPricing({
        rate: rate.toFixed(2),
        totalPrice: parseFloat(totalPrice.toFixed(2)),
        roundedDuration
      });
    } catch (error) {
      console.error('Pricing calculation error:', error);
      setError('Failed to calculate pricing');
    }
  };

  // Update order details and recalculate pricing
  const updateOrderDetail = (field, value) => {
    setOrderDetails(prev => ({
      ...prev,
      [field]: value
    }));
    // Pricing will recalculate automatically via useEffect
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

  // Paystack configuration
  const getPaystackConfig = () => {
    const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

    if (!publicKey) {
      console.error('Paystack public key not found in environment variables');
      return null;
    }

    if (!paymentReference || !customerInfo.email || !pricing) {
      return null;
    }

    return {
      reference: paymentReference,
      email: customerInfo.email,
      amount: Math.round(pricing.totalPrice * 100), // Amount in cents for USD
      currency: 'USD',
      publicKey: publicKey,
      metadata: {
        custom_fields: [
          {
            display_name: "Order ID",
            variable_name: "order_id",
            value: order?.id || 'pending'
          },
          {
            display_name: "Duration",
            variable_name: "duration",
            value: `${orderDetails.duration} minutes`
          },
          {
            display_name: "Customer Name",
            variable_name: "customer_name",
            value: customerInfo.name
          }
        ]
      }
    };
  };

  // Initialize Paystack payment hook
  const config = getPaystackConfig();
  const initializePayment = usePaystackPayment(config || {});

  // Handle successful payment
  const onPaymentSuccess = async (response) => {
    try {
      console.log('Payment successful:', response);
      await verifyPayment(paymentReference, response.reference, response);
    } catch (error) {
      console.error('Payment verification error:', error);
      setError('Payment verification failed. Please contact support with reference: ' + response.reference);
      setLoading(false);
    }
  };

  // Handle payment cancellation/closure
  const onPaymentClose = () => {
    console.log('Payment modal closed');
    setError('Payment was cancelled. Please try again when ready.');
    setLoading(false);
  };

  // Handle Paystack payment
  const handlePayment = async () => {
    try {
      setLoading(true);
      setError('');

      // Validate customer info
      if (!customerInfo.name || !customerInfo.email) {
        setError('Please fill in all customer information (Name and Email)');
        setLoading(false);
        return;
      }

      // Validate email format
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(customerInfo.email)) {
        setError('Please enter a valid email address');
        setLoading(false);
        return;
      }

      // Check if Paystack is ready
      if (!isPaystackReady) {
        setError('Payment system is still loading. Please wait a moment and try again.');
        setLoading(false);
        return;
      }

      // Check for API key
      const publicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;
      if (!publicKey) {
        setError('Payment system configuration error. Please contact support. (Error: Missing API key)');
        console.error('VITE_PAYSTACK_PUBLIC_KEY is not set in environment variables');
        setLoading(false);
        return;
      }

      // Validate pricing
      if (!pricing || pricing.totalPrice <= 0) {
        setError('Invalid pricing. Please check your order details.');
        setLoading(false);
        return;
      }

      // Validate Paystack minimum transaction amount ($2.00 USD)
      if (pricing.totalPrice < 2.00) {
        setError('Minimum transaction amount is $2.00 USD. Please increase your order duration or select additional options.');
        setLoading(false);
        return;
      }

      // Create order first
      console.log('Creating order...');
      const orderData = await createOrder();

      if (!orderData || !orderData.paymentReference) {
        setError('Failed to create order. Please try again.');
        setLoading(false);
        return;
      }

      console.log('Order created successfully:', orderData);
      const orderPaymentRef = orderData.paymentReference;
      const orderIdForFile = orderData.order.id;
      setPaymentReference(orderPaymentRef);
      setOrder(orderData.order);

      // Small delay to ensure state is updated
      setTimeout(() => {
        try {
          // Initialize payment with the config using PaystackPop directly
          const paymentConfig = {
            key: publicKey,
            email: customerInfo.email,
            amount: Math.round(pricing.totalPrice * 100), // Amount in cents for USD
            currency: 'USD',
            ref: orderPaymentRef,
            metadata: {
              custom_fields: [
                {
                  display_name: "Order ID",
                  variable_name: "order_id",
                  value: orderIdForFile
                },
                {
                  display_name: "Duration",
                  variable_name: "duration",
                  value: `${orderDetails.duration} minutes`
                },
                {
                  display_name: "Customer Name",
                  variable_name: "customer_name",
                  value: customerInfo.name
                }
              ]
            },
            callback: (response) => {
              console.log('Payment successful:', response);
              verifyPayment(orderPaymentRef, response.reference, response, orderIdForFile);
            },
            onClose: onPaymentClose
          };

          console.log('Initializing Paystack with config:', { ...paymentConfig, key: 'pk_***' });

          // Check if PaystackPop is available
          if (!window.PaystackPop) {
            throw new Error('PaystackPop not loaded. Please refresh the page.');
          }

          console.log('PaystackPop is available, setting up handler...');

          // Use PaystackPop directly
          const handler = window.PaystackPop.setup(paymentConfig);

          console.log('Handler created, opening iframe...');
          handler.openIframe();

          console.log('Payment modal should be open now');

        } catch (initError) {
          console.error('Payment initialization error:', initError);
          console.error('Error stack:', initError.stack);
          setError('Failed to open payment modal. Please try again. Error: ' + initError.message);
          setLoading(false);
        }
      }, 100);

    } catch (error) {
      console.error('Payment handler error:', error);
      setError('Payment initialization failed: ' + (error.response?.data?.message || error.message || 'Unknown error'));
      setLoading(false);
    }
  };

  // Verify payment after Paystack success
  const verifyPayment = async (paymentReference, paystackReference, paymentData, orderId) => {
    try {
      setLoading(true);

      console.log('Verifying payment with refs:', { paymentReference, paystackReference, orderId });

      const response = await axios.post(`${URL}/api/orders/verify-payment`, {
        paymentReference,
        paystackReference,
        paymentData
      }, {
        headers: getAuthHeaders()
      });

      console.log('Payment verified successfully:', response.data);

      // Payment verified successfully
      alert('Payment successful! Your order has been created.');

      // Navigate to file upload if there's a file, otherwise to dashboard
      if (uploadedFile) {
        console.log('Navigating to upload-transcript with file and orderId:', orderId);
        navigate('/upload-transcript', {
          state: {
            file: uploadedFile,
            orderId: orderId || response.data.order.id
          }
        });
      } else {
        console.log('No file, navigating to dashboard');
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
            <div onClick={() => navigate('/')} className="flex items-center space-x-2">
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
          <div className="mb-6 p-4 bg-red-50 border-l-4 border-red-500 rounded-lg shadow-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Payment Error</h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {!isPaystackReady && (
          <div className="mb-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-lg shadow-sm">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600"></div>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">Initializing Payment System</h3>
                <p className="mt-1 text-sm text-blue-700">Please wait while we load the secure payment gateway...</p>
              </div>
            </div>
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
                    <option value="speaker">Change of speaker</option>
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
                     orderDetails.timestampFrequency === 'speaker' ? 'Change of speaker' :
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

              {/* Minimum Amount Warning */}
              {pricing && pricing.totalPrice < 2.00 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <div className="flex items-center space-x-2 mb-2">
                    <AlertCircle className="h-5 w-5 text-yellow-600" />
                    <span className="font-semibold text-yellow-800">Minimum Amount Required</span>
                  </div>
                  <p className="text-sm text-yellow-700">
                    The minimum transaction amount is $2.00 USD. Please increase your order duration to at least {Math.ceil(2 / pricing.rate)} minutes or select additional options.
                  </p>
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
                disabled={loading || !pricing || !isPaystackReady || (pricing && pricing.totalPrice < 2.00)}
                className="w-full bg-purple-600 text-white py-4 rounded-lg text-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
              >
                {!isPaystackReady ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Loading Payment System...</span>
                  </>
                ) : loading ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <span>Pay {formatCurrency(pricing?.totalPrice || 0)} with Paystack</span>
                )}
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