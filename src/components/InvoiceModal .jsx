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


// import React from 'react';

// const InvoiceModal = ({
//   orderType,
//   selectedTable,
//   deliveryAddress,
//   userName,
//   userContact,
//   cartItems,
//   total,
//   onClose
// }) => {
//   return (
//     <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
//       <div className="bg-white rounded-lg shadow-xl w-1/2 p-6">
//         <h2 className="text-2xl font-semibold text-gray-800 mb-4">Invoice</h2>
//         <button
//           onClick={onClose}
//           className="absolute top-4 right-4 text-gray-600 hover:text-gray-800"
//         >
//           X
//         </button>

//         {/* Order Type */}
//         <div className="mb-4">
//           <p className="font-medium text-gray-800">Order Type: <span className="font-normal">{orderType === "place" ? "Place (Table)" : "Delivery"}</span></p>
//           {orderType === "place" && selectedTable && (
//             <p className="font-medium text-gray-800">Table: <span className="font-normal">{selectedTable}</span></p>
//           )}
//           {orderType === "delivery" && deliveryAddress && (
//             <p className="font-medium text-gray-800">Delivery Address: <span className="font-normal">{deliveryAddress}</span></p>
//           )}
//         </div>

//         {/* Customer Info */}
//         <div className="mb-4">
//           <p className="font-medium text-gray-800">Customer Name: <span className="font-normal">{userName}</span></p>
//           <p className="font-medium text-gray-800">Contact Info: <span className="font-normal">{userContact}</span></p>
//         </div>

//         {/* Cart Items */}
//         <div className="mb-4">
//           <h3 className="text-lg font-semibold text-gray-800">Items Ordered:</h3>
//           <ul className="space-y-2">
//             {cartItems.map((item) => (
//               <li key={item.id} className="flex justify-between">
//                 <span className="text-gray-700">{item.name} (x{item.quantity})</span>
//                 <span className="text-gray-700">${(item.price * item.quantity).toFixed(2)}</span>
//               </li>
//             ))}
//           </ul>
//         </div>

//         {/* Total */}
//         <div className="mt-4">
//           <div className="flex justify-between text-lg font-semibold">
//             <span className="text-gray-800">Total:</span>
//             <span className="text-gray-800">${total.toFixed(2)}</span>
//           </div>
//         </div>

//         {/* Close Button */}
//         <div className="mt-6 flex justify-end">
//           <button
//             onClick={onClose}
//             className="bg-blue-600 text-white py-2 px-6 rounded-md hover:bg-blue-700"
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default InvoiceModal;
