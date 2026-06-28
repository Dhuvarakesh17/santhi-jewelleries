import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { GoldRateProvider } from "./context/GoldRateContext";
import Navbar from "./components/Navbar";
import TopBar from "./components/TopBar";
import GoldRateTicker from "./components/GoldRateTicker";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SubCategoryPage from "./pages/SubCategoryPage";
import GoldCustomized from "./pages/GoldCustomized";
import About from "./pages/About";
import ScrollToTop from "./components/ScrollToTop";
import FloatingChatActions from "./components/FloatingChatActions";
import ProductDetails from "./pages/ProductDetails";

const AppLayout = () => {
  return (
    <Router>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-white">
        <TopBar />
        <div className="sticky top-0 z-[100] bg-white">
          <GoldRateTicker />
          <Navbar />
        </div>
        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/gold/customized" element={<GoldCustomized />} />
            <Route path="/category/:type" element={<SubCategoryPage />} />
            <Route path="/category/:type/:sub" element={<SubCategoryPage />} />
            <Route
              path="/category/:type/:sub/products/:id/:slug"
              element={<ProductDetails />}
            />
            <Route path="/about" element={<About />} />
          </Routes>
        </main>
        <Footer />
      </div>
      <FloatingChatActions />
    </Router>
  );
};

function App() {
  console.log("Jewellery Showcase Rendering...");
  return (
    <GoldRateProvider>
      <AppLayout />
    </GoldRateProvider>
  );
}

export default App;
