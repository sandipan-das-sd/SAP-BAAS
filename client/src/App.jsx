
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  Users, 
  Bell, 
  Search, 
  LogOut,
  User,
  ChevronDown
} from 'lucide-react';
import OrderTable from './components/OrderTable';
import SearchFilter from './components/SearchFilter';
import { mockOrders } from './data/mockOrders';
import { filterOrders } from './utils/filterOrders';
import Dashboard from './components/Dashboard';
import CustomerPage from './components/CustomerPage';
import { SettingsPage } from './components/Selting';
// Topbar Component with professional UI
const Topbar = () => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  
  return (
    <header className="fixed top-0 left-20 right-0 bg-white shadow-md h-20 flex items-center justify-between px-8 z-40">
      <div className="flex items-center space-x-4 w-full">
        {/* Brand */}
        <div className="hidden md:flex text-2xl font-bold text-blue-800">
          <span>OMS</span>
          <span className="text-gray-600 ml-1">Admin</span>
        </div>
        
        {/* Search Bar */}
        <div className="relative flex-grow max-w-2xl mx-auto">
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

        {/* Right side elements */}
        <div className="flex items-center space-x-5">
          {/* Notification Icon */}
          <div className="relative">
            <button 
              className="text-gray-600 hover:text-blue-600 cursor-pointer focus:outline-none"
              onClick={() => setShowNotifications(!showNotifications)}
            >
              <Bell className="w-6 h-6" />
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
            </button>
            
            {/* Notification dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white rounded-md shadow-lg overflow-hidden z-50">
                <div className="py-2 px-4 bg-blue-50 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h3 className="text-sm font-semibold text-gray-800">Notifications</h3>
                    <span className="text-xs text-blue-600 cursor-pointer">Mark all as read</span>
                  </div>
                </div>
                <div className="max-h-72 overflow-y-auto">
                  <div className="py-2 px-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 mr-3">
                        <Package className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-800">New order received</p>
                        <p className="text-xs text-gray-500">From Acme Corp</p>
                        <p className="text-xs text-gray-400 mt-1">5 minutes ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2 px-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600 mr-3">
                        <Users className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-800">New customer registered</p>
                        <p className="text-xs text-gray-500">TechGiant Inc.</p>
                        <p className="text-xs text-gray-400 mt-1">2 hours ago</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2 px-4 hover:bg-gray-50 cursor-pointer">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600 mr-3">
                        <Bell className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-800">System alert</p>
                        <p className="text-xs text-gray-500">Server CPU usage high</p>
                        <p className="text-xs text-gray-400 mt-1">1 day ago</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="py-2 px-4 bg-gray-50 text-center border-t border-gray-100">
                  <a href="#" className="text-sm text-blue-600 hover:text-blue-800">View all notifications</a>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="relative">
            <button 
              className="flex items-center space-x-2 focus:outline-none"
              onClick={() => setShowProfileMenu(!showProfileMenu)}
            >
              <div 
                className="
                  w-10 h-10 rounded-full 
                  bg-blue-100 
                  flex items-center justify-center 
                  text-blue-600 
                  font-bold
                "
              >
                JD
              </div>
              <div className="hidden md:block text-right">
                <p className="font-semibold text-gray-800">John Doe</p>
                <p className="text-xs text-gray-500">Administrator</p>
              </div>
              <ChevronDown className="w-4 h-4 text-gray-500" />
            </button>
            
            {/* Profile dropdown */}
            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg overflow-hidden z-50">
                <div className="py-3 px-4 border-b border-gray-100">
                  <p className="text-sm font-medium text-gray-800">John Doe</p>
                  <p className="text-xs text-gray-500">john.doe@example.com</p>
                </div>
                <div className="py-1">
                  <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">
                    <User className="w-4 h-4 inline-block mr-2" />
                    My Profile
                  </a>
                  <a href="#" className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100">
                    <Settings className="w-4 h-4 inline-block mr-2" />
                    Settings
                  </a>
                  <a href="#" className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 border-t border-gray-100">
                    <LogOut className="w-4 h-4 inline-block mr-2" />
                    Logout
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

// Enhanced Sidebar Component
const Sidebar = ({ activeMenu, setActiveMenu }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const menuItems = [
    {
      icon: LayoutDashboard,
      label: 'Dashboard',
      active: activeMenu === 'dashboard'
    },
    {
      icon: Package,
      label: 'Orders',
      active: activeMenu === 'orders'
    },
    {
      icon: Users,
      label: 'Customers',
      active: activeMenu === 'customers'
    },
    {
      icon: Settings,
      label: 'Settings',
      active: activeMenu === 'settings'
    }
  ];
  
  return (
    <div
      className={`
        fixed left-0 top-0 h-full 
        bg-gradient-to-b from-blue-900 to-blue-800 
        text-white
        transition-all duration-300 ease-in-out
        z-50 shadow-2xl
        ${isExpanded ? 'w-64' : 'w-20'}
        group
      `}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className="flex flex-col h-full">
        {/* Logo Area */}
        <div className="flex items-center justify-center h-20 border-b border-blue-700 relative">
          <div className="text-2xl font-bold flex items-center">
            {/* Compact Logo */}
            <span
              className={`
                absolute left-1/2 transform -translate-x-1/2
                ${isExpanded ? 'opacity-0' : 'opacity-100'}
                transition-opacity duration-300
              `}
            >
              OMS
            </span>
            
            {/* Full Logo */}
            <span
              className={`
                whitespace-nowrap
                ${isExpanded ? 'opacity-100' : 'opacity-0'}
                transition-opacity duration-300
              `}
            >
              Order Management
            </span>
          </div>
        </div>
        
        {/* Welcome Message */}
        {/* <div 
          className={`
            py-3 px-4 text-center border-b border-blue-700
            ${isExpanded ? 'block' : 'hidden'}
          `}
        >
          <p className="text-sm text-blue-200">Welcome</p>
          <p className="font-medium">John Doe</p>
          <p className="text-xs text-blue-300">Administrator</p>
        </div> */}
        {/* Welcome Message */}
<div 
  className={`
    py-3 px-4 text-center border-b border-blue-700
    ${isExpanded ? 'block' : 'hidden'}
  `}
>
  <div className="flex justify-center mb-2">
    <img 
      src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
      alt="John Doe" 
      className="w-16 h-16 rounded-full border-2 border-white object-cover"
    />
  </div>
  <p className="text-sm text-blue-200">Welcome</p>
  <p className="font-medium">John Doe</p>
  <p className="text-xs text-blue-300">Administrator</p>
</div>
        
        {/* Menu Items */}
        <nav className="flex-grow pt-4">
          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`
                flex items-center px-6 py-4 cursor-pointer 
                transition-all duration-300 
                ${item.active ? 'bg-blue-700 text-white' : 'hover:bg-blue-700'}
                group/item
              `}
              onClick={() => setActiveMenu(item.label.toLowerCase())}
            >
              <item.icon className="w-6 h-6 mr-4 flex-shrink-0" />
              <span
                className={`
                  whitespace-nowrap
                  ${isExpanded ? 'opacity-100 visible' : 'opacity-0 invisible'}
                  transition-all duration-300
                `}
              >
                {item.label}
              </span>
            </div>
          ))}
        </nav>
        
        {/* Logout */}
        <div
          className="
            flex items-center px-6 py-4 
            border-t border-blue-700
            cursor-pointer hover:bg-blue-700
            transition-all duration-300
          "
        >
          <LogOut className="w-6 h-6 mr-4 flex-shrink-0" />
          <span
            className={`
              whitespace-nowrap
              ${isExpanded ? 'opacity-100 visible' : 'opacity-0 invisible'}
              transition-all duration-300
            `}
          >
            Logout
          </span>
        </div>
      </div>
    </div>
  );
};

function App() {
  const [activeMenu, setActiveMenu] = useState('customers');
  const [orders, setOrders] = useState(mockOrders);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    releaseStatus: '',
    executionStatus: '',
    workCenter: ''
  });

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

            {/* Order Table */}
            <OrderTable
              orders={filteredOrders}
              onFilterChange={() => {/* Optional: additional filter logic */}}
            />
          </>
        );
      case 'customers':
        return <CustomerPage />;
      case 'settings':
        return (
          <SettingsPage/>
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
            <p>© 2025 Order Management System. Powered by SAP DMC.</p>
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