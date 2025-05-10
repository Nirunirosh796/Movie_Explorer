const Footer = () => {
  return (
    <footer className="bg-white dark:bg-secondary-900 shadow-inner py-6 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
             <a href="https://loonslab.com/" target="_blank">
            <img 
              src="/image.png"  
              alt="Loons Lab Logo"
              className="h-25 w-20 object-contain"  
            />
            <span className="text-lg font-semibold text-primary-600 dark:text-primary-400">
           
           
             Loons Lab  </span></a> 
          </div>
          
          <div className="text-center md:text-right text-sm text-secondary-600 dark:text-secondary-400">
            <p className="mb-1">
              Powered by <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="text-primary-600 dark:text-primary-400 hover:underline">TMDb API</a>
            </p>
            <p className="flex items-center justify-center md:justify-end">
              Developed by Niroshan in 2025  <a href="https://www.linkedin.com/in/selavamniroshan07/" target="_blank"  className="text-primary-600 dark:text-primary-400 hover:underline">Linkdin</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;