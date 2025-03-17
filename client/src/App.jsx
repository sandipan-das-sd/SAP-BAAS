
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
import { mockOrders } from './data/mockOrders';
import { filterOrders } from './utils/filterOrders';
import Sidebar from './components/Slidebar';
// // Sidebar Component
// const Sidebar = ({ activeMenu, setActiveMenu }) => {
//   const menuItems = [
//     { 
//       icon: LayoutDashboard, 
//       label: 'Dashboard', 
//       active: activeMenu === 'dashboard' 
//     },
//     { 
//       icon: Package, 
//       label: 'Orders', 
//       active: activeMenu === 'orders' 
//     },
//     { 
//       icon: Users, 
//       label: 'Customers', 
//       active: activeMenu === 'customers' 
//     },
//     { 
//       icon: Settings, 
//       label: 'Settings', 
//       active: activeMenu === 'settings' 
//     }
//   ];

//   return (
//     <div className="fixed left-0 top-0 h-full w-20 hover:w-64 group bg-gradient-to-b from-blue-900 to-blue-800 text-white transition-all duration-300 ease-in-out z-50 shadow-2xl">
//       <div className="flex flex-col h-full">
//         {/* Logo Area */}
//         <div className="flex items-center justify-center h-20 border-b border-blue-700">
//           <div className="text-2xl font-bold flex items-center">
//             <span className="group-hover:hidden">OMS</span>
//             <span className="hidden group-hover:inline">Order Management</span>
//           </div>
//         </div>

//         {/* Menu Items */}
//         <nav className="flex-grow pt-8">
//           {menuItems.map((item, index) => (
//             <div 
//               key={index}
//               className={`
//                 flex items-center px-6 py-4 cursor-pointer 
//                 transition-all duration-300 
//                 ${item.active ? 'bg-blue-700 text-white' : 'hover:bg-blue-700'}
//               `}
//               onClick={() => setActiveMenu(item.label.toLowerCase())}
//             >
//               <item.icon className="w-6 h-6 mr-4" />
//               <span className="hidden group-hover:inline">{item.label}</span>
//             </div>
//           ))}
//         </nav>

//         {/* Logout */}
//         <div 
//           className="
//             flex items-center px-6 py-4 
//             border-t border-blue-700 
//             cursor-pointer hover:bg-blue-700
//             transition-all duration-300
//           "
//         >
//           <LogOut className="w-6 h-6 mr-4" />
//           <span className="hidden group-hover:inline">Logout</span>
//         </div>
//       </div>
//     </div>
//   );
// };

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