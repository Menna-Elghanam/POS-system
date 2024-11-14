import { useCart } from "../context/CartContext";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";

function Header() {
  const { getCartItemsCount } = useCart();

  return (
    <Link to="/cart" className="relative">
      <FaShoppingCart className="text-2xl" />
      {getCartItemsCount() > 0 && (
        <span className=" bg-blackabsolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {getCartItemsCount()}
        </span>
      )}
    </Link>
  );
}
export default Header;
