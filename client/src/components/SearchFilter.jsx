import React, { useState } from 'react';
import { Search, Filter, X } from 'lucide-react';

const SearchFilter = ({ onSearch, onFilterApply, initialFilters }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState(initialFilters || {
    releaseStatus: '',
    executionStatus: '',
    workCenter: ''
  });
  const [isAdvancedFilterOpen, setIsAdvancedFilterOpen] = useState(false);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const applyFilters = () => {
    onFilterApply(filters);
    setIsAdvancedFilterOpen(false);
  };

  const resetFilters = () => {
    const resetState = {
      releaseStatus: '',
      executionStatus: '',
      workCenter: ''
    };
    setFilters(resetState);
    onFilterApply(resetState);
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mb-4">
      <div className="flex space-x-4">
        {/* Search Input */}
        <div className="relative flex-grow">
          <input 
            type="text" 
            placeholder="Search orders..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 transition"
          />
          <Search className="absolute left-3 top-3 text-gray-400" size={20} />
        </div>

        {/* Advanced Filters Toggle */}
        <button 
          onClick={() => setIsAdvancedFilterOpen(!isAdvancedFilterOpen)}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition flex items-center"
        >
          <Filter className="mr-2" size={18} />
          Filters
        </button>
      </div>

      {/* Advanced Filters Dropdown */}
      {isAdvancedFilterOpen && (
        <div className="mt-4 grid grid-cols-3 gap-4 bg-gray-50 p-4 rounded-md animate-fade-in">
          {/* Release Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Release Status
            </label>
            <select
              name="releaseStatus"
              value={filters.releaseStatus}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="Released">Released</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* Execution Status Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Execution Status
            </label>
            <select
              name="executionStatus"
              value={filters.executionStatus}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          {/* Work Center Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Work Center
            </label>
            <select
              name="workCenter"
              value={filters.workCenter}
              onChange={handleFilterChange}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Work Centers</option>
              <option value="ELECTRIC,MECH ANIC,ASSEMBLY, PACKING">
                Electric Mech Assembly
              </option>
              {/* Add more work center options */}
            </select>
          </div>

          {/* Filter Action Buttons */}
          <div className="col-span-3 flex justify-end space-x-3 mt-4">
            <button
              onClick={resetFilters}
              className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
            >
              <X className="inline mr-2" size={18} />
              Clear Filters
            </button>
            <button
              onClick={applyFilters}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
            >
              Apply Filters
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchFilter;