import { Link } from "react-router-dom";
import { FiStar } from "react-icons/fi";
import { formatNaira } from "../lib/currency.js";

const ProductCard = ({ product }) => {
  const inStock = product.stock > 0;

  return (
    <Link
      to={`/product/${product.slug}`}
      className="group card overflow-hidden transition hover:-translate-y-1 hover:shadow-lg"
    >
      <div className="relative aspect-square w-full overflow-hidden bg-blush">
        <img
          src={product.images?.[0] || "https://via.placeholder.com/500"}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
        <span
          className={`absolute left-3 top-3 rounded-full px-3 py-1 text-xs font-semibold ${
            inStock ? "bg-white/90 text-charcoal" : "bg-accent-600 text-white"
          }`}
        >
          {inStock ? `${product.stock} in stock` : "Out of stock"}
        </span>
      </div>
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wide text-brand-600">{product.category}</p>
        <h3 className="mt-1 truncate font-display text-base font-semibold text-charcoal">{product.name}</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="font-display text-lg font-bold text-charcoal">{formatNaira(product.price)}</span>
          {product.ratingCount > 0 && (
            <span className="flex items-center gap-1 text-xs text-charcoal/60">
              <FiStar className="fill-brand-500 text-brand-500" /> {product.ratingAvg.toFixed(1)} ({product.ratingCount})
            </span>
          )}
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
