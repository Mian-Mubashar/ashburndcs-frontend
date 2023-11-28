import React from "react";
import LoginPage from "pages/Login.js";
import SignupPage from "pages/Signup.js";
import PricingPage from "pages/Pricing.js";
import AboutUsPage from "pages/AboutUs.js";
import ThankYouPage from "ThankYouPage.js";
import OurServices from "pages/OurServices";
import ContactUsPage from "pages/ContactUs.js";
import BlogIndexPage from "pages/BlogIndex.js";
import GlobalStyles from "styles/GlobalStyles";
import MainLandingPage from "MainLandingPage.js";
import PrivacyPolicyPage from "pages/PrivacyPolicy.js";
import TermsOfServicePage from "pages/TermsOfService.js";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import WebDevelopment from "DetailPage/WebDevelopment";
import ELearning from "pages/E-learning";
import SimpleContactUs from "components/forms/SimpleContactUs";
import DataTable from "pages/DataEdit";
import AdminLogin from "pages/AdminSide/login";
export default function AppRoutes() {
  return (
    <>
      <GlobalStyles />
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<MainLandingPage />} />
          <Route path="/price" element={<PricingPage />} />
          <Route path="/blog" element={<BlogIndexPage />} />
          <Route path="/register" element={<SignupPage />} />
          <Route path="/e-learning" element={<ELearning />} />
          <Route path="/about-us" element={<AboutUsPage />} />
          <Route path="/services" element={<OurServices />} />
          <Route path="/thank-you" element={<ThankYouPage />} />
          <Route path="/contact-us" element={<ContactUsPage />} />
          <Route path="/policy" element={<PrivacyPolicyPage />} />
          <Route path="/terms" element={<TermsOfServicePage />} />
          <Route path="/services/:id" element={<WebDevelopment />} />
          <Route path="/E-learning/:id" element={<WebDevelopment />} />
          <Route path="/new-data" element={<SimpleContactUs />} />
          <Route path="/check-data" element={<DataTable />} />
          <Route path="/edit-data/:id" element={<SimpleContactUs />} />



          {/* admin Routes? */}
          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
      </Router>
    </>
  );
}
