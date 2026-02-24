import React from 'react';
import { motion } from 'framer-motion';

const Headertop = () => {
  return (
    <>
      {/* Full-width background */}
      <div className="headertop-wrapper">
        {/* Animated & Centered content */}
        <motion.div
          className="container headertop-container"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {/* Location */}
          <motion.div
            className="header-info"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3, duration: 0.6, ease: 'easeOut' }}
          >
            <i className="fas fa-map-marker-alt" style={{ color: '#dc3545' }}></i>
            <a
              href="https://maps.app.goo.gl/H5WSXNNQpUsMNrGa9"
              target="_blank"
              rel="noopener noreferrer"
            >
              22648 Glenn Dr STE 102, Sterling, VA 20164, United States
            </a>
          </motion.div>

          {/* Phone */}
          <motion.div
            className="header-info"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.6, ease: 'easeOut' }}
          >
            <i className="fas fa-phone-alt" style={{ color: '#28a745' }}></i>
            <a href="tel:+15715313630">
              +1 (571) 531-3630
            </a>
          </motion.div>
        </motion.div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .headertop-wrapper {
          background-color: #243e63;
          color: white;
          padding: 1.1rem 0;
        }

        .container {
          max-width: 1310px;
          margin: 0 auto;
          padding: 0 8px;
        }

        .headertop-container {
          display: flex;
          justify-content: space-between;
          align-items: center;
          flex-wrap: wrap;
          font-size: 1rem;
          font-weight: 500;
        }

        .header-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .header-info a {
          text-decoration: none;
          color: #fff;
        }

        .header-info a:hover {
          text-decoration: underline;
        }

        @media (max-width: 768px) {
          .headertop-container {
            flex-direction: column;
            text-align: center;
            gap: 0.75rem;
          }
        }
      `}</style>
    </>
  );
};

export default Headertop;
