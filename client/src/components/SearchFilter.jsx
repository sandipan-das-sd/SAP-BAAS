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
    <div className="bg-gradient-to-r from-blue-50 to-blue-100 shadow-lg rounded-xl p-6 mb-6 border border-blue-100 transition-all duration-300 hover:shadow-xl">
      <div className="flex space-x-4 relative">
        {/* Search Input with Enhanced Styling */}
        <div className="relative flex-grow">
          <input 
            type="text" 
            placeholder="Search orders..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full pl-12 pr-4 py-3 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 ease-in-out text-gray-700 placeholder-gray-400 shadow-sm"
          />
          <Search className="absolute left-4 top-3.5 text-blue-500 animate-pulse" size={22} />
        </div>

        {/* Advanced Filters Toggle with Gradient */}
        <button 
          onClick={() => setIsAdvancedFilterOpen(!isAdvancedFilterOpen)}
          className="bg-gradient-to-r from-blue-500 to-blue-600 text-white px-5 py-3 rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center shadow-md hover:shadow-lg"
        >
          <Filter className="mr-2 animate-bounce" size={20} />
          Filters
        </button>
      </div>

      {/* Advanced Filters Dropdown with Enhanced Animation */}
      {isAdvancedFilterOpen && (
        <div className="mt-6 grid grid-cols-3 gap-6 bg-white rounded-xl shadow-lg p-6 border border-blue-100 animate-slide-in">
          {/* Filters remain the same, but with enhanced styling */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wider">
              Release Status
            </label>
            <select
              name="releaseStatus"
              value={filters.releaseStatus}
              onChange={handleFilterChange}
              className="w-full px-4 py-2.5 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-700"
            >
              <option value="">All Statuses</option>
              <option value="Released">Released</option>
              <option value="Pending">Pending</option>
            </select>
          </div>

          {/* Similar styling for other select dropdowns */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wider">
              Execution Status
            </label>
            <select
              name="executionStatus"
              value={filters.executionStatus}
              onChange={handleFilterChange}
              className="w-full px-4 py-2.5 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-700"
            >
              <option value="">All Statuses</option>
              <option value="Active">Active</option>
              <option value="Completed">Completed</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2 tracking-wider">
              Work Center
            </label>
            <select
              name="workCenter"
              value={filters.workCenter}
              onChange={handleFilterChange}
              className="w-full px-4 py-2.5 border-2 border-blue-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-300 text-gray-700"
            >
              <option value="">All Work Centers</option>
              <option value="ELECTRIC,MECH ANIC,ASSEMBLY, PACKING">
                Electric Mech Assembly
              </option>
            </select>
          </div>

          {/* Filter Action Buttons with Gradient and Animation */}
          <div className="col-span-3 flex justify-end space-x-4 mt-6">
            <button
              onClick={resetFilters}
              className="px-5 py-2.5 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 rounded-lg hover:from-gray-300 hover:to-gray-400 transition-all duration-300 flex items-center shadow-md"
            >
              <X className="inline mr-2" size={18} />
              Clear Filters
            </button>
            <button
              onClick={applyFilters}
              className="px-5 py-2.5 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg"
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