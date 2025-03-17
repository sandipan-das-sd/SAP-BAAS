import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  Package, 
  Settings, 
  Users, 
  Menu, 
  LogOut 
} from 'lucide-react';

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

        {/* Menu Items */}
        <nav className="flex-grow pt-8">
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

export default Sidebar;