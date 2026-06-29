import React, { createContext, useCallback, useContext, useState } from "react";

const AuthModalContext = createContext(null);

export function AuthModalProvider({ children }) {
  const [isOpen, setIsOpen] = useState(false);
  const [view, setView] = useState("login");
  const [modalData, setModalData] = useState({});

  const openAuthModal = useCallback((nextView = "login", data = {}) => {
    setView(nextView);
    setModalData(data);
    setIsOpen(true);
    document.body.style.overflow = "hidden";
  }, []);

  const closeAuthModal = useCallback(() => {
    setIsOpen(false);
    setView("login");
    setModalData({});
    document.body.style.overflow = "";
  }, []);

  const switchView = useCallback((nextView, data = {}) => {
    setView(nextView);
    setModalData((prev) => ({ ...prev, ...data }));
  }, []);

  return (
    <AuthModalContext.Provider
      value={{ isOpen, view, modalData, openAuthModal, closeAuthModal, switchView }}
    >
      {children}
    </AuthModalContext.Provider>
  );
}

export const useAuthModal = () => {
  const ctx = useContext(AuthModalContext);
  if (!ctx) throw new Error("useAuthModal must be used within AuthModalProvider");
  return ctx;
};
