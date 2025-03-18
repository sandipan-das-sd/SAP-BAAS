import React, { useState } from 'react';
import { Search } from 'lucide-react';

const CustomerSearch = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-6 mb-8">
      <div className="flex flex-col md:flex-row md:items-center">
        <label className="text-sm font-medium text-gray-700 mb-2 md:mb-0 md:mr-4">
          Customer Name:
        </label>
        <div className="relative flex-grow max-w-md">
          <input 
            type="text" 
            placeholder="Search by customer name..."
            className="
              w-full pl-10 pr-4 py-2 
              border border-gray-300 rounded-md 
              focus:ring-2 focus:ring-blue-500 
              transition-all duration-300
            "
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
        </div>
        <button 
          type="submit"
          className="mt-2 md:mt-0 md:ml-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors duration-300"
        >
          Search
        </button>
      </div>
    </form>
  );
};

export default CustomerSearch;