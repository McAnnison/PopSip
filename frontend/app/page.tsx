export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-3xl font-bold gradient-text">🍹 PopSip</h1>
          <nav className="flex gap-2">
            <button className="px-4 py-2 hover:bg-purple-100 rounded-lg transition-colors">Browse Bartenders</button>
            <button className="px-4 py-2 hover:bg-purple-100 rounded-lg transition-colors">Packages</button>
            <button className="px-4 py-2 hover:bg-purple-100 rounded-lg transition-colors">Become a Bartender</button>
            <button className="px-6 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-lg hover:from-purple-700 hover:to-pink-700 transition-all font-semibold shadow-lg neon-glow">
              Book Now
            </button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute top-20 left-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-75"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-150"></div>
          </div>
          
          <div className="container mx-auto px-4 py-20 relative">
            <div className="flex flex-col items-center text-center gap-8">
              <div className="inline-block">
                <span className="text-sm font-semibold text-purple-600 bg-purple-100 px-4 py-2 rounded-full mb-4 inline-block">
                  🎉 Professional Bartending Made Easy
                </span>
              </div>
              <h2 className="text-6xl md:text-7xl font-extrabold tracking-tight">
                <span className="gradient-text">
                  Your Party, Your Bartender
                </span>
              </h2>
              <p className="max-w-3xl text-xl md:text-2xl text-gray-700 leading-relaxed">
                Connect with professional bartenders and cocktail services for your next event. 
                Browse talented mixologists, explore custom packages, and book the perfect vibe for your celebration! 🥳
              </p>
              <div className="flex gap-4 mt-4">
                <button className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 font-bold text-lg shadow-2xl transform hover:scale-105 transition-all neon-glow">
                  🔍 Find Bartenders
                </button>
                <button className="px-10 py-4 border-2 border-purple-600 text-purple-600 rounded-xl hover:bg-purple-50 font-bold text-lg shadow-lg transform hover:scale-105 transition-all">
                  💼 Join as Bartender
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white py-16 border-y">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              <div>
                <div className="text-5xl font-extrabold gradient-text mb-2">500+</div>
                <div className="text-gray-600 font-medium">Professional Bartenders</div>
              </div>
              <div>
                <div className="text-5xl font-extrabold gradient-text mb-2">10k+</div>
                <div className="text-gray-600 font-medium">Events Served</div>
              </div>
              <div>
                <div className="text-5xl font-extrabold gradient-text mb-2">4.9★</div>
                <div className="text-gray-600 font-medium">Average Rating</div>
              </div>
              <div>
                <div className="text-5xl font-extrabold gradient-text mb-2">50+</div>
                <div className="text-gray-600 font-medium">Cities Covered</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h3 className="text-5xl font-extrabold mb-4">
                <span className="gradient-text">Why PopSip?</span>
              </h3>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                The ultimate platform connecting party hosts with talented bartenders
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-xl card-hover border-2 border-purple-100">
                <div className="text-5xl mb-4">🍸</div>
                <h4 className="text-2xl font-bold mb-4 text-purple-900">Expert Bartenders</h4>
                <p className="text-gray-600 leading-relaxed">
                  Browse profiles of verified professional mixologists with years of experience. 
                  Check ratings, reviews, and portfolios before you book.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-xl card-hover border-2 border-pink-100">
                <div className="text-5xl mb-4">🎨</div>
                <h4 className="text-2xl font-bold mb-4 text-pink-900">Custom Services</h4>
                <p className="text-gray-600 leading-relaxed">
                  Every bartender offers unique packages. From craft cocktails to flair bartending, 
                  find exactly what matches your event vibe.
                </p>
              </div>
              <div className="bg-white p-8 rounded-2xl shadow-xl card-hover border-2 border-orange-100">
                <div className="text-5xl mb-4">⚡</div>
                <h4 className="text-2xl font-bold mb-4 text-orange-900">Easy Booking</h4>
                <p className="text-gray-600 leading-relaxed">
                  Simple, fast booking with instant confirmation. Chat with bartenders, 
                  customize your package, and manage everything in one place.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="bg-gradient-to-br from-purple-900 to-pink-900 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h3 className="text-5xl font-extrabold mb-4">How It Works</h3>
              <p className="text-xl opacity-90">Get your party started in 3 easy steps</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 backdrop-blur-sm">
                  1
                </div>
                <h4 className="text-2xl font-bold mb-4">Browse & Compare</h4>
                <p className="opacity-90 leading-relaxed">
                  Explore bartender profiles, view their services, check availability, and read reviews from past clients.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 backdrop-blur-sm">
                  2
                </div>
                <h4 className="text-2xl font-bold mb-4">Book Your Bartender</h4>
                <p className="opacity-90 leading-relaxed">
                  Select your preferred package, customize details, and book instantly. Get confirmation within minutes.
                </p>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 backdrop-blur-sm">
                  3
                </div>
                <h4 className="text-2xl font-bold mb-4">Party Time! 🎉</h4>
                <p className="opacity-90 leading-relaxed">
                  Your bartender arrives ready to serve. Sit back, relax, and enjoy professionally crafted cocktails.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section for Bartenders */}
        <section className="py-20 bg-gradient-to-br from-purple-50 via-pink-50 to-orange-50">
          <div className="container mx-auto px-4">
            <div className="bg-white rounded-3xl shadow-2xl p-12 max-w-4xl mx-auto text-center border-2 border-purple-200">
              <div className="text-6xl mb-6">🍹💼</div>
              <h3 className="text-4xl font-extrabold mb-6">
                <span className="gradient-text">Are You a Bartender?</span>
              </h3>
              <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
                Join PopSip and grow your bartending business! Create your profile, showcase your skills, 
                set your own prices, and connect with clients looking for amazing cocktail experiences.
              </p>
              <div className="flex gap-4 justify-center">
                <button className="px-10 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl hover:from-purple-700 hover:to-pink-700 font-bold text-lg shadow-xl transform hover:scale-105 transition-all">
                  Start Your Profile
                </button>
                <button className="px-10 py-4 border-2 border-gray-300 rounded-xl hover:bg-gray-50 font-bold text-lg">
                  Learn More
                </button>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t bg-gray-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h4 className="text-2xl font-bold gradient-text mb-4">🍹 PopSip</h4>
              <p className="text-gray-400">
                Your ultimate platform for professional bartending services.
              </p>
            </div>
            <div>
              <h5 className="font-semibold mb-4">For Customers</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Browse Bartenders</a></li>
                <li><a href="#" className="hover:text-white transition-colors">View Packages</a></li>
                <li><a href="#" className="hover:text-white transition-colors">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">For Bartenders</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Join PopSip</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Create Profile</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">Company</h5>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 PopSip. All rights reserved. Made with 💜 for bartenders and party lovers.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
