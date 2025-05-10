import { Star, Clock, Calendar, Heart, Film, ExternalLink } from 'lucide-react';
import { MovieDetails as MovieDetailsType } from '../../contexts/MovieContext';
import { useMovies } from '../../contexts/MovieContext';
import { 
  getPosterUrl, 
  getBackdropUrl, 
  formatRuntime, 
  formatReleaseDate,
  getTrailerUrl
} from '../../services/movieService';

interface MovieDetailsProps {
  movie: MovieDetailsType;
}

const MovieDetails = ({ movie }:MovieDetailsProps) => {
  const { addToFavorites, removeFromFavorites, isInFavorites } = useMovies();
  const isFavorite = isInFavorites(movie.id);
  
  const handleFavoriteClick = () => {
    if (isFavorite) {
      removeFromFavorites(movie.id);
    } else {
      addToFavorites(movie);
    }
  };

  const trailerUrl = movie.videos ? getTrailerUrl(movie.videos) : null;
  
  return (
    <div className="animate-fade-in">
      {/* Backdrop Image */}
      <div className="relative w-full h-64 md:h-96 overflow-hidden rounded-xl mb-6">
        <div className="absolute inset-0 bg-black/50 z-10"></div>
        <img 
          src={getBackdropUrl(movie.backdrop_path)} 
          alt={`${movie.title} backdrop`}
          className="w-full h-full object-cover" 
        />
        
        <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 z-20 bg-gradient-to-t from-black via-black/70 to-transparent">
          <h1 className="text-2xl md:text-4xl font-bold text-white mb-1">
            {movie.title} <span className="font-normal opacity-75">({movie.release_date.substring(0, 4)})</span>
          </h1>
          
          {movie.tagline && (
            <p className="text-white/80 text-sm md:text-base italic mb-3">
              {movie.tagline}
            </p>
          )}
          
          <div className="flex flex-wrap gap-2 md:gap-4 text-sm text-white/90">
            <div className="flex items-center">
              <Star className="h-4 w-4 text-yellow-400 mr-1" fill="currentColor" />
              <span>{movie.vote_average.toFixed(1)}</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-4 w-4 text-white/70 mr-1" />
              <span>{formatRuntime(movie.runtime)}</span>
            </div>
            
            <div className="flex items-center">
              <Calendar className="h-4 w-4 text-white/70 mr-1" />
              <span>{formatReleaseDate(movie.release_date)}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Left sidebar */}
        <div className="md:col-span-1">
          <div className="relative rounded-lg overflow-hidden mb-4">
            <img 
              src={getPosterUrl(movie.poster_path, 'w500')} 
              alt={`${movie.title} poster`}
              className="w-full" 
            />
          </div>
          
          <button
            onClick={handleFavoriteClick}
            className={`w-full py-3 px-4 rounded-lg flex items-center justify-center 
              gap-2 mb-4 transition-colors
              ${isFavorite 
                ? 'bg-red-500 hover:bg-red-600 text-white' 
                : 'bg-secondary-100 hover:bg-secondary-200 dark:bg-secondary-800 dark:hover:bg-secondary-700 text-secondary-900 dark:text-white'
              }`}
          >
            <Heart className="h-5 w-5" fill={isFavorite ? 'currentColor' : 'none'} />
            <span>
              {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'}
            </span>
          </button>
          
          {/* Movie Info */}
          <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-4">
            <h3 className="font-semibold text-lg mb-3 dark:text-white">Movie Info</h3>
            
            <div className="space-y-3 text-sm">
              <div>
                <span className="text-secondary-500 dark:text-secondary-400 block mb-1">Status</span>
                <span className="dark:text-white">{movie.status}</span>
              </div>
              
              <div>
                <span className="text-secondary-500 dark:text-secondary-400 block mb-1">Release Date</span>
                <span className="dark:text-white">{formatReleaseDate(movie.release_date)}</span>
              </div>
              
              <div>
                <span className="text-secondary-500 dark:text-secondary-400 block mb-1">Runtime</span>
                <span className="dark:text-white">{formatRuntime(movie.runtime)}</span>
              </div>
              
              <div>
                <span className="text-secondary-500 dark:text-secondary-400 block mb-1">Genres</span>
                <div className="flex flex-wrap gap-1">
                  {movie.genres.map(genre => (
                    <span 
                      key={genre.id}
                      className="px-2 py-1 bg-secondary-100 dark:bg-secondary-700 text-secondary-700 dark:text-secondary-300 rounded-full text-xs"
                    >
                      {genre.name}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Main content */}
        <div className="md:col-span-2">
          {/* Overview */}
          <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-semibold mb-3 dark:text-white">Overview</h2>
            <p className="text-secondary-700 dark:text-secondary-300 leading-relaxed">
              {movie.overview || 'No overview available.'}
            </p>
          </div>
          
          {/* Trailer */}
          {trailerUrl && (
            <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-3 dark:text-white">Trailer</h2>
              <div className="relative pb-[56.25%] h-0 overflow-hidden rounded-lg">
                <iframe 
                  src={trailerUrl}
                  className="absolute top-0 left-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={`${movie.title} trailer`}
                  loading="lazy"
                ></iframe>
              </div>
            </div>
          )}
          
          {/* Cast */}
          {movie.credits && movie.credits.cast && movie.credits.cast.length > 0 && (
            <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6 mb-6">
              <h2 className="text-xl font-semibold mb-3 dark:text-white">Cast</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-3">
                {movie.credits.cast.slice(0, 8).map(actor => (
                  <div key={actor.id} className="bg-secondary-50 dark:bg-secondary-700 rounded-lg overflow-hidden">
                    <div className="w-full h-40 bg-secondary-200 dark:bg-secondary-600">
                      {actor.profile_path ? (
                        <img 
                          src={`https://image.tmdb.org/t/p/w185${actor.profile_path}`} 
                          alt={actor.name}
                          className="w-full h-full object-cover" 
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-secondary-200 dark:bg-secondary-600">
                          <Film className="h-12 w-12 text-secondary-400 dark:text-secondary-500" />
                        </div>
                      )}
                    </div>
                    <div className="p-2">
                      <p className="font-medium text-sm truncate dark:text-white">{actor.name}</p>
                      <p className="text-xs text-secondary-500 dark:text-secondary-400 truncate">{actor.character}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Production Companies */}
          {movie.production_companies && movie.production_companies.length > 0 && (
            <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-3 dark:text-white">Production</h2>
              <div className="flex flex-wrap gap-4">
                {movie.production_companies.map(company => (
                  <div key={company.id} className="text-center">
                    {company.logo_path ? (
                      <img 
                        src={`https://image.tmdb.org/t/p/w92${company.logo_path}`} 
                        alt={company.name}
                        className="h-10 object-contain mb-1 mx-auto rounded-sm bg-white"
                        loading="lazy"
                      />
                    ) : (
                      <div className="h-10 w-24 flex items-center justify-center bg-secondary-100 dark:bg-secondary-700 rounded-sm mb-1">
                        <Film className="h-6 w-6 text-secondary-400 dark:text-secondary-500" />
                      </div>
                    )}
                    <p className="text-xs text-secondary-600 dark:text-secondary-400">{company.name}</p>
                  </div>
                ))}
              </div>
              
              <div className="mt-4 pt-4 border-t border-secondary-200 dark:border-secondary-700">
                <a 
                  href={`https://www.themoviedb.org/movie/${movie.id}`} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 text-sm flex items-center"
                >
                  <span>View on TMDB</span>
                  <ExternalLink className="ml-1 h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;