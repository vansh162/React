import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toggleFavorite, toggleWatchlist } from '../redux/features/authSlice';

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { favorites, watchlist } = useSelector((state) => state.auth);

  const isFavorite = favorites.includes(movie.title);
  const isInWatchlist = watchlist.includes(movie.title);

  const handleFavoriteClick = (e) => {
    e.stopPropagation();
    dispatch(toggleFavorite(movie.title));
  };

  const handleWatchlistClick = (e) => {
    e.stopPropagation();
    dispatch(toggleWatchlist(movie.title));
  };

  return (
    <div
      onClick={() => navigate(`/movie/${encodeURIComponent(movie.title)}`)}
      className="group relative bg-white rounded-lg md:rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer active:scale-95 md:active:scale-100"
    >
      <div className="aspect-[2/3] relative">
        <img
          src={movie.poster}
          alt={movie.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      
      <div className="p-3 md:p-4">
        <h3 className="text-base md:text-lg font-semibold text-gray-900 line-clamp-2 md:line-clamp-1">{movie.title}</h3>
        <div className="flex flex-wrap items-center gap-1 md:gap-2 mt-1">
          <span className="text-xs md:text-sm text-gray-600">{new Date(movie.release_date).getFullYear()}</span>
          <span className="text-xs md:text-sm text-gray-600 hidden sm:inline">•</span>
          <span className="text-xs md:text-sm text-gray-600 line-clamp-1">{movie.genre.slice(0, 2).join(', ')}{movie.genre.length > 2 ? '...' : ''}</span>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={handleFavoriteClick}
            className={`p-2 md:p-2 rounded-full transition-colors duration-200 touch-manipulation ${
              isFavorite
                ? 'text-red-500 bg-red-50'
                : 'text-gray-400 hover:text-red-500 hover:bg-red-50 active:bg-red-50'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
            </svg>
          </button>
          <button
            onClick={handleWatchlistClick}
            className={`p-2 md:p-2 rounded-full transition-colors duration-200 touch-manipulation ${
              isInWatchlist
                ? 'text-blue-500 bg-blue-50'
                : 'text-gray-400 hover:text-blue-500 hover:bg-blue-50 active:bg-blue-50'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
              <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default MovieCard; 