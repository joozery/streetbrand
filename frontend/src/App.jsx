import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"; // ✅ เพิ่มตรงนี้
import ForYou from "./pages/ForYou";

function App() {
  return (
    <Router>
      <Header />
      <Navbar />
      
      {/* Main page */}
      <Routes>
        <Route path="/" element={<ForYou />} />
      </Routes>

      <Footer /> {/* ✅ แสดงท้ายทุกหน้า */}
    </Router>
  );
}

export default App;