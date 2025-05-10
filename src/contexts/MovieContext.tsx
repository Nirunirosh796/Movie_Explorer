import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchTrendingMovies, searchMovies, fetchMovieDetails } from '../services/movieService';

export interface Movie {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string | null;
  release_date: string;
  vote_average: number;
  overview: string;
  genre_ids?: number[];
  genres?: { id: number; name: string }[];
}

export interface MovieDetails extends Movie {
  runtime: number;
  tagline: string;
  status: string;
  genres: { id: number; name: string }[];
  production_companies: { id: number; name: string; logo_path: string | null }[];
  videos?: {
    results: {
      id: string;
      key: string;
      name: string;
      site: string;
      type: string;
    }[];
  };
  credits?: {
    cast: {
      id: number;
      name: string;
      character: string;
      profile_path: string | null;
    }[];
  };
}

interface MovieContextType {
  trendingMovies: Movie[];
  searchResults: Movie[];
  currentMovie: MovieDetails | null;
  favorites: Movie[];
  isLoading: boolean;
  error: string | null;
  searchQuery: string;
  searchMoviesByQuery: (query: string) => Promise<void>;
  fetchMovieById: (id: number) => Promise<void>;
  fetchTrending: () => Promise<void>;
  addToFavorites: (movie: Movie) => void;
  removeFromFavorites: (movieId: number) => void;
  isInFavorites: (movieId: number) => boolean;
  setSearchQuery: (query: string) => void;
}

const MovieContext = createContext<MovieContextType | undefined>(undefined);

export const MovieProvider=({ children }:{ children: React.ReactNode })  => {
  const [trendingMovies, setTrendingMovies] = useState<Movie[]>([]);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [currentMovie, setCurrentMovie] = useState<MovieDetails | null>(null);
  const [favorites, setFavorites] = useState<Movie[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>(() => {
    return localStorage.getItem('lastSearchQuery') || '';
  });

  useEffect(() => {
    const storedFavorites = localStorage.getItem('favorites');
    if (storedFavorites) {
      try {
        setFavorites(JSON.parse(storedFavorites));
      } catch (err) {
        console.error('Failed to parse stored favorites', err);
        localStorage.removeItem('favorites');
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    if (searchQuery) {
      localStorage.setItem('lastSearchQuery', searchQuery);
    }
  }, [searchQuery]);

  const fetchTrending = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchTrendingMovies();
      setTrendingMovies(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch trending movies');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const searchMoviesByQuery = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      const data = await searchMovies(query);
      setSearchResults(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to search movies');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const fetchMovieById = useCallback(async (id: number) => {
    setIsLoading(true);
    setError(null);

    try {
      const data = await fetchMovieDetails(id);
      setCurrentMovie(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError('Failed to fetch movie details');
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  const addToFavorites = useCallback((movie: Movie) => {
    setFavorites(prevFavorites => {
      if (prevFavorites.some(m => m.id === movie.id)) {
        return prevFavorites;
      }
      return [...prevFavorites, movie];
    });
  }, []);

  const removeFromFavorites = useCallback((movieId: number) => {
    setFavorites(prevFavorites => prevFavorites.filter(movie => movie.id !== movieId));
  }, []);

  const isInFavorites = useCallback((movieId: number) => {
    return favorites.some(movie => movie.id === movieId);
  }, [favorites]);

  return (
    <MovieContext.Provider
      value={{
        trendingMovies,
        searchResults,
        currentMovie,
        favorites,
        isLoading,
        error,
        searchQuery,
        setSearchQuery,
        searchMoviesByQuery,
        fetchMovieById,
        fetchTrending,
        addToFavorites,
        removeFromFavorites,
        isInFavorites,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

export const useMovies = (): MovieContextType => {
  const context = useContext(MovieContext);
  if (context === undefined) {
    throw new Error('useMovies must be used within a MovieProvider');
  }
  return context;
};