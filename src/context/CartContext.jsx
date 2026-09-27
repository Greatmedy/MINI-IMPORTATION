import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useAuth } from "./AuthContext.jsx";

const CartContext = createContext(null);

const STORAGE_KEY = "foa_cart_v1";

const readStoredCart = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    return [];
  }
};

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(readStoredCart);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth() || {};

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  // Merge behaviour: cart already lives in localStorage per-browser, so on
  // login we simply keep whatever is already there (guest cart carries over).
  useEffect(() => {
    if (user) {
      const stored = readStoredCart();
      if (stored.length && items.length === 0) setItems(stored);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const addItem = (product, qty = 1, size = undefined) => {
    setItems((prev) => {
      const key = (p) => `${p.productId}__${p.size || ""}`;
      const existingIndex = prev.findIndex((p) => key(p) === key({ productId: product._id, size }));
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          qty: Math.min(next[existingIndex].qty + qty, product.stock || 99),
        };
        return next;
      }
      return [
        ...prev,
        {
          productId: product._id,
          name: product.name,
          image: product.images?.[0] || "",
          price: product.price,
          stock: product.stock,
          qty,
          size,
        },
      ];
    });
    setIsOpen(true);
  };

  const updateQty = (productId, size, qty) => {
    setItems((prev) =>
      prev
        .map((it) =>
          it.productId === productId && it.size === size
            ? { ...it, qty: Math.max(1, Math.min(qty, it.stock || 99)) }
            : it
        )
        .filter((it) => it.qty > 0)
    );
  };

  const removeItem = (productId, size) => {
    setItems((prev) => prev.filter((it) => !(it.productId === productId && it.size === size)));
  };

  const clearCart = () => setItems([]);

  const subtotal = useMemo(
    () => items.reduce((sum, it) => sum + it.price * it.qty, 0),
    [items]
  );

  const count = useMemo(() => items.reduce((sum, it) => sum + it.qty, 0), [items]);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateQty,
        removeItem,
        clearCart,
        subtotal,
        count,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
