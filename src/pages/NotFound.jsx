import { Link } from "react-router-dom";

const NotFound = () => (
  <div className="container-app flex min-h-[70vh] flex-col items-center justify-center gap-4 py-16 pt-28 text-center">
    <p className="font-display text-6xl font-bold text-brand-600">404</p>
    <h1 className="font-display text-2xl font-semibold">Page Not Found</h1>
    <p className="max-w-md text-charcoal/60">
      The page you're looking for doesn't exist or may have moved. Let's get you back on track.
    </p>
    <Link to="/" className="btn-primary">
      Back to Home
    </Link>
  </div>
);

export default NotFound;
