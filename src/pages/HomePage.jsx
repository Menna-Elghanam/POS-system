import { useEffect, useReducer, useState } from "react";
import { getAll, search, getAllTags } from "../services/foodService";
import FoodCard from "../components/FoodCard";
import { useParams, useNavigate } from "react-router-dom";
import SearchBar from "../components/SearchBar ";
import Tags from "../components/Tags";

// Initial state
const initialState = {
  foods: [],
  tags: [],
  loading: true,
  error: null,
};

// Reducer function
const reducer = (state, action) => {
  switch (action.type) {
    case "FETCH_SUCCESS":
      return { ...state, foods: action.payload, loading: false };
    case "FETCH_TAGS_SUCCESS":
      return { ...state, tags: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: "Failed to fetch data" };
    default:
      return state;
  }
};

const Home = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { searchTerm } = useParams(); // Get search term from URL
  const [selectedTag, setSelectedTag] = useState("All");

  const navigate = useNavigate();

  useEffect(() => {
    // Fetch foods based on search term
    const fetchFoods = async () => {
      try {
        const foods = searchTerm ? await search(searchTerm) : await getAll();
        dispatch({ type: "FETCH_SUCCESS", payload: foods });
      } catch (error) {
        dispatch({ type: "FETCH_ERROR" });
      }
    };

    // Fetch tags from the backend
    const fetchTags = async () => {
      try {
        const tags = await getAllTags();
        dispatch({ type: "FETCH_TAGS_SUCCESS", payload: tags });
      } catch (error) {
        console.error("Error fetching tags:", error);
      }
    };

    fetchFoods();
    fetchTags();
  }, [searchTerm]); // Trigger fetching when searchTerm changes

  const { foods, tags, loading, error } = state;

  // Filter foods based on selected tag
  const filteredFoods =
    selectedTag === "All"
      ? foods
      : foods.filter((food) => food.tags?.includes(selectedTag));

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-6">Food Menu</h1>

      {/* Search Bar */}
      <SearchBar navigate={navigate} searchTerm={searchTerm || ""} />

      {/* Tags Bar */}
      <Tags
        tags={tags}
        selectedTag={selectedTag}
        onTagSelect={setSelectedTag}
      />

      {/* Loading state */}
      {loading && <p>Loading...</p>}

      {/* Error state */}
      {error && <p className="text-red-500">{error}</p>}

      {/* Food Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredFoods.length > 0 ? (
          filteredFoods.map((food) => <FoodCard key={food.id} food={food} />)
        ) : (
          <p>No food items match your search.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
