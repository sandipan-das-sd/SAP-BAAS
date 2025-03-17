// import React, { useState } from 'react';
// import { Eye, ChevronDown, ChevronUp, Filter } from 'lucide-react';
// import StatusBadge from './StatusBadge';
// import OrderDetailModal from './OrderModal';

// const OrderTable = ({ orders, onFilterChange }) => {
//   const [selectedOrder, setSelectedOrder] = useState(null);
//   const [sortConfig, setSortConfig] = useState({ 
//     key: 'orderId', 
//     direction: 'ascending' 
//   });

//   const sortedOrders = React.useMemo(() => {
//     let sortableOrders = [...orders];
//     if (sortConfig.key) {
//       sortableOrders.sort((a, b) => {
//         if (a[sortConfig.key] < b[sortConfig.key]) {
//           return sortConfig.direction === 'ascending' ? -1 : 1;
//         }
//         if (a[sortConfig.key] > b[sortConfig.key]) {
//           return sortConfig.direction === 'ascending' ? 1 : -1;
//         }
//         return 0;
//       });
//     }
//     return sortableOrders;
//   }, [orders, sortConfig]);

//   const requestSort = (key) => {
//     let direction = 'ascending';
//     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     }
//     setSortConfig({ key, direction });
//   };

//   const renderSortIcon = (key) => {
//     if (sortConfig.key !== key) return null;
//     return sortConfig.direction === 'ascending' 
//       ? <ChevronUp className="inline ml-1 text-blue-500" size={16} />
//       : <ChevronDown className="inline ml-1 text-blue-500" size={16} />
//   };

//   return (
//     <div className="bg-white shadow-lg rounded-lg overflow-hidden">
//       <div className="p-4 bg-gray-50 flex justify-between items-center">
//         <h2 className="text-xl font-semibold text-gray-800">Order Management</h2>
//         <div className="flex items-center space-x-2">
//           <button 
//             className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition flex items-center"
//             onClick={() => onFilterChange()}
//           >
//             <Filter className="mr-2" size={18} />
//             Advanced Filters
//           </button>
//         </div>
//       </div>
//       <div className="overflow-x-auto">
//         <table className="w-full">
//           <thead className="bg-gray-100 border-b">
//             <tr>
//               {[
//                 { key: 'orderId', label: 'Order ID' },
//                 { key: 'workCenter', label: 'Work Center' },
//                 { key: 'material', label: 'Material' },
//                 { key: 'executionStatus', label: 'Status' },
//                 { key: 'deliveredQuantity', label: 'Quantity' },
//                 { label: 'Actions' }
//               ].map((header) => (
//                 <th 
//                   key={header.label}
//                   onClick={() => header.key && requestSort(header.key)}
//                   className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider 
//                     ${header.key ? 'cursor-pointer hover:bg-gray-200' : ''}`}
//                 >
//                   {header.label}
//                   {header.key && renderSortIcon(header.key)}
//                 </th>
//               ))}
//             </tr>
//           </thead>
//           <tbody className="divide-y divide-gray-200">
//             {sortedOrders.map((order) => (
//               <tr 
//                 key={order.orderId} 
//                 className="hover:bg-gray-50 transition duration-150 ease-in-out"
//               >
//                 <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
//                   {order.orderId}
//                 </td>
//                 <td className="px-4 py-4 text-sm text-gray-500">
//                   {order.workCenter}
//                 </td>
//                 <td className="px-4 py-4 text-sm text-gray-500">
//                   {order.material}
//                 </td>
//                 <td className="px-4 py-4">
//                   <StatusBadge status={order.executionStatus} />
//                 </td>
//                 <td className="px-4 py-4 text-sm text-gray-500">
//                   {order.deliveredQuantity}
//                 </td>
//                 <td className="px-4 py-4">
//                   <button 
//                     onClick={() => setSelectedOrder(order)}
//                     className="text-blue-600 hover:text-blue-800 transition flex items-center"
//                   >
//                     <Eye className="mr-1" size={16} />
//                     Details
//                   </button>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>
      
//       {/* Order Detail Modal */}
//       {selectedOrder && (
//         <OrderDetailModal 
//           order={selectedOrder} 
//           onClose={() => setSelectedOrder(null)} 
//         />
//       )}
//     </div>
//   );
// };

// export default OrderTable;

import React, { useState, useMemo } from 'react';
import { 
  ChevronUp, ChevronDown, Eye, 
  ChevronLeft, ChevronRight, 
  ChevronsLeft, ChevronsRight 
} from 'lucide-react';
import StatusBadge from './StatusBadge';
import OrderDetailModal from './OrderModal';

const OrderTable = ({ orders, onFilterChange }) => {
  // State for sorting, pagination, and modal
  const [sortConfig, setSortConfig] = useState({
    key: 'orderId',
    direction: 'ascending'
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const itemsPerPage = 10; // Number of items per page

  // Sorting function
  const sortedOrders = useMemo(() => {
    return [...orders].sort((a, b) => {
      if (a[sortConfig.key] < b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? -1 : 1;
      }
      if (a[sortConfig.key] > b[sortConfig.key]) {
        return sortConfig.direction === 'ascending' ? 1 : -1;
      }
      return 0;
    });
  }, [orders, sortConfig]);

  // Pagination
  const paginatedOrders = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedOrders.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedOrders, currentPage]);

  // Pagination calculations
  const totalPages = Math.ceil(orders.length / itemsPerPage);

  // Sort handler
  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev.key === key && prev.direction === 'ascending' 
        ? 'descending' 
        : 'ascending'
    }));
    setCurrentPage(1); // Reset to first page when sorting
  };

  // Pagination handlers
  const goToFirstPage = () => setCurrentPage(1);
  const goToLastPage = () => setCurrentPage(totalPages);
  const goToPreviousPage = () => setCurrentPage(Math.max(1, currentPage - 1));
  const goToNextPage = () => setCurrentPage(Math.min(totalPages, currentPage + 1));

  // Order details handler
  const openOrderDetails = (order) => {
    setSelectedOrder(order);
  };

  const closeOrderDetails = () => {
    setSelectedOrder(null);
  };

  // Sort icon component
  const SortIcon = ({ isActive, direction }) => {
    if (!isActive) return null;
    return direction === 'ascending' 
      ? <ChevronUp className="inline ml-1 text-blue-500" size={16} /> 
      : <ChevronDown className="inline ml-1 text-blue-500" size={16} />;
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200">
      <div className="overflow-x-auto">
        <table className="w-full divide-y divide-gray-200">
          <thead className="bg-gradient-to-r from-blue-50 to-blue-100">
            <tr>
              {[
                { key: 'orderId', label: 'ORDER ID' },
                { key: 'workCenter', label: 'WORK CENTER' },
                { key: 'material', label: 'MATERIAL' },
                { key: 'executionStatus', label: 'STATUS' },
                { key: 'orderQuantity', label: 'QUANTITY' },
                { label: 'ACTIONS' }
              ].map(({ key, label }) => (
                <th 
                  key={label}
                  className={`
                    px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider
                    ${key ? 'cursor-pointer hover:bg-blue-200 transition-colors' : ''}
                  `}
                  onClick={() => key && handleSort(key)}
                >
                  <span className="flex items-center">
                    {label}
                    {key && (
                      <SortIcon 
                        isActive={sortConfig.key === key} 
                        direction={sortConfig.key === key ? sortConfig.direction : null} 
                      />
                    )}
                  </span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200 bg-white">
            {paginatedOrders.map((order, index) => (
              <tr 
                key={order.orderId} 
                className={`
                  hover:bg-blue-50 transition-colors duration-200
                  ${index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                `}
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.orderId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.workCenter}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.material}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <StatusBadge status={order.executionStatus} />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {order.orderQuantity}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => openOrderDetails(order)}
                    className="
                      text-blue-600 hover:text-blue-900 
                      bg-blue-50 hover:bg-blue-100 
                      p-2 rounded-full 
                      transition-all duration-300 
                      flex items-center justify-center
                      group
                    "
                    title="View Details"
                  >
                    <Eye 
                      className="
                        group-hover:scale-110 
                        group-hover:rotate-6 
                        transition-transform 
                        duration-300
                      " 
                      size={20} 
                    />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Pagination Controls */}
      <div className="bg-gray-50 px-6 py-4 flex justify-between items-center">
        <span className="text-sm text-gray-700">
          Showing {(currentPage - 1) * itemsPerPage + 1} - {Math.min(currentPage * itemsPerPage, orders.length)} of {orders.length} orders
        </span>
        <div className="flex items-center space-x-2">
          <button
            onClick={goToFirstPage}
            disabled={currentPage === 1}
            className="
              p-2 rounded-full 
              hover:bg-blue-100 
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300
            "
          >
            <ChevronsLeft size={20} />
          </button>
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className="
              p-2 rounded-full 
              hover:bg-blue-100 
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300
            "
          >
            <ChevronLeft size={20} />
          </button>
          <span className="px-4 py-2 bg-blue-100 rounded-md text-sm">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className="
              p-2 rounded-full 
              hover:bg-blue-100 
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300
            "
          >
            <ChevronRight size={20} />
          </button>
          <button
            onClick={goToLastPage}
            disabled={currentPage === totalPages}
            className="
              p-2 rounded-full 
              hover:bg-blue-100 
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-300
            "
          >
            <ChevronsRight size={20} />
          </button>
        </div>
      </div>

      {/* Order Details Modal */}
      {selectedOrder && (
        <OrderDetailModal 
          order={selectedOrder} 
          onClose={closeOrderDetails} 
        />
      )}
    </div>
  );
};

export default OrderTable;