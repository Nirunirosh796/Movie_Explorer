import axios from 'axios';
import { Movie, MovieDetails } from '../contexts/MovieContext';

const config = {
  API_KEY: import.meta.env.VITE_TMDB_API_KEY || '2e80b2306726c7da818809d555c25a5f',
  BASE_URL: import.meta.env.VITE_TMDB_BASE_URL || 'https://api.themoviedb.org/3',
  IMAGE_BASE_URL: import.meta.env.VITE_TMDB_IMAGE_BASE_URL || 'https://image.tmdb.org/t/p'
};

const ENDPOINTS = {
  TRENDING: `${config.BASE_URL}/trending/movie/week`,
  SEARCH: `${config.BASE_URL}/search/movie`,
  MOVIE_DETAILS: `${config.BASE_URL}/movie`,
};

const api = axios.create({
  params: {
    api_key: config.API_KEY,
    language: 'en-US',
  },
});

export const getPosterUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) return '/placeholder-poster.jpg';
  return `${config.IMAGE_BASE_URL}/${size}${path}`;
};

export const getBackdropUrl = (path: string | null, size: string = 'original'): string => {
  if (!path) return '/placeholder-backdrop.jpg';
  return `${config.IMAGE_BASE_URL}/${size}${path}`;
};

export const fetchTrendingMovies = async (): Promise<Movie[]> => {
  try {
    const response = await api.get(ENDPOINTS.TRENDING);
    return response.data.results;
  } catch (error) {
    console.error('Error fetching trending movies:', error);
    throw new Error('Failed to fetch trending movies. Please try again later.');
  }
};

export const searchMovies = async (query: string, page: number = 1): Promise<Movie[]> => {
  try {
    const response = await api.get(ENDPOINTS.SEARCH, {
      params: {
        query,
        page,
        include_adult: false,
      },
    });
    return response.data.results;
  } catch (error) {
    console.error('Error searching movies:', error);
    throw new Error('Failed to search movies. Please try again later.');
  }
};

export const fetchMovieDetails = async (id: number): Promise<MovieDetails> => {
  try {
    const response = await api.get(`${ENDPOINTS.MOVIE_DETAILS}/${id}`, {
      params: {
        append_to_response: 'videos,credits',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching movie details:', error);
    throw new Error('Failed to fetch movie details. Please try again later.');
  }
};

export const getTrailerUrl = (videos: any): string | null => {
  if (!videos || !videos.results || videos.results.length === 0) {
    return null;
  }

  const officialTrailer = videos.results.find(
    (video: any) => 
      video.type === 'Trailer' && 
      video.site === 'YouTube' && 
      video.name.toLowerCase().includes('official')
  );

  const anyTrailer = videos.results.find(
    (video: any) => 
      video.type === 'Trailer' && 
      video.site === 'YouTube'
  );

  const anyVideo = videos.results.find(
    (video: any) => video.site === 'YouTube'
  );

  const video = officialTrailer || anyTrailer || anyVideo;
  
  return video ? `https://www.youtube.com/embed/${video.key}` : null;
};

export const formatRuntime = (minutes: number | undefined): string => {
  if (!minutes) return 'N/A';
  
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  
  if (hours === 0) {
    return `${remainingMinutes}min`;
  }
  
  return `${hours}h ${remainingMinutes}min`;
};

export const formatReleaseDate = (dateString: string | undefined): string => {
  if (!dateString) return 'N/A';
  
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
};

export const getYearFromDate = (dateString: string | undefined): string => {
  if (!dateString) return '';
  
  const date = new Date(dateString);
  return date.getFullYear().toString();
};