import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import Modal from "react-modal";
import "react-toastify/dist/ReactToastify.css";

const isBrowserExtensionError = (event) => {
  const err = event?.error || event?.reason;
  const stack = String(err?.stack || event?.filename || "");
  const message = String(err?.message || event?.message || "");
  return (
    stack.includes("chrome-extension://") ||
    stack.includes("moz-extension://") ||
    message.includes("M_ID")
  );
};

window.addEventListener(
  "error",
  (event) => {
    if (isBrowserExtensionError(event)) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  },
  true
);

window.addEventListener(
  "unhandledrejection",
  (event) => {
    if (isBrowserExtensionError(event)) {
      event.preventDefault();
    }
  },
  true
);

Modal.setAppElement("#root");

const container = document.getElementById("root");
const root = createRoot(container);
root.render(<App />);
