import React, { useState, useEffect } from 'react';
import { Upload, Clock, Users, FileText, Star, CheckCircle, ArrowRight, Menu, X, Calculator, Play, Shield, Zap, Globe, Download, Eye } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

// User Dashboard Component
const UserDashboard = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [userTranscripts, setUserTranscripts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [audioDuration, setAudioDuration] = useState(0);
  const [priceEstimate, setPriceEstimate] = useState(null);

  const navigate = useNavigate();
  const { user, logout, getAuthHeaders } = useAuth();

  // Fetch user's transcripts
  const fetchUserTranscripts = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${URL}/api/transcripts/my-transcripts`, {
        headers: getAuthHeaders()
      });

      setUserTranscripts(response.data.transcripts);
    } catch (error) {
      console.error('Fetch transcripts error:', error);
      if (error.response?.status === 401) {
        logout();
        return;
      }
      setError('Failed to load transcripts');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserTranscripts();
  }, []);

  const handleFileSelect = (e) => {
    const file = e.target.files[0];

    if (!file) {
      console.log('No file selected');
      return;
    }

    console.log('File selected:', file.name, 'Type:', file.type, 'Size:', file.size);

    // Validate file type - check by extension (more reliable than MIME type)
    const fileExtension = file.name.split('.').pop().toLowerCase();
    const allowedExtensions = ['mp3', 'wav', 'm4a', 'aac', 'flac', 'mp4', 'mpeg', 'ogg'];

    if (!allowedExtensions.includes(fileExtension)) {
      alert(`Invalid file type. Please select an audio file (${allowedExtensions.join(', ').toUpperCase()})`);
      e.target.value = ''; // Reset input
      return;
    }

    // Validate file size (2GB limit)
    if (file.size > 2 * 1024 * 1024 * 1024) {
      alert('File size must be less than 2GB');
      e.target.value = ''; // Reset input
      return;
    }

    console.log('File validation passed');
    setSelectedFile(file);
    setUploadProgress(0);

    // Get audio duration
    if (file) {
      const audio = new Audio();
      const reader = new FileReader();

      reader.onload = (e) => {
        audio.src = e.target.result;

        audio.addEventListener('loadedmetadata', () => {
          const durationInMinutes = Math.ceil(audio.duration / 60);
          setAudioDuration(durationInMinutes);

          // Calculate price estimate with default settings
          calculatePriceEstimate(durationInMinutes);
        });

        audio.addEventListener('error', () => {
          console.error('Could not load audio file for duration detection');
          // Set a default duration or prompt user to enter manually
          setAudioDuration(0);
          setPriceEstimate(null);
        });
      };

      reader.readAsDataURL(file);
    }
  };

  const calculatePriceEstimate = (duration) => {
    // Default settings: 2 speakers, 3 days turnaround, no timestamp, clean verbatim
    // Using new pricing structure

    // Round up duration to nearest minute (as per new calculation)
    const roundedDuration = Math.ceil(duration);

    let baseRate = 0;
    const speakers = 2;
    const turnaroundTime = '3days';
    const isVerbatim = false;
    const timestampFrequency = 'none';

    // Calculate base rate based on verbatim type, speakers, and turnaround
    if (!isVerbatim) {
      // CLEAN VERBATIM
      if (speakers === 2) {
        const cleanVerbatim2Speakers = {
          '3days': 0.9,
          '1.5days': 1.2,
          '6-12hrs': 1.5
        };
        baseRate = cleanVerbatim2Speakers[turnaroundTime] || 0.9;
      } else if (speakers >= 3) {
        const cleanVerbatim3Speakers = {
          '3days': 1.25,
          '1.5days': 1.6,
          '6-12hrs': 1.95
        };
        baseRate = cleanVerbatim3Speakers[turnaroundTime] || 1.25;
      }
    } else {
      // FULL VERBATIM
      if (speakers === 2) {
        const fullVerbatim2Speakers = {
          '3days': 1.2,
          '1.5days': 1.5,
          '6-12hrs': 1.8
        };
        baseRate = fullVerbatim2Speakers[turnaroundTime] || 1.2;
      } else if (speakers >= 3) {
        const fullVerbatim3Speakers = {
          '3days': 1.6,
          '1.5days': 1.95,
          '6-12hrs': 2.3
        };
        baseRate = fullVerbatim3Speakers[turnaroundTime] || 1.6;
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

    const timestampMod = timestampRates[timestampFrequency] || 0.0;
    const rate = baseRate + timestampMod;
    const estimatedPrice = roundedDuration * rate;

    setPriceEstimate({
      duration: roundedDuration,
      rate: rate.toFixed(2),
      price: estimatedPrice.toFixed(2),
      settings: '1-2 speakers, 3 days, clean verbatim, no timestamps'
    });
  };

  const handleUpload = () => {
    if (!selectedFile) return;

    // Navigate to checkout with file and duration info
    navigate('/checkout', {
      state: {
        file: selectedFile,
        audioDuration: audioDuration || 60, // Default to 60 if detection failed
        fromUpload: true
      }
    });
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const handleDownload = async (transcriptId) => {
    try {
      const response = await axios.get(`${URL}/api/transcripts/${transcriptId}/download`, {
        headers: getAuthHeaders(),
        responseType: 'blob'
      });

      // Create download link
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `transcript_${transcriptId}.txt`);
      document.body.appendChild(link);
      link.click();
      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Download error:', error);
      alert('Failed to download transcript');
    }
  };

  const handleViewDetails = (transcript) => {
    navigate(`/transcript/${transcript.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-white">
      <nav className="bg-white shadow-sm border-b border-purple-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div onClick={() => navigate('/')} className="flex items-center space-x-2">
              <FileText className="h-6 w-6 text-[#006D5B]" />
              <span className="text-xl font-bold text-[#006D5B]">ZenTranscript</span>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-gray-700">
                Welcome, {user?.firstName || 'User'}!
              </span>
              <button
                onClick={handleLogout}
                className="text-purple-600 hover:text-purple-700 transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Upload for Transcription</h1>
        
        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
          <div className="border-2 border-dashed border-purple-300 rounded-xl p-12 text-center">
            <Upload className="h-16 w-16 text-purple-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {selectedFile ? selectedFile.name : 'Drop your audio file here'}
            </h3>
            <p className="text-gray-600 mb-6">
              Support for MP3, WAV, M4A, AAC, FLAC files up to 2GB
            </p>
            <input
              type="file"
              accept="audio/*,.mp3,.wav,.m4a,.aac,.flac,.mpeg,.ogg"
              onChange={handleFileSelect}
              className="hidden"
              id="file-upload"
            />
            <label
              htmlFor="file-upload"
              className="bg-[#006D5B] text-white px-6 py-3 rounded-lg cursor-pointer hover:bg-purple-700 transition-colors inline-block"
            >
              Choose File
            </label>
          </div>

          {selectedFile && (
            <div className="mt-8">
              <h4 className="font-semibold text-gray-900 mb-4">File Details</h4>
              <div className="bg-purple-50 rounded-lg p-4 mb-4">
                <p><strong>Name:</strong> {selectedFile.name}</p>
                <p><strong>Size:</strong> {formatFileSize(selectedFile.size)}</p>
                <p><strong>Type:</strong> {selectedFile.type}</p>
                {audioDuration > 0 && (
                  <p><strong>Duration:</strong> {audioDuration} minutes</p>
                )}
              </div>

              {/* Price Estimate */}
              {priceEstimate && (
                <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-green-900 mb-2 flex items-center">
                        <Calculator className="h-5 w-5 mr-2" />
                        Estimated Cost
                      </h4>
                      <p className="text-sm text-green-700 mb-3">
                        Based on: {priceEstimate.settings}
                      </p>
                      <div className="space-y-1 text-sm text-green-800">
                        <p>Duration: <strong>{priceEstimate.duration} minutes</strong></p>
                        <p>Rate: <strong>${priceEstimate.rate}/minute</strong></p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-green-700 mb-1">Total</p>
                      <p className="text-3xl font-bold text-green-900">${priceEstimate.price}</p>
                    </div>
                  </div>
                  <div className="mt-4 pt-4 border-t border-green-200">
                    <p className="text-xs text-green-600">
                      <Shield className="h-3 w-3 inline mr-1" />
                      You can customize speakers, turnaround time, and other options on the next page
                    </p>
                  </div>
                </div>
              )}

              <button
                onClick={handleUpload}
                disabled={uploadProgress > 0 && uploadProgress < 100}
                className="mt-6 w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50"
              >
                Continue to Pricing & Payment
              </button>
            </div>
          )}
        </div>

        {/* Recent Transcriptions */}
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Recent Transcriptions</h2>
            <button
              onClick={fetchUserTranscripts}
              className="text-purple-600 hover:text-purple-700 transition-colors"
            >
              <CheckCircle className="h-5 w-5" />
            </button>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600 mx-auto mb-2"></div>
              <p className="text-gray-600">Loading transcripts...</p>
            </div>
          ) : error ? (
            <div className="text-center py-8">
              <p className="text-red-600 mb-4">{error}</p>
              <button
                onClick={fetchUserTranscripts}
                className="bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
              >
                Try Again
              </button>
            </div>
          ) : userTranscripts.length > 0 ? (
            <div className="space-y-4">
              {userTranscripts.map((transcript) => (
                <div key={transcript.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                  <div className="flex items-center space-x-4">
                    <FileText className="h-8 w-8 text-purple-600" />
                    <div>
                      <h3 className="font-semibold text-gray-900">{transcript.title}</h3>
                      <p className="text-gray-600">
                        {Math.ceil(transcript.duration / 60)} minutes • {transcript.speakers} speakers
                      </p>
                      <p className="text-sm text-gray-500">
                        Created: {formatDate(transcript.createdAt)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(transcript.status)}`}>
                      {transcript.status.charAt(0).toUpperCase() + transcript.status.slice(1)}
                    </span>
                    
                    {transcript.status === 'completed' && (
                      <button
                        onClick={() => handleDownload(transcript.id)}
                        className="text-green-600 hover:text-green-700 transition-colors flex items-center space-x-1"
                      >
                        <Download className="h-4 w-4" />
                        <span>Download</span>
                      </button>
                    )}
                    
                    <button
                      onClick={() => handleViewDetails(transcript)}
                      className="text-purple-600 hover:text-purple-700 transition-colors flex items-center space-x-1"
                    >
                      <Eye className="h-4 w-4" />
                      <span>View</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-16 w-16 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">No transcriptions yet</p>
              <p className="text-gray-500 text-sm">Upload your first audio file to get started!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDashboard;