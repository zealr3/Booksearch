import React, { useState, useEffect, useCallback } from 'react';
import PropTypes from 'prop-types';
import { Tag } from 'lucide-react';
import BookCard from '../components/BookCard';

const HomePage = ({ navigate, searchQuery, setSearchQuery, addToFavorites, favorites, onBookClick }) => {
  const [featuredBooks, setFeaturedBooks] = useState([]);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState({ totalBooks: 0, totalAuthors: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      
      const response = await fetch('https://gutendex.com/books/?page=1');
      if (!response.ok) throw new Error('Failed to fetch books');
      
      const data = await response.json();
      
      // Validate data structure
      if (!data?.results || !Array.isArray(data.results)) {
        throw new Error('Invalid data format');
      }

      setFeaturedBooks(data.results.slice(0, 8));
      
      const allSubjects = data.results.flatMap(book => book.subjects || []);
      const uniqueCategories = [...new Set(allSubjects)].slice(0, 6);
      setCategories(uniqueCategories);
      
      const allAuthors = [...new Set(
        data.results.flatMap(book => 
          book.authors?.map(author => author.name) || []
        )
      )];
      
      setStats({
        totalBooks: data.count || 0,
        totalAuthors: allAuthors.length
      });
      
    } catch (error) {
      console.error('Error fetching data:', error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleSearch = (e) => {
    e.preventDefault();
    const trimmedQuery = searchQuery.trim();
    if (trimmedQuery) {
      setSearchQuery(trimmedQuery);
      navigate('books');
    }
  };

  if (error) {
    return (
      <div className="text-center py-16 text-red-600">
        Error: {error}. Please try again later.
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Discover Your Next Great Read
          </h1>
          <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Explore thousands of free books from Project Gutenberg. Find classics, 
            discover new authors, and dive into stories that inspire.
          </p>
          
          <form onSubmit={handleSearch} className="max-w-2xl mx-auto">
            <div className="flex rounded-lg overflow-hidden shadow-lg">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for books, authors, or topics..."
                className="flex-1 px-6 py-4 text-gray-900 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label="Search books"
              />
              <button
                type="submit"
                disabled={isLoading}
                className="bg-yellow-500 hover:bg-yellow-600 disabled:bg-yellow-300 px-8 py-4 text-gray-900 font-semibold text-lg transition-colors"
                aria-label="Submit search"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="p-6">
              <div className="text-4xl font-bold text-blue-600 mb-2">
                {isLoading ? '...' : stats.totalBooks.toLocaleString()}+
              </div>
              <div className="text-gray-600 text-lg">Free Books Available</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-purple-600 mb-2">
                {isLoading ? '...' : stats.totalAuthors.toLocaleString()}+
              </div>
              <div className="text-gray-600 text-lg">Authors Featured</div>
            </div>
            <div className="p-6">
              <div className="text-4xl font-bold text-green-600 mb-2">100%</div>
              <div className="text-gray-600 text-lg">Free to Read</div>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Explore Popular Categories
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoading ? (
              Array(6).fill().map((_, i) => (
                <div key={i} className="bg-gray-200 h-24 rounded-lg animate-pulse" />
              ))
            ) : (
              categories.map((category, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setSearchQuery(category);
                    navigate('books');
                  }}
                  className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500 text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                  aria-label={`Browse ${category} category`}
                >
                  <div className="flex items-center">
                    <Tag className="w-5 h-5 text-blue-600 mr-3" />
                    <h3 className="font-semibold text-gray-900 truncate">
                      {category}
                    </h3>
                  </div>
                </button>
              ))
            )}
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Featured Books
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {isLoading ? (
              Array(8).fill().map((_, i) => (
                <div key={i} className="bg-gray-200 h-96 rounded-lg animate-pulse" />
              ))
            ) : (
              featuredBooks.map((book) => (
                <div
                  key={book.id}
                  onClick={() => onBookClick?.(book)}
                  role="button"
                  tabIndex={0}
                  onKeyPress={(e) => e.key === 'Enter' && onBookClick?.(book)}
                  className="focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg"
                >
                  <BookCard 
                    book={book} 
                    onAddToFavorites={addToFavorites}
                    isFavorite={favorites.some(fav => fav.id === book.id)}
                    onClick={onBookClick}
                  />
                </div>
              ))
            )}
          </div>
          
          <div className="text-center mt-12">
            <button
              onClick={() => navigate('books')}
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-3 rounded-lg font-semibold transition-colors"
              aria-label="Browse all books"
            >
              Browse All Books
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

HomePage.propTypes = {
  navigate: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  addToFavorites: PropTypes.func.isRequired,
  favorites: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired
  })).isRequired,
  onBookClick: PropTypes.func
};

export default HomePage;