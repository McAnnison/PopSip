'use client';

import Link from 'next/dist/client/link';
import { useEffect, useState } from 'react';
import Image from "next/image"
interface Bartender {
  id: number;
  name: string;
  business_name: string;
  bio: string;
  experience_years: number;
  specialties: string;
  hourly_rate: number;
  profile_image: string;
  location: string;
  rating: number;
  total_bookings: number;
  review_count: number;
}

export default function BartendersPage() {
  const [bartenders, setBartenders] = useState<Bartender[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    location: '',
    specialties: '',
    minRating: '',
    maxPrice: '',
  });

  useEffect(() => {
    fetchBartenders();
  }, );

  const fetchBartenders = async () => {
    try {
      const queryParams = new URLSearchParams();
      if (filters.location) queryParams.append('location', filters.location);
      if (filters.specialties) queryParams.append('specialties', filters.specialties);
      if (filters.minRating) queryParams.append('minRating', filters.minRating);
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/bartenders?${queryParams}`
      );
      const data = await response.json();
      if (data.success) {
        setBartenders(data.data);
      }
    } catch (error) {
      console.error('Error fetching bartenders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value,
    });
  };

  const applyFilters = () => {
    setLoading(true);
    fetchBartenders();
  };

  const clearFilters = () => {
    setFilters({
      location: '',
      specialties: '',
      minRating: '',
      maxPrice: '',
    });
    setLoading(true);
    fetchBartenders();
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-3xl font-bold gradient-text">🍹 PopSip</Link>

          <nav className="flex gap-2">
            <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg font-semibold">Browse Bartenders</button>
            <button className="px-4 py-2 hover:bg-purple-100 rounded-lg transition-colors">Packages</button>
            <button className="px-4 py-2 hover:bg-purple-100 rounded-lg transition-colors">Become a Bartender</button>
            <button className="px-6 py-2 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold shadow-lg neon-glow">
              Book Now
            </button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12">
        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-6xl font-extrabold mb-4">
            <span className="gradient-text">Find Your Perfect Bartender</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Browse our talented community of professional bartenders and mixologists. 
            Filter by location, specialty, rating, and more to find the perfect match for your event! 🎉
          </p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-xl p-6 mb-8 border-2 border-purple-100">
          <h3 className="text-xl font-bold mb-4 text-purple-900">🔍 Filter Bartenders</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Location</label>
              <input
                type="text"
                name="location"
                value={filters.location}
                onChange={handleFilterChange}
                placeholder="e.g., Los Angeles, CA"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Specialties</label>
              <input
                type="text"
                name="specialties"
                value={filters.specialties}
                onChange={handleFilterChange}
                placeholder="e.g., Craft Cocktails"
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Min Rating</label>
              <select
                name="minRating"
                value={filters.minRating}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Any Rating</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="3.5">3.5+ Stars</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Max Price/Hour</label>
              <select
                name="maxPrice"
                value={filters.maxPrice}
                onChange={handleFilterChange}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="">Any Price</option>
                <option value="50">Under $50</option>
                <option value="75">Under $75</option>
                <option value="100">Under $100</option>
              </select>
            </div>
          </div>
          <div className="flex gap-3 mt-4">
            <button
              onClick={applyFilters}
              className="px-6 py-2 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-semibold shadow-lg transition-all"
            >
              Apply Filters
            </button>
            <button
              onClick={clearFilters}
              className="px-6 py-2 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-all"
            >
              Clear All
            </button>
          </div>
        </div>

        {/* Results Count */}
        <div className="mb-6">
          <p className="text-gray-600 font-medium">
            {loading ? 'Loading...' : `${bartenders.length} bartenders found`}
          </p>
        </div>

        {/* Bartender Grid */}
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-4 text-gray-600 font-medium">Finding amazing bartenders...</p>
          </div>
        ) : bartenders.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-xl">
            <div className="text-6xl mb-4">😕</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">No bartenders found</h3>
            <p className="text-gray-600">Try adjusting your filters or check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bartenders.map((bartender) => (
              <div
                key={bartender.id}
                className="bg-white rounded-2xl shadow-xl overflow-hidden card-hover border-2 border-purple-100"
              >
                <div className="relative h-64 bg-linear-to-br from-purple-200 to-pink-200">
                  <Image
                    src={bartender.profile_image || 'https://via.placeholder.com/400x300'}
                    alt={bartender.name}
                    className="w-full h-full object-cover"
                  ></Image>
                  <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full font-bold text-purple-900">
                    ⭐ {bartender.rating.toFixed(1)}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-purple-900 mb-1">{bartender.name}</h3>
                  {bartender.business_name && (
                    <p className="text-purple-600 font-semibold mb-3">{bartender.business_name}</p>
                  )}
                  <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
                    <span>📍 {bartender.location}</span>
                    <span>•</span>
                    <span>🎯 {bartender.experience_years} years</span>
                  </div>
                  <p className="text-gray-700 mb-4 line-clamp-2">{bartender.bio}</p>
                  <div className="mb-4">
                    <div className="flex flex-wrap gap-2">
                      {bartender.specialties?.split(',').slice(0, 3).map((specialty, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium"
                        >
                          {specialty.trim()}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                    <div>
                      <div className="text-2xl font-bold text-purple-900">
                        ${bartender.hourly_rate}
                        <span className="text-sm font-normal text-gray-600">/hour</span>
                      </div>
                      <div className="text-sm text-gray-500">{bartender.total_bookings} bookings</div>
                    </div>
                    <a
                      href={`/bartenders/${bartender.id}`}
                      className="px-6 py-2 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-semibold shadow-lg transition-all"
                    >
                      View Profile
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-900 text-white py-12 mt-20">
        <div className="container mx-auto px-4 text-center text-gray-400">
          <p>&copy; 2026 PopSip. All rights reserved. Made with 💜 for bartenders and party lovers.</p>
        </div>
      </footer>
    </div>
  );
}
