import React from 'react';

const AboutPage = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-6">About BookHub</h1>
        
        <div className="prose prose-lg text-gray-700">
          <p className="mb-6">
            Welcome to BookHub, your gateway to the world's greatest literature. We provide 
            free access to thousands of books through Project Gutenberg, making classic 
            literature and timeless stories available to everyone.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Our Mission</h2>
          <p className="mb-6">
            Our mission is to democratize access to literature and knowledge. We believe 
            that great books should be available to everyone, regardless of their financial 
            situation or location.
          </p>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Features</h2>
          <ul className="list-disc list-inside mb-6 space-y-2">
            <li>Browse thousands of free books</li>
            <li>Search by title, author, or topic</li>
            <li>Save your favorite books</li>
            <li>Read books online or download them</li>
            <li>Mobile-friendly reading experience</li>
          </ul>
          
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">About Project Gutenberg</h2>
          <p>
            Project Gutenberg is a volunteer effort to digitize and archive cultural works. 
            Founded in 1971, it was the first provider of free electronic books. All books 
            in our collection are in the public domain, meaning they are free to read, 
            download, and share.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;