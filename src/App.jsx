import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/HomePage";
import Orders from "./pages/Orders";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import DashBoard from "./pages/DashBoard";
import FoodDetails from "./pages/FoodDetailsPage ";
import CartPage from "./pages/CartPage";

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    
    path: "/", // Root path
    element: <Layout />, // Layout component
    children: [
      { path: "/", element: <Home /> }, // Home without search
      { path: "search/:searchTerm", element: <Home /> }, // Home with search term
      { path: "orders", element: <Orders /> },
      { path: "dashboard", element: <DashBoard /> },
      { path: "cart", element: <CartPage /> },


      { path: "profile", element: <Profile /> },
    
      { path: "/food/:foodId", element: <FoodDetails/> },

    ],
  },
  { path: "/login", element: <Login /> }, // Login page (outside of layout)
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
