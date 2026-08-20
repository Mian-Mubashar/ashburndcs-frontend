import React from "react";
import tw from "twin.macro";

/*
 * Animations have been removed sitewide per client request — content
 * renders immediately with no scroll-triggered or slide-in effects.
 */
const StyledDiv = tw.div`font-display min-h-screen text-secondary-500 p-8 overflow-hidden`;

export default function AnimationRevealPage({ children }) {
  return <StyledDiv className="App">{children}</StyledDiv>;
}

