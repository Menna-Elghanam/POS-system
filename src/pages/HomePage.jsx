// import { useEffect, useReducer, useState } from "react";
// import { getAll, search, getAllTags } from "../services/foodService";
// import FoodCard from "../components/FoodCard";
// import { useParams, useNavigate } from "react-router-dom";
// import SearchBar from "../components/SearchBar ";
// import Tags from "../components/Tags";

// // Initial state
// const initialState = {
//   foods: [],
//   tags: [],
//   loading: true,
//   error: null,
// };

// // Reducer function
// const reducer = (state, action) => {
//   switch (action.type) {
//     case "FETCH_SUCCESS":
//       return { ...state, foods: action.payload, loading: false };
//     case "FETCH_TAGS_SUCCESS":
//       return { ...state, tags: action.payload };
//     case "FETCH_ERROR":
//       return { ...state, loading: false, error: "Failed to fetch data" };
//     default:
//       return state;
//   }
// };

// const Home = () => {
//   const [state, dispatch] = useReducer(reducer, initialState);
//   const { searchTerm } = useParams(); // Get search term from URL
//   const [selectedTag, setSelectedTag] = useState("All");

//   const navigate = useNavigate();

//   useEffect(() => {
//     // Fetch foods based on search term
//     const fetchFoods = async () => {
//       try {
//         const foods = searchTerm ? await search(searchTerm) : await getAll();
//         dispatch({ type: "FETCH_SUCCESS", payload: foods });
//       } catch (error) {
//         dispatch({ type: "FETCH_ERROR" });
//       }
//     };

//     // Fetch tags from the backend
//     const fetchTags = async () => {
//       try {
//         const tags = await getAllTags();
//         dispatch({ type: "FETCH_TAGS_SUCCESS", payload: tags });
//       } catch (error) {
//         console.error("Error fetching tags:", error);
//       }
//     };

//     fetchFoods();
//     fetchTags();
//   }, [searchTerm]); // Trigger fetching when searchTerm changes

//   const { foods, tags, loading, error } = state;

//   // Filter foods based on selected tag
//   const filteredFoods =
//     selectedTag === "All"
//       ? foods
//       : foods.filter((food) => food.tags?.includes(selectedTag));

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">Food Menu</h1>

//       {/* Search Bar */}
//       <SearchBar navigate={navigate} searchTerm={searchTerm || ""} />

//       {/* Tags Bar */}
//       <Tags
//         tags={tags}
//         selectedTag={selectedTag}
//         onTagSelect={setSelectedTag}
//       />

//       {/* Loading state */}
//       {loading && <p>Loading...</p>}

//       {/* Error state */}
//       {error && <p className="text-red-500">{error}</p>}

//       {/* Food Cards */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {filteredFoods.length > 0 ? (
//           filteredFoods.map((food) => <FoodCard key={food.id} food={food} />)
//         ) : (
//           <p>No food items match your search.</p>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Home;







// import React, { useState, useEffect } from 'react';
// import axios from 'axios';


// const MenuItemsManagement = () => {
//   const [menuItems, setMenuItems] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [searchQuery, setSearchQuery] = useState(''); // state for search query


//   useEffect(() => {
//     fetchMenuItems();
//   }, []);

//   const fetchMenuItems = async () => {
//     try {
//       setLoading(true);
//       const response = await axios.get('http://localhost:3000/api/menu');
//       console.log('Fetched data:', response.data);
//       setMenuItems(response.data);
//     } catch (error) {
//       console.error('Error fetching menu items:', error);
//       setError('Failed to fetch menu items');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Filtered menu items based on the search query
//   const filteredMenuItems = menuItems.filter((item) =>
//     item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
//     item.description.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   if (loading) {
//     return <div className="text-center p-4">Loading menu items...</div>;
//   }

//   if (error) {
//     return <div className="text-red-500 text-center p-4">{error}</div>;
//   }

//   return (
//     <div className="container mx-auto px-4 py-8">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-gray-800">Menu Items</h2>
//         <input
//           type="text"
//           placeholder="Search menu items..."
//           className="border px-4 py-2 rounded-lg"
//           value={searchQuery}
//           onChange={(e) => setSearchQuery(e.target.value)} // Update search query on input change
//         />
//       </div>

//       {/* Debug section */}
//       <div className="mb-4 p-4 bg-gray-100 rounded">
//         <p>Number of items loaded: {menuItems.length}</p>
//       </div>

//       {/* Cards */}
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//         {filteredMenuItems.map((item) => (
//           <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
//             <div className="p-6">
//               <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
//               <p className="text-sm text-gray-600 mt-2">{item.description}</p>
//               <div className="flex justify-between items-center mt-4">
//                 <span className="text-xl font-bold text-gray-900">${item.price.toFixed(2)}</span>
//                 <span
//                   className={`px-3 py-1 text-xs font-semibold rounded-full ${item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}
//                 >
//                   {item.available ? 'Available' : 'Unavailable'}
//                 </span>
//               </div>
//               <button
//             className="flex items-center space-x-2 bg-neutral-900 text-white px-4 py-2 rounded-lg hover:bg-neutral-700 transition duration-200"
//           >
//             <span>Place Order  </span>
//           </button>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MenuItemsManagement;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useCart } from '../context/CartContext';
import { toast } from 'react-toastify';
import { FiShoppingBag } from 'react-icons/fi';

const MenuItemsManagement = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  // Get cart functions from context
  const { addToCart, cartItems } = useCart();

  useEffect(() => {
    fetchMenuItems();
  }, []);

  const fetchMenuItems = async () => {
    try {
      setLoading(true);
      const response = await axios.get('http://localhost:3000/api/menu');
      console.log('Fetched data:', response.data);
      setMenuItems(response.data);
    } catch (error) {
      console.error('Error fetching menu items:', error);
      setError('Failed to fetch menu items');
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = (item) => {
    if (!item.available) {
      toast.error("This item is currently unavailable");
      return;
    }

    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: 1
    });
    
    toast.success(`${item.name} added to cart`);
  };

  // Get item quantity in cart
  const getItemQuantityInCart = (itemId) => {
    const cartItem = cartItems.find(item => item.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  const filteredMenuItems = menuItems.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    item.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (loading) {
    return <div className="text-center p-4">Loading menu items...</div>;
  }

  if (error) {
    return <div className="text-red-500 text-center p-4">{error}</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Menu Items</h2>
        <input
          type="text"
          placeholder="Search menu items..."
          className="border px-4 py-2 rounded-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredMenuItems.map((item) => (
          <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300">
            <div className="p-6">
              <h3 className="text-lg font-semibold text-gray-900">{item.name}</h3>
              <p className="text-sm text-gray-600 mt-2">{item.description}</p>
              <div className="flex justify-between items-center mt-4">
                <span className="text-xl font-bold text-gray-900">${item.price.toFixed(2)}</span>
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    item.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}
                >
                  {item.available ? 'Available' : 'Unavailable'}
                </span>
              </div>
              <div className="mt-4">
                <button
                  onClick={() => handleAddToCart(item)}
                  disabled={!item.available}
                  className={`w-full flex items-center justify-center space-x-2 px-4 py-2 rounded-lg transition duration-200 ${
                    item.available
                      ? 'bg-neutral-900 text-white hover:bg-neutral-700'
                      : 'bg-neutral-300 text-neutral-500 cursor-not-allowed'
                  }`}
                >
                  <FiShoppingBag className="w-5 h-5" />
                  <span>
                    {getItemQuantityInCart(item.id) > 0
                      ? `Add More (${getItemQuantityInCart(item.id)} in cart)`
                      : 'Add to Cart'}
                  </span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MenuItemsManagement;