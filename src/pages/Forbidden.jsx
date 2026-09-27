import { Link } from "react-router-dom";
import { FiLock } from "react-icons/fi";

const Forbidden = () => (
  <div className="container-app flex min-h-[70vh] flex-col items-center justify-center gap-4 py-16 pt-28 text-center">
    <FiLock size={40} className="text-charcoal/30" />
    <h1 className="font-display text-2xl font-semibold">Access Restricted</h1>
    <p className="max-w-md text-charcoal/60">This area is only available to FOA administrators.</p>
    <Link to="/" className="btn-primary">
      Back to Home
    </Link>
  </div>
);

export default Forbidden;
