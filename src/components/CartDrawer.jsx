import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { FiX, FiMinus, FiPlus, FiTrash2 } from "react-icons/fi";
import { useCart } from "../context/CartContext.jsx";
import { formatNaira } from "../lib/currency.js";

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, updateQty, removeItem, subtotal } = useCart();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-charcoal/40"
            onClick={() => setIsOpen(false)}
          />
          <motion.aside
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed right-0 top-0 z-[70] flex h-full w-full max-w-md flex-col bg-white shadow-2xl"
            role="dialog"
            aria-label="Shopping cart"
          >
            <div className="flex items-center justify-between border-b border-charcoal/10 px-5 py-4">
              <h2 className="font-display text-lg font-semibold">Your Cart</h2>
              <button
                onClick={() => setIsOpen(false)}
                aria-label="Close cart"
                className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-blush"
              >
                <FiX size={20} />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-5 py-4">
              {items.length === 0 ? (
                <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-charcoal/60">
                  <p>Your cart is empty.</p>
                  <Link to="/shop" onClick={() => setIsOpen(false)} className="btn-primary">
                    Start shopping
                  </Link>
                </div>
              ) : (
                <ul className="flex flex-col gap-4">
                  {items.map((item) => (
                    <li key={`${item.productId}-${item.size || "n"}`} className="flex gap-3">
                      <img
                        src={item.image || "https://via.placeholder.com/100"}
                        alt={item.name}
                        className="h-20 w-20 shrink-0 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <p className="font-medium text-charcoal">{item.name}</p>
                        {item.size && <p className="text-xs text-charcoal/50">Size: {item.size}</p>}
                        <p className="mt-1 text-sm font-semibold text-brand-700">{formatNaira(item.price)}</p>
                        <div className="mt-2 flex items-center gap-3">
                          <div className="flex items-center rounded-full border border-charcoal/15">
                            <button
                              aria-label="Decrease quantity"
                              className="flex h-8 w-8 items-center justify-center"
                              onClick={() => updateQty(item.productId, item.size, item.qty - 1)}
                            >
                              <FiMinus size={14} />
                            </button>
                            <span className="w-6 text-center text-sm">{item.qty}</span>
                            <button
                              aria-label="Increase quantity"
                              className="flex h-8 w-8 items-center justify-center"
                              onClick={() => updateQty(item.productId, item.size, item.qty + 1)}
                            >
                              <FiPlus size={14} />
                            </button>
                          </div>
                          <button
                            aria-label="Remove item"
                            onClick={() => removeItem(item.productId, item.size)}
                            className="text-accent-600 hover:text-accent-700"
                          >
                            <FiTrash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {items.length > 0 && (
              <div className="border-t border-charcoal/10 px-5 py-4">
                <div className="mb-3 flex items-center justify-between text-sm font-medium">
                  <span>Subtotal</span>
                  <span className="font-display text-lg font-semibold">{formatNaira(subtotal)}</span>
                </div>
                <p className="mb-3 text-xs text-charcoal/50">Delivery fee is calculated at checkout.</p>
                <Link to="/cart" onClick={() => setIsOpen(false)} className="btn-primary w-full">
                  Checkout
                </Link>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
};

export default CartDrawer;
