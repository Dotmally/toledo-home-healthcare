import React from 'react';
import './ServicesSection.css';
import service1 from '../assets/service1.jpg'; // Replace with real images
import service2 from '../assets/service2.jpg';
import service3 from '../assets/service3.jpg';

const ServicesSection = () => {
  const services = [
    {
      title: 'Personal Care Assistance',
      description: 'Helping clients with bathing, grooming, dressing, and mobility.',
      image: service1,
    },
    {
      title: 'Meal Preparation & Nutrition',
      description: 'Healthy, home-cooked meals tailored to dietary needs and preferences.',
      image: service2,
    },
    {
      title: 'Medication Reminders',
      description: 'Ensuring clients take medications on time and as prescribed.',
      image: service3,
    },
  ];

  return (
    <section className="services-section">
      <h2>Our Home Care Services</h2>
      <div className="services-grid">
        {services.map((service, index) => (
          <div className="service-card" key={index}>
            <img src={service.image} alt={service.title} />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default ServicesSection;