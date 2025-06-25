import React from 'react';
import './ServicesPage.css';
import Footer from '../components/Footer'; // ✅ No curly braces



const services = [
  {
    title: 'Personal Care',
    description: 'Help with bathing, dressing, hygiene, and mobility to maintain independence at home.',
    Image: '/assets/personal-care.jpg',
  },
  {
    title: 'Companionship',
    description: 'Social interaction, conversation, and emotional support to prevent isolation.',
    Image: '/assets/companionship.jpg',
  },
  {
    title: 'Meal Preparation',
    description: 'Nutritious meal planning and cooking, tailored to dietary needs.',
    Image: '/assets/meal-prep.jpg',
  },
  {
    title: 'Medication Reminders',
    description: 'Non-medical reminders to ensure medications are taken on time and properly.',
    Image: '/assets/medication.jpg',
  },
  {
    title: 'Light Housekeeping',
    description: 'Help with laundry, vacuuming, and maintaining a clean living space.',
    Image: '/assets/housekeeping.jpg',
  },
  {
    title: 'Dementia Care',
    description: 'Support for seniors with Alzheimer’s or other forms of dementia.',
    Image: '/assets/dementia.jpg',
  },
];

function ServicesPage() {
  return (
    <div className="services-page">
      <div className="services-header">
        <h1>Our Home Care Services</h1>
        <p>
          We provide compassionate, professional, and personalized care to help your loved ones stay safe and independent at home.
        </p>
      </div>

      <div className="services-grid">
        {services.map((service, index) => (
          <div key={index} className="service-card">
            <img src={service.Image} alt={service.title} className="service-Image" />
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </div>
        ))}
      </div>
      <Footer />
    </div>
  );
}

export default ServicesPage;