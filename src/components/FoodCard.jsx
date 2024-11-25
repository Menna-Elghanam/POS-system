import { FaStar, FaRegStar, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const FoodCard = ({ food }) => {
  const { addToCart } = useCart();

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Image */}
      {/* <img
        src={food.imageUrl}
        alt={food.name}
        className="w-full h-48 object-cover"
      /> */}
      {/* Details */}
      <div className="p-4">
        <h2 className="text-xl font-semibold">{food.name}</h2>
        <p className="text-gray-600 mt-2">${food.price}</p>
        <p className="text-gray-600">Cook Time: {food.cookTime} mins</p>

        {/* Tags */}
        <div className="mt-2">
          {food.tags.map((tag) => (
            <span
              key={tag}
              className="inline-block bg-gray-200 text-gray-700 text-xs px-2 py-1 rounded-full mr-2"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Stars */}
        <div className="flex items-center mt-3">
          {Array.from({ length: 5 }, (_, index) =>
            index < food.stars ? (
              <FaStar key={index} className="text-yellow-400" />
            ) : (
              <FaRegStar key={index} className="text-yellow-400" />
            )
          )}
        </div>

        <div className="flex justify-between items-center mt-4">
          {/* <Link
            to={`/food/${food.id}`}
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            View Details
          </Link> */}
          <button
            onClick={() => addToCart(food)}
            className="flex items-center space-x-2 bg-neutral-900 text-white px-4 py-2 rounded-lg hover:bg-neutral-700 transition duration-200"
          >
            <FaShoppingCart className="text-sm" />
            <span>Place Order  </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
