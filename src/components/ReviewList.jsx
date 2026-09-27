import { useState } from "react";
import { FiStar } from "react-icons/fi";
import { useAuth } from "../context/AuthContext.jsx";
import { useToast } from "../context/ToastContext.jsx";
import { Link } from "react-router-dom";
import api from "../lib/api.js";

const StarRow = ({ value, onChange }) => (
  <div className="flex gap-1">
    {[1, 2, 3, 4, 5].map((n) => (
      <button
        key={n}
        type="button"
        aria-label={`Rate ${n} star${n > 1 ? "s" : ""}`}
        onClick={() => onChange?.(n)}
        className={onChange ? "cursor-pointer" : "cursor-default"}
      >
        <FiStar size={20} className={n <= value ? "fill-brand-500 text-brand-500" : "text-charcoal/20"} />
      </button>
    ))}
  </div>
);

const ReviewList = ({ productId, reviews, onSubmitted }) => {
  const { user } = useAuth();
  const { showToast } = useToast();
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const existingReview = reviews.find((r) => r.user?._id === user?._id);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!comment.trim()) {
      setError("Please write a short comment.");
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await api.post(`/products/${productId}/reviews`, { rating, comment });
      showToast(existingReview ? "Review updated." : "Thanks for your review!");
      setComment("");
      onSubmitted?.();
    } catch (err) {
      setError(err.response?.data?.message || "Could not submit your review.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mt-10">
      <h2 className="mb-4 font-display text-xl font-semibold">Reviews ({reviews.length})</h2>

      {reviews.length === 0 && (
        <p className="mb-6 text-sm text-charcoal/60">No reviews yet. Be the first to share your experience.</p>
      )}

      <ul className="mb-8 space-y-4">
        {reviews.map((r) => (
          <li key={r._id} className="card p-4">
            <div className="mb-1 flex items-center justify-between">
              <span className="font-medium">{r.user?.name || "FOA Customer"}</span>
              <StarRow value={r.rating} />
            </div>
            <p className="text-sm text-charcoal/70">{r.comment}</p>
          </li>
        ))}
      </ul>

      {user ? (
        <form onSubmit={handleSubmit} className="card space-y-3 p-5">
          <p className="font-medium">{existingReview ? "Update your review" : "Leave a review"}</p>
          <StarRow value={rating} onChange={setRating} />
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this product..."
            rows={3}
            className="input-field"
          />
          {error && <p className="field-error">{error}</p>}
          <button type="submit" disabled={submitting} className="btn-primary">
            {submitting ? "Submitting..." : existingReview ? "Update review" : "Submit review"}
          </button>
        </form>
      ) : (
        <p className="card p-5 text-sm text-charcoal/70">
          <Link to="/login" className="font-semibold text-brand-700 hover:underline">
            Log in
          </Link>{" "}
          to leave a review.
        </p>
      )}
    </div>
  );
};

export default ReviewList;
