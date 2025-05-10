import { Link } from 'react-router-dom';
import { Film } from 'lucide-react';

const NotFoundPage = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center p-4 animate-fade-in">
      <Film className="h-16 w-16 text-primary-500 mb-4" />
      <h1 className="text-4xl font-bold mb-2 dark:text-white">404</h1>
      <h2 className="text-2xl font-semibold mb-4 dark:text-white">Page Not Found</h2>
      <p className="text-secondary-600 dark:text-secondary-400 max-w-md mb-6">
        The page you are looking for doesn't exist or has been moved.
      </p>
      <Link 
        to="/" 
        className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg font-medium transition-colors"
      >
        Return to Home
      </Link>
    </div>
  );
};

export default NotFoundPage;