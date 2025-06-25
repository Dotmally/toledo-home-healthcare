// src/components/Footer.js
import React from 'react';
import './Footer.css';

function Footer() {
  return (
    <>
      <section className="cta-banner">
        <div className="cta-content">
          <h2>Need Reliable Home Health Care in Toledo?</h2>
          <p>We’re here to help. Contact us today to learn how we can support your loved ones.</p>
          <button
            className="btn-primary"
            onClick={() => (window.location.href = '/contact')}
          >
            Contact Us
          </button>
        </div>
      </section>
      <footer className="footer">
        <div className="footer-content">
          <p>
            &copy; {new Date().getFullYear()} Toledo Home Health Care. All rights
            reserved.
          </p>
          <p>
            Serving Toledo, Ohio |{' '}
            <a href="mailto:Toledohhc@gmail.com">Toledohhc@gmail.com</a>
          </p>
        </div>
      </footer>
    </>
  );
}

export default Footer; // ✅ Make sure it's default export