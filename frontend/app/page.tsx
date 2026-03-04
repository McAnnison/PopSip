import Link from "next/link";
import Image from "next/image";
import Header from "@/components/Header";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-orange-50 via-white to-orange-50">
      {/* Header */}
      <Header />

      {/* Hero Section */}
      <main className="flex-1">
        <section className="relative overflow-hidden">
          {/* Hero Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="/assets/party-1.jpeg"
              alt="Party atmosphere"
              fill
              className="object-cover opacity-60 brightness-50"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70"></div>
          </div>
          {/* Animated background blobs */}
          <div className="absolute inset-0 opacity-30 z-10">
            <div className="absolute top-20 left-10 w-72 h-72 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse"></div>
            <div className="absolute top-40 right-10 w-72 h-72 bg-red-400 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-75"></div>
            <div className="absolute -bottom-8 left-20 w-72 h-72 bg-orange-300 rounded-full mix-blend-multiply filter blur-xl animate-pulse delay-150"></div>
          </div>

          <div className="container mx-auto px-4 py-20 relative z-20">
            <div className="flex flex-col items-center text-center gap-8">
              <div className="inline-block animate-fade-in-up">
                <span className="text-sm font-bold uppercase tracking-widest text-orange-400 glass-dark px-6 py-3 rounded-full mb-6 inline-block shadow-lg border border-orange-400/50">
                  🎉 Professional Bartending Made Easy
                </span>
              </div>
              <h2 className="text-7xl md:text-8xl font-black tracking-tighter leading-none mb-8 animate-fade-in-up-1">
                <span className="text-white drop-shadow-2xl block">
                  Your Party,
                </span>
                <span className="text-orange-400 drop-shadow-2xl block mt-2">
                  Your Bartender
                </span>
              </h2>
              <p className="max-w-4xl text-xl md:text-2xl text-gray-200 leading-relaxed font-normal animate-fade-in-up-2">
                Connect with professional bartenders and cocktail services for your next event.{" "}
                <span className="font-semibold text-orange-300">Browse talented mixologists</span>, explore custom packages, and book the perfect vibe for your celebration! 🥳
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mt-4 animate-fade-in-up-3">
                <Link
                  href="/bartenders"
                  className="px-10 py-4 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-xl hover:from-orange-600 hover:to-red-600 font-bold text-lg shadow-2xl btn-lift"
                >
                  🔍 Find Bartenders
                </Link>
                <Link
                  href="/join"
                  className="px-10 py-4 glass-dark border border-white/40 text-white rounded-xl hover:bg-white/20 font-bold text-lg shadow-lg btn-lift"
                >
                  💼 Join as Bartender
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="bg-white/80 backdrop-blur-sm py-16 border-y border-orange-100">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
              {[
                { value: "500+", label: "Professional Bartenders", delay: "" },
                { value: "10k+", label: "Events Served", delay: "0.5s" },
                { value: "4.9★", label: "Average Rating", delay: "1s" },
                { value: "50+", label: "Cities Covered", delay: "1.5s" },
              ].map(({ value, label, delay }) => (
                <div key={label} className="hover-bounce animate-fade-in-up">
                  <div
                    className="text-5xl font-black gradient-text mb-3 animate-float"
                    style={{ animationDelay: delay }}
                  >
                    {value}
                  </div>
                  <div className="text-gray-600 font-bold uppercase tracking-wide text-sm">
                    {label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in-up">
              <h3 className="text-4xl font-black mb-6 tracking-tight">
                <span className="gradient-text block">Why PopSip?</span>
                <span className="text-xl font-light text-gray-500 block mt-4 italic">The ultimate platform</span>
              </h3>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto font-medium leading-relaxed">
                Connecting party hosts with{" "}
                <span className="text-orange-600 font-bold">talented bartenders</span> worldwide
              </p>
            </div>

            {/* Feature Image */}
            <div className="mb-16 max-w-4xl mx-auto animate-fade-in-up-1">
              <div className="relative h-80 rounded-3xl overflow-hidden shadow-2xl border border-orange-200/50 glass-card">
                <Image
                  src="/assets/party-2.jpeg"
                  alt="Professional bartending service"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                <div className="absolute bottom-6 left-6 right-6 text-white">
                  <p className="text-2xl font-bold drop-shadow-lg">Elevate Your Events</p>
                  <p className="text-lg opacity-90">Professional cocktail experiences for every occasion</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Card 1 */}
              <div className="glass-card rounded-2xl card-hover border border-orange-100/60 hover-bounce overflow-hidden animate-fade-in-up-2">
                <div className="relative h-48 w-full">
                  <Image
                    src="/assets/Model Bartender.jpeg"
                    alt="Expert Bartender"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8">
                  <div className="text-5xl mb-6 animate-bounce-gentle">🍸</div>
                  <h4 className="text-2xl font-black mb-6 text-orange-900 uppercase tracking-wide">
                    Expert Bartenders
                  </h4>
                  <p className="text-gray-600 leading-relaxed text-lg font-light">
                    Browse profiles of{" "}
                    <span className="font-semibold text-orange-700">verified professional mixologists</span>{" "}
                    with years of experience. Check ratings, reviews, and portfolios before you book.
                  </p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="glass-card p-8 rounded-2xl card-hover border border-orange-100/60 hover-bounce animate-fade-in-up-3">
                <div className="text-5xl mb-6 animate-bounce-gentle" style={{ animationDelay: "0.3s" }}>
                  🎨
                </div>
                <h4 className="text-2xl font-black mb-6 text-orange-900 uppercase tracking-wide">
                  Custom Services
                </h4>
                <p className="text-gray-600 leading-relaxed text-lg font-light">
                  Every bartender offers{" "}
                  <span className="font-semibold text-orange-700">unique packages</span>. From craft
                  cocktails to flair bartending, find exactly what matches your event vibe.
                </p>
              </div>

              {/* Card 3 */}
              <div className="glass-card p-8 rounded-2xl card-hover border border-orange-100/60 hover-bounce animate-fade-in-up-4">
                <div className="text-5xl mb-6 animate-bounce-gentle" style={{ animationDelay: "0.6s" }}>
                  ⚡
                </div>
                <h4 className="text-2xl font-black mb-6 text-orange-900 uppercase tracking-wide">
                  Easy Booking
                </h4>
                <p className="text-gray-600 leading-relaxed text-lg font-light">
                  Simple, fast booking with{" "}
                  <span className="font-semibold text-orange-700">instant confirmation</span>. Chat with
                  bartenders, customize your package, and manage everything in one place.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="bg-gradient-to-br from-orange-600 to-red-600 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16 animate-fade-in-up">
              <h3 className="text-4xl font-black mb-6 tracking-tight text-white drop-shadow-lg">
                <span className="block">How It Works</span>
                <span className="text-2xl font-light block mt-4 opacity-80 italic">Simple as 1-2-3</span>
              </h3>
              <p className="text-xl opacity-90 font-medium">Get your party started in 3 easy steps</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
              {[
                { step: 1, title: "Browse & Compare", desc: "Explore bartender profiles, view their services, check availability, and read reviews from past clients.", delay: "" },
                { step: 2, title: "Book Your Bartender", desc: "Select your preferred package, customize details, and book instantly. Get confirmation within minutes.", delay: "0.5s" },
                { step: 3, title: "Party Time! 🎉", desc: "Your bartender arrives ready to serve. Sit back, relax, and enjoy professionally crafted cocktails.", delay: "1s" },
              ].map(({ step, title, desc, delay }) => (
                <div key={step} className="text-center hover-bounce animate-fade-in-up">
                  <div
                    className="w-20 h-20 glass-dark rounded-full flex items-center justify-center text-3xl font-bold mx-auto mb-6 animate-pulse-party"
                    style={{ animationDelay: delay }}
                  >
                    {step}
                  </div>
                  <h4 className="text-2xl font-black mb-4 uppercase tracking-wider text-white drop-shadow-lg">
                    {title}
                  </h4>
                  <p className="opacity-90 leading-relaxed text-lg font-medium">{desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section for Bartenders */}
        <section className="py-20 bg-gradient-to-br from-orange-50 via-white to-orange-50">
          <div className="container mx-auto px-4">
            <div className="glass-card rounded-3xl shadow-2xl overflow-hidden max-w-5xl mx-auto border border-orange-200/50 animate-fade-in-up">
              <div className="grid md:grid-cols-2">
                {/* Image Side */}
                <div className="relative h-64 md:h-auto">
                  <Image
                    src="/assets/party-3.jpeg"
                    alt="Join our bartending community"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent to-white/20 md:bg-gradient-to-l"></div>
                </div>
                {/* Content Side */}
                <div className="p-12 text-center flex flex-col justify-center">
                  <div className="text-6xl mb-6">🍹💼</div>
                  <h3 className="text-4xl font-extrabold mb-6">
                    <span className="gradient-text">Are You a Bartender?</span>
                  </h3>
                  <p className="text-xl text-gray-700 mb-8 leading-relaxed max-w-2xl mx-auto">
                    Join PopSip and grow your bartending business! Create your profile, showcase your skills,
                    set your own prices, and connect with clients looking for amazing cocktail experiences.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                      href="/join"
                      className="px-10 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-xl hover:from-orange-700 hover:to-red-700 font-bold text-lg shadow-xl btn-lift"
                    >
                      Start Your Profile
                    </Link>
                    <Link
                      href="/bartenders"
                      className="px-10 py-4 border border-gray-300 rounded-xl hover:bg-gray-50 font-bold text-lg transition-colors"
                    >
                      Learn More
                    </Link>
                  </div>
                </div>
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
                <li><Link href="/bartenders" className="hover:text-white transition-colors">Browse Bartenders</Link></li>
                <li><Link href="/bartenders" className="hover:text-white transition-colors">View Packages</Link></li>
                <li><a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a></li>
              </ul>
            </div>
            <div>
              <h5 className="font-semibold mb-4">For Bartenders</h5>
              <ul className="space-y-2 text-gray-400">
                <li><Link href="/join" className="hover:text-white transition-colors">Join PopSip</Link></li>
                <li><Link href="/join" className="hover:text-white transition-colors">Create Profile</Link></li>
                <li><Link href="/join" className="hover:text-white transition-colors">Pricing</Link></li>
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
