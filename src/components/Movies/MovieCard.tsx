import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Star, Heart } from 'lucide-react';
import { Movie } from '../../contexts/MovieContext';
import { getPosterUrl, getYearFromDate } from '../../services/movieService';
import { useMovies } from '../../contexts/MovieContext';

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const navigate = useNavigate();
  const { addToFavorites, removeFromFavorites, isInFavorites } = useMovies();
  const isFavorite = isInFavorites(movie.id);

  const handleClick = () => {
    navigate(`/movie/${movie.id}`);
  };

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

 
  const formattedRating = movie.vote_average.toFixed(1);
  const ratingColor = 
    movie.vote_average >= 7 ? 'text-green-500' : 
    movie.vote_average >= 5 ? 'text-amber-500' : 'text-red-500';

  return (
    <div 
      className="group relative rounded-lg overflow-hidden bg-white dark:bg-secondary-800 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 cursor-pointer animate-fade-in"
      onClick={handleClick}
    >
      <div className="relative pb-[150%] overflow-hidden">
        <img 
          src={getPosterUrl(movie.poster_path)} 
          alt={`${movie.title} poster`}
          className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <h3 className="text-white font-bold truncate">
              {movie.title}
            </h3>
            <p className="text-white/80 text-sm">
              {getYearFromDate(movie.release_date)}
            </p>
          </div>
        </div>
        
        {/* Rating */}
        <div className="absolute top-2 left-2 bg-black/70 rounded-full px-2 py-1 flex items-center">
          <Star className={`h-4 w-4 ${ratingColor} mr-1 inline`} fill="currentColor" />
          <span className="text-white text-xs font-bold">{formattedRating}</span>
        </div>
        
        {/* Favorite button */}
        <button 
          className={`absolute top-2 right-2 bg-black/70 p-1.5 rounded-full
            ${isFavorite ? 'text-red-500' : 'text-white hover:text-red-400'} 
            transition-colors duration-200`}
          onClick={handleFavoriteClick}
          aria-label={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
        >
          <Heart className="h-4 w-4" fill={isFavorite ? 'currentColor' : 'none'} />
        </button>
      </div>
      
      <div className="p-3">
        <h3 className="font-semibold truncate dark:text-white">
          {movie.title}
        </h3>
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-secondary-500 dark:text-secondary-400">
            {getYearFromDate(movie.release_date)}
          </span>
          <div className="flex items-center">
            <Star className={`h-3.5 w-3.5 ${ratingColor} mr-1`} fill="currentColor" />
            <span className="text-xs font-medium text-secondary-700 dark:text-secondary-300">
              {formattedRating}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieCard;