import React, { useState } from 'react';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import BooksPage from './pages/Bookspage';
import FavoritesPage from './pages/FavoritesPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import Footer from './components/Footer';
import BookDetailsPage from './pages/Bookdetails';
import './index.css';

const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);

  const navigate = (page) => setCurrentPage(page);

  const addToFavorites = (book) => {
    if (!favorites.find(fav => fav.id === book.id)) {
      setFavorites([...favorites, book]);
    }
  };

  const removeFromFavorites = (bookId) => {
    setFavorites(favorites.filter(fav => fav.id !== bookId));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        currentPage={currentPage} 
        navigate={navigate} 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        favoritesCount={favorites.length}
      />
      
      <main>
        {currentPage === 'home' && (
          <HomePage 
            navigate={navigate} 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            addToFavorites={addToFavorites}
            favorites={favorites}
            onBookClick={(book) => {
              setSelectedBook(book);
              setCurrentPage('bookDetails');
            }}
          />
        )}
        {currentPage === 'books' && (
          <BooksPage 
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            addToFavorites={addToFavorites}
            favorites={favorites}
            onBookClick={(book) => {
              setSelectedBook(book);
              setCurrentPage('bookDetails');
            }}
          />
        )}
        {currentPage === 'favorites' && (
          <FavoritesPage 
            favorites={favorites}
            removeFromFavorites={removeFromFavorites}
          />
        )}
        {currentPage === 'about' && <AboutPage />}
        {currentPage === 'contact' && <ContactPage />}
        {currentPage === 'bookDetails' && (
          <BookDetailsPage
            book={selectedBook}
            onBack={() => setCurrentPage('home')}
          />
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default App;