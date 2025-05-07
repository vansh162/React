import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchMovies, clearSearchResults } from '../redux/features/slice';
import { Link } from 'react-router-dom';

const MovieSearch = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const dispatch = useDispatch();
  const { searchResults, loading, error } = useSelector((state) => state.movies);

  // Debounce search function
  const debouncedSearch = useCallback(
    (term) => {
      if (term.trim()) {
        dispatch(searchMovies(term));
      } else {
        dispatch(clearSearchResults());
      }
    },
    [dispatch]
  );

  // Effect for debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      debouncedSearch(searchTerm);
    }, 300); // 300ms delay

    return () => clearTimeout(timer);
  }, [searchTerm, debouncedSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      dispatch(searchMovies(searchTerm));
    }
  };

  const MovieCard = ({ movie }) => (
    <Link to={`/movie/${movie.title}`} className="transform hover:scale-105 transition-transform duration-200">
      <div className="bg-white rounded-lg shadow-lg overflow-hidden">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-64 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800">{movie.title}</h3>
          <p className="text-sm text-gray-600">{movie.release_date}</p>
          <div className="flex flex-wrap gap-2 mt-2">
            {movie.genre.map((genre, index) => (
              <span key={index} className="px-2 py-1 bg-gray-200 rounded-full text-xs">
                {genre}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Link>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto mb-8">
        <div className="flex gap-4">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for movies by title, genre, or cast..."
            className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Search
          </button>
        </div>
      </form>

      {loading && (
        <div className="text-center py-8">
          <div className="text-xl">Searching...</div>
        </div>
      )}

      {error && (
        <div className="text-center py-8">
          <div className="text-xl text-red-500">Error: {error}</div>
        </div>
      )}

      {searchResults.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Search Results ({searchResults.length})
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {searchResults.map((movie) => (
              <MovieCard key={movie.title} movie={movie} />
            ))}
          </div>
        </div>
      )}

      {!loading && !error && searchResults.length === 0 && searchTerm && (
        <div className="text-center py-8">
          <div className="text-xl text-gray-600">No movies found</div>
        </div>
      )}
    </div>
  );
};

export default MovieSearch; 