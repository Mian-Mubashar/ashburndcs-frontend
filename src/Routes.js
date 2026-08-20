import React, { useEffect } from "react";
import AboutUsPage from "pages/AboutUsNew.js";
import ThankYouPage from "ThankYouPage.js";
// Services pages are disabled per client request (Aug 2026) — laptop/PC/IT
// "services" business line is being phased out of the site in favor of
// data center technician training. Code kept, routes commented out below.
// import OurServices from "pages/OurServices";
// import DataCenter from "pages/DataCenter";
import ContactUsPage from "pages/ContactUs.js";
import PaymentPage from "pages/Payment.js";
import GlobalStyles from "styles/GlobalStyles";
import MainLandingPage from "MainLandingPage.js";
import PrivacyPolicyPage from "pages/PrivacyPolicy.js";
import TermsOfServicePage from "pages/TermsOfService.js";
// import WebDevelopment from "DetailPage/WebDevelopment";
import NotFound from "components/myComponent/NotFound";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Email } from "Email";
import ThankYou from "components/myComponent/Thanks";
import Career from "pages/Career";
import Schedule from "pages/Schedule";
import CourseOutline from "pages/CourseOutline.js";
import Registration from "pages/Registration.js";
import StudentDashboard from "pages/StudentDashboard";
import AdminDashboard from "pages/AdminDashboard";
import CompleteEnrollment from "pages/CompleteEnrollment";
import MyEnrollment from "pages/MyEnrollment";
import Headertop from "./components/Headertop";
import MobileRegisterBar from "./components/MobileRegisterBar";
import { AuthModalProvider } from "context/AuthModalContext";
import AuthModal from "components/auth/AuthModal";
import AuthModalRouteHandler from "components/auth/AuthModalRouteHandler";
import VerifyingEmailPage from "pages/VerifyingEmail";

function AppContent() {
  const location = useLocation();
  const hideSiteHeader =
    ["/admin", "/dashboard"].some((p) => location.pathname.startsWith(p)) ||
    /^\/verify-email\/[^/]+$/.test(location.pathname);
  const hideWhatsApp =
    location.pathname.startsWith("/admin") ||
    /^\/verify-email\/[^/]+$/.test(location.pathname);
  // The mobile Register Now bar is pinned above everything except the
  // admin/dashboard/verify-email flows, matching hideSiteHeader — no point
  // showing a public registration CTA on internal/authenticated screens.
  const hideMobileRegisterBar = hideSiteHeader;

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

  useEffect(() => {
    // Push page content down on mobile so it isn't hidden under the fixed
    // register bar. Scoped to a <style> tag rather than inline so it only
    // applies within the same max-width:900px breakpoint the bar uses.
    const styleId = "mobile-register-bar-offset";
    let style = document.getElementById(styleId);
    if (!hideMobileRegisterBar) {
      if (!style) {
        style = document.createElement("style");
        style.id = styleId;
        style.textContent = `
          @media (max-width: 900px) {
            .headertop-wrapper { margin-top: 38px; }
          }
        `;
        document.head.appendChild(style);
      }
    } else {
      style?.remove();
    }
    return () => document.getElementById(styleId)?.remove();
  }, [hideMobileRegisterBar]);

  return (
    <>
      {!hideMobileRegisterBar && <MobileRegisterBar />}
      {!hideSiteHeader && <Headertop />}
      <AuthModalRouteHandler />
      <AuthModal />
      <Routes tw="cursor-pointer">
            <Route path="/" element={<MainLandingPage />} />
            <Route path="/login" element={<MainLandingPage />} />
            <Route path="/register" element={<MainLandingPage />} />
            <Route path="/forgot-password" element={<MainLandingPage />} />
            <Route path="/verify-email" element={<MainLandingPage />} />
            <Route path="/verify-email/:token" element={<VerifyingEmailPage />} />
            <Route path="/reset-password" element={<MainLandingPage />} />
            {/* Services pages disabled per client request (Aug 2026) — see commented imports above */}
            {/* <Route path="/d-services" element={<DataCenter />} /> */}
            <Route path="/about-us" element={<AboutUsPage />} />
            {/* <Route path="/services" element={<OurServices />} /> */}
            <Route path="/thank-you" element={<ThankYouPage />} />
            <Route path="/contact-us" element={<ContactUsPage />} />
            <Route path="/payment" element={<PaymentPage />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/course-outline" element={<CourseOutline />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/my-enrollment" element={<MyEnrollment />} />
            <Route path="/dashboard" element={<StudentDashboard />} />
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/complete-enrollment" element={<CompleteEnrollment />} />
            <Route path="/career" element={<Career />} />
            <Route path="/policy" element={<PrivacyPolicyPage />} />
            <Route path="/terms" element={<TermsOfServicePage />} />
            {/* <Route path="/services/:id" element={<WebDevelopment />} /> */}
            {/* <Route path="/d-services/:id" element={<WebDevelopment />} /> */}
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
