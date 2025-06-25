import './HomePage.css';
import heroImage from '../assets/hero-homecare.jpg';
import AboutSection from '../components/AboutSection';
import ServicesSection from '../components/ServicesSection';
import { Link } from 'react-router-dom';

const heroStyle = {
  backgroundImage: `url(${heroImage})`,
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'center center',
  backgroundSize: 'cover',
  height: '70vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: 'white',
  textAlign: 'center',
  padding: '0 2rem',
  position: 'relative',
};

function HomePage() {
  return (
    <div className="homepage">
      <section className="hero" style={heroStyle}>
        <div className="hero-content">
          <h1>Compassionate In-Home Care You Can Trust</h1>
          <p>Serving Toledo, Ohio with professional and personalized home health services.</p>
          <div className="hero-buttons">
            <Link to="/services" className="btn-primary">Explore Services</Link>
            <Link to="/careers" className="btn-primary">Join Our Team</Link>
          </div>
        </div>
      </section>

      <AboutSection />
      <ServicesSection />

      <section className="testimonials">
        <h2>What Our Clients Say</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>"Toledo Home Health Care has been a blessing. Their caregivers are kind and professional."</p>
            <span>- Sarah M.</span>
          </div>
          <div className="testimonial-card">
            <p>"I feel at ease knowing my father is in good hands. Highly recommend!"</p>
            <span>- James W.</span>
          </div>
        </div>
      </section>
      <section className="about-us">
  <div className="about-content">
    <h2>About Toledo Home Health Care</h2>
    <p>
      At Toledo Home Health Care, we believe every individual deserves compassionate and personalized care in the comfort of their own home. 
      Our team of licensed professionals is dedicated to supporting families across Toledo, Ohio with high-quality, reliable home health services.
    </p>
    <p>
      With years of experience and a strong commitment to dignity and respect, we strive to improve the quality of life for our clients every day.
    </p>
  </div>
</section>
<section className="cta-banner">
  <div className="cta-content">
    <h2>Need Reliable Home Health Care in Toledo?</h2>
    <p>We’re here to help. Contact us today to learn how we can support your loved ones.</p>
    <button className="btn-primary"
    onClick={() => (window.location.href = '/contact')}
    >Contact Us</button>
  </div>
</section>
<footer className="footer">
  <div className="footer-content">
    <p>&copy; {new Date().getFullYear()} Toledo Home Health Care. All rights reserved.</p>
    <p>Serving Toledo, Ohio | <a href="mailto:Toledohhc@gmail.com">Toledohhc@gmail.com</a></p>
  </div>
</footer>
    </div>
  );
}
export default HomePage;