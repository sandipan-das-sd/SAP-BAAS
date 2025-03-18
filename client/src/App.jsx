

import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  Users, 
  Menu, 
  Bell, 
  Search, 
  LogOut 
} from 'lucide-react';
import OrderTable from './components/OrderTable';
import SearchFilter from './components/SearchFilter';
import CustomerTable from './components/CustomerTable'; // Import the CustomerTable component
import { mockOrders } from './data/mockOrders';
import { filterOrders } from './utils/filterOrders';
import Sidebar from './components/Slidebar';
import Dashboard from './components/Dashboard';

// Topbar Component
const Topbar = () => {
  return (
    <header className="fixed top-0 left-20 right-0 bg-white shadow-md h-20 flex items-center justify-between px-8 z-40">
      <div className="flex items-center space-x-4 w-full">
        {/* Search Bar */}
        <div className="relative flex-grow max-w-2xl">
          <input 
            type="text" 
            placeholder="Search orders, customers, reports..."
            className="
              w-full pl-12 pr-4 py-3 
              border border-gray-300 rounded-full 
              focus:ring-2 focus:ring-blue-500 
              transition-all duration-300
            "
          />
          <Search className="absolute left-4 top-3.5 text-gray-400" />
        </div>

        {/* Notification Icon */}
        <div className="relative">
          <Bell className="text-gray-600 hover:text-blue-600 cursor-pointer" />
          <span 
            className="
              absolute -top-2 -right-2 
              bg-red-500 text-white 
              rounded-full 
              w-5 h-5 
              flex items-center justify-center 
              text-xs
            "
          >
            3
          </span>
        </div>

        {/* User Profile */}
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <p className="font-semibold text-gray-800">John Doe</p>
            <p className="text-sm text-gray-500">Admin</p>
          </div>
          <div 
            className="
              w-12 h-12 rounded-full 
              bg-blue-100 
              flex items-center justify-center 
              text-blue-600 
              font-bold
            "
          >
            JD
          </div>
        </div>
      </div>
    </header>
  );
};

function App() {
  const [activeMenu, setActiveMenu] = useState('orders');
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    releaseStatus: '',
    executionStatus: '',
    workCenter: ''
  });

  // Mock customer data
  const mockCustomers = [
    { 
      id: 'CUST-001', 
      name: 'Acme Corp', 
      email: 'contact@acmecorp.com',
      creditLimit: 50000, 
      creditLimitCurrency: 'USD', 
      currentBalance: 32500 
    },
    { 
      id: 'CUST-002', 
      name: 'TechGiant', 
      email: 'info@techgiant.com',
      creditLimit: 75000, 
      creditLimitCurrency: 'EUR', 
      currentBalance: 45600 
    },
    { 
      id: 'CUST-003', 
      name: 'Global Industries', 
      email: 'support@globalind.com',
      creditLimit: 100000, 
      creditLimitCurrency: 'JPY', 
      currentBalance: 67800 
    },
    { 
      id: 'CUST-004', 
      name: 'Innovative Solutions', 
      email: 'help@innosolutions.com',
      creditLimit: 65000, 
      creditLimitCurrency: 'GBP', 
      currentBalance: 28900 
    },
    { 
      id: 'CUST-005', 
      name: 'Prime Systems', 
      email: 'sales@primesystems.com',
      creditLimit: 45000, 
      creditLimitCurrency: 'CAD', 
      currentBalance: 15700 
    },
  ];

  // Handler functions for customer actions
  const handleViewCustomer = (id) => {
    console.log('View customer', id);
    // Add your view customer logic here
  };

  const handleEditCustomer = (id) => {
    console.log('Edit customer', id);
    // Add your edit customer logic here
  };

  const handleDeleteCustomer = (id) => {
    console.log('Delete customer', id);
    // Add your delete customer logic here
  };

  // Memoized filtered orders
  const filteredOrders = React.useMemo(() => {
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

  // Render content based on active menu
  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard':
        return <Dashboard />;
      case 'orders':
        return (
          <>
            {/* Page Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Order Management
              </h1>
              <p className="text-gray-600">
                Track and manage your manufacturing orders efficiently
              </p>
            </div>

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
          </>
        );
      case 'customers':
        return (
          <>
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Customer Management
              </h1>
              <p className="text-gray-600">
                View and manage your customer accounts
              </p>
            </div>
            
            {/* Simple Search for Customers */}
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              <div className="flex items-center">
                <label className="text-sm font-medium text-gray-700 mr-4">
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
                  />
                  <Search className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
                </div>
                <button className="ml-4 bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors duration-300">
                  Search
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <div className="flex flex-wrap gap-3">
                <button className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-md flex items-center transition-colors duration-300">
                  <Users className="w-5 h-5 mr-2" />
                  Create New Customer
                </button>
                <button className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md flex items-center transition-colors duration-300">
                  <Menu className="w-5 h-5 mr-2" />
                  Modify Customer
                </button>
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-6 rounded-md flex items-center transition-colors duration-300">
                  <Menu className="w-5 h-5 mr-2" />
                  View Customer
                </button>
              </div>
            </div>
            
            {/* Customer Table */}
            <CustomerTable 
              customers={mockCustomers}
              onViewCustomer={handleViewCustomer}
              onEditCustomer={handleEditCustomer}
              onDeleteCustomer={handleDeleteCustomer}
            />
          </>
        );
      case 'settings':
        return (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Settings
            </h1>
            <p className="text-gray-600">
              Configure your application settings
            </p>
          </div>
        );
      default:
        return (
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              Page Not Found
            </h1>
            <p className="text-gray-600">
              The page you're looking for doesn't exist.
            </p>
          </div>
        );
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar activeMenu={activeMenu} setActiveMenu={setActiveMenu} />

      {/* Main Content Area */}
      <div className="ml-20 flex-grow">
        {/* Topbar */}
        <Topbar />

        {/* Main Content */}
        <main className="pt-32 px-8 pb-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>

        {/* Footer */}
        <footer className="ml-0 bg-white shadow-inner py-6">
          <div className="max-w-7xl mx-auto px-8 text-center text-gray-500">
            <p>© 2025 Order Management System. Powered by Advanced Technologies.</p>
            <div className="mt-2 space-x-4 text-sm">
              <a href="#" className="hover:text-blue-600 transition">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600 transition">Terms of Service</a>
              <a href="#" className="hover:text-blue-600 transition">Contact Support</a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}

export default App;