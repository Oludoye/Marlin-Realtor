// components/FeaturedPropertySection.tsx
import Image from 'next/image';
import properties from "../data/properties.json";

type Prop = {
  id: string;
  title: string;
  location: string;
  price: string;
  image: string;
};

export default function FeaturedPropertySection({ property }: { property: Prop }) {
  // if (!property) {
  //   // You can return a loading spinner, a placeholder, or null (render nothing)
  //   return <div>Loading property details...</div>; 
  //   // Or just return null;
  // }
  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-8">
        
        {/* Left Column: Property Card and Title */}
        <div className="lg:w-1/2">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-8">
            Featured Property
          </h2>

          <div className="bg-white p-6 shadow-lg rounded-lg border border-gray-100">
            <div className="flex justify-between items-center mb-4">
              <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-3 py-1 rounded">
                SKYPER
              </span>
              {/* Placeholder for heart icon */}
              <div className="w-6 h-6 bg-gray-200 rounded-full"></div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{property.title}</h3>
            <p className="text-gray-500 text-sm mb-4">{property.location}</p>

            <div className="flex justify-between items-center text-gray-600 mb-6 border-b pb-4">
              <div className="flex items-center space-x-2">
                {/* Bed icon placeholder */}
                <span className="w-4 h-4 bg-gray-400"></span>
                <span>4 Beds</span>
              </div>
              <div className="flex items-center space-x-2">
                {/* Bath icon placeholder */}
                <span className="w-4 h-4 bg-gray-400"></span>
                <span>2 Baths</span>
              </div>
              <div className="flex items-center space-x-2">
                {/* Garage icon placeholder */}
                <span className="w-4 h-4 bg-gray-400"></span>
                <span>1 Garage</span>
              </div>
              <div className="flex items-center space-x-2">
                {/* Size icon placeholder */}
                <span className="w-4 h-4 bg-gray-400"></span>
                <span>1200 Sqft</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-gray-400 text-xs">Listing by</p>
                <p className="text-sm">agencyname.com</p>
              </div>
              <p className="text-3xl font-bold text-gray-900">$200,000</p>
            </div>
          </div>
          
          {/* Pagination/Dots Placeholder */}
          <div className="flex justify-center mt-6 space-x-2">
            <span className="w-2 h-2 bg-gray-900 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
          </div>
        </div>

        {/* Right Column: Images and Floor Plans */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          {/* Floor Plans Placeholder */}
          <div className="flex justify-around bg-blue-50 p-4 rounded-lg">
            {/* Placeholder for complex floor plan images/SVGs */}
            <div className="w-48 h-48 bg-blue-100 flex items-center justify-center">Floor Plan 1</div>
            <div className="w-48 h-48 bg-blue-100 flex items-center justify-center">Floor Plan 2</div>
          </div>
          
          {/* Main House Image Placeholder */}
          <div className="relative bg-gray-100 rounded-lg overflow-hidden shadow-lg">
             {/* Use Next.js Image component with actual image from public folder */}
              <img
        src={property.image}
        alt={property.title}
        className="w-full h-70 object-cover"
      />
            </div>
        </div>
      </div>
    </section>
  );
};

