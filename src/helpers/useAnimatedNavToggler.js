import { useState } from "react";

// Mobile nav toggle — animations removed per client request. Instant
// show/hide via plain state instead of framer-motion's slide transform.
export default function useAnimatedNavToggler() {
  const [showNavLinks, setShowNavLinks] = useState(false);

  const toggleNavbar = () => {
    setShowNavLinks((prev) => !prev);
  };

  return { showNavLinks, toggleNavbar };
}

