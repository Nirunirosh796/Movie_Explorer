import  { useEffect } from 'react';
import { useMovies } from '../contexts/MovieContext';
import MovieGrid from '../components/Movies/MovieGrid';
import { Sparkles } from 'lucide-react';

const HomePage = () => {
  const { 
    trendingMovies, 
    searchResults, 
    searchQuery, 
    isLoading, 
    error, 
    fetchTrending 
  } = useMovies();

  // Fetch trending movies on component mount
  useEffect(() => {
    if (trendingMovies.length === 0) {
      fetchTrending();
    }
  }, [fetchTrending, trendingMovies.length]);

  const showSearchResults = searchQuery.trim() !== '';

  return (
    <div className="space-y-8 pb-8 animate-fade-in">
      {error && (
        <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-4 rounded-lg mb-6">
          {error}
        </div>
      )}
      
      {showSearchResults ? (
        // Search Results
        <section>
          <h1 className="text-3xl font-bold mb-6 dark:text-white">
            Search Results for "{searchQuery}"
          </h1>
          <MovieGrid 
            movies={searchResults} 
            isLoading={isLoading} 
            emptyMessage={`No movies found for "${searchQuery}". Try a different search term.`}
          />
        </section>
      ) : (
        // Trending Movies
        <section>
          <div className="flex items-center mb-6">
            <Sparkles className="h-6 w-6 text-accent-500 mr-2" />
            <h1 className="text-3xl font-bold dark:text-white">Trending Movies</h1>
          </div>
          <MovieGrid 
            movies={trendingMovies} 
            isLoading={isLoading} 
            emptyMessage="No trending movies available right now. Please check back later."
          />
        </section>
      )}
    </div>
  );
};

export default HomePage;