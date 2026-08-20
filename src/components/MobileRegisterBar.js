import React from "react";
import { useNavigate } from "react-router-dom";

// Fixed to the very top of the viewport on mobile only, so "Register Now"
// stays reachable no matter how far the user has scrolled. Hidden on
// desktop, where the header nav already has a visible path to Registration.
export default function MobileRegisterBar() {
  const navigate = useNavigate();

  return (
    <>
      <div className="mobile-register-bar">
        <button type="button" onClick={() => navigate("/registration")}>
          Register Now
        </button>
      </div>

      <style>{`
        .mobile-register-bar {
          display: none;
        }

        @media (max-width: 900px) {
          .mobile-register-bar {
            display: block;
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            z-index: 200;
            background: #f5b700;
          }

          .mobile-register-bar button {
            display: block;
            width: 100%;
            border: none;
            background: none;
            color: #0b1b33;
            font-weight: 800;
            font-size: 15px;
            letter-spacing: 0.02em;
            padding: 10px 12px;
            cursor: pointer;
          }
        }
      `}</style>
    </>
  );
}
