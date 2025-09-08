import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { 
  ArrowLeft, Play, Book, Calendar, MapPin, User, 
  Eye, Heart, Share2, Tag, ChevronRight, Star
} from 'lucide-react';
import { URL } from '../url';



const TestimonyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [testimony, setTestimony] = useState(null);
  const [relatedTestimonies, setRelatedTestimonies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchTestimony();
  }, [id]);

  const fetchTestimony = async () => {
    try {
      setLoading(true);
      const [testimonyResponse, relatedResponse] = await Promise.all([
        axios.get(`${URL}/testimonies/${id}`),
        axios.get(`${URL}/testimonies?limit=3`)
      ]);
      
      setTestimony(testimonyResponse.data.testimony);
      // Filter out current testimony from related
      setRelatedTestimonies(
        relatedResponse.data.testimonies.filter(t => t.id !== id).slice(0, 3)
      );
    } catch (error) {
      console.error('Failed to fetch testimony:', error);
      if (error.response?.status === 404) {
        setError('Testimony not found');
      } else {
        setError('Failed to load testimony');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: testimony.title,
        text: `Read this inspiring testimony: ${testimony.title}`,
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading testimony...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center max-w-md">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Story Not Found</h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              onClick={() => navigate('/')}
              className="bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors"
            >
              Return Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!testimony) return null;

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
            
            <button
              onClick={handleShare}
              className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Testimony Header */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          <div className="flex items-center mb-6">
            <div className="flex items-center space-x-4">
              {testimony.isFeatured && (
                <div className="flex items-center">
                  <Star className="h-5 w-5 text-amber-400 mr-1" />
                  <span className="text-sm text-amber-600 font-medium">Featured</span>
                </div>
              )}
              
              <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                testimony.type === 'video' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'bg-blue-100 text-blue-800'
              }`}>
                {testimony.type === 'video' ? (
                  <>
                    <Play className="h-4 w-4 mr-1" />
                    Video Story
                  </>
                ) : (
                  <>
                    <Book className="h-4 w-4 mr-1" />
                    Written Story
                  </>
                )}
              </span>
              
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-amber-100 text-amber-800">
                {testimony.category?.name}
              </span>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-light text-gray-900 mb-6 leading-tight">
            {testimony.title}
          </h1>

          {/* Author & Meta Info */}
          <div className="flex flex-wrap items-center gap-6 text-sm text-gray-600 mb-6">
            <div className="flex items-center">
              <User className="h-4 w-4 mr-2" />
              <span>
                {testimony.isAnonymous 
                  ? 'Anonymous Believer' 
                  : `${testimony.user?.firstName || ''} ${testimony.user?.lastName || ''}`.trim()
                }
              </span>
            </div>
            
            {testimony.location && (
              <div className="flex items-center">
                <MapPin className="h-4 w-4 mr-2" />
                <span>{testimony.location}</span>
              </div>
            )}
            
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2" />
              <span>
                {testimony.dateOfExperience 
                  ? formatDate(testimony.dateOfExperience)
                  : formatDate(testimony.createdAt)
                }
              </span>
            </div>
            
            <div className="flex items-center">
              <Eye className="h-4 w-4 mr-2" />
              <span>{testimony.viewCount || 0} views</span>
            </div>
          </div>

          {/* Tags */}
          {testimony.tags && testimony.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-6">
              {testimony.tags.map((tag, index) => (
                <span 
                  key={index}
                  className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Content */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-8">
          {testimony.type === 'video' ? (
            <div className="space-y-6">
              {/* Video Player */}
              <div className="aspect-video bg-gray-900 rounded-lg overflow-hidden">
                {testimony.videoUrl ? (
                  <iframe
                    src={testimony.videoUrl.includes('youtube.com') 
                      ? testimony.videoUrl.replace('watch?v=', 'embed/')
                      : testimony.videoUrl
                    }
                    className="w-full h-full"
                    allowFullScreen
                    title={testimony.title}
                  ></iframe>
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <div className="text-center text-white">
                      <Play className="h-16 w-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Video not available</p>
                      <p className="text-sm opacity-75">This is demo content</p>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Video Description */}
              {testimony.content && (
                <div className="prose prose-lg max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {testimony.content}
                  </p>
                </div>
              )}
            </div>
          ) : (
            /* Written Content */
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-800 leading-relaxed whitespace-pre-wrap text-lg">
                {testimony.content}
              </div>
            </div>
          )}
        </div>

        {/* Author Info (if not anonymous) */}
        {!testimony.isAnonymous && testimony.user && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
            <h3 className="text-lg font-medium text-gray-900 mb-4">About the Author</h3>
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center">
                {testimony.user.profilePicture ? (
                  <img 
                    src={testimony.user.profilePicture} 
                    alt={`${testimony.user.firstName} ${testimony.user.lastName}`}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <User className="h-8 w-8 text-gray-400" />
                )}
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900">
                  {testimony.user.firstName} {testimony.user.lastName}
                </h4>
                {testimony.user.occupation && (
                  <p className="text-sm text-gray-600 mt-1">{testimony.user.occupation}</p>
                )}
                {testimony.user.church && (
                  <p className="text-sm text-gray-600 mt-1">Attends {testimony.user.church}</p>
                )}
                {(testimony.user.city || testimony.user.country) && (
                  <p className="text-sm text-gray-500 mt-2">
                    <MapPin className="h-4 w-4 inline mr-1" />
                    {[testimony.user.city, testimony.user.country].filter(Boolean).join(', ')}
                  </p>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Related Testimonies */}
        {relatedTestimonies.length > 0 && (
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-6">More Inspiring Stories</h3>
            <div className="grid md:grid-cols-3 gap-6">
              {relatedTestimonies.map((relatedTestimony) => (
                <Link
                  key={relatedTestimony.id}
                  to={`/testimony/${relatedTestimony.id}`}
                  className="group"
                >
                  <div className="bg-gray-50 rounded-lg p-4 hover:bg-gray-100 transition-colors">
                    <div className="flex items-center mb-2">
                      {relatedTestimony.type === 'video' ? (
                        <Play className="h-4 w-4 text-purple-600 mr-2" />
                      ) : (
                        <Book className="h-4 w-4 text-blue-600 mr-2" />
                      )}
                      <span className="text-xs text-gray-500">{relatedTestimony.category?.name}</span>
                    </div>
                    <h4 className="font-medium text-gray-900 mb-2 group-hover:text-amber-600 transition-colors line-clamp-2">
                      {relatedTestimony.title}
                    </h4>
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {relatedTestimony.type === 'written' 
                        ? relatedTestimony.content?.substring(0, 120) + '...'
                        : 'Watch this inspiring video testimony...'
                      }
                    </p>
                    <div className="flex items-center justify-between mt-3 text-xs text-gray-500">
                      <span>{relatedTestimony.viewCount || 0} views</span>
                      <ChevronRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Call to Action */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg p-8 mt-8 text-center">
          <h3 className="text-2xl font-light text-gray-900 mb-4">Inspired by this story?</h3>
          <p className="text-gray-600 mb-6">
            Share your own testimony and be part of our mission to document 1 million stories of Jesus.
          </p>
          <Link
            to="/?page=share"
            className="inline-flex items-center bg-amber-600 text-white px-6 py-3 rounded-lg hover:bg-amber-700 transition-colors font-medium"
          >
            Share Your Story
            <ChevronRight className="ml-2 h-5 w-5" />
          </Link>
        </div>
      </main>
    </div>
  );
};

export default TestimonyDetail;