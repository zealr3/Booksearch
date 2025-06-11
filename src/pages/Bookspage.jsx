import React, { useState, useEffect } from 'react';
import { Book } from 'lucide-react';
import BookCard from '../components/BookCard';

const BooksPage = ({ searchQuery, setSearchQuery, addToFavorites, favorites }) => {
  const [books, setBooks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [filters, setFilters] = useState({
    language: '',
    topic: '',
    author: ''
  });

  useEffect(() => {
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        let url = `https://gutendex.com/books/?page=${currentPage}`;
        
        if (searchQuery) {
          url += `&search=${encodeURIComponent(searchQuery)}`;
        }
        
        if (filters.language) {
          url += `&languages=${filters.language}`;
        }
        
        if (filters.topic) {
          url += `&topic=${encodeURIComponent(filters.topic)}`;
        }

        const response = await fetch(url);
        const data = await response.json();
        
        setBooks(data.results);
        setTotalPages(Math.ceil(data.count / 32));
        setIsLoading(false);
      } catch (error) {
        console.error('Error fetching books:', error);
        setIsLoading(false);
      }
    };

    fetchBooks();
  }, [currentPage, searchQuery, filters]);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({ ...prev, [filterType]: value }));
    setCurrentPage(1);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Browse Books</h1>
        
        {/* Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md mb-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Language
              </label>
              <select
                value={filters.language}
                onChange={(e) => handleFilterChange('language', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              >
                <option value="">All Languages</option>
                <option value="en">English</option>
                <option value="fr">French</option>
                <option value="de">German</option>
                <option value="es">Spanish</option>
                <option value="it">Italian</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search
              </label>
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search books..."
                className="w-full p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
              />
            </div>
            
            <div className="flex items-end">
              <button
                onClick={() => {
                  setFilters({ language: '', topic: '', author: '' });
                  setSearchQuery('');
                  setCurrentPage(1);
                }}
                className="w-full bg-gray-500 hover:bg-gray-600 text-white p-2 rounded-md transition-colors"
              >
                Clear Filters
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {Array(12).fill().map((_, i) => (
              <div key={i} className="bg-gray-200 h-96 rounded-lg animate-pulse"></div>
            ))}
          </div>
        ) : books.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {books.map((book) => (
                <BookCard 
                  key={book.id} 
                  book={book} 
                  onAddToFavorites={addToFavorites}
                  isFavorite={favorites.some(fav => fav.id === book.id)}
                />
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-300 hover:bg-blue-700 transition-colors"
                >
                  Previous
                </button>
                
                <div className="flex items-center px-4 py-2 bg-gray-100 rounded-md">
                  Page {currentPage} of {totalPages}
                </div>
                
                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md disabled:bg-gray-300 hover:bg-blue-700 transition-colors"
                >
                  Next
                </button>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <Book className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-gray-600 mb-2">No books found</h3>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default BooksPage;