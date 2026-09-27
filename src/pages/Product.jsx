import { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { FiMinus, FiPlus } from "react-icons/fi";
import api from "../lib/api.js";
import { formatNaira } from "../lib/currency.js";
import { useCart } from "../context/CartContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import ProductCard from "../components/ProductCard.jsx";
import ReviewList from "../components/ReviewList.jsx";

const Product = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { showToast } = useToast();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeImage, setActiveImage] = useState(0);
  const [qty, setQty] = useState(1);
  const [size, setSize] = useState("");

  const load = () => {
    setLoading(true);
    api
      .get(`/products/${slug}`)
      .then(({ data }) => {
        setData(data);
        setActiveImage(0);
        setQty(1);
        setSize(data.product.sizes?.[0] || "");
      })
      .catch((err) => {
        if (err.response?.status === 404) {
          setError("not_found");
        } else {
          setError("Could not load this product.");
        }
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (loading) {
    return <div className="container-app py-28 text-center text-charcoal/60">Loading product...</div>;
  }

  if (error === "not_found") {
    navigate("/404", { replace: true });
    return null;
  }

  if (error) {
    return <div className="container-app py-28 text-center text-accent-600">{error}</div>;
  }

  const { product, related, reviews } = data;
  const inStock = product.stock > 0;

  const handleAddToCart = () => {
    if (product.isWearable && product.sizes?.length > 0 && !size) {
      showToast("Please select a size.", "error");
      return;
    }
    addItem(product, qty, size || undefined);
    showToast(`${product.name} added to cart.`);
  };

  return (
    <div className="container-app py-12 pt-28">
      <div className="grid gap-10 lg:grid-cols-2">
        <div>
          <div className="aspect-square overflow-hidden rounded-3xl bg-blush shadow-soft">
            <img
              src={product.images?.[activeImage] || "https://via.placeholder.com/600"}
              alt={product.name}
              className="h-full w-full object-cover"
            />
          </div>
          {product.images?.length > 1 && (
            <div className="mt-3 flex gap-2">
              {product.images.map((img, i) => (
                <button
                  key={img}
                  onClick={() => setActiveImage(i)}
                  className={`h-16 w-16 overflow-hidden rounded-xl border-2 ${
                    activeImage === i ? "border-brand-600" : "border-transparent"
                  }`}
                >
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        <div>
          <p className="text-xs font-medium uppercase tracking-wide text-brand-600">{product.category}</p>
          <h1 className="mt-1 font-display text-3xl font-semibold">{product.name}</h1>
          <p className="mt-3 font-display text-3xl font-bold text-charcoal">{formatNaira(product.price)}</p>
          <p className={`mt-1 text-sm font-medium ${inStock ? "text-green-700" : "text-accent-600"}`}>
            {inStock ? `${product.stock} in stock` : "Out of stock"}
          </p>

          {product.isWearable && product.sizes?.length > 0 && (
            <div className="mt-5">
              <p className="label-field">Size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`min-h-[44px] rounded-xl border px-4 text-sm font-medium ${
                      size === s ? "border-brand-600 bg-brand-50 text-brand-700" : "border-charcoal/15"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="mt-5">
            <p className="label-field">Quantity</p>
            <div className="flex w-fit items-center rounded-full border border-charcoal/15">
              <button
                aria-label="Decrease quantity"
                className="flex h-11 w-11 items-center justify-center"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
              >
                <FiMinus />
              </button>
              <span className="w-8 text-center">{qty}</span>
              <button
                aria-label="Increase quantity"
                className="flex h-11 w-11 items-center justify-center"
                onClick={() => setQty((q) => Math.min(product.stock, q + 1))}
              >
                <FiPlus />
              </button>
            </div>
          </div>

          <button onClick={handleAddToCart} disabled={!inStock} className="btn-primary mt-6 w-full sm:w-auto">
            {inStock ? "Add to Cart" : "Out of Stock"}
          </button>

          <div className="mt-8 space-y-2 border-t border-charcoal/10 pt-6 text-sm text-charcoal/70">
            <p>{product.description}</p>
            {product.sku && <p className="text-charcoal/50">SKU: {product.sku}</p>}
          </div>
        </div>
      </div>

      {related?.length > 0 && (
        <div className="mt-16">
          <h2 className="mb-6 font-display text-2xl font-semibold">Related Products</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {related.map((p) => (
              <ProductCard key={p._id} product={p} />
            ))}
          </div>
        </div>
      )}

      <ReviewList productId={product._id} reviews={reviews} onSubmitted={load} />
    </div>
  );
};

export default Product;
