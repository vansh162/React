import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { toggleFavorite, toggleWatchlist } from '../redux/features/authSlice';

const MovieDetails = () => {
  const { title } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const movie = useSelector((state) =>
    state.movies.movies.find((m) => m.title === decodeURIComponent(title))
  );
  const { favorites, watchlist } = useSelector((state) => state.auth);

  if (!movie) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Movie Not Found</h2>
          <button
            onClick={() => navigate('/')}
            className="mt-4 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors duration-200"
          >
            Go Back Home
          </button>
        </div>
      </div>
    );
  }

  const isFavorite = favorites.includes(movie.title);
  const isInWatchlist = watchlist.includes(movie.title);

  return (
    <div className="min-h-screen bg-gray-50 py-4 md:py-8">
      <div className="container mx-auto px-4">
        <button
          onClick={() => navigate('/')}
          className="mb-4 md:mb-8 flex items-center text-gray-600 hover:text-gray-900 active:text-gray-900 transition-colors duration-200 touch-manipulation"
        >
          <svg
            className="w-5 h-5 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
          <span className="text-sm md:text-base">Back to Movies</span>
        </button>

        <div className="bg-white rounded-lg md:rounded-xl shadow-lg overflow-hidden">
          <div className="md:flex">
            <div className="w-full md:w-1/3">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-auto md:h-full object-cover"
              />
            </div>
            <div className="p-4 md:p-8 md:w-2/3">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1">
                  <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{movie.title}</h1>
                  <div className="flex flex-wrap items-center gap-2 md:gap-4 text-sm md:text-base text-gray-600 mb-4">
                    <span>{new Date(movie.release_date).getFullYear()}</span>
                    <span className="hidden sm:inline">•</span>
                    <span className="break-words">{movie.genre.join(', ')}</span>
                  </div>
                </div>
                <div className="flex gap-2 sm:flex-shrink-0">
                  <button
                    onClick={() => dispatch(toggleFavorite(movie.title))}
                    className={`p-3 md:p-2 rounded-full transition-colors duration-200 touch-manipulation ${
                      isFavorite
                        ? 'text-red-500 bg-red-50'
                        : 'text-gray-400 hover:text-red-500 hover:bg-red-50 active:bg-red-50'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <button
                    onClick={() => dispatch(toggleWatchlist(movie.title))}
                    className={`p-3 md:p-2 rounded-full transition-colors duration-200 touch-manipulation ${
                      isInWatchlist
                        ? 'text-blue-500 bg-blue-50'
                        : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50 active:bg-blue-50'
                    }`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>

              <div className="prose max-w-none mt-4 md:mt-6">
                <p className="text-sm md:text-base text-gray-600 leading-relaxed">{movie.description}</p>
              </div>

              <div className="mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                  <h3 className="text-xs md:text-sm font-medium text-gray-500">Status</h3>
                  <p className="mt-1 text-sm md:text-base text-gray-900">{movie.status}</p>
                </div>
                <div className="bg-gray-50 p-3 md:p-4 rounded-lg">
                  <h3 className="text-xs md:text-sm font-medium text-gray-500">Cast</h3>
                  <p className="mt-1 text-sm md:text-base text-gray-900 break-words">{movie.cast.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieDetails; 