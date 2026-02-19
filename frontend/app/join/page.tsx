'use client';
import Link from "next/link";
import { useState } from 'react';

export default function JoinBartenderPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    // User info
    name: '',
    email: '',
    password: '',
    // Bartender profile
    business_name: '',
    bio: '',
    experience_years: '',
    specialties: '',
    hourly_rate: '',
    phone: '',
    location: '',
    service_radius: '30',
    profile_image: '',
  });

  const [services, setServices] = useState([
    { service_name: '', description: '', price: '', duration: '', max_guests: '' },
  ]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleServiceChange = (index: number, field: string, value: string) => {
    const newServices = [...services];
    newServices[index] = { ...newServices[index], [field]: value };
    setServices(newServices);
  };

  const addService = () => {
    setServices([
      ...services,
      { service_name: '', description: '', price: '', duration: '', max_guests: '' },
    ]);
  };

  const removeService = (index: number) => {
    setServices(services.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Step 1: Create user account (would need authentication endpoint)
      // For demonstration, we'll show how this would work with actual API calls
      
      // Step 2: Create bartender profile
      const bartenderResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/bartenders`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: 1, // In production, this would come from auth
            business_name: formData.business_name,
            bio: formData.bio,
            experience_years: parseInt(formData.experience_years),
            specialties: formData.specialties,
            hourly_rate: parseFloat(formData.hourly_rate),
            phone: formData.phone,
            location: formData.location,
            service_radius: parseInt(formData.service_radius),
            profile_image: formData.profile_image,
          }),
        }
      );
      
      const bartenderData = await bartenderResponse.json();
      
      if (bartenderData.success) {
        const bartenderId = bartenderData.data.id;
        
        // Step 3: Add services
        for (const service of services) {
          if (service.service_name) {
            await fetch(
              `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/bartenders/services`,
              {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  bartender_id: bartenderId,
                  service_name: service.service_name,
                  description: service.description,
                  price: parseFloat(service.price),
                  duration: parseInt(service.duration),
                  max_guests: parseInt(service.max_guests),
                }),
              }
            );
          }
        }
        
        alert('Profile created successfully! You can now publish your profile to start receiving bookings.');
        // In production, redirect to bartender dashboard
        window.location.href = '/';
      } else {
        throw new Error(bartenderData.message || 'Failed to create profile');
      }
    } catch (error) {
      console.error('Error creating profile:', error);
      alert('Failed to create profile. Please try again. Note: This requires a running backend server with database connection.');
    }
  };

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  return (
    <div className="min-h-screen bg-linear-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <Link href="/" className="text-3xl font-bold gradient-text">🍹 PopSip</Link>
          <nav className="flex gap-2">
            <Link href="/bartenders" className="px-4 py-2 hover:bg-orange-100 rounded-lg transition-colors">Browse Bartenders</Link>
            <button className="px-4 py-2 bg-orange-150 text-orange-700 rounded-lg font-semibold">Join as Bartender</button>
          </nav>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Progress Indicator */}
        <div className="mb-12">
          <div className="flex items-center justify-center gap-4">
            {[1, 2, 3].map((s) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center font-bold ${
                    s <= step
                      ? 'bg-linear-to-r from-orange-600 to-red-600 text-white'
                      : 'bg-gray-200 text-gray-500'
                  }`}
                >
                  {s}
                </div>
                {s < 3 && (
                  <div
                    className={`w-24 h-1 ${
                      s < step ? 'bg-linear-to-r from-orange-600 to-red-600' : 'bg-gray-200'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-center gap-32 mt-4 text-sm font-semibold">
            <span className={step >= 1 ? 'text-orange-700' : 'text-gray-500'}>Profile Info</span>
            <span className={step >= 2 ? 'text-orange-700' : 'text-gray-500'}>Services</span>
            <span className={step >= 3 ? 'text-orange-700' : 'text-gray-500'}>Review</span>
          </div>
        </div>

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4">
            <span className="gradient-text">Join PopSip</span>
          </h1>
          <p className="text-xl text-gray-600">
            Start your journey as a professional bartender on our platform! 🍸
          </p>
        </div>

        {/* Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 border-2 border-orange-100">
          <form onSubmit={handleSubmit}>
            {/* Step 1: Profile Information */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-orange-900 mb-6">👤 Profile Information</h2>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="John Smith"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Email *</label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="john@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Password *</label>
                    <input
                      type="password"
                      name="password"
                      required
                      value={formData.password}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Business Name</label>
                    <input
                      type="text"
                      name="business_name"
                      value={formData.business_name}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Elite Mixology"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Years of Experience *</label>
                    <input
                      type="number"
                      name="experience_years"
                      required
                      value={formData.experience_years}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="5"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Location *</label>
                    <input
                      type="text"
                      name="location"
                      required
                      value={formData.location}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="Los Angeles, CA"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Service Radius (miles)</label>
                    <input
                      type="number"
                      name="service_radius"
                      value={formData.service_radius}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="30"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Hourly Rate ($) *</label>
                    <input
                      type="number"
                      name="hourly_rate"
                      required
                      value={formData.hourly_rate}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="75"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">Profile Image URL</label>
                    <input
                      type="url"
                      name="profile_image"
                      value={formData.profile_image}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                      placeholder="https://example.com/photo.jpg"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Bio *</label>
                  <textarea
                    name="bio"
                    required
                    value={formData.bio}
                    onChange={handleInputChange}
                    rows={4}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Tell us about your bartending experience and what makes you unique..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Specialties * (comma-separated)</label>
                  <input
                    type="text"
                    name="specialties"
                    required
                    value={formData.specialties}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-transparent"
                    placeholder="Craft Cocktails, Molecular Mixology, Whiskey Specialist"
                  />
                </div>

                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-3 bg-linear-to-r from-orange-600 to-red-600 text-white rounded-lg hover:from-orange-700 hover:to-red-700 font-bold shadow-lg transition-all"
                  >
                    Next: Add Services →
                  </button>
                </div>
              </div>
            )}

            {/* Step 2: Services */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-orange-900 mb-6">🍸 Your Services</h2>
                <p className="text-gray-600 mb-6">
                  Add the services and packages you offer. You can add more later.
                </p>

                {services.map((service, index) => (
                  <div key={index} className="p-6 border-2 border-orange-200 rounded-xl bg-orange-50">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="text-lg font-bold text-orange-900">Service {index + 1}</h3>
                      {services.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeService(index)}
                          className="text-red-600 hover:text-red-800 font-semibold"
                        >
                          Remove
                        </button>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Service Name</label>
                        <input
                          type="text"
                          value={service.service_name}
                          onChange={(e) => handleServiceChange(index, 'service_name', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                          placeholder="e.g., Craft Cocktail Experience"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                        <textarea
                          value={service.description}
                          onChange={(e) => handleServiceChange(index, 'description', e.target.value)}
                          rows={3}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                          placeholder="Describe what's included in this service..."
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Price ($)</label>
                        <input
                          type="number"
                          value={service.price}
                          onChange={(e) => handleServiceChange(index, 'price', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                          placeholder="350"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Duration (hours)</label>
                        <input
                          type="number"
                          value={service.duration}
                          onChange={(e) => handleServiceChange(index, 'duration', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500"
                          placeholder="3"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-semibold text-gray-700 mb-2">Max Guests</label>
                        <input
                          type="number"
                          value={service.max_guests}
                          onChange={(e) => handleServiceChange(index, 'max_guests', e.target.value)}
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500"
                          placeholder="30"
                        />
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addService}
                  className="w-full py-3 border-2 border-purple-300 border-dashed rounded-lg text-purple-600 hover:bg-purple-50 font-semibold transition-all"
                >
                  + Add Another Service
                </button>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-8 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-bold transition-all"
                  >
                    ← Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="px-8 py-3 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 font-bold shadow-lg transition-all"
                  >
                    Next: Review →
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Review & Submit */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-purple-900 mb-6">✅ Review Your Profile</h2>
                
                <div className="space-y-6">
                  <div className="p-6 bg-purple-50 rounded-xl">
                    <h3 className="text-xl font-bold text-purple-900 mb-4">Personal Information</h3>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="font-semibold text-gray-700">Name:</span> {formData.name}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Email:</span> {formData.email}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Phone:</span> {formData.phone}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Location:</span> {formData.location}
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Experience:</span> {formData.experience_years} years
                      </div>
                      <div>
                        <span className="font-semibold text-gray-700">Hourly Rate:</span> ${formData.hourly_rate}
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="font-semibold text-gray-700">Bio:</span>
                      <p className="text-gray-600 mt-1">{formData.bio}</p>
                    </div>
                    <div className="mt-4">
                      <span className="font-semibold text-gray-700">Specialties:</span>
                      <p className="text-gray-600 mt-1">{formData.specialties}</p>
                    </div>
                  </div>

                  <div className="p-6 bg-pink-50 rounded-xl">
                    <h3 className="text-xl font-bold text-purple-900 mb-4">Services ({services.length})</h3>
                    <div className="space-y-3">
                      {services.map((service, index) => (
                        service.service_name && (
                          <div key={index} className="p-4 bg-white rounded-lg">
                            <div className="font-semibold text-purple-900">{service.service_name}</div>
                            <div className="text-sm text-gray-600 mt-1">{service.description}</div>
                            <div className="flex gap-4 mt-2 text-sm text-gray-600">
                              <span>${service.price}</span>
                              <span>•</span>
                              <span>{service.duration} hours</span>
                              <span>•</span>
                              <span>Up to {service.max_guests} guests</span>
                            </div>
                          </div>
                        )
                      ))}
                    </div>
                  </div>
                </div>

                <div className="bg-linear-to-r from-purple-100 to-pink-100 p-6 rounded-xl">
                  <h3 className="font-bold text-purple-900 mb-2">📝 Next Steps</h3>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li>✅ Your profile will be created but not published yet</li>
                    <li>✅ You can edit and add more details from your dashboard</li>
                    <li>✅ Once ready, publish your profile to start receiving bookings</li>
                    <li>✅ Our team may review your profile before it goes live</li>
                  </ul>
                </div>

                <div className="flex justify-between">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-8 py-3 border-2 border-gray-300 rounded-lg hover:bg-gray-50 font-bold transition-all"
                  >
                    ← Back
                  </button>
                  <button
                    type="submit"
                    className="px-8 py-4 bg-linear-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 font-bold text-lg shadow-xl transition-all"
                  >
                    🎉 Create My Profile
                  </button>
                </div>
              </div>
            )}
          </form>
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
