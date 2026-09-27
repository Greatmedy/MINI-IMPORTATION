import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiLock, FiPlayCircle } from "react-icons/fi";
import { useAuth } from "../context/AuthContext.jsx";
import api from "../lib/api.js";

const AcademyLessons = () => {
  const { user } = useAuth();
  const [lessons, setLessons] = useState([]);
  const [activeLesson, setActiveLesson] = useState(null);
  const [loading, setLoading] = useState(true);
  const [locked, setLocked] = useState(false);

  const isUnlocked = user?.studentStatus === "registered" && user?.isStudent;

  useEffect(() => {
    if (!isUnlocked) {
      setLocked(true);
      setLoading(false);
      return;
    }
    api
      .get("/lessons")
      .then(({ data }) => setLessons(data.lessons))
      .catch(() => setLocked(true))
      .finally(() => setLoading(false));
  }, [isUnlocked]);

  if (loading) {
    return <div className="container-app py-28 pt-32 text-center text-charcoal/60">Loading lessons...</div>;
  }

  if (locked || !isUnlocked) {
    return (
      <div className="container-app flex flex-col items-center justify-center gap-4 py-28 pt-32 text-center">
        <FiLock size={40} className="text-charcoal/30" />
        <p className="font-display text-xl font-semibold">FOA Academy Lessons Are Locked</p>
        <p className="max-w-md text-sm text-charcoal/60">
          Pay the ₦15,000 enrollment fee to unlock FOA Academy lessons.
        </p>
        <Link to="/academy" className="btn-primary">
          Go to Academy
        </Link>
      </div>
    );
  }

  return (
    <div className="container-app py-12 pt-28">
      <h1 className="font-display text-3xl font-semibold">FOA Academy Lessons</h1>
      <p className="mt-2 text-charcoal/60">Welcome back, {user.name.split(" ")[0]}. Work through the lessons at your own pace.</p>

      {lessons.length === 0 ? (
        <div className="card mt-8 p-10 text-center text-charcoal/60">
          No lessons have been published yet. Check back soon!
        </div>
      ) : (
        <div className="mt-8 grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {activeLesson ? (
              <div className="card overflow-hidden">
                <video
                  key={activeLesson._id}
                  src={activeLesson.videoUrl}
                  controls
                  playsInline
                  preload="metadata"
                  className="aspect-video w-full bg-black"
                />
                <div className="p-5">
                  <h2 className="font-display text-lg font-semibold">
                    Lesson {activeLesson.order}: {activeLesson.title}
                  </h2>
                  <p className="mt-1 text-sm text-charcoal/70">{activeLesson.description}</p>
                </div>
              </div>
            ) : (
              <div className="card flex h-64 items-center justify-center text-charcoal/50">
                Select a lesson to start watching.
              </div>
            )}
          </div>

          <ol className="space-y-2">
            {lessons.map((l) => (
              <li key={l._id}>
                <button
                  onClick={() => setActiveLesson(l)}
                  className={`flex w-full items-start gap-3 rounded-xl border p-4 text-left transition ${
                    activeLesson?._id === l._id ? "border-brand-600 bg-brand-50" : "border-charcoal/10 bg-white hover:bg-blush"
                  }`}
                >
                  <FiPlayCircle className="mt-0.5 shrink-0 text-brand-600" />
                  <span>
                    <span className="block text-sm font-semibold">Lesson {l.order}: {l.title}</span>
                    <span className="block text-xs text-charcoal/60">{l.description}</span>
                  </span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
};

export default AcademyLessons;
