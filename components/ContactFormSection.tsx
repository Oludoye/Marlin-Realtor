// components/ContactFormSection.tsx

const ContactFormSection = () => {
  return (
    <section className="relative py-20 bg-white overflow-hidden">
      {/* Subtle background buildings line art (approximate) */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        {/* Placeholder for complex SVG background */}
        <div className="absolute left-0 top-0 bottom-0 w-1/4 border-r border-gray-300"></div>
        <div className="absolute right-0 top-0 bottom-0 w-1/4 border-l border-gray-300"></div>
      </div>
      
      <div className="max-w-4xl mx-auto px-4 relative z-10">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-1 mb-4 text-xs font-semibold uppercase tracking-wider text-gray-600 bg-gray-100 rounded-full">
            Quick Inquiry
          </div>
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight">
            Get specialist advice for residential,<br/> commercial or property
          </h2>
        </div>

        {/* Form Area */}
        <form className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white p-8 shadow-lg rounded-lg">
          {/* Input 1: Your name */}
          <div>
            <label htmlFor="name" className="sr-only">Your name</label>
            <input
              type="text"
              id="name"
              placeholder="Your name"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Input 2: Email */}
          <div>
            <label htmlFor="email" className="sr-only">Email</label>
            <input
              type="email"
              id="email"
              placeholder="Email"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Input 3: Phone number */}
          <div>
            <label htmlFor="phone" className="sr-only">Phone number</label>
            <input
              type="tel"
              id="phone"
              placeholder="Phone number"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Input 4: Dropdown */}
          <div>
            <label htmlFor="propertyType" className="sr-only">Looking to...</label>
            <select
              id="propertyType"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500 appearance-none bg-white"
            >
              <option value="">Looking to buy/rent/sell</option>
              <option value="buy">Buy</option>
              <option value="rent">Rent</option>
              <option value="sell">Sell</option>
            </select>
          </div>

          {/* Text Area (span two columns on medium screens) */}
          <div className="md:col-span-2">
            <label htmlFor="message" className="sr-only">Tell us your specific requirement and our representative will reach you?</label>
            <textarea
              id="message"
              rows={3}
              placeholder="Tell us your specific requirement and our representative will reach you?"
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>

          {/* Button (span two columns on medium screens) */}
          <div className="md:col-span-2 flex justify-end">
            <button
              type="submit"
              className="flex items-center justify-center bg-gray-900 text-white font-semibold py-3 px-8 rounded-lg shadow-lg hover:bg-gray-800 transition duration-300 transform hover:scale-105"
            >
              Send a Request
              {/* Simple arrow placeholder */}
              <svg className="ml-3 w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ContactFormSection;
