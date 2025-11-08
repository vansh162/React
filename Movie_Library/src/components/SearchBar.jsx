import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch } from 'react-redux';
import { searchMovies, clearSearchResults } from '../redux/features/slice';

const SearchBar = () => {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  const debouncedSearch = useCallback(
    (searchTerm) => {
      if (searchTerm.trim()) {
        dispatch(searchMovies(searchTerm));
      } else {
        dispatch(clearSearchResults());
      }
    },
    [dispatch]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedSearch(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query, debouncedSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      dispatch(searchMovies(query));
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 mb-6 md:mb-8">
      <form onSubmit={handleSubmit} className="relative">
        <div className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies..."
            className="w-full px-4 py-3 md:py-3 pl-10 md:pl-12 pr-20 md:pr-24 text-sm md:text-base text-gray-900 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          />
          <div className="absolute inset-y-0 left-0 pl-3 md:pl-4 flex items-center pointer-events-none">
            <svg
              className="h-4 w-4 md:h-5 md:w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <button
            type="submit"
            className="absolute inset-y-0 right-0 px-3 md:px-4 text-xs md:text-sm font-medium text-white bg-blue-600 rounded-r-lg hover:bg-blue-700 active:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors duration-200 touch-manipulation"
          >
            <span className="hidden sm:inline">Search</span>
            <span className="sm:hidden">🔍</span>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBar; 