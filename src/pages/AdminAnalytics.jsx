
// import React, { useState } from 'react';
// import { Upload, Clock, Users, FileText, Star, CheckCircle, ArrowRight, Menu, X, Calculator, Play, Shield, Zap, Globe } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { nav } from 'framer-motion/client';
// import axios from 'axios';
// import { URL } from '../url';
// import { useAuth } from '../context/AuthContext';


// // Admin Analytics Component
// const AdminAnalytics = () => {
//   return (
//     <div>
//       <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics Dashboard</h1>
      
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center">
//             <div className="flex-shrink-0">
//               <FileText className="h-8 w-8 text-purple-600" />
//             </div>
//             <div className="ml-5 w-0 flex-1">
//               <dl>
//                 <dt className="text-sm font-medium text-gray-500 truncate">Total Transcripts</dt>
//                 <dd className="text-lg font-medium text-gray-900">1,247</dd>
//               </dl>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center">
//             <div className="flex-shrink-0">
//               <Users className="h-8 w-8 text-green-600" />
//             </div>
//             <div className="ml-5 w-0 flex-1">
//               <dl>
//                 <dt className="text-sm font-medium text-gray-500 truncate">Active Users</dt>
//                 <dd className="text-lg font-medium text-gray-900">342</dd>
//               </dl>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center">
//             <div className="flex-shrink-0">
//               <Clock className="h-8 w-8 text-yellow-600" />
//             </div>
//             <div className="ml-5 w-0 flex-1">
//               <dl>
//                 <dt className="text-sm font-medium text-gray-500 truncate">Pending Orders</dt>
//                 <dd className="text-lg font-medium text-gray-900">23</dd>
//               </dl>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow p-6">
//           <div className="flex items-center">
//             <div className="flex-shrink-0">
//               <CheckCircle className="h-8 w-8 text-purple-600" />
//             </div>
//             <div className="ml-5 w-0 flex-1">
//               <dl>
//                 <dt className="text-sm font-medium text-gray-500 truncate">Revenue (₦)</dt>
//                 <dd className="text-lg font-medium text-gray-900">2,847,290</dd>
//               </dl>
//             </div>
//           </div>
//         </div>
//       </div>

//       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Activity</h3>
//           <div className="space-y-4">
//             {[1, 2, 3, 4, 5].map((item) => (
//               <div key={item} className="flex items-center space-x-3">
//                 <div className="flex-shrink-0">
//                   <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-sm text-gray-900">
//                     New transcript order from user@example.com
//                   </p>
//                   <p className="text-sm text-gray-500">2 minutes ago</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>

//         <div className="bg-white rounded-lg shadow p-6">
//           <h3 className="text-lg font-medium text-gray-900 mb-4">Popular Services</h3>
//           <div className="space-y-4">
//             <div className="flex justify-between">
//               <span className="text-sm text-gray-600">2 Speaker Transcription</span>
//               <span className="text-sm font-medium text-gray-900">67%</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div className="bg-purple-600 h-2 rounded-full" style={{ width: '67%' }}></div>
//             </div>
            
//             <div className="flex justify-between">
//               <span className="text-sm text-gray-600">3+ Speaker Transcription</span>
//               <span className="text-sm font-medium text-gray-900">28%</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div className="bg-purple-600 h-2 rounded-full" style={{ width: '28%' }}></div>
//             </div>
            
//             <div className="flex justify-between">
//               <span className="text-sm text-gray-600">Express Service</span>
//               <span className="text-sm font-medium text-gray-900">5%</span>
//             </div>
//             <div className="w-full bg-gray-200 rounded-full h-2">
//               <div className="bg-purple-600 h-2 rounded-full" style={{ width: '5%' }}></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default AdminAnalytics





import React, { useState, useEffect } from 'react';
import { Upload, Clock, Users, FileText, Star, CheckCircle, ArrowRight, Menu, X, Calculator, Play, Shield, Zap, Globe, RefreshCw, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

// Admin Analytics Component
const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [refreshing, setRefreshing] = useState(false);

  const { getAuthHeaders, logout } = useAuth();

  // Fetch analytics data
  const fetchAnalytics = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError('');

      const response = await axios.get(`${URL}/api/admin/analytics`, {
        headers: getAuthHeaders()
      });

      setAnalytics(response.data.analytics);

    } catch (error) {
      console.error('Fetch analytics error:', error);
      
      if (error.response?.status === 401) {
        logout();
        return;
      }
      
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else {
        setError('Failed to load analytics data');
      }
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  // Load data on component mount
  useEffect(() => {
    fetchAnalytics();
  }, []);

  // Refresh data
  const handleRefresh = () => {
    fetchAnalytics(true);
  };

  // Format currency
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-NG', {
      style: 'currency',
      currency: 'NGN',
      minimumFractionDigits: 0
    }).format(amount || 0);
  };

  // Format number with commas
  const formatNumber = (num) => {
    return new Intl.NumberFormat().format(num || 0);
  };

  // Format relative time
  const formatRelativeTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} minutes ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} hours ago`;
    return `${Math.floor(diffInMinutes / 1440)} days ago`;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error && !analytics) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <p className="text-red-600 mb-4">{error}</p>
          <button
            onClick={() => fetchAnalytics()}
            className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Analytics Dashboard</h1>
        <button
          onClick={handleRefresh}
          disabled={refreshing}
          className="flex items-center space-x-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          <span>{refreshing ? 'Refreshing...' : 'Refresh'}</span>
        </button>
      </div>

      {error && (
        <div className="mb-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
          <p className="text-yellow-600 text-sm">{error}</p>
        </div>
      )}
      
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <FileText className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Transcripts</dt>
                <dd className="text-lg font-medium text-gray-900">
                  {formatNumber(analytics?.overview?.totalTranscripts)}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Users className="h-8 w-8 text-green-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Users</dt>
                <dd className="text-lg font-medium text-gray-900">
                  {formatNumber(analytics?.overview?.totalUsers)}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
                <dd className="text-lg font-medium text-gray-900">
                  {formatNumber(analytics?.overview?.totalOrders)}
                </dd>
              </dl>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <TrendingUp className="h-8 w-8 text-purple-600" />
            </div>
            <div className="ml-5 w-0 flex-1">
              <dl>
                <dt className="text-sm font-medium text-gray-500 truncate">Total Revenue</dt>
                <dd className="text-lg font-medium text-gray-900">
                  {formatCurrency(analytics?.overview?.totalRevenue)}
                </dd>
              </dl>
            </div>
          </div>
        </div>
      </div>

      {/* Transcript Status Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Pending Transcripts</p>
              <p className="text-2xl font-bold text-yellow-600">
                {formatNumber(analytics?.transcriptStatus?.pending)}
              </p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Clock className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Processing</p>
              <p className="text-2xl font-bold text-blue-600">
                {formatNumber(analytics?.transcriptStatus?.processing)}
              </p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <RefreshCw className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-500">Completed</p>
              <p className="text-2xl font-bold text-green-600">
                {formatNumber(analytics?.transcriptStatus?.completed)}
              </p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Recent Activity */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Orders</h3>
          <div className="space-y-4">
            {analytics?.recentActivity?.orders?.length > 0 ? (
              analytics.recentActivity.orders.map((order) => (
                <div key={order.id} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      New order {order.orderNumber} from {order.user?.firstName} {order.user?.lastName}
                    </p>
                    <p className="text-sm text-gray-500">
                      {formatCurrency(order.amount)} • {formatRelativeTime(order.createdAt)}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      order.paymentStatus === 'paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {order.paymentStatus}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No recent orders</p>
            )}
          </div>
        </div>

        {/* Recent Transcripts */}
        <div className="bg-white rounded-lg shadow p-6">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Recent Transcripts</h3>
          <div className="space-y-4">
            {analytics?.recentActivity?.transcripts?.length > 0 ? (
              analytics.recentActivity.transcripts.map((transcript) => (
                <div key={transcript.id} className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className={`w-2 h-2 rounded-full ${
                      transcript.status === 'completed' ? 'bg-green-600' :
                      transcript.status === 'processing' ? 'bg-blue-600' :
                      'bg-yellow-600'
                    }`}></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900 truncate">
                      {transcript.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      {transcript.user?.firstName} {transcript.user?.lastName} • {formatRelativeTime(transcript.createdAt)}
                    </p>
                  </div>
                  <div className="flex-shrink-0">
                    <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                      transcript.status === 'completed' ? 'bg-green-100 text-green-800' :
                      transcript.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transcript.status}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-sm">No recent transcripts</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;


