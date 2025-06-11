import React from 'react';
import PropTypes from 'prop-types';

const BookDetailsPage = ({ book, onBack }) => {
  if (!book) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center text-gray-600 text-lg">
          Book not found. Please try another selection.
        </div>
      </div>
    );
  }

  const defaultImage = 'https://via.placeholder.com/300x400?text=No+Cover+Available';
  const defaultAuthor = 'Unknown Author';
  const defaultSubjects = ['Not specified'];
  const defaultLanguages = ['Unknown'];

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto p-8 bg-white rounded-lg shadow-lg">
        <button 
          onClick={onBack} 
          className="mb-6 inline-flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
          aria-label="Go back to previous page"
        >
          ← Back
        </button>
        
        <div className="flex flex-col md:flex-row gap-8">
          <img 
            src={book.formats?.['image/jpeg'] || defaultImage} 
            alt={`${book.title} cover`} 
            className="w-48 h-auto rounded-lg shadow-md object-cover"
            onError={(e) => { e.target.src = defaultImage; }}
          />
          
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              {book.title || 'Untitled'}
            </h1>
            
            <div className="space-y-3 text-gray-700">
              <p>
                <span className="font-semibold">Author:</span>{' '}
                {book.authors?.[0]?.name || defaultAuthor}
              </p>
              <p>
                <span className="font-semibold">Subjects:</span>{' '}
                {(book.subjects?.length > 0 ? book.subjects : defaultSubjects).join(', ')}
              </p>
              <p>
                <span className="font-semibold">Languages:</span>{' '}
                {(book.languages?.length > 0 ? book.languages : defaultLanguages).join(', ')}
              </p>
              <p>
                <span className="font-semibold">Downloads:</span>{' '}
                {book.download_count?.toLocaleString() || '0'}
              </p>
            </div>

            {book.formats?.['text/html'] && (
              <a 
                href={book.formats['text/html']} 
                target="_blank" 
                rel="noopener noreferrer"
                className="mt-6 inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                aria-label={`Read ${book.title} online`}
              >
                Read Online
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

BookDetailsPage.propTypes = {
  book: PropTypes.shape({
    id: PropTypes.number,
    title: PropTypes.string,
    authors: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string
    })),
    subjects: PropTypes.arrayOf(PropTypes.string),
    languages: PropTypes.arrayOf(PropTypes.string),
    download_count: PropTypes.number,
    formats: PropTypes.object
  }),
  onBack: PropTypes.func.isRequired
};

export default BookDetailsPage;