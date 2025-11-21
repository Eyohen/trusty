
import React, { useState, useEffect } from 'react';
import { Upload, Clock, Users, FileText, Star, CheckCircle, ArrowRight, Menu, X, Calculator, Play, Shield, Zap, Globe, Download, Headphones } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { nav } from 'framer-motion/client';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';


// Admin Transcripts Component
const AdminTranscripts = () => {
  const [transcripts, setTranscripts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('');
  const [selectedTranscript, setSelectedTranscript] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [updating, setUpdating] = useState(false);
  const { getAuthHeaders } = useAuth();

  useEffect(() => {
    fetchTranscripts();
  }, [statusFilter]);

  const fetchTranscripts = async () => {
    try {
      const response = await axios.get(`${URL}/api/admin/transcripts`, {
        params: { status: statusFilter || undefined },
        headers: getAuthHeaders()
      });
      setTranscripts(response.data.transcripts || []);
    } catch (error) {
      console.error('Error fetching transcripts:', error);
      // Don't show alert for empty results, just set empty array
      if (error.response?.status !== 404) {
        console.error('Failed to fetch transcripts:', error.message);
      }
      setTranscripts([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (id, newStatus) => {
    try {
      setUpdating(true);
      await axios.patch(`${URL}/api/admin/transcripts/${id}`,
        { status: newStatus },
        { headers: getAuthHeaders() }
      );
      fetchTranscripts();
      alert('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  const handleUploadFile = async (transcriptId) => {
    if (!uploadFile) {
      alert('Please select a file');
      return;
    }

    try {
      setUpdating(true);
      const formData = new FormData();
      formData.append('file', uploadFile);

      await axios.post(`${URL}/api/admin/transcripts/${transcriptId}/upload`, formData, {
        headers: {
          ...getAuthHeaders(),
          'Content-Type': 'multipart/form-data'
        }
      });

      alert('Transcript file uploaded successfully');
      setShowUploadModal(false);
      setUploadFile(null);
      fetchTranscripts();
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Failed to upload file');
    } finally {
      setUpdating(false);
    }
  };

  const downloadAudio = async (id) => {
    try {
      const token = localStorage.getItem('trusty_token');
      window.open(`${URL}/api/admin/transcripts/${id}/audio?token=${token}`, '_blank');
    } catch (error) {
      console.error('Error downloading audio:', error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'delivered': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Transcripts Management</h1>
        <div className="flex space-x-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Status</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="completed">Completed</option>
            <option value="delivered">Delivered</option>
          </select>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-medium text-gray-900">Transcription Requests ({transcripts.length})</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {transcripts.length === 0 ? (
                <tr>
                  <td colSpan="6" className="px-6 py-12 text-center">
                    <FileText className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <p className="text-gray-500 text-lg font-medium">No transcripts found</p>
                    <p className="text-gray-400 text-sm mt-2">
                      {statusFilter
                        ? `No transcripts with status "${statusFilter}"`
                        : 'Transcripts will appear here when users upload audio files'}
                    </p>
                  </td>
                </tr>
              ) : (
                transcripts.map((transcript) => (
                  <tr key={transcript.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <FileText className="h-5 w-5 text-purple-600 mr-3" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{transcript.title}</div>
                        <div className="text-xs text-gray-500">{transcript.originalFileName}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {transcript.user?.firstName} {transcript.user?.lastName}
                    <div className="text-xs text-gray-500">{transcript.user?.email}</div>
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-900">
                    {transcript.order?.orderNumber}
                    <div className="text-xs text-gray-500">{transcript.order?.paymentStatus}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(transcript.status)}`}>
                      {transcript.status.charAt(0).toUpperCase() + transcript.status.slice(1)}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {formatDate(transcript.createdAt)}
                  </td>
                  <td className="px-6 py-4 text-sm font-medium">
                    <div className="flex flex-col space-y-1">
                      <button
                        onClick={() => downloadAudio(transcript.id)}
                        className="text-blue-600 hover:text-blue-900 flex items-center"
                      >
                        <Headphones className="h-4 w-4 mr-1" />
                        Download Audio
                      </button>
                      <button
                        onClick={() => {
                          setSelectedTranscript(transcript);
                          setShowUploadModal(true);
                        }}
                        className="text-purple-600 hover:text-purple-900 flex items-center"
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        Upload Transcript
                      </button>
                      {transcript.status === 'pending' && (
                        <button
                          onClick={() => updateStatus(transcript.id, 'processing')}
                          disabled={updating}
                          className="text-blue-600 hover:text-blue-900"
                        >
                          Start Processing
                        </button>
                      )}
                      {transcript.status === 'completed' && (
                        <button
                          onClick={() => updateStatus(transcript.id, 'delivered')}
                          disabled={updating}
                          className="text-green-600 hover:text-green-900"
                        >
                          Mark Delivered
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full">
            <h2 className="text-2xl font-bold mb-4">Upload Completed Transcript</h2>
            <p className="text-gray-600 mb-4">
              Upload the completed transcript file for: <strong>{selectedTranscript?.title}</strong>
            </p>
            <input
              type="file"
              accept=".pdf,.docx,.doc,.txt"
              onChange={(e) => setUploadFile(e.target.files[0])}
              className="mb-4 w-full"
            />
            <div className="flex space-x-3">
              <button
                onClick={() => handleUploadFile(selectedTranscript?.id)}
                disabled={updating || !uploadFile}
                className="flex-1 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 disabled:opacity-50"
              >
                {updating ? 'Uploading...' : 'Upload'}
              </button>
              <button
                onClick={() => {
                  setShowUploadModal(false);
                  setUploadFile(null);
                }}
                className="flex-1 bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminTranscripts