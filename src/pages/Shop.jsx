import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import ProductCard from "../components/ProductCard.jsx";
import ProductCardSkeleton from "../components/ProductCardSkeleton.jsx";
import api from "../lib/api.js";

const categories = ["All", "Phone Accessories", "Beauty", "Home", "Fashion"];

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "All";
  const sort = searchParams.get("sort") || "newest";
  const inStock = searchParams.get("inStock") === "true";

  useEffect(() => {
    setLoading(true);
    setError("");
    const params = { sort };
    if (q) params.q = q;
    if (category && category !== "All") params.category = category;
    if (inStock) params.inStock = "true";

    api
      .get("/products", { params })
      .then(({ data }) => setProducts(data.products))
      .catch(() => setError("Could not load products. Please try again."))
      .finally(() => setLoading(false));
  }, [q, category, sort, inStock]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value === undefined || value === "" || value === "All") next.delete(key);
    else next.set(key, value);
    setSearchParams(next);
  };

  return (
    <div className="container-app py-12 pt-28">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="font-display text-3xl font-semibold">Shop</h1>
          <p className="text-charcoal/60">Factory-priced, quality-checked goods delivered across Nigeria.</p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            updateParam("q", e.target.elements.q.value);
          }}
          className="relative w-full sm:w-72"
        >
          <FiSearch className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-charcoal/40" />
          <input name="q" defaultValue={q} placeholder="Search products..." className="input-field pl-9" />
        </form>
      </div>

      <div className="mb-8 flex flex-wrap items-center gap-3">
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => updateParam("category", c)}
              className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                category === c ? "bg-brand-600 text-white" : "bg-white text-charcoal/70 hover:bg-blush"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="ml-auto flex items-center gap-3">
          <label className="flex items-center gap-2 text-sm text-charcoal/70">
            <input
              type="checkbox"
              checked={inStock}
              onChange={(e) => updateParam("inStock", e.target.checked ? "true" : "")}
              className="h-4 w-4 rounded border-charcoal/30 text-brand-600"
            />
            In stock only
          </label>
          <select
            value={sort}
            onChange={(e) => updateParam("sort", e.target.value)}
            className="input-field w-auto"
          >
            <option value="newest">Newest</option>
            <option value="price_asc">Price: Low to High</option>
            <option value="price_desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      {error && <p className="field-error mb-4">{error}</p>}

      {!loading && products.length === 0 ? (
        <div className="card flex flex-col items-center gap-2 py-16 text-center">
          <p className="font-medium">No products match your search.</p>
          <p className="text-sm text-charcoal/60">Try a different keyword or clear your filters.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {loading
            ? Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)
            : products.map((p) => <ProductCard key={p._id} product={p} />)}
        </div>
      )}
    </div>
  );
};

export default Shop;
