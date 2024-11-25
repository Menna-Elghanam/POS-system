import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { FaHome, FaUser, FaListAlt, FaSignOutAlt, FaTachometerAlt } from "react-icons/fa";
import { useCart } from "../context/CartContext";

const Sidebar = () => {
  const [user, setUser] = useState(null);
  const { getCartItemsCount } = useCart();

  useEffect(() => {

    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const response = await axios.get("http://localhost:5000/api/auth/user", {
          headers: { Authorization: token },
        });

        setUser(response.data.user);
      } catch (error) {
        console.error("Failed to fetch user info:", error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token"); // Remove token from localStorage
    setUser(null); // Set user as logged out
    // You can optionally navigate to the login page
  };

  return (
    <aside className="w-64 bg-white text-gray-800 h-screen fixed p-6 flex flex-col justify-between shadow-xl border-r border-gray-200">
      <nav className="space-y-8">
        <div className="text-xl font-bold mb-8">
          <Link
            to="/"
            className="flex items-center gap-3 text-black hover:text-indigo-500 transition-colors duration-300"
          >
            <span>Restaurant POS</span>
          </Link>
        </div>

        <ul className="space-y-6">
          {user ? (
            <li className="flex items-center gap-3 px-2 py-3 bg-gray-100 rounded-lg">
              <div className="w-10 h-10 rounded-full bg-indigo-500 text-white flex items-center justify-center">
                <span className="font-semibold">{user.username[0]}</span>
              </div>
              <span className="text-gray-700">{user.username}</span>
            </li>
          ) : (
            <li>
              <Link
                to="/login"
                className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors duration-300"
              >
                <FaUser />
                <span>Log In</span>
              </Link>
            </li>
          )}

          <li>
            <Link
              to="/dashboard"
              className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors duration-300"
            >
              <FaTachometerAlt className="text-lg" />
              <span>Dashboard</span>
            </Link>
          </li>

          <li>
            <Link
              to="/"
              className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors duration-300"
            >
              <FaHome className="text-lg" />
              <span>Home</span>
            </Link>
          </li>

          <li className="relative">
            <Link
              to="/orders"
              className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors duration-300"
            >
              <FaListAlt className="text-lg" />
              <span>Orders</span>
              {getCartItemsCount() > 0 && (
                <span className="absolute -top-2 -right-2 w-6 h-6 flex items-center justify-center text-xs font-bold bg-red-500 text-white rounded-full">
                  {getCartItemsCount()}
                </span>
              )}
            </Link>
          </li>

          <li>
            <Link
              to="/profile"
              className="flex items-center gap-2 text-gray-500 hover:text-gray-800 transition-colors duration-300"
            >
              <FaUser className="text-lg" />
              <span>Profile</span>
            </Link>
          </li>
        </ul>
      </nav>

   
        <button
          onClick={logout}
          className="flex items-center justify-center gap-2 w-full px-4 py-3 mt-auto text-white bg-red-500 hover:bg-red-600 rounded-lg transition-all duration-300"
        >
          <FaSignOutAlt className="text-lg" />
          <span>Log Out</span>
        </button>
    
    </aside>
  );
};

export default Sidebar;
