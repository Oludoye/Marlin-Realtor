import Image from "next/image";

export default function RealEstateHero() {
  return (
    <section className="max-w-7xl mx-auto px-1 py-5 grid md:grid-cols-2 gap-12 items-center">
      
      {/* ✅ LEFT IMAGE CARD */}
      <div className="relative">
        {/* Badge */}
        <span className="absolute -top-3 left-4 bg-white px-4 py-1 text-sm rounded-full shadow">
          Properties
        </span>

        {/* Main Image */}
        <div className="rounded-2xl overflow-hidden shadow-lg">
          <Image
            src="/ontario balcony.jpg" // 🔁 replace with your image path
            alt="Modern Home"
            width={600}
            height={450}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Overlay Label */}
        <div className="absolute bottom-4 left-4 bg-white px-4 py-2 rounded-xl shadow text-sm font-medium">
          Providing Urban Comforts & Peaceful Suburban Homes
        </div>
      </div>

      {/* ✅ RIGHT TEXT CONTENT */}
      <div>
        <h1 className="text-4xl md:text-5xl font-bold leading-tight">
          A Premier Name in Real Estate Investment & Management.
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
          
          {/* Vision */}
          <div>
            <h3 className="font-semibold mb-2">Our Vision</h3>
            <p className="text-gray-600 text-sm">
              To redefine luxury living through innovative real estate 
              solutions and client-focused development.
            </p>
          </div>

          {/* Mission */}
          <div>
            <h3 className="font-semibold mb-2">Our Mission</h3>
            <p className="text-gray-600 text-sm">
              To deliver high-quality properties that combine comfort, 
              value, and long-term investment growth.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
