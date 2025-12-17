// components/AppDownloadSection.tsx
import Image from 'next/image';

const AppDownloadSection = () => {
  return (
    <section className="flex flex-col lg:flex-row items-center justify-center p-8 bg-gray-50 rounded-xl shadow-inner">
      
      {/* Left/Center Section: Phone Mockups */}
      <div className="flex justify-center items-center gap-6 lg:w-1/2 mb-8 lg:mb-0">
        {/* Phone 1 Mockup */}
        <div className="relative w-48 h-96 bg-white shadow-2xl rounded-3xl p-2 border-4 border-black">
          {/* Placeholder for app screen content */}
          <div className="w-full h-full bg-gray-100 rounded-2xl flex items-center justify-center">
          <img
        src= "bathroom 1.jpg"
        alt="bathroom 1"
        className="w-full h-full object-cover rounded-2xl"
      /> 
      </div>
        </div>
        
        {/* Phone 2 Mockup */}
        <div className="relative w-48 h-96 bg-white shadow-2xl rounded-3xl p-2 border-4 border-black transform translate-y-8">
           {/* Placeholder for app screen content */}
           <div className="w-full h-full bg-gray-100 rounded-2xl flex items-center justify-center">
           <img
        src= "Birdwood.jpg"
        alt="bullin"
        className="w-full h-full object-cover rounded-2xl"
      />  
      </div>
        </div>
      </div>

      {/* Right Section: Text and Buttons */}
      <div className="lg:w-1/2 text-center lg:text-left p-8">
        <p className="text-sm uppercase tracking-wider text-gray-500 mb-2">
          Technology
        </p>
        <h2 className="text-5xl font-black text-gray-900 mb-8 leading-tight">
          Download Our <br/> Marlin App <br/> Today.
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
          {/* App Store Button (Placeholder) */}
          <a
            href="#"
            className="bg-black text-white px-6 py-3 rounded-lg flex items-center justify-center hover:bg-gray-800 transition duration-300 shadow-md"
          >
            {/* Replace with Apple logo SVG/Icon */}
            <span className="mr-2"></span> 
            App Store
          </a>
          
          {/* Google Play Button (Placeholder) */}
          <a
            href="#"
            className="bg-black text-white px-6 py-3 rounded-lg flex items-center justify-center hover:bg-gray-800 transition duration-300 shadow-md"
          >
            {/* Replace with Google Play logo SVG/Icon */}
            <span className="mr-2">▶</span> 
            Google Play
          </a>
        </div>
      </div>
    </section>
  );
};

export default AppDownloadSection;
