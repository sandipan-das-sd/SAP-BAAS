import React from 'react';
import { X, Printer, Download } from 'lucide-react';
import StatusBadge from './StatusBadge';

const OrderDetailModal = ({ order, onClose }) => {
  const renderDetailRow = (label, value) => (
    <div className="flex justify-between border-b py-2 last:border-b-0">
      <span className="text-gray-600 font-medium">{label}</span>
      <span className="text-gray-800">{value}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Modal Header */}
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            Order Details: {order.orderId}
          </h2>
          <div className="flex items-center space-x-3">
            <button 
              onClick={() => window.print()}
              className="text-gray-600 hover:text-gray-800 transition"
              title="Print Order"
            >
              <Printer size={24} />
            </button>
            <button 
              className="text-gray-600 hover:text-gray-800 transition"
              title="Download Order Details"
            >
              <Download size={24} />
            </button>
            <button 
              onClick={onClose}
              className="text-gray-600 hover:text-gray-800 transition"
              title="Close"
            >
              <X size={24} />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-6 grid md:grid-cols-2 gap-6">
          {/* Order Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
              Order Information
            </h3>
            {renderDetailRow('Order ID', order.orderId)}
            {renderDetailRow('Material', order.material)}
            {renderDetailRow('Work Center', order.workCenter)}
            {renderDetailRow('Status', 
              <StatusBadge status={order.executionStatus} />
            )}
          </div>

          {/* Quantity and Dates */}
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-4 border-b pb-2">
              Quantity and Scheduling
            </h3>
            {renderDetailRow('Order Quantity', order.orderQuantity)}
            {renderDetailRow('Delivered Quantity', order.deliveredQuantity)}
            {renderDetailRow('Planned Start', 
              new Date(order.plannedStartEnd.split(' - ')[0]).toLocaleString()
            )}
            {renderDetailRow('Planned End', 
              new Date(order.plannedStartEnd.split(' - ')[1]).toLocaleString()
            )}
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-6 border-t flex justify-end space-x-3">
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition"
          >
            Close
          </button>
          <button 
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
          >
            Edit Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;