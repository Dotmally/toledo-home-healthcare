import { useState } from 'react';
import axios from 'axios';
import './CareersPage.css';

function CareersPage() {
  // 👉 Add this state and submit handler here:
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [resume, setResume] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('message', message);
    formData.append('resume', resume);

    try {
      const res = await axios.post('/api/applications', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Application submitted successfully!');

      // Reset form
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setResume(null);
    } catch (err) {
      console.error(err);
      alert('There was an error submitting your application.');
    }
  };

  // 👇 Then below that, your return block stays mostly the same:
  return (
    <div className="careers-page">
      <section className="careers-header">
        <h1>Join Our Caring Team</h1>
        <p>We’re always looking for compassionate caregivers to serve our Toledo community.</p>
      </section>

      <section className="job-openings">
        <h2>Current Openings</h2>
        <ul>
          <li>
            <h3>Personal Support Worker (PSW)</h3>
            <p>Provide direct care and support for clients in their homes.</p>
          </li>
          <li>
            <h3>Registered Nurse (RN)</h3>
            <p>Conduct assessments, develop care plans, and coordinate services.</p>
          </li>
        </ul>
      </section>

      <section className="application-form">
        <h2>Apply Now</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
          <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required />
          <textarea placeholder="Tell us about yourself" rows="4" value={message} onChange={e => setMessage(e.target.value)} required />
          <input type="file" onChange={e => setResume(e.target.files[0])} required />
          <button type="submit">Submit Application</button>
        </form>
      </section>
    </div>
  );
}

export default CareersPage;