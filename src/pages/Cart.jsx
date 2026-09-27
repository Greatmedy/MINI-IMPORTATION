import { Link, useNavigate } from "react-router-dom";
import { FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useCart } from "../context/CartContext.jsx";
import { useAuth } from "../context/AuthContext.jsx";
import { formatNaira } from "../lib/currency.js";

const Cart = () => {
  const { items, updateQty, removeItem, subtotal } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (!user) {
      navigate("/login?next=/checkout");
      return;
    }
    navigate("/checkout");
  };

  if (items.length === 0) {
    return (
      <div className="container-app flex flex-col items-center gap-4 py-28 pt-32 text-center">
        <p className="font-display text-2xl font-semibold">Your cart is empty</p>
        <Link to="/shop" className="btn-primary">
          Start shopping
        </Link>
      </div>
    );
  }

  return (
    <div className="container-app py-12 pt-28">
      <h1 className="mb-8 font-display text-3xl font-semibold">Your Cart</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <ul className="space-y-4">
            {items.map((item) => (
              <li key={`${item.productId}-${item.size || "n"}`} className="card flex gap-4 p-4">
                <img
                  src={item.image || "https://via.placeholder.com/120"}
                  alt={item.name}
                  className="h-24 w-24 shrink-0 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <p className="font-medium">{item.name}</p>
                  {item.size && <p className="text-xs text-charcoal/50">Size: {item.size}</p>}
                  <p className="mt-1 font-semibold text-brand-700">{formatNaira(item.price)}</p>
                  <div className="mt-3 flex items-center gap-4">
                    <div className="flex items-center rounded-full border border-charcoal/15">
                      <button
                        aria-label="Decrease quantity"
                        className="flex h-9 w-9 items-center justify-center"
                        onClick={() => updateQty(item.productId, item.size, item.qty - 1)}
                      >
                        <FiMinus size={14} />
                      </button>
                      <span className="w-6 text-center text-sm">{item.qty}</span>
                      <button
                        aria-label="Increase quantity"
                        className="flex h-9 w-9 items-center justify-center"
                        onClick={() => updateQty(item.productId, item.size, item.qty + 1)}
                      >
                        <FiPlus size={14} />
                      </button>
                    </div>
                    <button
                      aria-label="Remove item"
                      onClick={() => removeItem(item.productId, item.size)}
                      className="flex items-center gap-1 text-sm text-accent-600 hover:text-accent-700"
                    >
                      <FiTrash2 size={16} /> Remove
                    </button>
                  </div>
                </div>
                <p className="font-display font-semibold">{formatNaira(item.price * item.qty)}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className="card h-fit p-6">
          <h2 className="mb-4 font-display text-lg font-semibold">Order Summary</h2>
          <div className="flex justify-between text-sm text-charcoal/70">
            <span>Subtotal</span>
            <span>{formatNaira(subtotal)}</span>
          </div>
          <p className="mt-1 text-xs text-charcoal/50">Delivery fee is calculated at checkout based on your address.</p>
          <button onClick={handleCheckout} className="btn-primary mt-6 w-full">
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
