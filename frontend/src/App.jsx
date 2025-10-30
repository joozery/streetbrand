import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
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

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Header />
          <Navbar />
          
          {/* Main Routes */}
          <Routes>
            <Route path="/" element={<ForYou />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/payment" element={<Payment />} />
            <Route path="/my-orders" element={<MyOrders />} />
            <Route path="/order-success" element={<OrderSuccess />} />
          </Routes>

          <Footer />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;