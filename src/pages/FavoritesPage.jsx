import React from 'react';
import { Heart } from 'lucide-react';
import BookCard from '../components/BookCard';

const FavoritesPage = ({ favorites, removeFromFavorites }) => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Your Favorite Books</h1>
      
      {favorites.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favorites.map((book) => (
            <BookCard 
              key={book.id} 
              book={book} 
              onRemoveFromFavorites={removeFromFavorites}
              isFavorite={true}
              showRemove={true}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-600 mb-2">No favorites yet</h3>
          <p className="text-gray-500">Start adding books to your favorites to see them here</p>
        </div>
      )}
    </div>
  );
};

export default FavoritesPage;