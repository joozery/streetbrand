import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

// Customer Pages
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ForYou from "./pages/ForYou";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Payment from "./pages/Payment";
import MyOrders from "./pages/MyOrders";
import OrderSuccess from "./pages/OrderSuccess";

// Admin Pages
import AdminLayout from "./components/admin/AdminLayout";
import AdminLogin from "./pages/admin/AdminLogin";
import Dashboard from "./pages/admin/Dashboard";
import Products from "./pages/admin/Products";
import Orders from "./pages/admin/Orders";
import Users from "./pages/admin/Users";
import Analytics from "./pages/admin/Analytics";
import Settings from "./pages/admin/Settings";
// Pruned unused admin sections to avoid duplication in UI

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Routes>
            {/* Admin Routes - ต้องอยู่บนสุด */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="orders" element={<Orders />} />
              <Route path="users" element={<Users />} />
              <Route path="analytics" element={<Analytics />} />
              <Route path="settings" element={<Settings />} />
              {/* Redirect any unknown admin subpath back to dashboard */}
              <Route path="*" element={<Navigate to="/admin" replace />} />
            </Route>

            {/* Customer Routes */}
            <Route path="/" element={
              <>
                <Header />
                <Navbar />
                <ForYou />
                <Footer />
              </>
            } />
            <Route path="/login" element={
              <>
                <Header />
                <Navbar />
                <Login />
                <Footer />
              </>
            } />
            <Route path="/register" element={
              <>
                <Header />
                <Navbar />
                <Register />
                <Footer />
              </>
            } />
            <Route path="/product/:id" element={
              <>
                <Header />
                <Navbar />
                <ProductDetail />
                <Footer />
              </>
            } />
            <Route path="/cart" element={
              <>
                <Header />
                <Navbar />
                <Cart />
                <Footer />
              </>
            } />
            <Route path="/payment" element={
              <>
                <Header />
                <Navbar />
                <Payment />
                <Footer />
              </>
            } />
            <Route path="/my-orders" element={
              <>
                <Header />
                <Navbar />
                <MyOrders />
                <Footer />
              </>
            } />
            <Route path="/order-success" element={
              <>
                <Header />
                <Navbar />
                <OrderSuccess />
                <Footer />
              </>
            } />
          </Routes>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;