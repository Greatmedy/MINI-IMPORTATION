import { createContext, useCallback, useContext, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FiCheckCircle, FiXCircle, FiInfo } from "react-icons/fi";

const ToastContext = createContext(null);

let idCounter = 0;

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const showToast = useCallback(
    (message, type = "success") => {
      const id = ++idCounter;
      setToasts((prev) => [...prev, { id, message, type }]);
      setTimeout(() => removeToast(id), 3500);
    },
    [removeToast]
  );

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-4 right-4 z-[100] flex flex-col gap-2 sm:bottom-6 sm:right-6">
        <AnimatePresence>
          {toasts.map((t) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 10, scale: 0.95 }}
              className={`flex max-w-xs items-start gap-2 rounded-2xl px-4 py-3 shadow-soft text-sm font-medium text-white ${
                t.type === "error" ? "bg-accent-700" : t.type === "info" ? "bg-charcoal" : "bg-brand-600"
              }`}
              role="status"
            >
              {t.type === "error" ? (
                <FiXCircle className="mt-0.5 shrink-0" />
              ) : t.type === "info" ? (
                <FiInfo className="mt-0.5 shrink-0" />
              ) : (
                <FiCheckCircle className="mt-0.5 shrink-0" />
              )}
              <span>{t.message}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </ToastContext.Provider>
  );
};

export const useToast = () => useContext(ToastContext);
