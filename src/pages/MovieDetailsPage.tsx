import  { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMovies } from '../contexts/MovieContext';
import MovieDetails from '../components/Movies/MovieDetails';
import { ArrowLeft, AlertTriangle, Loader } from 'lucide-react';

const MovieDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { currentMovie, fetchMovieById, isLoading, error } = useMovies();
  
  useEffect(() => {
    if (id) {
      fetchMovieById(parseInt(id, 10));
    }
    
    window.scrollTo(0, 0);
  }, [id, fetchMovieById]);
  
  const goBack = () => {
    navigate(-1);
  };
  
  return (
    <div className="animate-fade-in">
      <button 
        onClick={goBack}
        className="mb-6 flex items-center text-primary-600 dark:text-primary-400 hover:text-primary-700 dark:hover:text-primary-300 transition-colors"
      >
        <ArrowLeft className="h-5 w-5 mr-1" />
        <span>Back to Movies</span>
      </button>
      
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader className="h-10 w-10 text-primary-500 animate-spin" />
        </div>
      ) : error ? (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg flex items-start">
          <AlertTriangle className="h-6 w-6 mr-2 flex-shrink-0" />
          <div>
            <p className="font-medium">Error loading movie details</p>
            <p>{error}</p>
          </div>
        </div>
      ) : currentMovie ? (
        <MovieDetails movie={currentMovie} />
      ) : (
        <div className="bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-500 p-4 rounded-lg">
          Movie not found. The movie may have been removed or the ID is invalid.
        </div>
      )}
    </div>
  );
};

export default MovieDetailsPage;