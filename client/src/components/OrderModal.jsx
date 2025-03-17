import React from 'react';
import { X, Printer, Download } from 'lucide-react';
import StatusBadge from './StatusBadge';

const OrderDetailModal = ({ order, onClose }) => {
  const renderDetailRow = (label, value) => (
    <div className="flex justify-between border-b border-blue-100 py-3 last:border-b-0 hover:bg-blue-50 transition-colors duration-200">
      <span className="text-gray-600 font-medium tracking-wider">{label}</span>
      <span className="text-gray-800 font-semibold">{value}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center animate-fade-in">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-y-auto border-4 border-blue-100 transform transition-all duration-300 hover:shadow-3xl">
        {/* Modal Header with Gradient */}
        <div className="bg-gradient-to-r from-blue-100 to-blue-200 flex justify-between items-center p-6 border-b border-blue-200">
          <h2 className="text-3xl font-bold text-gray-800 tracking-tight">
            Order Details: {order.orderId}
          </h2>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => window.print()}
              className="text-blue-600 hover:text-blue-800 transition-colors duration-300 hover:scale-110"
              title="Print Order"
            >
              <Printer size={28} strokeWidth={1.5} />
            </button>
            <button
              className="text-green-600 hover:text-green-800 transition-colors duration-300 hover:scale-110"
              title="Download Order Details"
            >
              <Download size={28} strokeWidth={1.5} />
            </button>
            <button
              onClick={onClose}
              className="text-red-600 hover:text-red-800 transition-colors duration-300 hover:scale-110"
              title="Close"
            >
              <X size={28} strokeWidth={1.5} />
            </button>
          </div>
        </div>

        {/* Modal Body with Enhanced Layout */}
        <div className="p-8 grid md:grid-cols-2 gap-8 bg-white">
          {/* Order Information with Soft Background */}
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-100 shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-blue-200 tracking-wider uppercase">
              Order Information
            </h3>
            {renderDetailRow('Order ID', order.orderId)}
            {renderDetailRow('Material', order.material)}
            {renderDetailRow('Work Center', order.workCenter)}
            {renderDetailRow('Status', <StatusBadge status={order.executionStatus} />)}
          </div>

          {/* Quantity and Dates with Soft Background */}
          <div className="bg-green-50 p-6 rounded-xl border border-green-100 shadow-md">
            <h3 className="text-xl font-semibold text-gray-700 mb-4 pb-2 border-b border-green-200 tracking-wider uppercase">
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

        {/* Modal Footer with Gradient Buttons */}
        <div className="p-6 border-t border-blue-100 flex justify-end space-x-4 bg-gray-50">
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-gradient-to-r from-gray-200 to-gray-300 text-gray-800 rounded-lg hover:from-gray-300 hover:to-gray-400 transition-all duration-300 shadow-md"
          >
            Close
          </button>
          <button
            className="px-5 py-2.5 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            Edit Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderDetailModal;