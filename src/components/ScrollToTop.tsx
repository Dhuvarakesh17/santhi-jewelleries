import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * ScrollToTop component ensures that every time a user navigates to a new route,
 * the page starts from the very top.
 */
const ScrollToTop = () => {
  const { pathname, search } = useLocation();

  useLayoutEffect(() => {
    // Disable browser's native scroll restoration.
    // This prevents the browser from trying to restore the scroll position from history
    // which often causes the 'loading from the bottom' issue during navigation.
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // Reset scroll to top instantly on every route change.
    // scrollTo(0, 0) is the standard way to jump to top without animation.
    window.scrollTo(0, 0);

    // Fallback: Ensure document elements are also scrolled to top.
    // This handles cases where scroll might be bound to the document element or body.
    document.documentElement.scrollTo(0, 0);
    document.body.scrollTo(0, 0);
  }, [pathname, search]);

  return null;
};

export default ScrollToTop;

