import "./index.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Layout from "./layouts/Layout";
import Home from "./pages/HomePage";
import Profile from "./pages/Profile";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import OrdersPage from "./pages/OrdersPage";
import Dashboard from "./pages/DashBoard";

// Define routes using createBrowserRouter
const router = createBrowserRouter([
  {
    
    path: "/", // Root path
    element: <Layout />, // Layout component
    children: [
      { path: "/", element: <Home /> }, // Home without search
      { path: "search/:searchTerm", element: <Home /> }, // Home with search term
      { path: "dashboard", element: <Dashboard /> },
      { path: "orders", element: <OrdersPage /> },




      { path: "profile", element: <Profile /> },
    
      // { path: "/food/:foodId", element: <FoodDetails/> },

    ],
  },
  { path: "/login", element: <Login /> },
  { path: "signup", element: <Signup /> },
  // Login page (outside of layout)
]);

const App = () => {
  return <RouterProvider router={router} />;
};

export default App;
