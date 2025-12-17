// components/HeroSection.tsx
import Image from 'next/image';
import Link from "next/link";

const HeroSection = () => {
  return (
    <section className="flex flex-row items-center gap-35 p-8 bg-white">
      {/* Left side content */}
      <div className="md:w-1/2 mb-8 md:mb-0">
        <h1 className="text-5xl font-bold text-gray-900 mb-4">
          Find the Perfect Way to Sell Your Property
        </h1>
        <p className="text-gray-600 mb-6">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod
          tempor incididunt ut labore et dolore magna aliqua.
        </p>
        <ul className="list-none space-y-3 mb-8">
          <li className="flex items-center text-gray-700">
            <span className="w-2 h-2 bg-blue-800 rounded-full mr-3"></span>
            We Provide Legal Representation
          </li>
          <li className="flex items-center text-gray-700">
            <span className="w-2 h-2 bg-blue-800 rounded-full mr-3"></span>
            Recognized Brand Award
          </li>
          <li className="flex items-center text-gray-700">
            <span className="w-2 h-2 bg-blue-800 rounded-full mr-3"></span>
            Committed to our Client
          </li>
        </ul>
        <Link href= "/login">
        <button className="bg-blue-800 text-white font-semibold py-3 px-8 rounded shadow-lg hover:bg-blue-700 transition duration-300">
          Join Our Agents
        </button>
        </Link>
      </div>

      {/* Right side images (Placeholders) */}
      <div className="flex justify-center relative">
        {/* Placeholder for the main image */}
        <div className="relative w-72 h-90 shadow-xl rounded-lg overflow-hidden">
          {/* Use Next.js Image component with actual images from your public folder */}
      <img
        src= "living rooms.jpg"
        alt= "Modern Kitchen"
        className="w-full h-full object-cover"
      />
        </div>
        
        {/* Placeholder for the overlay card */}
        <div className="absolute top-0 right-5w-72 h-90 transform translate-x-40 -translate-y-30 bg-white p-2 rounded-lg shadow-lg">
             <img
        src= "deck.jpg"
        alt= "Modern Kitchen"
        className="w-full h-full object-cover"
      />
           {/* <p className="text-sm">Small Overlay Card</p> */}
        </div>
      </div>
    </section>

  );
};

export default HeroSection;
