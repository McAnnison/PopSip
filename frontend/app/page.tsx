import Image from "next/image";
import React from "react";

export default function LandingPage() {
  return (
    <div className="font-sans text-gray-800">
      {/* Navbar */}
      <nav className="flex justify-between items-center px-10 py-6">
        <h1 className="text-xl font-semibold">The Liquid Editorial</h1>
        <div className="space-x-6 hidden md:flex pointer-cursor">
          <a>Mixologists</a>
          <a>Experiences</a>
          <a>Venues</a>
          <a>Journal</a>
        </div>
        <button className="bg-orange-500 text-white px-4 py-2 rounded-full">
          Book Now
        </button>
      </nav>

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 gap-10 px-10 py-16 items-center">
        <div>
          <p className="text-orange-500 text-sm mb-4">THE ART OF THE POUR</p>
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Book Professional Mixologists for Your Events
          </h1>
          <p className="text-gray-500 mb-6">
            Elevate your gathering with curated cocktail experiences led by the
            world`&apos`s most innovative bar talent.
          </p>
          <div className="space-x-4">
            <button className="bg-orange-500 text-white px-6 py-3 rounded-full">
              Find a Mixologist
            </button>
            <button className="border px-6 py-3 rounded-full">
              View Experiences
            </button>
          </div>
        </div>
        <div>
          <Image
            src="https://images.unsplash.com/photo-1582571352032-448f7924c4b9"
            className="rounded-2xl shadow-lg"
            alt="Cocktail Bar"
            width={800}
            height={600}
          />
        </div>
      </section>

      {/* Featured Mixologists */}
      <section className="px-10 py-16 bg-gray-100">
        <h2 className="text-3xl font-semibold mb-10">Featured Mixologists</h2>
        <div className="grid md:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((item) => (
            <div key={item} className="bg-white p-4 rounded-xl shadow">
              <Image
           src="https://images.unsplash.com/photo-1541542684-4a0b7baf54b7"
                className="rounded-xl mb-4"
                alt={`Portrait of Mixologist ${item}`}
                width={600}
                height={400}
              />
              <h3 className="font-semibold">Mixologist {item}</h3>
              <p className="text-sm text-gray-500">Cocktail Specialist</p>
              <button className="mt-4 w-full border py-2 rounded-full">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Steps Section */}
      <section className="px-10 py-16 text-center">
        <h2 className="text-3xl font-semibold mb-10">
          Three Steps to Perfection
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {["Search", "Select", "Sip"].map((step) => (
            <div key={step}>
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-100"></div>
              <h3 className="font-semibold text-lg">{step}</h3>
              <p className="text-gray-500 text-sm">
                Simple and seamless booking process.
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="px-10 py-16 bg-black text-white">
        <h2 className="text-3xl font-semibold mb-10 text-center">
          Choose Your Experience
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {["Classic", "Premium", "Luxury"].map((plan, i) => (
            <div
              key={plan}
              className={`p-6 rounded-xl ${
                i === 1 ? "bg-gray-800 border border-orange-500" : "bg-gray-900"
              }`}
            >
              <h3 className="text-xl font-semibold mb-4">{plan}</h3>
              <p className="text-2xl mb-6">${(i + 1) * 250}/night</p>
              <ul className="text-sm space-y-2 mb-6">
                <li>✔ Professional Service</li>
                <li>✔ Signature Cocktails</li>
                <li>✔ Bar Setup Included</li>
              </ul>
              <button className="w-full bg-orange-500 py-2 rounded-full">
                Select Plan
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="px-10 py-16 bg-gray-100">
        <h2 className="text-3xl font-semibold mb-10">
          Shared Moments of Excellence
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[1, 2].map((t) => (
            <div key={t} className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-600 mb-4">
                `&quot`Amazing experience! The cocktails were top-tier.
              </p>
              <h4 className="font-semibold">Client {t}</h4>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white px-10 py-10">
        <div className="grid md:grid-cols-4 gap-6">
          <div>
            <h3 className="font-semibold mb-2">The Liquid Editorial</h3>
            <p className="text-sm text-gray-400">
              High-end mixology redefined.
            </p>
          </div>
          <div>
            <h4 className="font-semibold">Company</h4>
            <p>About</p>
            <p>Careers</p>
          </div>
          <div>
            <h4 className="font-semibold">Legal</h4>
            <p>Terms</p>
            <p>Privacy</p>
          </div>
          <div>
            <h4 className="font-semibold">Follow</h4>
            <p>Instagram</p>
            <p>LinkedIn</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
