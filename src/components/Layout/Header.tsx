import { Link, useNavigate } from 'react-router-dom';
import { Film, Moon, Sun, LogOut, Heart } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import { useAuth } from '../../contexts/AuthContext';
import SearchBar from '../Search/SearchBar';

const Header = () => {
     const { darkMode, toggleDarkMode } = useTheme();
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-secondary-900 shadow-md transition-colors duration-200">
      <div className="container mx-auto px-4 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
        <Link to="/" className="flex items-center space-x-2 text-primary-700 dark:text-primary-300">
          <Film className="h-8 w-8" />
          <span className="text-xl font-bold">Movie Explorer</span>
        </Link>
        
        <div className="w-full sm:w-auto flex-1 max-w-md mx-auto sm:mx-0">
          <SearchBar />
        </div>
        
        <div className="flex items-center space-x-4">
          <Link 
            to="/favorites" 
            className="flex items-center space-x-1 text-secondary-600 dark:text-secondary-300 hover:text-accent-500 dark:hover:text-accent-400 transition-colors"
          >
            <Heart className="h-5 w-5" />
            <span className="hidden sm:inline">Favorites</span>
          </Link>
          
          <button 
            onClick={toggleDarkMode}
            className="p-2 rounded-full bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
            aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
          {user && (
            <div className="flex items-center space-x-2">
              <span className="text-sm text-secondary-600 dark:text-secondary-300 hidden sm:inline">
                {user.username}
              </span>
              <button 
                onClick={handleLogout}
                className="p-2 rounded-full bg-secondary-100 dark:bg-secondary-800 text-secondary-600 dark:text-secondary-300 hover:bg-secondary-200 dark:hover:bg-secondary-700 transition-colors"
                aria-label="Log out"
              >
                <LogOut className="h-5 w-5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;