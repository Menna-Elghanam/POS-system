import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
import InvoiceModal from '../components/InvoiceModal ';

const OrdersPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal } = useCart();

  const [orderType, setOrderType] = useState("place");
  const [selectedTable, setSelectedTable] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [userName, setUserName] = useState("");
  const [userContact, setUserContact] = useState("");
  const [showInvoice, setShowInvoice] = useState(false);

  const handleOrderTypeChange = (e) => {
    setOrderType(e.target.value);
    setSelectedTable("");
    setDeliveryAddress("");
    setUserName("");
    setUserContact("");
  };

  const openInvoice = () => setShowInvoice(true);
  const closeInvoice = () => setShowInvoice(false);

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
          <p className="text-gray-600">Add some delicious items to get started!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-8">All Orders</h1>

      {/* Order Type Selection */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-gray-800">Order Type</h2>
        <div className="flex space-x-6">
          <label>
            <input
              type="radio"
              value="place"
              checked={orderType === "place"}
              onChange={handleOrderTypeChange}
              className="mr-2"
            />
            Place (Table)
          </label>
          <label>
            <input
              type="radio"
              value="delivery"
              checked={orderType === "delivery"}
              onChange={handleOrderTypeChange}
              className="mr-2"
            />
            Delivery
          </label>
        </div>
      </div>

      {/* Table Selection */}
      {orderType === "place" && (
        <div className="mb-6">
          <label htmlFor="table" className="block text-lg font-semibold text-gray-800">Select Table:</label>
          <select
            id="table"
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            className="bg-gray-200 p-2 rounded-md mt-2"
          >
            <option value="">-- Select Table --</option>
            {["Table 1", "Table 2", "Table 3", "Table 4", "Table 5", "Table 6"].map((table, index) => (
              <option key={index} value={table}>
                {table}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Delivery Details */}
      {orderType === "delivery" && (
        <div className="mb-6">
          <label htmlFor="delivery-address" className="block text-lg font-semibold text-gray-800">Delivery Address:</label>
          <input
            type="text"
            id="delivery-address"
            value={deliveryAddress}
            onChange={(e) => setDeliveryAddress(e.target.value)}
            className="w-full bg-gray-200 p-2 rounded-md mt-2"
            placeholder="Enter delivery address"
          />



          <label htmlFor="user-contact" className="block text-lg font-semibold text-gray-800 mt-4">Contact Info:</label>
          <input
            type="text"
            id="user-contact"
            value={userContact}
            onChange={(e) => setUserContact(e.target.value)}
            className="w-full bg-gray-200 p-2 rounded-md mt-2"
            placeholder="Enter contact number"
          />
        </div>
      )}

      {/* Cart Items */}
      <div className="bg-white rounded-lg shadow-lg">
        {cartItems.map((item) => (
          <div key={item.id} className="border-b border-gray-200 p-6 flex items-center">
            <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
            <div className="flex-1 ml-6">
              <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-600">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border rounded-lg">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-2 hover:bg-gray-100 rounded-l-lg"
                >
                  <FiMinus className="text-gray-600" />
                </button>
                <span className="px-4 py-2 text-gray-800">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-2 hover:bg-gray-100 rounded-r-lg"
                >
                  <FiPlus className="text-gray-600" />
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="p-2 text-red-500 hover:bg-red-50 rounded-lg"
              >
                <FiTrash2 size={20} />
              </button>
            </div>
          </div>
        ))}

        <div className="p-6 border-t border-gray-200">
          <div className="flex justify-between items-center mb-6">
            <span className="text-lg font-semibold text-gray-800">Total:</span>
            <span className="text-2xl font-bold text-gray-800">${getCartTotal().toFixed(2)}</span>
          </div>

          <button
            onClick={openInvoice}
            className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
          >
            View Invoice
          </button>
        </div>
      </div>

      {/* Invoice Modal */}
      {showInvoice && (
        <InvoiceModal
          orderType={orderType}
          selectedTable={selectedTable}
          deliveryAddress={deliveryAddress}
          userName={userName}
          userContact={userContact}
          cartItems={cartItems}
          total={getCartTotal()}
          onClose={closeInvoice}
        />
      )}
    </div>
  );
};

export default OrdersPage;



// import React, { useState } from 'react';
// import axios from 'axios';
// import { useCart } from '../context/CartContext';
// import { FiPlus, FiMinus, FiTrash2 } from 'react-icons/fi';
// import InvoiceModal from '../components/InvoiceModal .jsx';

// const OrdersPage = () => {
//   const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();

//   const [orderType, setOrderType] = useState("place");
//   const [selectedTable, setSelectedTable] = useState("");
//   const [deliveryAddress, setDeliveryAddress] = useState("");
//   const [userName, setUserName] = useState("");
//   const [userContact, setUserContact] = useState("");
//   const [showInvoice, setShowInvoice] = useState(false);

//   const handleOrderTypeChange = (e) => {
//     setOrderType(e.target.value);
//     setSelectedTable("");
//     setDeliveryAddress("");
//     setUserName("");
//     setUserContact("");
//   };

//   const openInvoice = async () => {
//     try {
//       const orderPayload = {
//         orderType,
//         selectedTable: selectedTable || null,
//         deliveryAddress: orderType === "delivery" ? deliveryAddress : null,
//         userName: userName || null,
//         userContact: userContact || null,
//         cartItems: cartItems.map((item) => ({
//           itemId: item.id,
//           name: item.name,
//           quantity: item.quantity,
//           price: item.price,
//         })),
//         total: getCartTotal(),
//       };

//       const response = await axios.post('http://localhost:5000/api/orders', orderPayload);
//       console.log('Order saved successfully:', response.data);

//       setShowInvoice(true);
//       clearCart();
//     } catch (error) {
//       console.error('Error saving order:', error);
//       alert('Failed to save the order. Please try again.');
//     }
//   };

//   const closeInvoice = () => setShowInvoice(false);

//   if (cartItems.length === 0) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <div className="text-center">
//           <h2 className="text-2xl font-semibold text-gray-800 mb-2">Your cart is empty</h2>
//           <p className="text-gray-600">Add some delicious items to get started!</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <h1 className="text-3xl font-bold text-gray-800 mb-8">All Orders</h1>
//       <div className="mb-6">
//         <h2 className="text-lg font-semibold text-gray-800">Order Type</h2>
//         <div className="flex space-x-6">
//           <label>
//             <input
//               type="radio"
//               value="place"
//               checked={orderType === "place"}
//               onChange={handleOrderTypeChange}
//               className="mr-2"
//             />
//             Place (Table)
//           </label>
//           <label>
//             <input
//               type="radio"
//               value="delivery"
//               checked={orderType === "delivery"}
//               onChange={handleOrderTypeChange}
//               className="mr-2"
//             />
//             Delivery
//           </label>
//         </div>
//       </div>

//       {orderType === "place" && (
//         <div className="mb-6">
//           <label htmlFor="table" className="block text-lg font-semibold text-gray-800">
//             Select Table:
//           </label>
//           <select
//             id="table"
//             value={selectedTable}
//             onChange={(e) => setSelectedTable(e.target.value)}
//             className="bg-gray-200 p-2 rounded-md mt-2"
//           >
//             <option value="">-- Select Table --</option>
//             {["Table 1", "Table 2", "Table 3", "Table 4", "Table 5", "Table 6"].map((table, index) => (
//               <option key={index} value={table}>
//                 {table}
//               </option>
//             ))}
//           </select>
//         </div>
//       )}

//       {orderType === "delivery" && (
//         <div className="mb-6">
//           <label htmlFor="delivery-address" className="block text-lg font-semibold text-gray-800">
//             Delivery Address:
//           </label>
//           <input
//             type="text"
//             id="delivery-address"
//             value={deliveryAddress}
//             onChange={(e) => setDeliveryAddress(e.target.value)}
//             className="w-full bg-gray-200 p-2 rounded-md mt-2"
//             placeholder="Enter delivery address"
//           />
//           <label htmlFor="user-contact" className="block text-lg font-semibold text-gray-800 mt-4">
//             Contact Info:
//           </label>
//           <input
//             type="text"
//             id="user-contact"
//             value={userContact}
//             onChange={(e) => setUserContact(e.target.value)}
//             className="w-full bg-gray-200 p-2 rounded-md mt-2"
//             placeholder="Enter contact number"
//           />
//         </div>
//       )}

//       <div className="bg-white rounded-lg shadow-lg">
//         {cartItems.map((item) => (
//           <div key={item.id} className="border-b border-gray-200 p-6 flex items-center">
//             <img src={item.imageUrl} alt={item.name} className="w-24 h-24 object-cover rounded-lg" />
//             <div className="flex-1 ml-6">
//               <h3 className="text-lg font-semibold text-gray-800">{item.name}</h3>
//               <p className="text-gray-600">${item.price.toFixed(2)}</p>
//             </div>
//             <div className="flex items-center space-x-4">
//               <div className="flex items-center border rounded-lg">
//                 <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-2 hover:bg-gray-100 rounded-l-lg">
//                   <FiMinus className="text-gray-600" />
//                 </button>
//                 <span className="px-4 py-2 text-gray-800">{item.quantity}</span>
//                 <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-2 hover:bg-gray-100 rounded-r-lg">
//                   <FiPlus className="text-gray-600" />
//                 </button>
//               </div>
//               <button onClick={() => removeFromCart(item.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg">
//                 <FiTrash2 size={20} />
//               </button>
//             </div>
//           </div>
//         ))}

//         <div className="p-6 border-t border-gray-200">
//           <div className="flex justify-between items-center mb-6">
//             <span className="text-lg font-semibold text-gray-800">Total:</span>
//             <span className="text-2xl font-bold text-gray-800">${getCartTotal().toFixed(2)}</span>
//           </div>

//           <button
//             onClick={openInvoice}
//             className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition duration-200"
//           >
//             Save Order & View Invoice
//           </button>
//         </div>
//       </div>

//       {showInvoice && (
//         <InvoiceModal
//           orderType={orderType}
//           selectedTable={selectedTable}
//           deliveryAddress={deliveryAddress}
//           userName={userName}
//           userContact={userContact}
//           cartItems={cartItems}
//           total={getCartTotal()}
//           onClose={closeInvoice}
//         />
//       )}
//     </div>
//   );
// };

// export default OrdersPage;
