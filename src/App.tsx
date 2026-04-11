import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoldRateProvider } from "./context/GoldRateContext";
import { WishlistProvider, useWishlist } from "./context/WishlistContext";
import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import GoldRateTicker from "./components/GoldRateTicker";
import Footer from "./components/Footer";
import WishlistDrawer from "./components/WishlistDrawer";
import Home from "./pages/Home";
import SubCategoryPage from "./pages/SubCategoryPage";
import GoldCustomized from "./pages/GoldCustomized";
import About from "./pages/About";
import ScrollToTop from "./components/ScrollToTop";

const AppLayout = () => {
  const { isWishlistOpen, closeWishlist } = useWishlist();

  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-white">
        <TopBar />
        <GoldRateTicker />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gold/customized" element={<GoldCustomized />} />
            <Route path="/category/:type" element={<SubCategoryPage />} />
            <Route path="/category/:type/:sub" element={<SubCategoryPage />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <WishlistDrawer isOpen={isWishlistOpen} onClose={closeWishlist} />
    </Router>
  );
};

function App() {
  console.log("Jewellery Showcase Rendering...");
  return (
    <GoldRateProvider>
      <WishlistProvider>
        <AppLayout />
      </WishlistProvider>
    </GoldRateProvider>
  );
}

export default App;
