import { useState } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import CartDrawer from "./components/CartDrawer.jsx";
import WhatsAppButton from "./components/WhatsAppButton.jsx";
import { useAuth } from "./context/AuthContext.jsx";

import Home from "./pages/Home.jsx";
import Shop from "./pages/Shop.jsx";
import Product from "./pages/Product.jsx";
import Academy from "./pages/Academy.jsx";
import Membership from "./pages/Membership.jsx";
import Cart from "./pages/Cart.jsx";
import Checkout from "./pages/Checkout.jsx";
import Payment from "./pages/Payment.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Account from "./pages/Account.jsx";
import AcademyLessons from "./pages/AcademyLessons.jsx";
import ServicesPage from "./pages/ServicesPage.jsx";
import Contact from "./pages/Contact.jsx";
import Privacy from "./pages/Privacy.jsx";
import Refund from "./pages/Refund.jsx";
import Terms from "./pages/Terms.jsx";
import NotFound from "./pages/NotFound.jsx";

import AdminLayout from "./pages/admin/AdminLayout.jsx";
import Overview from "./pages/admin/Overview.jsx";
import Orders from "./pages/admin/Orders.jsx";
import Products from "./pages/admin/Products.jsx";
import Lessons from "./pages/admin/Lessons.jsx";
import Users from "./pages/admin/Users.jsx";
import UserDetail from "./pages/admin/UserDetail.jsx";
import AdminSettings from "./pages/admin/Settings.jsx";

const RequireAuth = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div className="container-app py-28 pt-32 text-center text-charcoal/60">Loading...</div>;
  }
  if (!user) {
    return <Navigate to={`/login?next=${encodeURIComponent(location.pathname)}`} replace />;
  }
  return children;
};

const App = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar onMobileMenuChange={setMobileMenuOpen} />
      <CartDrawer />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:slug" element={<Product />} />
          <Route path="/academy" element={<Academy />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/checkout"
            element={
              <RequireAuth>
                <Checkout />
              </RequireAuth>
            }
          />
          <Route
            path="/checkout/payment"
            element={
              <RequireAuth>
                <Payment />
              </RequireAuth>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/account"
            element={
              <RequireAuth>
                <Account />
              </RequireAuth>
            }
          />
          <Route
            path="/account/academy"
            element={
              <RequireAuth>
                <AcademyLessons />
              </RequireAuth>
            }
          />

          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<Overview />} />
            <Route path="orders" element={<Orders />} />
            <Route path="products" element={<Products />} />
            <Route path="lessons" element={<Lessons />} />
            <Route path="users" element={<Users />} />
            <Route path="users/:id" element={<UserDetail />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>

          <Route path="/privacy" element={<Privacy />} />
          <Route path="/refund" element={<Refund />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      <Footer />
      <WhatsAppButton hidden={mobileMenuOpen} />
    </div>
  );
};

export default App;
