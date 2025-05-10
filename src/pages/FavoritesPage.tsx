
import { useMovies } from '../contexts/MovieContext';
import MovieGrid from '../components/Movies/MovieGrid';
import { Heart } from 'lucide-react';

const FavoritesPage = () => {
  const { favorites } = useMovies();
  
  return (
    <div className="animate-fade-in">
      <div className="flex items-center mb-6">
        <Heart className="h-6 w-6 text-red-500 mr-2" fill="currentColor" />
        <h1 className="text-3xl font-bold dark:text-white">Your Favorites</h1>
      </div>
      
      <MovieGrid 
        movies={favorites} 
        isLoading={false}
        emptyMessage="You haven't added any movies to your favorites yet. Start exploring and save your favorite films!"
      />
    </div>
  );
};

export default FavoritesPage;