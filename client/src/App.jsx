import React, { useState, useMemo } from 'react';
import OrderTable from './components/OrderTable';
import SearchFilter from './components/SearchFilter';
import { mockOrders } from './data/mockOrders';
import { filterOrders } from './utils/filterOrders';

function App() {
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    releaseStatus: '',
    executionStatus: '',
    workCenter: ''
  });

  // Memoized filtered orders
  const filteredOrders = useMemo(() => {
    return filterOrders(mockOrders, searchTerm, filters);
  }, [searchTerm, filters]);

  // Handle search
  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  // Handle filter application
  const handleFilterApply = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <header className="mb-6">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Order Management System
          </h1>
          <p className="text-gray-600">
            Manage and track your manufacturing orders efficiently
          </p>
        </header>

        {/* Search and Filters */}
        <SearchFilter 
          onSearch={handleSearch}
          onFilterApply={handleFilterApply}
          initialFilters={filters}
        />

        {/* Order Table */}
        <OrderTable 
          orders={filteredOrders}
          onFilterChange={() => {/* Optional: additional filter logic */}}
        />

        {/* Footer */}
        <footer className="mt-8 text-center text-gray-500">
          <p>© 2025 Order Management System. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
}

export default App;