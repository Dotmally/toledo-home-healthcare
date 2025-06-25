import React from 'react';
import './ContactPage.css';
import Footer from '../components/Footer';

function ContactPage() {
  return (
    <div className="contact-page">
      <div className="contact-header">
        <h1>Contact Us</h1>
        <p>Have questions or need assistance? Reach out to us — we’re happy to help.</p>
      </div>

      <form
        className="contact-form"
        action="https://formspree.io/f/mvgrvzwv"
        method="POST"
      >
        <input type="text" name="name" placeholder="Your Name" required />
        <input type="email" name="_replyto" placeholder="Your Email" required />
        <textarea name="message" placeholder="Your Message" rows="6" required />
        <button type="submit" className="btn-primary">Send Message</button>
      </form>

      <div className="contact-info">
        <p><strong>Email:</strong> <a href="mailto:toledohhc@gmail.com">toledohhc@gmail.com</a></p>
        <p><strong>Phone:</strong> (419) 555-1234</p>
        <p><strong>Address:</strong> 123 Toledo Ave, Toledo, OH</p>
      </div>
      <div className='map-container'>
      <iframe 
      title="Toledo Home Healthcare Map"
      width="100%"
      height="400"
      style={{ border: 0 }}
      allowFullScreen=""
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2979.168544767744!2d-83.62550162352323!3d41.69529707683914!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x883c7f0f4b2b7e7d%3A0xebb0523d54858a4e!2sToledo%20Home%20Healthcare%20LLC!5e0!3m2!1sen!2sca!4v1750822490860!5m2!1sen!2sca"  allowfullscreen=""></iframe>
      </div>
      <Footer />
    </div>
  );
}

export default ContactPage;