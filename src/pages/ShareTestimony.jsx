import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { 
  ArrowLeft, Book, Video, Upload, Calendar, MapPin, 
  Tag, Eye, EyeOff, AlertCircle, CheckCircle, Loader,
  User, Church, Briefcase
} from 'lucide-react';
import { URL } from '../url';

// const URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const ShareTestimony = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    type: 'written',
    content: '',
    videoUrl: '',
    categoryId: '',
    tags: [],
    location: user?.city && user?.country ? `${user.city}, ${user.country}` : '',
    dateOfExperience: '',
    isAnonymous: false,
    allowComments: true
  });

  // UI state
  const [categories, setCategories] = useState([]);
  const [tagInput, setTagInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);

  // Redirect if not authenticated
  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login', { 
        state: { 
          from: { pathname: '/share-testimony' },
          message: 'Please log in to share your testimony'
        }
      });
    }
  }, [isAuthenticated, navigate]);

  // Fetch categories
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(`${URL}/categories`);
      setCategories(response.data.categories);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
      setError('Failed to load categories');
    } finally {
      setCategoriesLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    setError(null);
  };

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim()) && formData.tags.length < 10) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleTagInputKeyPress = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      handleAddTag();
    }
  };

  const validateForm = () => {
    if (!formData.title.trim()) {
      setError('Title is required');
      return false;
    }
    if (formData.title.length < 10) {
      setError('Title must be at least 10 characters long');
      return false;
    }
    if (!formData.categoryId) {
      setError('Please select a category');
      return false;
    }
    if (formData.type === 'written') {
      if (!formData.content.trim()) {
        setError('Content is required for written testimonies');
        return false;
      }
      if (formData.content.length < 50) {
        setError('Written testimony must be at least 50 characters long');
        return false;
      }
    } else if (formData.type === 'video') {
      if (!formData.videoUrl.trim()) {
        setError('Video URL is required for video testimonies');
        return false;
      }
      if (!isValidUrl(formData.videoUrl)) {
        setError('Please provide a valid video URL');
        return false;
      }
    }
    return true;
  };

  const isValidUrl = (string) => {
    try {
      const url = new URL(string);
      return ['http:', 'https:'].includes(url.protocol);
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    try {
      setLoading(true);
      setError(null);

      const submitData = {
        ...formData,
        tags: JSON.stringify(formData.tags)
      };

      const response = await axios.post(`${URL}/testimonies`, submitData);
      
      setSuccess('Testimony submitted successfully! Our team will review it before publishing.');
      
      // Reset form
      setFormData({
        title: '',
        type: 'written',
        content: '',
        videoUrl: '',
        categoryId: '',
        tags: [],
        location: user?.city && user?.country ? `${user.city}, ${user.country}` : '',
        dateOfExperience: '',
        isAnonymous: false,
        allowComments: true
      });

      // Redirect after 3 seconds
      setTimeout(() => {
        navigate('/', { 
          state: { message: 'Thank you for sharing your testimony!' }
        });
      }, 3000);

    } catch (error) {
      console.error('Failed to submit testimony:', error);
      setError(error.response?.data?.message || 'Failed to submit testimony. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (!isAuthenticated) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <button
              onClick={() => navigate(-1)}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </button>
            
            <Link to="/" className="text-xl font-light text-gray-900 tracking-wider">
              <span className="font-bold">They</span>ThatTestify
            </Link>
            
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <User className="h-4 w-4" />
              <span>{user?.firstName} {user?.lastName}</span>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-4">
            Share Your <span className="text-amber-600 font-medium">Testimony</span>
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your story matters. Share how Jesus has worked in your life to inspire and encourage others.
          </p>
        </div>

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <CheckCircle className="h-5 w-5 text-green-400 mr-2" />
              <p className="text-green-700">{success}</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center">
              <AlertCircle className="h-5 w-5 text-red-400 mr-2" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {/* Form */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            
            {/* Testimony Type */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-4">
                Testimony Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: 'written' }))}
                  className={`flex items-center justify-center p-4 border-2 rounded-lg transition-colors ${
                    formData.type === 'written'
                      ? 'border-amber-500 bg-amber-50 text-amber-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Book className="h-6 w-6 mr-3" />
                  <div>
                    <div className="font-medium">Written Story</div>
                    <div className="text-sm text-gray-500">Share your testimony in text</div>
                  </div>
                </button>
                
                <button
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, type: 'video' }))}
                  className={`flex items-center justify-center p-4 border-2 rounded-lg transition-colors ${
                    formData.type === 'video'
                      ? 'border-amber-500 bg-amber-50 text-amber-700'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  <Video className="h-6 w-6 mr-3" />
                  <div>
                    <div className="font-medium">Video Story</div>
                    <div className="text-sm text-gray-500">Share a video link</div>
                  </div>
                </button>
              </div>
            </div>

            {/* Title */}
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
                Testimony Title *
              </label>
              <input
                type="text"
                id="title"
                name="title"
                required
                value={formData.title}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                placeholder="Give your testimony a meaningful title (minimum 10 characters)"
                maxLength={150}
              />
              <div className="text-xs text-gray-500 mt-1">
                {formData.title.length}/150 characters (minimum 10)
              </div>
            </div>

            {/* Category */}
            <div>
              <label htmlFor="categoryId" className="block text-sm font-medium text-gray-700 mb-2">
                Category *
              </label>
              {categoriesLoading ? (
                <div className="flex items-center py-3">
                  <Loader className="animate-spin h-5 w-5 mr-2" />
                  <span className="text-gray-500">Loading categories...</span>
                </div>
              ) : (
                <select
                  id="categoryId"
                  name="categoryId"
                  required
                  value={formData.categoryId}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                >
                  <option value="">Select a category</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              )}
            </div>

            {/* Content - Written */}
            {formData.type === 'written' && (
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Testimony *
                </label>
                <textarea
                  id="content"
                  name="content"
                  required={formData.type === 'written'}
                  value={formData.content}
                  onChange={handleInputChange}
                  rows={12}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                  placeholder="Share your testimony here. How has Jesus worked in your life? What did He do for you? Be specific and authentic. (minimum 50 characters)"
                />
                <div className="text-xs text-gray-500 mt-1">
                  {formData.content.length} characters (minimum 50)
                </div>
              </div>
            )}

            {/* Video URL */}
            {formData.type === 'video' && (
              <div>
                <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-2">
                  Video URL *
                </label>
                <input
                  type="url"
                  id="videoUrl"
                  name="videoUrl"
                  required={formData.type === 'video'}
                  value={formData.videoUrl}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="https://www.youtube.com/watch?v=... or https://vimeo.com/..."
                />
                <div className="text-xs text-gray-500 mt-1">
                  Supported platforms: YouTube, Vimeo, Facebook, and other major video platforms
                </div>
              </div>
            )}

            {/* Additional Information */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
                  <MapPin className="inline h-4 w-4 mr-1" />
                  Location (Optional)
                </label>
                <input
                  type="text"
                  id="location"
                  name="location"
                  value={formData.location}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="City, Country"
                />
              </div>
              
              <div>
                <label htmlFor="dateOfExperience" className="block text-sm font-medium text-gray-700 mb-2">
                  <Calendar className="inline h-4 w-4 mr-1" />
                  Date of Experience (Optional)
                </label>
                <input
                  type="date"
                  id="dateOfExperience"
                  name="dateOfExperience"
                  value={formData.dateOfExperience}
                  onChange={handleInputChange}
                  max={new Date().toISOString().split('T')[0]}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Tags */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <Tag className="inline h-4 w-4 mr-1" />
                Tags (Optional)
              </label>
              <div className="flex flex-wrap gap-2 mb-3">
                {formData.tags.map((tag, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-amber-100 text-amber-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(tag)}
                      className="ml-2 text-amber-600 hover:text-amber-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
              <div className="flex">
                <input
                  type="text"
                  value={tagInput}
                  onChange={(e) => setTagInput(e.target.value)}
                  onKeyPress={handleTagInputKeyPress}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent"
                  placeholder="Add tags (press Enter or comma to add)"
                  maxLength={20}
                />
                <button
                  type="button"
                  onClick={handleAddTag}
                  disabled={!tagInput.trim() || formData.tags.length >= 10}
                  className="px-4 py-2 bg-amber-600 text-white rounded-r-lg hover:bg-amber-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Add
                </button>
              </div>
              <div className="text-xs text-gray-500 mt-1">
                Maximum 10 tags. Examples: healing, prayer, faith, miracle
              </div>
            </div>

            {/* Privacy Options */}
            <div className="border-t border-gray-200 pt-6">
              <h3 className="text-lg font-medium text-gray-900 mb-4">Privacy Options</h3>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    id="isAnonymous"
                    name="isAnonymous"
                    type="checkbox"
                    checked={formData.isAnonymous}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label htmlFor="isAnonymous" className="ml-3 text-sm text-gray-700">
                    <span className="font-medium">Share anonymously</span>
                    <div className="text-gray-500">Your name will not be displayed with this testimony</div>
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    id="allowComments"
                    name="allowComments"
                    type="checkbox"
                    checked={formData.allowComments}
                    onChange={handleInputChange}
                    className="h-4 w-4 text-amber-600 focus:ring-amber-500 border-gray-300 rounded"
                  />
                  <label htmlFor="allowComments" className="ml-3 text-sm text-gray-700">
                    <span className="font-medium">Allow comments</span>
                    <div className="text-gray-500">Let others respond and be encouraged by your story</div>
                  </label>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="border-t border-gray-200 pt-6">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-amber-600 text-white py-4 px-6 rounded-lg hover:bg-amber-700 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <Loader className="animate-spin h-5 w-5 mr-2" />
                    Submitting Testimony...
                  </div>
                ) : (
                  'Submit Testimony for Review'
                )}
              </button>
              
              <div className="mt-4 text-sm text-gray-500 text-center">
                Your testimony will be reviewed by our team before being published. 
                This helps us maintain a safe and encouraging environment for all.
              </div>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ShareTestimony;