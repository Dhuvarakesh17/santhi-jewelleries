import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Reset scroll position to top whenever the route changes
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth", // Requested smooth scroll behavior
    });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
