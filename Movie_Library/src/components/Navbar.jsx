import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/features/authSlice';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-gray-800 text-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-14 md:h-16">
          <Link to="/" className="text-lg md:text-xl font-bold">
            Movie Library
          </Link>

          <div className="hidden md:flex items-center space-x-4">
            <Link
              to="/popular"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
            >
              Popular
            </Link>
            <Link
              to="/search"
              className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
            >
              Search
            </Link>
            {isAuthenticated ? (
              <>
                <Link
                  to="/favorites"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
                >
                  Favorites
                </Link>
                <Link
                  to="/watchlist"
                  className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
                >
                  Watchlist
                </Link>
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
                  >
                    <span>{user?.email || 'User'}</span>
                    <svg
                      className={`w-4 h-4 transition-transform duration-200 ${
                        isDropdownOpen ? 'rotate-180' : ''
                      }`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      >
                        Sign Out
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="px-3 py-2 rounded-md text-sm font-medium hover:bg-gray-700 transition-colors duration-200"
              >
                Login
              </Link>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 rounded-md hover:bg-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {isAuthenticated ? (
                <>
                  <Link
                    to="/popular"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Popular
                  </Link>
                  <Link
                    to="/search"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Search
                  </Link>
                  <Link
                    to="/favorites"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Favorites
                  </Link>
                  <Link
                    to="/watchlist"
                    className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Watchlist
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition-colors duration-200"
                  >
                    Sign Out
                  </button>
                </>
              ) : (
                <Link
                  to="/login"
                  className="block px-3 py-2 rounded-md text-base font-medium hover:bg-gray-700 transition-colors duration-200"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar; 