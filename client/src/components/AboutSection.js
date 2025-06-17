import React from 'react';
import './AboutSection.css';
import nurseImg from '../assets/about-nurse.jpg'; // Replace with a real image in your assets folder

const AboutSection = () => {
  return (
    <section className="about-section">
      <div className="about-content">
        <div className="about-text">
          <h2>Who We Are</h2>
          <p>
            At Toledo Home Health Care, we’re passionate about helping people live comfortably in their own homes.
            Our compassionate and trained caregivers offer personalized support that ensures dignity, independence, and peace of mind.
          </p>
        </div>
        <div className="about-image">
          <img src={nurseImg} alt="Caregiver helping senior" />
        </div>
      </div>
    </section>
  );
};

export default AboutSection;