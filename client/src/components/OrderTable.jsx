import React, { useState } from 'react';
import { Eye, ChevronDown, ChevronUp, Filter } from 'lucide-react';
import StatusBadge from './StatusBadge';
import OrderDetailModal from './OrderModal';

const OrderTable = ({ orders, onFilterChange }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [sortConfig, setSortConfig] = useState({ 
    key: 'orderId', 
    direction: 'ascending' 
  });

  const sortedOrders = React.useMemo(() => {
    let sortableOrders = [...orders];
    if (sortConfig.key) {
      sortableOrders.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableOrders;
  }, [orders, sortConfig]);

  const requestSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === 'ascending' 
      ? <ChevronUp className="inline ml-1 text-blue-500" size={16} />
      : <ChevronDown className="inline ml-1 text-blue-500" size={16} />
  };

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-4 bg-gray-50 flex justify-between items-center">
        <h2 className="text-xl font-semibold text-gray-800">Order Management</h2>
        <div className="flex items-center space-x-2">
          <button 
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition flex items-center"
            onClick={() => onFilterChange()}
          >
            <Filter className="mr-2" size={18} />
            Advanced Filters
          </button>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              {[
                { key: 'orderId', label: 'Order ID' },
                { key: 'workCenter', label: 'Work Center' },
                { key: 'material', label: 'Material' },
                { key: 'executionStatus', label: 'Status' },
                { key: 'deliveredQuantity', label: 'Quantity' },
                { label: 'Actions' }
              ].map((header) => (
                <th 
                  key={header.label}
                  onClick={() => header.key && requestSort(header.key)}
                  className={`px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider 
                    ${header.key ? 'cursor-pointer hover:bg-gray-200' : ''}`}
                >
                  {header.label}
                  {header.key && renderSortIcon(header.key)}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedOrders.map((order) => (
              <tr 
                key={order.orderId} 
                className="hover:bg-gray-50 transition duration-150 ease-in-out"
              >
                <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.orderId}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500">
                  {order.workCenter}
                </td>
                <td className="px-4 py-4 text-sm text-gray-500">
                  {order.material}
                </td>
                <td className="px-4 py-4">
                  <StatusBadge status={order.executionStatus} />
                </td>
                <td className="px-4 py-4 text-sm text-gray-500">
                  {order.deliveredQuantity}
                </td>
                <td className="px-4 py-4">
                  <button 
                    onClick={() => setSelectedOrder(order)}
                    className="text-blue-600 hover:text-blue-800 transition flex items-center"
                  >
                    <Eye className="mr-1" size={16} />
                    Details
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Order Detail Modal */}
      {selectedOrder && (
        <OrderDetailModal 
          order={selectedOrder} 
          onClose={() => setSelectedOrder(null)} 
        />
      )}
    </div>
  );
};

export default OrderTable;