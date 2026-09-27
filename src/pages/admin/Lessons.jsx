import { useEffect, useState } from "react";
import { FiPlus, FiX, FiTrash2, FiEdit2 } from "react-icons/fi";
import api from "../../lib/api.js";
import { useToast } from "../../context/ToastContext.jsx";

const blankForm = { title: "", description: "", order: "", published: false };

const Lessons = () => {
  const { showToast } = useToast();
  const [lessons, setLessons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(blankForm);
  const [file, setFile] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const load = () => {
    setLoading(true);
    api.get("/admin/lessons").then(({ data }) => setLessons(data.lessons)).finally(() => setLoading(false));
  };

  useEffect(load, []);

  const openCreate = () => {
    setEditing(null);
    setForm({ ...blankForm, order: lessons.length + 1 });
    setFile(null);
    setError("");
    setShowForm(true);
  };

  const openEdit = (l) => {
    setEditing(l);
    setForm({ title: l.title, description: l.description, order: l.order, published: l.published });
    setFile(null);
    setError("");
    setShowForm(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((f) => ({ ...f, [name]: type === "checkbox" ? checked : value }));
  };

  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (f && f.size > 200 * 1024 * 1024) {
      setError("That file is larger than the 200MB limit. Please choose a smaller video.");
      setFile(null);
      return;
    }
    setError("");
    setFile(f || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title || !form.description || form.order === "") {
      setError("Title, description, and lesson order are required.");
      return;
    }
    if (!editing && !file) {
      setError("Please choose a video file to upload.");
      return;
    }
    setSaving(true);
    try {
      const fd = new FormData();
      fd.append("title", form.title);
      fd.append("description", form.description);
      fd.append("order", form.order);
      fd.append("published", form.published);
      if (file) fd.append("video", file);

      if (editing) {
        await api.put(`/admin/lessons/${editing._id}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
        showToast("Lesson updated.");
      } else {
        await api.post("/admin/lessons", fd, { headers: { "Content-Type": "multipart/form-data" } });
        showToast("Lesson uploaded.");
      }
      setShowForm(false);
      load();
    } catch (err) {
      setError(err.response?.data?.message || "Could not save the lesson.");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this lesson? This cannot be undone.")) return;
    try {
      await api.delete(`/admin/lessons/${id}`);
      setLessons((prev) => prev.filter((l) => l._id !== id));
      showToast("Lesson deleted.");
    } catch (err) {
      showToast(err.response?.data?.message || "Could not delete lesson.", "error");
    }
  };

  const togglePublished = async (l) => {
    try {
      const fd = new FormData();
      fd.append("published", !l.published);
      const { data } = await api.put(`/admin/lessons/${l._id}`, fd, { headers: { "Content-Type": "multipart/form-data" } });
      setLessons((prev) => prev.map((x) => (x._id === l._id ? data.lesson : x)));
    } catch (err) {
      showToast("Could not update publish state.", "error");
    }
  };

  return (
    <div>
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold">Academy Videos</h1>
        <button onClick={openCreate} className="btn-primary">
          <FiPlus /> Upload Lesson
        </button>
      </div>

      {loading ? (
        <p className="text-charcoal/60">Loading lessons...</p>
      ) : lessons.length === 0 ? (
        <p className="card p-8 text-center text-charcoal/60">No lessons uploaded yet.</p>
      ) : (
        <div className="space-y-3">
          {lessons
            .slice()
            .sort((a, b) => a.order - b.order)
            .map((l) => (
              <div key={l._id} className="card flex flex-col gap-4 p-4 sm:flex-row sm:items-center">
                <video src={l.videoUrl} className="h-24 w-40 shrink-0 rounded-xl bg-black object-cover" controls preload="metadata" />
                <div className="flex-1">
                  <p className="font-medium">Lesson {l.order}: {l.title}</p>
                  <p className="text-sm text-charcoal/60">{l.description}</p>
                  <button
                    onClick={() => togglePublished(l)}
                    className={`mt-2 inline-block rounded-full px-3 py-1 text-xs font-semibold ${
                      l.published ? "bg-green-100 text-green-700" : "bg-blush text-charcoal/60"
                    }`}
                  >
                    {l.published ? "Published" : "Unpublished — click to publish"}
                  </button>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEdit(l)} className="btn-secondary !py-2 text-xs">
                    <FiEdit2 size={14} /> Edit
                  </button>
                  <button onClick={() => handleDelete(l._id)} className="flex items-center gap-1 rounded-2xl border border-accent-600/30 px-3 py-2 text-xs font-semibold text-accent-600 hover:bg-accent-600/10">
                    <FiTrash2 size={14} /> Delete
                  </button>
                </div>
              </div>
            ))}
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-charcoal/50 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white p-6">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="font-display text-lg font-semibold">{editing ? "Edit Lesson" : "Upload Lesson"}</h2>
              <button onClick={() => setShowForm(false)} className="flex h-9 w-9 items-center justify-center rounded-full hover:bg-blush">
                <FiX />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="label-field">Title</label>
                <input name="title" value={form.title} onChange={handleChange} className="input-field" />
              </div>
              <div>
                <label className="label-field">Short Description</label>
                <textarea name="description" value={form.description} onChange={handleChange} rows={3} className="input-field" />
              </div>
              <div>
                <label className="label-field">Lesson Order</label>
                <input type="number" name="order" value={form.order} onChange={handleChange} className="input-field" />
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" name="published" checked={form.published} onChange={handleChange} />
                Published (visible to registered students)
              </label>
              <div>
                <label className="label-field">Video File {editing ? "(leave empty to keep current)" : ""}</label>
                <input type="file" accept="video/*" onChange={handleFileChange} className="input-field !py-2" />
                <p className="mt-1 text-xs text-charcoal/50">Max file size: 200MB</p>
              </div>

              {error && <p className="field-error">{error}</p>}

              <button type="submit" disabled={saving} className="btn-primary w-full">
                {saving ? "Uploading..." : editing ? "Update Lesson" : "Upload Lesson"}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Lessons;
