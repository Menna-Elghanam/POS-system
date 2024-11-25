import React from 'react';

const InvoiceModal = ({ orderType, selectedTable, deliveryAddress, userContact, cartItems, total, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white w-3/4 max-w-lg rounded-lg shadow-lg p-6 relative">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Invoice</h2>

        <p className="text-gray-600 mb-2">Order Type: {orderType}</p>
        {orderType === "place" && <p className="text-gray-600">Table: {selectedTable}</p>}
        {orderType === "delivery" && (
          <>
            <p className="text-gray-600">Contact: {userContact}</p>
            <p className="text-gray-600">Address: {deliveryAddress}</p>
          </>
        )}

        <table className="w-full text-left text-sm mt-4">
          <thead>
            <tr>
              <th className="p-2 border-b">Item</th>
              <th className="p-2 border-b">Qty</th>
              <th className="p-2 border-b">Price</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id}>
                <td className="p-2 border-b">{item.name}</td>
                <td className="p-2 border-b">{item.quantity}</td>
                <td className="p-2 border-b">${item.price.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={2} className="p-2 text-right font-bold">Total:</td>
              <td className="p-2 font-bold">${total.toFixed(2)}</td>
            </tr>
          </tfoot>
        </table>

        <div className="mt-6 flex justify-end space-x-4">
          <button
            onClick={onClose}
            className="bg-gray-300 text-gray-700 py-2 px-4 rounded hover:bg-gray-400 transition duration-200"
          >
            Close
          </button>
          <button
            onClick={() => window.print()}
            className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition duration-200"
          >
            Print
          </button>
        </div>
      </div>
    </div>
  );
};

export default InvoiceModal;


