import { useEffect, useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiShoppingBag,
  FiBox,
  FiVideo,
  FiUsers,
  FiSettings,
  FiMenu,
  FiX,
  FiArrowLeft,
} from "react-icons/fi";
import { useAuth } from "../../context/AuthContext.jsx";
import Forbidden from "../Forbidden.jsx";

const navItems = [
  { to: "/admin", label: "Overview", icon: FiGrid, end: true },
  { to: "/admin/orders", label: "Orders", icon: FiShoppingBag },
  { to: "/admin/products", label: "Products", icon: FiBox },
  { to: "/admin/lessons", label: "Academy Videos", icon: FiVideo },
  { to: "/admin/users", label: "Students / Users", icon: FiUsers },
  { to: "/admin/settings", label: "Settings", icon: FiSettings },
];

const AdminLayout = () => {
  const { user, loading } = useAuth();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setDrawerOpen(false);
  }, []);

  if (loading) {
    return <div className="container-app py-28 pt-32 text-center text-charcoal/60">Loading...</div>;
  }

  if (!user || user.role !== "admin") {
    return <Forbidden />;
  }

  const SidebarContent = () => (
    <nav className="flex flex-col gap-1 p-4">
      <button
        onClick={() => navigate("/")}
        className="mb-4 flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium text-white/70 hover:bg-white/10"
      >
        <FiArrowLeft /> Back to site
      </button>
      {navItems.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={() => setDrawerOpen(false)}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${
              isActive ? "bg-brand-600 text-white" : "text-white/70 hover:bg-white/10 hover:text-white"
            }`
          }
        >
          <item.icon size={18} /> {item.label}
        </NavLink>
      ))}
    </nav>
  );

  return (
    <div className="flex min-h-screen pt-16">
      <aside className="hidden w-64 shrink-0 bg-charcoal lg:block">
        <div className="sticky top-16">
          <SidebarContent />
        </div>
      </aside>

      {drawerOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-charcoal/50" onClick={() => setDrawerOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-64 bg-charcoal pt-16 shadow-2xl">
            <SidebarContent />
          </div>
        </div>
      )}

      <div className="flex-1">
        <div className="sticky top-16 z-30 flex items-center gap-3 border-b border-charcoal/10 bg-white/80 px-4 py-3 backdrop-blur lg:hidden">
          <button
            onClick={() => setDrawerOpen(true)}
            aria-label="Open admin menu"
            className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-blush"
          >
            <FiMenu size={20} />
          </button>
          <span className="font-display font-semibold">Admin Panel</span>
        </div>
        <div className="container-app py-8">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default AdminLayout;
