import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import logo from '../assets/logo.png';
import { GoPerson } from "react-icons/go";
import { FiShoppingCart } from "react-icons/fi";



function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { cartItems } = useCart();

  const { user } = useAuth();

  const cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav className="bg-transparent px-9">
      <div className="container-custom py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-primary text-2xl font-bold"><img src={logo} className='w-32' /></span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
           
            <Link to="/login" className="text-[#946BEF] font-medium border border-[#946BEF] px-9 py-2 rounded-lg">
              Sign In
            </Link>
            <Link to="/register" className="text-white font-medium bg-[#946BEF] px-9 py-2 rounded-lg">
              Sign Up
            </Link>
          </div>

          
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4">
            <Link
              to="/"
              className="block py-2 text-gray-700 hover:text-primary font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block py-2 text-gray-700 hover:text-primary font-medium"
              onClick={() => setIsMenuOpen(false)}
            >
              Products
            </Link>


          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
