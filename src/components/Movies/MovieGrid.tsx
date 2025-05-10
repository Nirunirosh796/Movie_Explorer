import MovieCard from './MovieCard';
import { Movie } from '../../contexts/MovieContext';
import { Loader } from 'lucide-react';

interface MovieGridProps {
  movies: Movie[];
  isLoading: boolean;
  title?: string;
  emptyMessage?: string;
}

const MovieGrid = ({ 
  movies, 
  isLoading, 
  title, 
  emptyMessage = 'No movies found' 
}:MovieGridProps) => {
  return (
    <div className="animate-fade-in">
      {title && <h2 className="text-2xl font-bold mb-4 dark:text-white">{title}</h2>}
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader className="h-10 w-10 text-primary-500 animate-spin" />
        </div>
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
          {movies.map(movie => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      ) : (
        <div className="flex justify-center items-center py-20 text-center">
          <div className="max-w-md">
            <p className="text-lg text-secondary-600 dark:text-secondary-400">{emptyMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieGrid;