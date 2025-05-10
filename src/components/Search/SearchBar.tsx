import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useMovies } from '../../contexts/MovieContext';

const SearchBar = () => {
  const { searchQuery, setSearchQuery, searchMoviesByQuery } = useMovies();
  const [localQuery, setLocalQuery] = useState(searchQuery);
  const [isFocused, setIsFocused] = useState(false);
  const navigate = useNavigate();
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchDebounceRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setLocalQuery(searchQuery);
  }, [searchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalQuery(value);

    if (searchDebounceRef.current) {
      clearTimeout(searchDebounceRef.current);
    }

    searchDebounceRef.current = setTimeout(() => {
      setSearchQuery(value);
      if (value.trim()) {
        searchMoviesByQuery(value);
        navigate('/');
      }
    }, 500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (localQuery.trim()) {
      setSearchQuery(localQuery);
      searchMoviesByQuery(localQuery);
      navigate('/');
    }
  };

  const clearSearch = () => {
    setLocalQuery('');
    setSearchQuery('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className={`relative rounded-full overflow-hidden transition-all duration-200 w-full
        ${isFocused ? 'ring-2 ring-primary-500 shadow-lg' : 'shadow'}`}
    >
      <div className="flex items-center bg-white dark:bg-secondary-800 px-3 py-2">
        <Search className="h-5 w-5 text-secondary-400 dark:text-secondary-500 mr-2" />
        
        <input
          type="text"
          value={localQuery}
          onChange={handleInputChange}
          placeholder="Search for movies..."
          className="w-full bg-transparent border-none outline-none placeholder-secondary-400 dark:placeholder-secondary-500 text-secondary-900 dark:text-white"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          ref={searchInputRef}
        />
        
        {localQuery && (
          <button
            type="button"
            onClick={clearSearch}
            className="p-1 rounded-full hover:bg-secondary-100 dark:hover:bg-secondary-700"
            aria-label="Clear search"
          >
            <X className="h-5 w-5 text-secondary-400 dark:text-secondary-500" />
          </button>
        )}
        
        <button
          type="submit"
          className="ml-2 bg-primary-600 hover:bg-primary-700 text-white rounded-full px-4 py-1 text-sm font-medium transition-colors"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default SearchBar;