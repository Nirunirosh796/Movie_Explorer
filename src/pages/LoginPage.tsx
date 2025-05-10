import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Film, AtSign, Lock, AlertCircle, Loader } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState('');
  const { login, isAuthenticated, error, isLoading } = useAuth();
  const { darkMode, toggleDarkMode } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    // If already authenticated, redirect to home
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  // Set the error from auth context to form error
  useEffect(() => {
    if (error) {
      setFormError(error);
    }
  }, [error]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    
    if (!username.trim()) {
      setFormError('Username is required');
      return;
    }
    
    if (!password.trim()) {
      setFormError('Password is required');
      return;
    }
    
    const success = await login(username, password);
    if (success) {
      navigate('/');
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 
      ${darkMode ? 'dark bg-secondary-950' : 'bg-gray-50'}`}>
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-secondary-800 rounded-lg shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-primary-800 dark:bg-primary-900 p-6 text-white text-center">
            <div className="flex justify-center mb-3">
              <Film className="h-12 w-12" />
            </div>
            <h1 className="text-2xl font-bold">Movie Explorer</h1>
            <p className="text-primary-200 mt-1">Sign in to discover your favorite films</p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {formError && (
              <div className="bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 p-3 rounded-lg flex items-start">
                <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
                <span>{formError}</span>
              </div>
            )}
            
            <div>
              <label htmlFor="username" className="block text-sm font-medium mb-1 dark:text-white">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <AtSign className="h-5 w-5 text-secondary-400 dark:text-secondary-500" />
                </div>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  className="w-full pl-10 pr-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder-secondary-400 dark:placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <p className="mt-1 text-xs text-secondary-500 dark:text-secondary-400">
                For demo, use any username with at least 3 characters
              </p>
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1 dark:text-white">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-secondary-400 dark:text-secondary-500" />
                </div>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full pl-10 pr-3 py-2 border border-secondary-300 dark:border-secondary-600 rounded-lg bg-white dark:bg-secondary-700 text-secondary-900 dark:text-white placeholder-secondary-400 dark:placeholder-secondary-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <p className="mt-1 text-xs text-secondary-500 dark:text-secondary-400">
                For demo, use any password with at least 6 characters
              </p>
            </div>
            
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-2 px-4 rounded-lg bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 text-white font-medium transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <Loader className="h-5 w-5 animate-spin mr-2" />
                  <span>Signing in...</span>
                </div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>
          
          {/* Footer */}
          <div className="px-6 pb-6 text-center">
          
            <button
              onClick={toggleDarkMode}
              className="text-sm text-secondary-500 dark:text-secondary-400 hover:text-secondary-700 dark:hover:text-secondary-300"
            >
              {darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
            </button>
          </div>
        </div>
        
        <div className="mt-4 text-center text-sm text-secondary-500 dark:text-secondary-400">
          <p>This is a demo application. No real authentication is performed.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;