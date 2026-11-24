import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation(); // Get current route path

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to top when path changes
  }, [pathname]); // Runs whenever pathname changes

  return null; // No UI component, just logic
};

export default ScrollToTop;
