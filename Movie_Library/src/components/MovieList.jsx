import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMovies, fetchPopularMovies } from '../redux/features/slice';
import MovieCard from './MovieCard';

const MovieList = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const { movies, loading, error, searchResults } = useSelector((state) => state.movies);
  const { favorites, watchlist } = useSelector((state) => state.auth);

  useEffect(() => {
    if (location.pathname === '/search') {
      // Don't fetch movies on search page, we'll use searchResults
      return;
    }
    if (location.pathname === '/popular') {
      dispatch(fetchPopularMovies());
    } else {
      dispatch(fetchMovies());
    }
  }, [dispatch, location.pathname]);

  const getFilteredMovies = () => {
    if (location.pathname === '/search') {
      return searchResults;
    }
    if (location.pathname === '/favorites') {
      return movies.filter(movie => favorites.includes(movie.title));
    }
    if (location.pathname === '/watchlist') {
      return movies.filter(movie => watchlist.includes(movie.title));
    }
    return movies;
  };

  const filteredMovies = getFilteredMovies();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-4 md:py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
            {[...Array(10)].map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg md:rounded-xl aspect-[2/3] mb-3 md:mb-4" />
                <div className="space-y-2 md:space-y-3">
                  <div className="h-3 md:h-4 bg-gray-200 rounded w-3/4" />
                  <div className="h-2 md:h-3 bg-gray-200 rounded w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="text-center">
          <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">Error Loading Movies</h2>
          <p className="text-sm md:text-base text-gray-600">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="container mx-auto px-4">
        {location.pathname === '/popular' && (
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 md:mb-8">Popular Movies</h1>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-6">
          {filteredMovies.map((movie) => (
            <MovieCard key={movie.title} movie={movie} />
          ))}
        </div>
        {filteredMovies.length === 0 && (
          <div className="text-center py-8 md:py-12">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-900 mb-2">
              {location.pathname === '/search'
                ? 'No Movies Found'
                : location.pathname === '/favorites'
                ? 'No Favorite Movies'
                : location.pathname === '/watchlist'
                ? 'No Movies in Watchlist'
                : 'No Movies Found'}
            </h2>
            <p className="text-sm md:text-base text-gray-600 px-4">
              {location.pathname === '/search'
                ? 'Try adjusting your search criteria'
                : location.pathname === '/favorites'
                ? 'Add some movies to your favorites!'
                : location.pathname === '/watchlist'
                ? 'Add some movies to your watchlist!'
                : 'Try refreshing the page'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MovieList; 