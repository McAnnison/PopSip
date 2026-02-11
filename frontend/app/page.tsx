export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="border-b">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          <h1 className="text-2xl font-bold">MixMaster</h1>
          <nav className="flex gap-4">
            <button className="px-4 py-2 hover:bg-gray-100 rounded-md">Services</button>
            <button className="px-4 py-2 hover:bg-gray-100 rounded-md">Packages</button>
            <button className="px-4 py-2 hover:bg-gray-100 rounded-md">About</button>
            <button className="px-4 py-2 bg-black text-white rounded-md hover:bg-gray-800">Book Now</button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1">
        <section className="container mx-auto px-4 py-20">
          <div className="flex flex-col items-center text-center gap-6">
            <h2 className="text-5xl font-bold tracking-tight">
              Professional Cocktail Catering
            </h2>
            <p className="max-w-2xl text-xl text-gray-600">
              Elevate your events with our expert bartending services and custom cocktail packages. 
              Perfect for weddings, corporate events, and private parties.
            </p>
            <div className="flex gap-4">
              <button className="px-8 py-3 bg-black text-white rounded-md hover:bg-gray-800 font-medium">
                Browse Packages
              </button>
              <button className="px-8 py-3 border border-gray-300 rounded-md hover:bg-gray-50 font-medium">
                View Bartenders
              </button>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <h3 className="text-3xl font-bold text-center mb-12">Why Choose MixMaster?</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-xl font-semibold mb-3">Expert Bartenders</h4>
                <p className="text-gray-600">
                  Our professional mixologists bring years of experience to every event.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-xl font-semibold mb-3">Custom Packages</h4>
                <p className="text-gray-600">
                  Tailored cocktail menus to match your event theme and preferences.
                </p>
              </div>
              <div className="bg-white p-6 rounded-lg shadow">
                <h4 className="text-xl font-semibold mb-3">Easy Booking</h4>
                <p className="text-gray-600">
                  Simple online booking with real-time availability and instant confirmation.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t py-8">
        <div className="container mx-auto px-4 text-center text-gray-600">
          <p>&copy; 2026 MixMaster. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
