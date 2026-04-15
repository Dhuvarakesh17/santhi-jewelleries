import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useEffect(() => {
    // Ensuring scroll reset happens as soon as the main thread is clear
    const timeout = setTimeout(() => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }, 0);
    return () => clearTimeout(timeout);
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;
