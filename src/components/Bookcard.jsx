import React from 'react';
import { User, Heart, Download, ExternalLink } from 'lucide-react';

const BookCard = ({
  book,
  onAddToFavorites,
  onRemoveFromFavorites,
  isFavorite,
  showRemove,
}) => {
  const title = book.title || 'Unknown Title';
  const author =
    book.authors && book.authors.length > 0
      ? book.authors[0].name
      : 'Unknown Author';
  const coverImage =
    book.formats && book.formats['image/jpeg']
      ? book.formats['image/jpeg']
      : 'https://via.placeholder.com/300x400/e2e8f0/64748b?text=No+Cover';

  const readLink =
    book.formats &&
    (book.formats['text/html'] ||
      book.formats['application/pdf'] ||
      book.formats['text/plain']);

  const downloadCount = book.download_count || 0;
  const subjects = book.subjects || [];
  const languages = book.languages || [];

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-4 flex flex-col">
      <img
        src={coverImage}
        alt={title}
        className="w-full h-64 object-cover rounded mb-4"
      />
      <h2 className="text-xl font-semibold mb-1">{title}</h2>
      <div className="flex items-center text-gray-600 mb-2">
        <User className="w-4 h-4 mr-1" />
        <span>{author}</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-2">
        {subjects.slice(0, 3).map((subject, idx) => (
          <span
            key={idx}
            className="bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded"
          >
            {subject}
          </span>
        ))}
      </div>
      <div className="flex items-center text-sm text-gray-500 mb-2">
        <span className="mr-2">Languages:</span>
        {languages.map((lang, idx) => (
          <span key={idx} className="mr-1 uppercase">
            {lang}
          </span>
        ))}
      </div>
      <div className="flex items-center justify-between mt-auto">
        <div className="flex items-center text-gray-500">
          <Download className="w-4 h-4 mr-1" />
          <span>{downloadCount}</span>
        </div>
        <div className="flex items-center space-x-2">
          {readLink && (
            <a
              href={readLink}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:text-blue-800 transition"
              title="Read Online"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          )}
          {isFavorite ? (
            showRemove && (
              <button
                onClick={() => onRemoveFromFavorites(book)}
                className="text-red-500 hover:text-red-700 transition"
                title="Remove from Favorites"
              >
                <Heart fill="currentColor" className="w-5 h-5" />
              </button>
            )
          ) : (
            <button
              onClick={() => onAddToFavorites(book)}
              className="text-gray-400 hover:text-red-500 transition"
              title="Add to Favorites"
            >
              <Heart className="w-5 h-5" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookCard;