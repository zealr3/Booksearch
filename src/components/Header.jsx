import React from 'react';
import { Search, Book, Heart } from 'lucide-react';

const Header = ({ currentPage, navigate, searchQuery, setSearchQuery, favoritesCount }) => {
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate('books');
    }
  };

  return (
    <header className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <div 
            onClick={() => navigate('home')}
            className="flex items-center space-x-3 cursor-pointer"
          >
            <div className="bg-blue-600 p-2 rounded-lg">
              <Book className="w-8 h-8 text-white" />
            </div>
            <span className="text-2xl font-bold text-gray-900">BookHub</span>
          </div>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books, authors, or topics..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </form>

          {/* Navigation */}
          <nav className="flex items-center space-x-6">
            <button
              onClick={() => navigate('home')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === 'home' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => navigate('books')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === 'books' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              Browse Books
            </button>
            <button
              onClick={() => navigate('favorites')}
              className={`relative px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === 'favorites' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              <Heart className="w-5 h-5 inline mr-1" />
              Favorites
              {favoritesCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {favoritesCount}
                </span>
              )}
            </button>
            <button
              onClick={() => navigate('about')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === 'about' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              About
            </button>
            <button
              onClick={() => navigate('contact')}
              className={`px-3 py-2 rounded-md text-sm font-medium ${
                currentPage === 'contact' 
                  ? 'text-blue-600 bg-blue-50' 
                  : 'text-gray-700 hover:text-blue-600'
              }`}
            >
              ContactPage
            </button>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;