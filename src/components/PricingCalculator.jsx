
import React, { useState } from 'react';
import { Upload, Clock, Users, FileText, Star, CheckCircle, ArrowRight, Menu, X, Calculator, Play, Shield, Zap, Globe } from 'lucide-react';

// Pricing Calculator Component
const PricingCalculator = () => {
  const [speakers, setSpeakers] = useState(2);
  const [turnaround, setTurnaround] = useState('3days');
  const [timestamp, setTimestamp] = useState('none');
  const [verbatim, setVerbatim] = useState(false);
  const [duration, setDuration] = useState(60); // minutes

  const calculatePrice = () => {
    // Base rates per minute based on verbatim type, speakers, and turnaround
    let rate = 0;

    if (!verbatim) {
      // CLEAN VERBATIM
      if (speakers === 2) {
        const cleanVerbatim2Speakers = {
          '3days': 0.9,
          '1.5days': 1.2,
          '6-12hrs': 1.5
        };
        rate = cleanVerbatim2Speakers[turnaround] || 0.9;
      } else if (speakers === 3) {
        const cleanVerbatim3Speakers = {
          '3days': 1.25,
          '1.5days': 1.2,
          '6-12hrs': 1.5
        };
        rate = cleanVerbatim3Speakers[turnaround] || 1.25;
      }
    } else {
      // FULL VERBATIM
      if (speakers === 2) {
        const fullVerbatim2Speakers = {
          '3days': 1.1,
          '1.5days': 1.4,
          '6-12hrs': 1.7
        };
        rate = fullVerbatim2Speakers[turnaround] || 1.1;
      } else if (speakers === 3) {
        const fullVerbatim3Speakers = {
          '3days': 1.45,
          '1.5days': 1.2,
          '6-12hrs': 2.7
        };
        rate = fullVerbatim3Speakers[turnaround] || 1.45;
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

    rate += timestampRates[timestamp] || 0.0;

    // Calculate total price (duration in minutes * rate per minute)
    const totalPrice = duration * rate;

    return {
      rate: rate.toFixed(2),
      price: totalPrice.toFixed(2)
    };
  };

  const result = calculatePrice();

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-2xl mx-auto">
      <h3 className="text-2xl font-bold text-gray-900 mb-6">Pricing Calculator</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Duration (minutes)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(parseInt(e.target.value) || 0)}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
            min="1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Number of Speakers</label>
          <select
            value={speakers}
            onChange={(e) => setSpeakers(parseInt(e.target.value))}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          >
            <option value={2}>1 - 2 Speakers</option>
            <option value={3}>3+ Speakers</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Turnaround Time</label>
          <select
            value={turnaround}
            onChange={(e) => setTurnaround(e.target.value)}
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
            value={timestamp}
            onChange={(e) => setTimestamp(e.target.value)}
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

      <div className="mb-6">
        <label className="flex items-center space-x-3">
          <input
            type="checkbox"
            checked={verbatim}
            onChange={(e) => setVerbatim(e.target.checked)}
            className="w-5 h-5 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
          />
          <span className="text-sm font-medium text-gray-700">Full Verbatim</span>
        </label>
      </div>

      <div className="bg-purple-50 rounded-xl p-6 text-center">
        <div className="text-3xl font-bold text-purple-600 mb-2">${result.price}</div>
        <div className="text-gray-600">Rate: ${result.rate}/minute</div>
      </div>
    </div>
  );
};

export default PricingCalculator;