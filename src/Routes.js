import React, { useEffect } from "react";
import AboutUsPage from "pages/AboutUs.js";
import ThankYouPage from "ThankYouPage.js";
import OurServices from "pages/OurServices";
import ContactUsPage from "pages/ContactUs.js";
import PaymentPage from "pages/Payment.js";
import GlobalStyles from "styles/GlobalStyles";
import MainLandingPage from "MainLandingPage.js";
import PrivacyPolicyPage from "pages/PrivacyPolicy.js";
import TermsOfServicePage from "pages/TermsOfService.js";
import WebDevelopment from "DetailPage/WebDevelopment";
import NotFound from "components/myComponent/NotFound";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Email } from "Email";
import ThankYou from "components/myComponent/Thanks";
import DataCenter from "pages/DataCenter";
import Career from "pages/Career";
import Schedule from "pages/Schedule";
import StudentDashboard from "pages/StudentDashboard";
import AdminDashboard from "pages/AdminDashboard";
import CompleteEnrollment from "pages/CompleteEnrollment";
import MyEnrollment from "pages/MyEnrollment";
import Headertop from "./components/Headertop";
import { AuthModalProvider } from "context/AuthModalContext";
import AuthModal from "components/auth/AuthModal";
import AuthModalRouteHandler from "components/auth/AuthModalRouteHandler";

function AppContent() {
  const location = useLocation();
  const hideSiteHeader = ["/admin", "/dashboard"].some((p) => location.pathname.startsWith(p));
  const hideWhatsApp = location.pathname.startsWith("/admin");

  useEffect(() => {
    const styleId = "hide-whatsapp-admin";
    if (hideWhatsApp) {
      let style = document.getElementById(styleId);
      if (!style) {
        style = document.createElement("style");
        style.id = styleId;
        style.textContent = `
          #wa-widget-send-button,
          .wa-chat-box,
          .wa-widget-send-button,
          [class*="wa-chat"],
          [id*="wa-widget"],
          iframe[src*="delightchat"] {
            display: none !important;
            visibility: hidden !important;
            pointer-events: none !important;
          }
        `;
        document.head.appendChild(style);
      }
    } else {
      document.getElementById(styleId)?.remove();
    }
    return () => document.getElementById(styleId)?.remove();
  }, [hideWhatsApp]);

  return (
    <>
      {!hideSiteHeader && <Headertop />}
      <AuthModalRouteHandler />
      <AuthModal />
      <Routes tw="cursor-pointer">
            <Route path="/" element={<MainLandingPage />} />
            <Route path="/login" element={<MainLandingPage />} />
            <Route path="/register" element={<MainLandingPage />} />
            <Route path="/forgot-password" element={<MainLandingPage />} />
            <Route path="/verify-email" element={<MainLandingPage />} />
            <Route path="/verify-email/:token" element={<MainLandingPage />} />
            <Route path="/reset-password" element={<MainLandingPage />} />
            <Route path="/d-services" element={<DataCenter />} />
            <Route path="/about-us" element={<AboutUsPage />} />
            <Route path="/services" element={<OurServices />} />
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/my-enrollment" element={<MyEnrollment />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/complete-enrollment" element={<CompleteEnrollment />} />
            <Route path="/career" element={<Career />} />
            <Route path="/policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            <Route path="/services/:id" element={<WebDevelopment />} />
            <Route path="/d-services/:id" element={<WebDevelopment />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/Thanks" element={<ThankYou />} />

            <Route
              path="/success"
              element={
                <div onLoad={() => Email()}>
                  <h1>Payment Successful</h1>
                  <button onClick={() => (window.location.href = "/")}>
                    Move to Dashboard
                  </button>
                </div>
              }
            />
            <Route
              path="/cancel"
              element={
                <>
                  <h1>Payment Cancel</h1>
                  <button onClick={() => (window.location.href = "/")}>
                    Move to Dashboard
                  </button>
                </>
              }
            />
          </Routes>
    </>
  );
}

export default function AppRoutes() {
  return (
    <>
      <GlobalStyles />
      <Router tw="cursor-pointer">
        <AuthModalProvider>
          <AppContent />
        </AuthModalProvider>
      </Router>
    </>
  );
}
