import React from 'react';

const StatusBadge = ({ status }) => {
  const statusStyles = {
    'Active': 'bg-blue-100 text-blue-800',
    'Completed': 'bg-green-100 text-green-800',
    'Pending': 'bg-yellow-100 text-yellow-800',
    'Cancelled': 'bg-red-100 text-red-800'
  };

  return (
    <span 
      className={`px-2 py-1 rounded-full text-xs font-medium inline-flex items-center 
        ${statusStyles[status] || 'bg-gray-100 text-gray-800'} 
        transition-all duration-300 ease-in-out transform hover:scale-105`}
    >
      {status}
    </span>
  );
};

export default StatusBadge;