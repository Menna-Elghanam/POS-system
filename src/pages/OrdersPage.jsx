










import React, { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import { FiPlus, FiMinus, FiTrash2, FiUser, FiMapPin, FiPhone } from "react-icons/fi";
import InvoiceModal from "../components/InvoiceModal ";
import { toast } from "react-toastify";
import axios from "axios";

const OrdersPage = () => {
  const { cartItems, removeFromCart, updateQuantity, getCartTotal, clearCart } = useCart();
  const [orderType, setOrderType] = useState("PLACE");
  const [selectedTable, setSelectedTable] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [userName, setUserName] = useState("");
  const [userContact, setUserContact] = useState("");
  const [showInvoice, setShowInvoice] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [availableTables, setAvailableTables] = useState([]);

  // Fetch available tables
  useEffect(() => {
    const fetchTables = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/tables');
        const freeTables = response.data.filter(table => table.status === "Free");
        setAvailableTables(freeTables);
      } catch (error) {
        console.error('Error fetching tables:', error);
        toast.error('Failed to load available tables');
      }
    };

    if (orderType === "PLACE") {
      fetchTables();
    }
  }, [orderType]);

  const handleOrderTypeChange = (e) => {
    setOrderType(e.target.value);
    setSelectedTable("");
    setDeliveryAddress("");
  };

  const handleSubmitOrder = async () => {
    // Validate required fields
    if (!userName.trim() || !userContact.trim()) {
      toast.error("Please fill in your name and contact number.");
      return;
    }
    if (orderType === "PLACE" && !selectedTable) {
      toast.error("Please select a table number.");
      return;
    }
    if (orderType === "DELIVERY" && !deliveryAddress.trim()) {
      toast.error("Please provide a delivery address.");
      return;
    }

    const userId = 1; // Replace with actual user ID when authentication is implemented
    const orderData = {
      userId,
      userName,
      userContact,
      orderType,
      tableId: orderType === "PLACE" ? parseInt(selectedTable) : null,
      deliveryAddress: orderType === "DELIVERY" ? deliveryAddress : null,
      deliveryTime: orderType === "DELIVERY" ? new Date().toISOString() : null,
      status: "pending",
      total: getCartTotal(),
      menuItems: cartItems.map((item) => ({
        menuItemId: item.id,
        quantity: item.quantity,
        price: item.price,
      })),
    };

    try {
      setIsSubmitting(true);
      
      // If it's a dine-in order, update table status first
      if (orderType === "PLACE" && selectedTable) {
        await axios.get(`http://localhost:3000/api/tables/${selectedTable}`, {
        });
      }

      // Create the order
      const response = await axios.post(
        "http://localhost:3000/api/orders/create",
        orderData
      );
      
      console.log("Order placed successfully:", response.data);
      toast.success("Order placed successfully!");
      
      // Reset form and cart
      clearCart();
      setOrderType("PLACE");
      setSelectedTable("");
      setDeliveryAddress("");
      setUserName("");
      setUserContact("");
      setShowInvoice(true);

    } catch (error) {
      console.error("Error submitting order:", error);
      toast.error(error.response?.data?.message || "Failed to place order. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const openInvoice = () => setShowInvoice(true);
  const closeInvoice = () => setShowInvoice(false);

  return (
    <div className="max-w-3xl mx-auto px-4 py-8 space-y-6">
      <div className="flex justify-between items-center border-b pb-4">
        <h1 className="text-3xl font-bold text-neutral-800">Complete Your Order</h1>
        <div className="flex space-x-4">
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              value="PLACE"
              checked={orderType === "PLACE"}
              onChange={handleOrderTypeChange}
              className="form-radio text-neutral-700"
            />
            <span className="ml-2 text-neutral-700">Dine-in</span>
          </label>
          <label className="inline-flex items-center cursor-pointer">
            <input
              type="radio"
              value="DELIVERY"
              checked={orderType === "DELIVERY"}
              onChange={handleOrderTypeChange}
              className="form-radio text-neutral-700"
            />
            <span className="ml-2 text-neutral-700">Delivery</span>
          </label>
        </div>
      </div>

      {/* User Information - Always visible */}
      <div className="space-y-4 bg-neutral-100 rounded-md p-4">
        <div className="relative">
          <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your Name"
            className="w-full p-2 pl-10 rounded-md bg-white border border-neutral-300 text-neutral-800"
          />
        </div>
        <div className="relative">
          <FiPhone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
          <input
            type="text"
            value={userContact}
            onChange={(e) => setUserContact(e.target.value)}
            placeholder="Contact Number"
            className="w-full p-2 pl-10 rounded-md bg-white border border-neutral-300 text-neutral-800"
          />
        </div>
      </div>

      {orderType === "PLACE" && (
        <div className="bg-neutral-100 rounded-md p-4">
          <label className="block text-neutral-700 mb-2">Select Table</label>
          <select
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
            className="w-full p-2 rounded-md bg-white border border-neutral-300 text-neutral-800"
          >
            <option value="">Choose a Table</option>
            {availableTables.map((table) => (
              <option key={table.id} value={table.id}>
                Table {table.number} ({table.seats} seats)
              </option>
            ))}
          </select>
        </div>
      )}

      {orderType === "DELIVERY" && (
        <div className="bg-neutral-100 rounded-md p-4">
          <div className="relative">
            <FiMapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              value={deliveryAddress}
              onChange={(e) => setDeliveryAddress(e.target.value)}
              placeholder="Delivery Address"
              className="w-full p-2 pl-10 rounded-md bg-white border border-neutral-300 text-neutral-800"
            />
          </div>
        </div>
      )}

      {/* Cart Items */}
      <div className="space-y-4">
        {cartItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center border-b border-neutral-200 pb-4"
          >
            <div>
              <h3 className="font-semibold text-neutral-800">{item.name}</h3>
              <p className="text-neutral-600">${item.price.toFixed(2)}</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center border border-neutral-300 rounded-md">
                <button
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-l-md"
                  disabled={item.quantity <= 1}
                >
                  <FiMinus />
                </button>
                <span className="px-4 text-neutral-800">{item.quantity}</span>
                <button
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  className="p-2 text-neutral-600 hover:bg-neutral-100 rounded-r-md"
                >
                  <FiPlus />
                </button>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-500 hover:text-red-600 p-2"
              >
                <FiTrash2 />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Total and Action Buttons */}
      <div className="flex justify-between items-center border-t border-neutral-200 pt-4">
        <span className="text-lg font-medium text-neutral-700">Total</span>
        <span className="text-2xl font-bold text-neutral-900">
          ${getCartTotal().toFixed(2)}
        </span>
      </div>

      <div className="flex space-x-4">
        <button
          onClick={handleSubmitOrder}
          disabled={isSubmitting || cartItems.length === 0}
          className={`w-full p-3 rounded-md text-white transition-colors ${
            isSubmitting || cartItems.length === 0
              ? "bg-neutral-400 cursor-not-allowed"
              : "bg-neutral-900 hover:bg-neutral-700 active:bg-neutral-800"
          }`}
        >
          {isSubmitting ? "Submitting..." : "Place Order"}
        </button>
        <button
          onClick={openInvoice}
          disabled={cartItems.length === 0}
          className="w-full p-3 rounded-md bg-neutral-100 text-neutral-800 hover:bg-neutral-200 transition-colors disabled:bg-neutral-50 disabled:text-neutral-400"
        >
          View Invoice
        </button>
      </div>

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