import React from 'react';
import { FileText, Mail, Phone, MapPin, ArrowLeft, Package } from 'lucide-react';
import { Link } from 'react-router-dom';

const Contact = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2">
              <FileText className="h-8 w-8 text-[#006D5B]" />
              <span className="text-2xl font-bold text-[#006D5B]">
                ZenTranscript
              </span>
            </Link>

            <Link
              to="/"
              className="flex items-center text-gray-700 hover:text-[#006D5B] transition-colors"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-20 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Get in
            <span className="bg-gradient-to-r from-[#006D5B] to-purple-800 bg-clip-text text-transparent"> Touch</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions about our transcription services? We're here to help.
            Reach out to us and we'll respond as soon as possible.
          </p>
        </div>
      </section>

      {/* Contact Cards Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Email Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8 hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-[#006D5B] to-purple-700 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Mail className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Email Us</h3>
              <p className="text-gray-600 mb-4">
                Send us an email and we'll get back to you within 24 hours.
              </p>
              <a
                href="mailto:support@zentranscript.com"
                className="text-[#006D5B] font-semibold text-lg hover:text-purple-700 transition-colors inline-flex items-center"
              >
                support@zentranscript.com
                <ArrowLeft className="h-5 w-5 ml-2 rotate-180" />
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-white rounded-2xl shadow-lg border border-purple-100 p-8 hover:shadow-xl transition-shadow">
              <div className="bg-gradient-to-br from-[#006D5B] to-purple-700 w-16 h-16 rounded-full flex items-center justify-center mb-6">
                <Phone className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Call Us</h3>
              <p className="text-gray-600 mb-4">
                Speak directly with our support team during business hours.
              </p>
              <a
                href="tel:+18005551234"
                className="text-[#006D5B] font-semibold text-lg hover:text-purple-700 transition-colors inline-flex items-center"
              >
                +1 (800) 555-1234
                <ArrowLeft className="h-5 w-5 ml-2 rotate-180" />
              </a>
            </div>
          </div>

          {/* Bulk Orders Card */}
          <div className="mt-8 bg-white rounded-2xl shadow-lg border-2 border-[#006D5B] p-8">
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              <div className="bg-gradient-to-br from-[#006D5B] to-purple-700 w-16 h-16 rounded-full flex items-center justify-center flex-shrink-0">
                <Package className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Bulk Orders & Enterprise</h3>
                <p className="text-gray-600 mb-4">
                  Need to transcribe a large volume of audio or video files? We offer special pricing
                  and dedicated support for bulk orders. Whether you're a media company, research institution,
                  legal firm, or enterprise business, we can create a custom plan tailored to your needs.
                </p>
                <ul className="text-gray-600 space-y-1 mb-4">
                  <li className="flex items-center"><span className="text-[#006D5B] mr-2">&#10003;</span> Volume discounts starting at 10+ hours</li>
                  <li className="flex items-center"><span className="text-[#006D5B] mr-2">&#10003;</span> Dedicated account manager</li>
                  <li className="flex items-center"><span className="text-[#006D5B] mr-2">&#10003;</span> Priority turnaround times</li>
                  <li className="flex items-center"><span className="text-[#006D5B] mr-2">&#10003;</span> Custom invoicing and billing</li>
                </ul>
                <p className="text-gray-700 font-medium">
                  Email us at{' '}
                  <a href="mailto:support@zentranscript.com" className="text-[#006D5B] hover:text-purple-700 underline">
                    support@zentranscript.com
                  </a>{' '}
                  or call{' '}
                  <a href="tel:+18005551234" className="text-[#006D5B] hover:text-purple-700 underline">
                    +1 (800) 555-1234
                  </a>{' '}
                  to discuss your bulk transcription needs.
                </p>
              </div>
            </div>
          </div>

          {/* Additional Info Card */}
          <div className="mt-8 bg-gradient-to-r from-[#006D5B] to-purple-700 rounded-2xl p-8 text-white">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-6 md:mb-0">
                <h3 className="text-2xl font-bold mb-2">Business Hours</h3>
                <p className="text-purple-100">
                  Monday - Friday: 9:00 AM - 6:00 PM EST<br />
                  Saturday - Sunday: 10:00 AM - 4:00 PM EST
                </p>
              </div>
              <div className="text-center md:text-right">
                <p className="text-purple-100 mb-2">Average response time</p>
                <p className="text-3xl font-bold">Under 2 hours</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Teaser */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Common Questions</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            <div className="p-6 rounded-xl bg-purple-50 border border-purple-100">
              <h4 className="font-semibold text-gray-900 mb-2">How fast is your turnaround?</h4>
              <p className="text-gray-600">Our express service delivers transcripts in 6-12 hours. Standard delivery is 24-48 hours.</p>
            </div>
            <div className="p-6 rounded-xl bg-purple-50 border border-purple-100">
              <h4 className="font-semibold text-gray-900 mb-2">What audio formats do you accept?</h4>
              <p className="text-gray-600">We accept all major audio and video formats including MP3, WAV, MP4, and more.</p>
            </div>
            <div className="p-6 rounded-xl bg-purple-50 border border-purple-100">
              <h4 className="font-semibold text-gray-900 mb-2">Is my content secure?</h4>
              <p className="text-gray-600">Yes, we use industry-standard encryption and strict confidentiality protocols.</p>
            </div>
            <div className="p-6 rounded-xl bg-purple-50 border border-purple-100">
              <h4 className="font-semibold text-gray-900 mb-2">Can I get a refund?</h4>
              <p className="text-gray-600">We offer revisions and refunds if the transcript doesn't meet our accuracy standards.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FileText className="h-6 w-6 text-[#006D5B]" />
            <span className="text-xl font-bold">ZenTranscript</span>
          </div>
          <p className="text-gray-400">&copy; 2025 UXHUNTERS. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Contact;
