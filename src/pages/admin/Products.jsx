import { useEffect, useState } from "react";
import { FiEdit2, FiTrash2, FiPlus, FiX } from "react-icons/fi";
import api from "../../lib/api.js";
import { formatNaira } from "../../lib/currency.js";
import { useToast } from "../../context/ToastContext.jsx";

const blankForm = {
  name: "",
  description: "",
  price: "",
  category: "",
  stock: "",
  isWearable: false,
  sizes: "",
  featured: false,
  sku: "",
};

const Products = () => {
  const { showToast } = useToast();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blankForm);
  const [files, setFiles] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    api.get("/admin/products").then(({ data }) => setProducts(data.products)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setEditing(null);
    setForm(blankForm);
    setFiles([]);
    setError("");
    setShowForm(true);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
      stock: p.stock,
      isWearable: p.isWearable,
      sizes: (p.sizes || []).join(", "),
      featured: p.featured,
      sku: p.sku || "",
    });
    setFiles([]);
    setError("");
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.name || !form.description || !form.price || !form.category) {
      setError("Name, description, price, and category are required.");
      return;
    }
    setSaving(true);
    try {
      const fd = new FormData();
      Object.entries(form).forEach(([k, v]) => fd.append(k, v));
      files.forEach((f) => fd.append("images", f));

      if (editing) {
        await api.put(`/admin/products/${editing._id}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
        showToast("Product updated.");
      } else {
        if (files.length === 0) {
          setError("Please add at least one product image.");
          setSaving(false);
          return;
        }
        await api.post("/admin/products", fd, { headers: { "Content-Type": "multipart/form-data" } });
        showToast("Product created.");
      }
      setShowForm(false);
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save the product.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product? This cannot be undone.")) return;
    try {
      await api.delete(`/admin/products/${id}`);
      setProducts((prev) => prev.filter((p) => p._id !== id));
      showToast("Product deleted.");
    } catch (err) {
      showToast(err.response?.data?.message || "Could not delete product.", "error");
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">Products</h1>
        <button onClick={openCreate} className="btn-primary">
          <FiPlus /> Add Product
        </button>
      </div>

      {loading ? (
        <p className="text-charcoal/60">Loading products...</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {products.map((p) => (
            <div key={p._id} className="card overflow-hidden">
              <img src={p.images?.[0]} alt={p.name} className="h-40 w-full object-cover" />
              <div className="p-4">
                <p className="text-xs uppercase text-brand-600">{p.category}</p>
                <h3 className="font-display font-semibold">{p.name}</h3>
                <p className="mt-1 font-semibold">{formatNaira(p.price)} &middot; {p.stock} in stock</p>
                <div className="mt-3 flex gap-2">
                  <button onClick={() => openEdit(p)} className="btn-secondary flex-1 !py-2 text-xs">
                    <FiEdit2 size={14} /> Edit
                  </button>
                  <button onClick={() => handleDelete(p._id)} className="flex items-center justify-center gap-1 rounded-2xl border border-accent-600/30 px-3 py-2 text-xs font-semibold text-accent-600 hover:bg-accent-600/10">
                    <FiTrash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-charcoal/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">{editing ? "Edit Product" : "Add Product"}</h2>
              <button onClick={() => setShowForm(false)} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-blush">
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="label-field">Name</label>
                <input name="name" value={form.name} onChange={handleChange} className="input-field" />
              </div>
              <div>
                <label className="label-field">Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="input-field" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-field">Price (₦)</label>
                  <input type="number" name="price" value={form.price} onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label className="label-field">Stock</label>
                  <input type="number" name="stock" value={form.stock} onChange={handleChange} className="input-field" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label-field">Category</label>
                  <input name="category" value={form.category} onChange={handleChange} className="input-field" />
                </div>
                <div>
                  <label className="label-field">SKU</label>
                  <input name="sku" value={form.sku} onChange={handleChange} className="input-field" />
                </div>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="isWearable" checked={form.isWearable} onChange={handleChange} />
                  Wearable (has sizes)
                </label>
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" name="featured" checked={form.featured} onChange={handleChange} />
                  Featured
                </label>
              </div>
              {form.isWearable && (
                <div>
                  <label className="label-field">Sizes (comma-separated)</label>
                  <input name="sizes" value={form.sizes} onChange={handleChange} placeholder="S, M, L, XL" className="input-field" />
                </div>
              )}
              <div>
                <label className="label-field">Images {editing ? "(leave empty to keep current)" : ""}</label>
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setFiles(Array.from(e.target.files))}
                  className="input-field !py-2"
                />
              </div>

              {error && <p className="field-error">{error}</p>}

              <button type="submit" disabled={saving} className="btn-primary w-full">
                {saving ? "Saving..." : editing ? "Update Product" : "Create Product"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Products;
