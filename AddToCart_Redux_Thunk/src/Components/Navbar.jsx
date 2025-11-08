import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const updateCartCount = () => {
      const cartData = localStorage.getItem("Cart");
      if (cartData) {
        const cart = JSON.parse(cartData);
        const count = Object.values(cart).reduce((total, quantity) => total + quantity, 0);
        setCartCount(count);
      } else {
        setCartCount(0);
      }
    };

    updateCartCount();

    window.addEventListener('storage', updateCartCount);
    return () => window.removeEventListener('storage', updateCartCount);
  }, []);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center">
            <span className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-800">
              Add To Cart
            </span>
          </Link>

          <Link 
            to="/cart" 
            className="relative inline-flex items-center gap-1 sm:gap-2 bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-3 sm:px-4 rounded-lg transition duration-300 text-sm sm:text-base"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 sm:h-6 sm:w-6 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;