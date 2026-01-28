import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FileText, Upload, CheckCircle, Loader } from 'lucide-react';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

const UploadTranscript = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { getAuthHeaders } = useAuth();

  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const uploadStartedRef = useRef(false);

  // Get file and order info from navigation state
  const file = location.state?.file;
  const orderId = location.state?.orderId;

  useEffect(() => {
    console.log('UploadTranscript mounted with:', { file: file?.name, orderId });

    // If no file or order, redirect to dashboard
    if (!file || !orderId) {
      console.error('Missing file or order information');
      alert('Missing file or order information');
      navigate('/user-dashboard');
      return;
    }

    // Prevent duplicate uploads (React StrictMode double-fires effects in dev)
    if (uploadStartedRef.current) return;
    uploadStartedRef.current = true;

    // Automatically upload the file when component mounts
    console.log('Starting transcript upload...');
    uploadTranscript();
  }, []);

  const uploadTranscript = async () => {
    try {
      setUploading(true);
      setError('');

      console.log('Fetching order details for orderId:', orderId);

      // First, get the order details to extract specifications
      const orderResponse = await axios.get(`${URL}/api/orders/${orderId}`, {
        headers: getAuthHeaders()
      });

      console.log('Order fetched:', orderResponse.data);

      const order = orderResponse.data.order;
      const specs = order.specifications;

      console.log('Order specifications:', specs);

      // Create FormData to send file with all required fields
      const formData = new FormData();
      formData.append('audioFile', file);
      formData.append('orderId', orderId);
      formData.append('title', file.name.replace(/\.[^/.]+$/, '')); // Remove extension
      formData.append('speakers', specs.speakers || 2);
      formData.append('turnaroundTime', specs.turnaroundTime || '3days');

      // Map 'none' to 'speaker' as default, or use the spec value
      const timestampFreq = specs.timestampFrequency === 'none' ? 'speaker' : (specs.timestampFrequency || 'speaker');
      formData.append('timestampFrequency', timestampFreq);

      formData.append('isVerbatim', specs.isVerbatim || false);
      formData.append('specialInstructions', '');

      console.log('Uploading file:', file.name, 'for order:', orderId);

      // Upload the file and create transcript
      const response = await axios.post(`${URL}/api/transcripts`, formData, {
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Transcript created successfully:', response.data);
      setSuccess(true);

      // Wait a moment then redirect to dashboard
      setTimeout(() => {
        console.log('Redirecting to dashboard...');
        navigate('/user-dashboard');
      }, 2000);

    } catch (error) {
      console.error('Upload error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      setError(error.response?.data?.message || 'Failed to upload transcript. Please try again.');
      setUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <nav className="bg-white shadow-sm border-b border-purple-100 fixed top-0 left-0 right-0 z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div onClick={() => navigate('/')} className="flex items-center space-x-2 cursor-pointer">
                <FileText className="h-6 w-6 text-purple-600" />
                <span className="text-xl font-bold text-purple-600">ZenTranscript</span>
              </div>
            </div>
          </div>
        </nav>

        <div className="bg-white rounded-2xl shadow-xl p-8 mt-20">
          <div className="text-center">
            {uploading && !success && (
              <>
                <div className="flex justify-center mb-6">
                  <Loader className="h-16 w-16 text-purple-600 animate-spin" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Uploading Your File</h2>
                <p className="text-gray-600">
                  Please wait while we process your audio file...
                </p>
              </>
            )}

            {success && (
              <>
                <div className="flex justify-center mb-6">
                  <div className="bg-green-100 rounded-full p-4">
                    <CheckCircle className="h-16 w-16 text-green-600" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Upload Successful!</h2>
                <p className="text-gray-600 mb-4">
                  Your transcript request has been submitted successfully.
                </p>
                <p className="text-sm text-gray-500">
                  Redirecting to dashboard...
                </p>
              </>
            )}

            {error && (
              <>
                <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
                  <p className="text-red-800 font-medium">Upload Failed</p>
                  <p className="text-red-600 text-sm mt-1">{error}</p>
                </div>
                <button
                  onClick={() => navigate('/user-dashboard')}
                  className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
                >
                  Return to Dashboard
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UploadTranscript;
