const Footer = () => {
    return (
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-6 text-center">
          {/* Newsletter Subscription */}
          <h3 className="text-lg font-semibold mb-4">Subscribe to our newsletter</h3>
          <div className="flex justify-center items-center gap-2 max-w-md mx-auto">
            <div className="relative w-full">
              <input
                type="email"
                placeholder="Input your email"
                className="w-full bg-gray-800 text-white px-4 py-2 rounded-full border border-gray-600 focus:outline-none"
              />
              <span className="absolute left-3 top-2 text-gray-400">📧</span>
            </div>
            <button className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-full">
              Subscribe
            </button>
          </div>
  
          {/* Navigation Links */}
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-gray-400 text-sm">
            <a href="#">Pricing</a>
            <a href="#">About us</a>
            <a href="#">Features</a>
            <a href="#">Help Center</a>
            <a href="#">Contact us</a>
            <a href="#">FAQs</a>
            <a href="#">Careers</a>
          </div>
  
          {/* Divider */}
          <div className="border-t border-gray-700 my-6"></div>
  
          {/* Bottom Section */}
          <div className="flex flex-col md:flex-row justify-between items-center text-gray-400 text-sm">
            {/* Logo */}
            <div className="flex items-center gap-2">
              <span className="text-indigo-500 text-xl font-bold">▲</span>
              <span className="font-semibold text-lg">DonateNow</span>
            </div>
  
            {/* Language Selector */}
            <select className="bg-gray-800 border border-gray-600 px-2 py-1 rounded text-white">
              <option>English</option>
              <option>French</option>
            </select>
  
            {/* Copyright and Links */}
            <p>© 2024 Brand, Inc. • <a href="#" className="hover:underline">Privacy</a> • <a href="#" className="hover:underline">Terms</a> • <a href="#" className="hover:underline">Sitemap</a></p>
  
            {/* Social Media Icons */}
            <div className="flex gap-3 mt-3 md:mt-0">
              <a href="#" className="hover:text-blue-400">🐦</a> {/* Twitter */}
              <a href="#" className="hover:text-blue-600">📘</a> {/* Facebook */}
              <a href="#" className="hover:text-blue-500">🔗</a> {/* LinkedIn */}
              <a href="#" className="hover:text-red-500">▶️</a> {/* YouTube */}
            </div>
          </div>
        </div>
      </footer>
    );
  };
  
  export default Footer;
  