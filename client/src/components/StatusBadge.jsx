import React from 'react';

const StatusBadge = ({ status }) => {
  const statusStyles = {
    'Active': {
      bg: 'bg-gradient-to-r from-blue-200 to-blue-300',
      text: 'text-blue-900',
      pulse: 'animate-pulse'
    },
    'Completed': {
      bg: 'bg-gradient-to-r from-green-200 to-green-300',
      text: 'text-green-900',
      pulse: ''
    },
    'Pending': {
      bg: 'bg-gradient-to-r from-yellow-200 to-yellow-300',
      text: 'text-yellow-900',
      pulse: 'animate-pulse'
    },
    'Cancelled': {
      bg: 'bg-gradient-to-r from-red-200 to-red-300',
      text: 'text-red-900',
      pulse: ''
    }
  };

  const statusConfig = statusStyles[status] || {
    bg: 'bg-gradient-to-r from-gray-200 to-gray-300',
    text: 'text-gray-900',
    pulse: ''
  };

  return (
    <span
      className={`
        px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider 
        inline-flex items-center space-x-1.5
        ${statusConfig.bg} 
        ${statusConfig.text} 
        ${statusConfig.pulse}
        shadow-md
        transition-all duration-300 
        transform hover:scale-105 hover:shadow-lg
      `}
    >
      {status}
    </span>
  );
};

export default StatusBadge;