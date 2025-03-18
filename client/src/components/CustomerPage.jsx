import React, { useState, useEffect } from 'react';
import { 
  Users, Menu, Eye, Edit, X, Plus, Search, 
  Mail, Phone, MapPin, Building, Clock, Hash 
} from 'lucide-react';
import CustomerTable from './CustomerTable';
import CustomerSearch from './CustomerSearch';

const CustomerPage = () => {
  // Mock customer data
  const mockCustomersData = [
    { 
      id: 'CUST-001', 
      name: 'Acme Corp', 
      email: 'contact@acmecorp.com',
      phone: '+1 (555) 123-4567',
      address: '123 Business Ave, San Francisco, CA 94107',
      industry: 'Manufacturing',
      joinDate: '2022-03-15',
      creditLimit: 50000, 
      creditLimitCurrency: 'USD', 
      currentBalance: 32500 
    },
    { 
      id: 'CUST-002', 
      name: 'TechGiant', 
      email: 'info@techgiant.com',
      phone: '+1 (555) 987-6543',
      address: '456 Innovation Blvd, Seattle, WA 98101',
      industry: 'Technology',
      joinDate: '2021-08-22',
      creditLimit: 75000, 
      creditLimitCurrency: 'EUR', 
      currentBalance: 45600 
    },
    { 
      id: 'CUST-003', 
      name: 'Global Industries', 
      email: 'support@globalind.com',
      phone: '+44 20 7123 4567',
      address: '789 World St, London, UK E1 6AN',
      industry: 'Industrial',
      joinDate: '2023-01-10',
      creditLimit: 100000, 
      creditLimitCurrency: 'GBP', 
      currentBalance: 67800 
    },
    { 
      id: 'CUST-004', 
      name: 'Innovative Solutions', 
      email: 'help@innosolutions.com',
      phone: '+1 (555) 765-4321',
      address: '101 Smart Drive, Boston, MA 02110',
      industry: 'Consulting',
      joinDate: '2021-11-05',
      creditLimit: 65000, 
      creditLimitCurrency: 'USD', 
      currentBalance: 28900 
    },
    { 
      id: 'CUST-005', 
      name: 'Prime Systems', 
      email: 'sales@primesystems.com',
      phone: '+1 (555) 321-9876',
      address: '202 Tech Park, Austin, TX 78701',
      industry: 'Software',
      joinDate: '2022-07-18',
      creditLimit: 45000, 
      creditLimitCurrency: 'USD', 
      currentBalance: 15700 
    },
  ];

  const [customers, setCustomers] = useState(mockCustomersData);
  const [filteredCustomers, setFilteredCustomers] = useState(mockCustomersData);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newCustomerData, setNewCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    industry: '',
    creditLimit: 0,
    creditLimitCurrency: 'USD',
  });
  const [editCustomerData, setEditCustomerData] = useState({});

  // Handle search
  const handleSearch = (term) => {
    if (!term) {
      setFilteredCustomers(customers);
    } else {
      const filtered = customers.filter(
        customer => customer.name.toLowerCase().includes(term.toLowerCase())
      );
      setFilteredCustomers(filtered);
    }
  };

  // Handle view customer
  const handleViewCustomer = (id) => {
    const customer = customers.find(c => c.id === id);
    setSelectedCustomer(customer);
    setShowViewModal(true);
  };

  // Handle edit customer
  const handleEditCustomer = (id) => {
    const customer = customers.find(c => c.id === id);
    setSelectedCustomer(customer);
    setEditCustomerData(customer);
    setShowEditModal(true);
  };

  // Handle delete customer
  const handleDeleteCustomer = (id) => {
    const updatedCustomers = customers.filter(c => c.id !== id);
    setCustomers(updatedCustomers);
    setFilteredCustomers(updatedCustomers);
  };

  // Handle create new customer
  const handleCreateCustomer = () => {
    setShowCreateModal(true);
  };

  // Save new customer
  const saveNewCustomer = () => {
    const newId = `CUST-${String(customers.length + 1).padStart(3, '0')}`;
    const newCustomer = {
      id: newId,
      name: newCustomerData.name,
      email: newCustomerData.email,
      phone: newCustomerData.phone,
      address: newCustomerData.address,
      industry: newCustomerData.industry,
      joinDate: new Date().toISOString().split('T')[0],
      creditLimit: parseFloat(newCustomerData.creditLimit),
      creditLimitCurrency: newCustomerData.creditLimitCurrency,
      currentBalance: 0
    };
    
    const updatedCustomers = [...customers, newCustomer];
    setCustomers(updatedCustomers);
    setFilteredCustomers(updatedCustomers);
    setShowCreateModal(false);
    setNewCustomerData({
      name: '',
      email: '',
      phone: '',
      address: '',
      industry: '',
      creditLimit: 0,
      creditLimitCurrency: 'USD',
    });
  };

  // Save edited customer
  const saveEditedCustomer = () => {
    const updatedCustomers = customers.map(c => 
      c.id === selectedCustomer.id ? { ...c, ...editCustomerData } : c
    );
    setCustomers(updatedCustomers);
    setFilteredCustomers(updatedCustomers);
    setShowEditModal(false);
  };

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
      
      {/* Customer Search */}
      <CustomerSearch onSearch={handleSearch} />
      
      {/* Action Buttons */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <div className="flex flex-wrap gap-3">
          <button 
            className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-6 rounded-md flex items-center transition-colors duration-300"
            onClick={handleCreateCustomer}
          >
            <Plus className="w-5 h-5 mr-2" />
            Create New Customer
          </button>
          <button 
            className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md flex items-center transition-colors duration-300"
            onClick={() => {
              const selectedIds = document.querySelectorAll('input[type="checkbox"]:checked');
              if (selectedIds.length === 1) {
                handleEditCustomer(selectedIds[0].value);
              } else {
                alert('Please select exactly one customer to modify');
              }
            }}
          >
            <Edit className="w-5 h-5 mr-2" />
            Modify Customer
          </button>
          <button 
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-6 rounded-md flex items-center transition-colors duration-300"
            onClick={() => {
              const selectedIds = document.querySelectorAll('input[type="checkbox"]:checked');
              if (selectedIds.length === 1) {
                handleViewCustomer(selectedIds[0].value);
              } else {
                alert('Please select exactly one customer to view');
              }
            }}
          >
            <Eye className="w-5 h-5 mr-2" />
            View Customer
          </button>
        </div>
      </div>
      
      {/* Customer Table */}
      <CustomerTable 
        customers={filteredCustomers}
        onViewCustomer={handleViewCustomer}
        onEditCustomer={handleEditCustomer}
        onDeleteCustomer={handleDeleteCustomer}
      />

      {/* View Customer Modal */}
      {showViewModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <div className="border-b px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">Customer Details</h3>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowViewModal(false)}
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="flex items-center mb-6">
                <div className="h-16 w-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 font-bold text-2xl mr-4">
                  {selectedCustomer.name.charAt(0)}
                </div>
                <div>
                  <h4 className="text-xl font-bold text-gray-900">{selectedCustomer.name}</h4>
                  <p className="text-gray-500">Customer ID: {selectedCustomer.id}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Email Address</p>
                    <p className="text-gray-800">{selectedCustomer.email}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Phone Number</p>
                    <p className="text-gray-800">{selectedCustomer.phone}</p>
                  </div>
                </div>
                <div className="flex items-start md:col-span-2">
                  <MapPin className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Address</p>
                    <p className="text-gray-800">{selectedCustomer.address}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Building className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Industry</p>
                    <p className="text-gray-800">{selectedCustomer.industry}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="w-5 h-5 text-gray-500 mr-3 mt-0.5" />
                  <div>
                    <p className="text-sm text-gray-500">Join Date</p>
                    <p className="text-gray-800">{selectedCustomer.joinDate}</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg">
                <h5 className="font-semibold text-gray-800 mb-4">Financial Information</h5>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-white p-4 rounded-md border border-gray-200">
                    <p className="text-sm text-gray-500 mb-1">Credit Limit</p>
                    <p className="text-xl font-bold text-gray-800">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: selectedCustomer.creditLimitCurrency
                      }).format(selectedCustomer.creditLimit)}
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-md border border-gray-200">
                    <p className="text-sm text-gray-500 mb-1">Current Balance</p>
                    <p className="text-xl font-bold text-gray-800">
                      {new Intl.NumberFormat('en-US', {
                        style: 'currency',
                        currency: selectedCustomer.creditLimitCurrency
                      }).format(selectedCustomer.currentBalance)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t px-6 py-4 flex justify-end">
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors duration-300"
                onClick={() => setShowViewModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Create Customer Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <div className="border-b px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">Create New Customer</h3>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowCreateModal(false)}
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    value={newCustomerData.name}
                    onChange={(e) => setNewCustomerData({...newCustomerData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    value={newCustomerData.email}
                    onChange={(e) => setNewCustomerData({...newCustomerData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    value={newCustomerData.phone}
                    onChange={(e) => setNewCustomerData({...newCustomerData, phone: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    value={newCustomerData.address}
                    onChange={(e) => setNewCustomerData({...newCustomerData, address: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Industry
                  </label>
                  <select
                    className="w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    value={newCustomerData.industry}
                    onChange={(e) => setNewCustomerData({...newCustomerData, industry: e.target.value})}
                  >
                    <option value="">Select Industry</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Technology">Technology</option>
                    <option value="Retail">Retail</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Software">Software</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Credit Limit
                  </label>
                  <div className="flex">
                    <input
                      type="number"
                      className="w-2/3 rounded-l-md border-gray-300 shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                      value={newCustomerData.creditLimit}
                      onChange={(e) => setNewCustomerData({...newCustomerData, creditLimit: e.target.value})}
                    />
                    <select
                      className="w-1/3 rounded-r-md border-gray-300 shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                      value={newCustomerData.creditLimitCurrency}
                      onChange={(e) => setNewCustomerData({...newCustomerData, creditLimitCurrency: e.target.value})}
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="JPY">JPY</option>
                      <option value="CAD">CAD</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className="border-t px-6 py-4 flex justify-end space-x-3">
              <button 
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-6 rounded-md transition-colors duration-300"
                onClick={() => setShowCreateModal(false)}
              >
                Cancel
              </button>
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors duration-300"
                onClick={saveNewCustomer}
              >
                Create Customer
              </button>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Customer Modal */}
      {showEditModal && selectedCustomer && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4">
            <div className="border-b px-6 py-4 flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">Edit Customer</h3>
              <button 
                className="text-gray-500 hover:text-gray-700"
                onClick={() => setShowEditModal(false)}
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Customer Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    value={editCustomerData.name || ''}
                    onChange={(e) => setEditCustomerData({...editCustomerData, name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    value={editCustomerData.email || ''}
                    onChange={(e) => setEditCustomerData({...editCustomerData, email: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    value={editCustomerData.phone || ''}
                    onChange={(e) => setEditCustomerData({...editCustomerData, phone: e.target.value})}
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Address
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    value={editCustomerData.address || ''}
                    onChange={(e) => setEditCustomerData({...editCustomerData, address: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Industry
                  </label>
                  <select
                    className="w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    value={editCustomerData.industry || ''}
                    onChange={(e) => setEditCustomerData({...editCustomerData, industry: e.target.value})}
                  >
                    <option value="">Select Industry</option>
                    <option value="Manufacturing">Manufacturing</option>
                    <option value="Technology">Technology</option>
                    <option value="Retail">Retail</option>
                    <option value="Healthcare">Healthcare</option>
                    <option value="Finance">Finance</option>
                    <option value="Software">Software</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Industrial">Industrial</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Credit Limit
                  </label>
                  <div className="flex">
                    <input
                      type="number"
                      className="w-2/3 rounded-l-md border-gray-300 shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                      value={editCustomerData.creditLimit || 0}
                      onChange={(e) => setEditCustomerData({...editCustomerData, creditLimit: parseFloat(e.target.value)})}
                    />
                    <select
                      className="w-1/3 rounded-r-md border-gray-300 shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                      value={editCustomerData.creditLimitCurrency || 'USD'}
                      onChange={(e) => setEditCustomerData({...editCustomerData, creditLimitCurrency: e.target.value})}
                    >
                      <option value="USD">USD</option>
                      <option value="EUR">EUR</option>
                      <option value="GBP">GBP</option>
                      <option value="JPY">JPY</option>
                      <option value="CAD">CAD</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Current Balance
                  </label>
                  <input
                    type="number"
                    className="w-full rounded-md border-gray-300 shadow-sm py-2 px-3 focus:ring-blue-500 focus:border-blue-500"
                    value={editCustomerData.currentBalance || 0}
                    onChange={(e) => setEditCustomerData({...editCustomerData, currentBalance: parseFloat(e.target.value)})}
                  />
                </div>
              </div>
            </div>
            <div className="border-t px-6 py-4 flex justify-end space-x-3">
              <button 
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 px-6 rounded-md transition-colors duration-300"
                onClick={() => setShowEditModal(false)}
              >
                Cancel
              </button>
              <button 
                className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-6 rounded-md transition-colors duration-300"
                onClick={saveEditedCustomer}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomerPage;