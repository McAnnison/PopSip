'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from "next/image";
import Link from "next/link";

interface BartenderService {
  id: number;
  service_name: string;
  description: string;
  price: number;
  duration: number;
  max_guests: number;
}

interface Review {
  id: number;
  customer_name: string;
  rating: number;
  review_text: string;
  created_at: string;
}

interface Bartender {
  id: number;
  name: string;
  business_name: string;
  bio: string;
  experience_years: number;
  specialties: string;
  hourly_rate: number;
  profile_image: string;
  cover_image: string;
  location: string;
  phone: string;
  rating: number;
  total_bookings: number;
  services: BartenderService[];
  reviews: Review[];
}

export default function BartenderProfilePage() {
  const params = useParams();
  const [bartender, setBartender] = useState<Bartender | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState<BartenderService | null>(null);
  const [showBookingForm, setShowBookingForm] = useState(false);
  const [bookingData, setBookingData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    event_date: '',
    event_time: '',
    event_location: '',
    guest_count: '',
    special_requests: '',
  });

  useEffect(() => {
    if (params.id) {
      fetchBartenderDetails();
    }
  }, );

  const fetchBartenderDetails = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/bartenders/${params.id}`
      );
      const data = await response.json();
      if (data.success) {
        setBartender(data.data);
        if (data.data.services && data.data.services.length > 0) {
          setSelectedService(data.data.services[0]);
        }
      }
    } catch (error) {
      console.error('Error fetching bartender:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedService || !bartender) return;

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/bartenders/bookings`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            bartender_id: bartender.id,
            service_id: selectedService.id,
            ...bookingData,
            duration: selectedService.duration,
            total_price: selectedService.price,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        alert('Booking request sent successfully! The bartender will confirm shortly.');
        setShowBookingForm(false);
        setBookingData({
          customer_name: '',
          customer_email: '',
          customer_phone: '',
          event_date: '',
          event_time: '',
          event_location: '',
          guest_count: '',
          special_requests: '',
        });
      }
    } catch (error) {
      console.error('Error creating booking:', error);
      alert('Failed to create booking. Please try again.');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block w-16 h-16 border-4 border-purple-600 border-t-transparent rounded-full animate-spin"></div>
          <p className="mt-4 text-gray-600 font-medium">Loading bartender profile...</p>
        </div>
      </div>
    );
  }

  if (!bartender) {
    return (
      <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-orange-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Bartender not found</h2>
  <         Link href="/bartenders" className="text-purple-600 hover:underline"> Back to all bartenders</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-3xl font-bold gradient-text">🍹 PopSip</Link>
          <nav className="flex gap-2">
            <Link href="/bartenders" className="px-4 py-2 hover:bg-purple-100 rounded-lg transition-colors">Browse Bartenders</Link>
            <button className="px-4 py-2 hover:bg-purple-100 rounded-lg transition-colors">Packages</button>
            <button className="px-6 py-2 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold shadow-lg neon-glow">
              Book Now
            </button>
          </nav>
        </div>
      </header>

      {/* Cover Image */}
      <div className="relative h-80 bg-linear-to-br from-purple-400 via-pink-400 to-orange-400">
        {bartender.cover_image && (
          <Image
            src={bartender.cover_image}
            alt="Cover"
            className="w-full h-full object-cover"
          ></Image>
        )}
      </div>

      <main className="container mx-auto px-4 -mt-32 relative z-10 pb-20">
        {/* Profile Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 mb-8 border-2 border-purple-100">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Profile Image */}
            <div className="shrink-0">
              <Image
                src={bartender.profile_image || 'https://via.placeholder.com/200'}
                alt={bartender.name}
                className="w-48 h-48 rounded-2xl object-cover shadow-xl border-4 border-white"
              ></Image>
            </div>

            {/* Profile Info */}
            <div className="flex-1">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h1 className="text-4xl font-extrabold text-purple-900 mb-2">{bartender.name}</h1>
                  {bartender.business_name && (
                    <p className="text-2xl text-purple-600 font-semibold mb-3">{bartender.business_name}</p>
                  )}
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold gradient-text mb-1">⭐ {bartender.rating.toFixed(1)}</div>
                  <div className="text-sm text-gray-600">{bartender.reviews?.length || 0} reviews</div>
                </div>
              </div>

              <div className="flex flex-wrap gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-xl">📍</span>
                  <span className="font-medium">{bartender.location}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-xl">🎯</span>
                  <span className="font-medium">{bartender.experience_years} years experience</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-xl">🎉</span>
                  <span className="font-medium">{bartender.total_bookings} events served</span>
                </div>
                <div className="flex items-center gap-2 text-gray-700">
                  <span className="text-xl">💰</span>
                  <span className="font-medium">${bartender.hourly_rate}/hour</span>
                </div>
              </div>

              <p className="text-gray-700 leading-relaxed mb-6">{bartender.bio}</p>

              <div className="mb-6">
                <h3 className="font-bold text-gray-800 mb-3">Specialties:</h3>
                <div className="flex flex-wrap gap-2">
                  {bartender.specialties?.split(',').map((specialty, idx) => (
                    <span
                      key={idx}
                      className="px-4 py-2 bg-linear-to-r from-purple-100 to-pink-100 text-purple-700 rounded-full font-medium"
                    >
                      {specialty.trim()}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Services Column */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 border-2 border-purple-100">
              <h2 className="text-3xl font-bold text-purple-900 mb-6">🍸 Services & Packages</h2>
              <div className="space-y-4">
                {bartender.services && bartender.services.length > 0 ? (
                  bartender.services.map((service) => (
                    <div
                      key={service.id}
                      className={`p-6 rounded-xl border-2 transition-all cursor-pointer ${
                        selectedService?.id === service.id
                          ? 'border-purple-500 bg-purple-50'
                          : 'border-gray-200 hover:border-purple-300'
                      }`}
                      onClick={() => setSelectedService(service)}
                    >
                      <div className="flex justify-between items-start mb-3">
                        <h3 className="text-xl font-bold text-purple-900">{service.service_name}</h3>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-purple-600">${service.price}</div>
                          <div className="text-sm text-gray-600">per service</div>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{service.description}</p>
                      <div className="flex gap-4 text-sm text-gray-600">
                        <span>⏱️ {service.duration} hours</span>
                        <span>👥 Up to {service.max_guests} guests</span>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No services listed yet.</p>
                )}
              </div>
            </div>

            {/* Reviews */}
            <div className="bg-white rounded-2xl shadow-xl p-8 border-2 border-purple-100">
              <h2 className="text-3xl font-bold text-purple-900 mb-6">⭐ Customer Reviews</h2>
              <div className="space-y-6">
                {bartender.reviews && bartender.reviews.length > 0 ? (
                  bartender.reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 pb-6 last:border-0">
                      <div className="flex items-center justify-between mb-3">
                        <div className="font-bold text-gray-900">{review.customer_name}</div>
                        <div className="flex items-center gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={i < review.rating ? 'text-yellow-400' : 'text-gray-300'}>
                              ⭐
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{review.review_text}</p>
                      <div className="text-sm text-gray-500 mt-2">
                        {new Date(review.created_at).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600">No reviews yet. Be the first to book!</p>
                )}
              </div>
            </div>
          </div>

          {/* Booking Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-xl p-6 sticky top-24 border-2 border-purple-100">
              <h3 className="text-2xl font-bold text-purple-900 mb-6">📅 Book This Bartender</h3>
              
              {selectedService ? (
                <div className="mb-6 p-4 bg-purple-50 rounded-xl">
                  <div className="font-semibold text-purple-900 mb-2">Selected Service:</div>
                  <div className="text-lg font-bold text-purple-700">{selectedService.service_name}</div>
                  <div className="text-2xl font-extrabold text-purple-900 mt-2">${selectedService.price}</div>
                </div>
              ) : (
                <div className="mb-6 p-4 bg-gray-50 rounded-xl">
                  <p className="text-gray-600">Select a service to continue</p>
                </div>
              )}

              {!showBookingForm ? (
                <button
                  onClick={() => setShowBookingForm(true)}
                  disabled={!selectedService}
                  className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition-all ${
                    selectedService
                      ? 'bg-linear-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700'
                      : 'bg-gray-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  Request Booking
                </button>
              ) : (
                <form onSubmit={handleBookingSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Your Name</label>
                    <input
                      type="text"
                      required
                      value={bookingData.customer_name}
                      onChange={(e) => setBookingData({ ...bookingData, customer_name: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email</label>
                    <input
                      type="email"
                      required
                      value={bookingData.customer_email}
                      onChange={(e) => setBookingData({ ...bookingData, customer_email: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      required
                      value={bookingData.customer_phone}
                      onChange={(e) => setBookingData({ ...bookingData, customer_phone: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Event Date</label>
                    <input
                      type="date"
                      required
                      value={bookingData.event_date}
                      onChange={(e) => setBookingData({ ...bookingData, event_date: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Event Time</label>
                    <input
                      type="time"
                      required
                      value={bookingData.event_time}
                      onChange={(e) => setBookingData({ ...bookingData, event_time: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Event Location</label>
                    <input
                      type="text"
                      required
                      value={bookingData.event_location}
                      onChange={(e) => setBookingData({ ...bookingData, event_location: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Guest Count</label>
                    <input
                      type="number"
                      required
                      value={bookingData.guest_count}
                      onChange={(e) => setBookingData({ ...bookingData, guest_count: e.target.value })}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Special Requests</label>
                    <textarea
                      value={bookingData.special_requests}
                      onChange={(e) => setBookingData({ ...bookingData, special_requests: e.target.value })}
                      rows={3}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-bold shadow-lg transition-all"
                  >
                    Send Booking Request
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowBookingForm(false)}
                    className="w-full py-2 border border-gray-300 rounded-lg hover:bg-gray-50 font-semibold transition-all"
                  >
                    Cancel
                  </button>
                </form>
              )}

              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  <p className="mb-2">✅ Instant confirmation</p>
                  <p className="mb-2">💳 Secure payment</p>
                  <p>🔒 Your data is protected</p>
                </div>
              </div>
            </div>
          </div>
        </div>
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
