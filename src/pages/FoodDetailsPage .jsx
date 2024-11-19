// import { useEffect, useState } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { getById } from "../services/foodService";

// const FoodDetails = () => {
//   const { foodId } = useParams(); // Get food ID from the URL
//   const [food, setFood] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchFood = async () => {
//       try {
//         const fetchedFood = await getById(foodId); // Fetch food by ID
//         if (fetchedFood) {
//           setFood(fetchedFood);
//         } else {
//           setError("Food item not found");
//         }
//         setLoading(false);
//       } catch (err) {
//         setError("Failed to fetch food details");
//         setLoading(false);
//       }
//     };
//     fetchFood();
//   }, [foodId]);

//   const addToCart = () => {
//     // Assuming you have some cart logic to handle this
//     console.log(`${food.name} added to cart`);
//   };

//   if (loading) return <p>Loading food details...</p>;
//   if (error) return <p className="text-red-500">{error}</p>;

//   return (
//     <div className="container mx-auto p-4">
//       <h1 className="text-3xl font-bold mb-6">{food.name}</h1>
//       <img src={`/${food.imageUrl}`} alt={food.name} className="mb-4" />
//       <p className="text-lg">{food.description}</p>
//       <p className="text-xl font-bold">${food.price}</p>
//       <button
//         onClick={addToCart}
//         className="bg-blue-500 text-white py-2 px-4 rounded mt-4"
//       >
//         Add to Cart
//       </button>
//       <button
//         onClick={() => navigate(-1)} // Go back to the previous page
//         className="bg-gray-500 text-white py-2 px-4 rounded mt-4 ml-4"
//       >
//         Go Back
//       </button>
//     </div>
//   );
// };

// export default FoodDetails;



