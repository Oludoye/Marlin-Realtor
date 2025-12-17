// components/Footer.tsx

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          
          {/* Column 1: Logo & Contact Info */}
          <div className="col-span-2 md:col-span-2">
            <div className="text-2xl font-bold mb-4">MARLIN<span className="text-blue-500">.</span></div>
            <p className="text-gray-400 mb-2">Real Estate Auction</p>
            <p className="text-gray-400 mb-4">+91 2942 521 444 786</p>
            <p className="text-gray-400 mb-6">hello@marlin.com</p>

            <h4 className="text-gray-300 mb-3">Apps</h4>
            <div className="flex flex-col gap-3">
              <a href="#" className="flex items-center justify-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300">
                {/* Placeholder for Apple logo */}
                <span className="mr-2"></span> 
                Apple Store
              </a>
              <a href="#" className="flex items-center justify-center p-3 bg-gray-700 rounded-lg hover:bg-gray-600 transition duration-300">
                {/* Placeholder for Google Play logo */}
                <span className="mr-2">▶</span> 
                Google Play
              </a>
            </div>
            
            <h4 className="text-gray-300 mt-6 mb-3">Follow us on social handles</h4>
            <div className="flex space-x-3">
                {/* Social icons placeholders */}
                <div className="w-8 h-8 bg-white rounded-full"></div>
                <div className="w-8 h-8 bg-white rounded-full"></div>
                <div className="w-8 h-8 bg-white rounded-full"></div>
                <div className="w-8 h-8 bg-white rounded-full"></div>
            </div>
          </div>

          {/* Column 2: Newsletter Signup */}
          <div className="col-span-2 md:col-span-2">
            <h4 className="text-gray-300 mb-4">Keep Yourself up to Date</h4>
            <form className="flex">
              <input
                type="email"
                placeholder="Your email address"
                className="p-3 w-full rounded-l-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                className="bg-blue-600 p-3 rounded-r-lg hover:bg-blue-700 transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>

          {/* Column 3: Popular Search */}
          <div>
            <h4 className="text-gray-300 mb-4">Popular Search</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white">Apartment to buy</a></li>
              <li><a href="#" className="hover:text-white">Apartment to rent</a></li>
              <li><a href="#" className="hover:text-white">Property to sell</a></li>
              <li><a href="#" className="hover:text-white">Commercial property</a></li>
            </ul>
          </div>

          {/* Column 4: Quick Links */}
          <div>
            <h4 className="text-gray-300 mb-4">Quick Links</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white">Terms & Policy</a></li>
              <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-white">Pricing Plans</a></li>
              <li><a href="#" className="hover:text-white">Our Services</a></li>
              <li><a href="#" className="hover:text-white">Careers</a></li>
              <li><a href="#" className="hover:text-white">FAQs</a></li>
            </ul>
          </div>

          {/* Column 5: Discovery */}
          <div>
            <h4 className="text-gray-300 mb-4">Discovery</h4>
            <ul className="space-y-3 text-gray-400">
              <li><a href="#" className="hover:text-white">Chicago</a></li>
              <li><a href="#" className="hover:text-white">Los Angeles</a></li>
              <li><a href="#" className="hover:text-white">New York</a></li>
              <li><a href="#" className="hover:text-white">Miami</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal Links */}
        <div className="mt-16 pt-8 border-t border-gray-700 flex flex-col md:flex-row justify-between items-center text-xs text-gray-500">
          <p className="mb-4 md:mb-0">
            © 2025 Marlin Realestate. Designers Inbits. All right reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white">Privacy</a>
            <a href="#" className="hover:text-white">Services</a>
            <a href="#" className="hover:text-white">About</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
