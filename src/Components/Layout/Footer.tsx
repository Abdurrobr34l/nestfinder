import { Link } from "react-router"
import { Home, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-10">

          {/* Brand column */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-blue-800 rounded-lg flex items-center justify-center">
                <Home size={18} className="text-white" />
              </div>
              <span className="text-xl font-bold text-white">
                Nest<span className="text-amber-500">Finder</span>
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mb-4">
              Bangladesh's trusted real estate platform. Find your perfect home in Dhaka, Chittagong, Sylhet, and Rajshahi.
            </p>
            {/* Social links */}
            <div className="flex items-center gap-3">
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-800 transition-colors">
                <Facebook size={16} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-800 transition-colors">
                <Twitter size={16} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-800 transition-colors">
                <Instagram size={16} />
              </a>
              <a href="#" className="p-2 bg-gray-800 rounded-lg hover:bg-blue-800 transition-colors">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: "Home", path: "/" },
                { label: "Explore Properties", path: "/explore" },
                { label: "About Us", path: "/about" },
                { label: "Blog", path: "/blog" },
                { label: "Contact", path: "/contact" },
              ].map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property types */}
          <div>
            <h3 className="text-white font-semibold mb-4">Property Types</h3>
            <ul className="space-y-2">
              {[
                { label: "Apartments", path: "/explore?category=apartment" },
                { label: "Houses", path: "/explore?category=house" },
                { label: "Commercial", path: "/explore?category=commercial" },
                { label: "Land", path: "/explore?category=land" },
                { label: "For Rent", path: "/explore?priceType=rent" },
                { label: "For Sale", path: "/explore?priceType=sale" },
              ].map(link => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-gray-400 hover:text-amber-500 transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-amber-500 mt-0.5 shrink-0" />
                <span className="text-sm text-gray-400">
                  House 12, Road 5, Gulshan-2, Dhaka, Bangladesh
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-amber-500 shrink-0" />
                <a href="tel:+8801700000000" className="text-sm text-gray-400 hover:text-amber-500 transition-colors">
                  +880 1700-000000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-amber-500 shrink-0" />
                <a href="mailto:info@nestfinder.com" className="text-sm text-gray-400 hover:text-amber-500 transition-colors">
                  info@nestfinder.com
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-gray-500">
            © 2024 NestFinder. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" className="text-sm text-gray-500 hover:text-amber-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-500 hover:text-amber-500 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>

      </div>
    </footer>
  )
}

export default Footer