// import React, { useState } from 'react';
// import { Upload, Clock, Users, FileText, Star, CheckCircle, ArrowRight, Menu, X, Calculator, Play, Shield, Zap, Globe } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';
// import { nav } from 'framer-motion/client';
// import axios from 'axios';
// import { URL } from '../url';
// import { useAuth } from '../context/AuthContext';



// // Admin Login Page Component
// const AdminLogin = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//       const navigate = useNavigate()

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Handle admin login logic here
//     console.log('Admin Login:', { email, password });
//     navigate('/admin-dashboard');
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center px-4">
//       <div className="max-w-md w-full">
//         <div className="text-center mb-8">
//           <div className="flex items-center justify-center space-x-2 mb-4">
//             <Shield className="h-8 w-8 text-purple-400" />
//             <span className="text-2xl font-bold text-white">
//               Admin Portal
//             </span>
//           </div>
//           <h2 className="text-3xl font-bold text-white">Administrator Access</h2>
//           <p className="text-purple-200 mt-2">Secure login for administrators</p>
//         </div>

//         <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
//           <form onSubmit={handleSubmit} className="space-y-6">
//             <div>
//               <label className="block text-sm font-medium text-purple-200 mb-2">Admin Email</label>
//               <input
//                 type="email"
//                 value={email}
//                 onChange={(e) => setEmail(e.target.value)}
//                 className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-purple-200"
//                 placeholder="admin@trustytranscript.com"
//                 required
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-purple-200 mb-2">Password</label>
//               <input
//                 type="password"
//                 value={password}
//                 onChange={(e) => setPassword(e.target.value)}
//                 className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-purple-200"
//                 placeholder="Enter admin password"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors"
//             >
//               Access Admin Panel
//             </button>
//           </form>
//         </div>

//         <div className="text-center mt-6">
//           <button
//             onClick={() => navigate('/')}
//             className="text-purple-400 hover:text-purple-300"
//           >
//             ← Back to main site
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };


// export default AdminLogin;



import React, { useState } from 'react';
import { Upload, Clock, Users, FileText, Star, CheckCircle, ArrowRight, Menu, X, Calculator, Play, Shield, Zap, Globe, Eye, EyeOff } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../url';
import { useAuth } from '../context/AuthContext';

// Admin Login Page Component
const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post(`${URL}/api/auth/admin-login`, {
        email,
        password
      });

      const { token, user } = response.data;

      // Verify the user is actually an admin
      if (user.role !== 'admin') {
        setError('Access denied. Admin privileges required.');
        return;
      }

      // Store token and user data using AuthContext
      login(token, user);

      // Redirect to admin dashboard
      navigate('/admin-analytics');

    } catch (error) {
      console.error('Admin login error:', error);
      
      if (error.response?.data?.message) {
        setError(error.response.data.message);
      } else if (error.response?.status === 401) {
        setError('Invalid admin credentials');
      } else if (error.response?.status === 403) {
        setError('Access denied. Admin privileges required.');
      } else if (error.response?.status >= 500) {
        setError('Server error. Please try again later.');
      } else {
        setError('Authentication failed. Please check your credentials.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <Shield className="h-8 w-8 text-purple-400" />
            <span className="text-2xl font-bold text-white">
              Admin Portal
            </span>
          </div>
          <h2 className="text-3xl font-bold text-white">Administrator Access</h2>
          <p className="text-purple-200 mt-2">Secure login for administrators</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg rounded-2xl shadow-xl p-8 border border-white/20">
          {error && (
            <div className="mb-6 p-4 bg-red-500/20 border border-red-400/30 rounded-lg">
              <p className="text-red-200 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">Admin Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-purple-200"
                placeholder="admin@trustytranscript.com"
                required
                disabled={loading}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-purple-200 mb-2">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent text-white placeholder-purple-200"
                  placeholder="Enter admin password"
                  required
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-purple-300 hover:text-purple-100"
                  disabled={loading}
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white py-3 rounded-lg font-semibold hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  <Shield className="h-5 w-5 mr-2" />
                  Access Admin Panel
                </>
              )}
            </button>
          </form>

          {/* Security Notice */}
          <div className="mt-6 p-4 bg-yellow-500/20 border border-yellow-400/30 rounded-lg">
            <div className="flex items-start space-x-2">
              <Shield className="h-4 w-4 text-yellow-200 mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-yellow-200 text-xs font-medium">Security Notice</p>
                <p className="text-yellow-100 text-xs mt-1">
                  This is a secure admin area. All login attempts are logged and monitored.
                </p>
              </div>
            </div>
          </div>

          {/* Demo Credentials for Development */}
          {process.env.NODE_ENV === 'development' && (
            <div className="mt-6 p-4 bg-blue-500/20 border border-blue-400/30 rounded-lg">
              <p className="text-blue-200 text-xs font-medium mb-2">Demo Admin Credentials:</p>
              <div className="text-blue-100 text-xs space-y-1">
                <p><strong>Email:</strong> admin@trustytranscript.com</p>
                <p><strong>Password:</strong> admin123!@#</p>
              </div>
            </div>
          )}
        </div>

        <div className="text-center mt-6 space-y-3">
          <button
            onClick={() => navigate('/')}
            className="text-purple-400 hover:text-purple-300 block w-full"
            disabled={loading}
          >
            ← Back to main site
          </button>
          
          <button
            onClick={() => navigate('/login')}
            className="text-purple-300 hover:text-purple-200 text-sm"
            disabled={loading}
          >
            Regular user login
          </button>
        </div>

        {/* Additional Security Features */}
        <div className="mt-8 text-center">
          <p className="text-purple-300 text-xs">
            Need help? Contact system administrator
          </p>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;