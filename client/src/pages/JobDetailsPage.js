import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import './JobDetailsPage.css';
import Footer from '../components/Footer';

function JobDetailsPage() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [resume, setResume] = useState(null);
  const [applicationForm, setApplicationForm] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Moved to component level

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/api/jobs/${id}`)
      .then(res => setJob(res.data))
      .catch(err => console.error('Error fetching job:', err));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!applicationForm) {
      alert('Application form is required');
      return;
    }

    // File validation
    const allowedTypes = [
      'application/pdf',
      'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
    ];
    
    if (!allowedTypes.includes(applicationForm.type)) {
      alert('Only PDF, DOC, or DOCX files are allowed');
      return;
    }

    if (applicationForm.size > 5 * 1024 * 1024) {
      alert('Application form must be smaller than 5MB');
      return;
    }

    const formData = new FormData();
    formData.append('jobId', id);
    formData.append('name', name);
    formData.append('email', email);
    formData.append('phone', phone);
    formData.append('message', message);
    formData.append('applicationForm', applicationForm);
    if (resume) {
      formData.append('resume', resume);
    }

    try {
      setIsSubmitting(true);
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/applications`,
        formData,
        {
          headers: { 'Content-Type': 'multipart/form-data' },
          timeout: 30000
        }
      );
      
      alert('Successfully submitted!');
      setName('');
      setEmail('');
      setPhone('');
      setMessage('');
      setApplicationForm(null);
      setResume(null);
    } catch (err) {
      console.error('Submission error:', {
        message: err.message,
        response: err.response?.data,
        stack: err.stack
      });
      alert(err.response?.data?.message || 'Submission failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!job) return <p>Loading job...</p>;

  return (
    <div className="job-details-page">
      <h1>{job.title}</h1>
      <p className="job-full-description">{job.description}</p>

      <a
        href="/job-application.pdf"
        download
        target="_blank"
        rel="noopener noreferrer"
        className="download-link"
      >
        📄 Download the Application Form
      </a>

      <h2>Apply Now</h2>
      <p className="form-note">
        Please download, fill out, and re-upload the completed application form below.
      </p>

      <form onSubmit={handleSubmit} className="application-form">
        <input type="text" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
        <input type="email" placeholder="Email Address" value={email} onChange={e => setEmail(e.target.value)} required />
        <input type="tel" placeholder="Phone Number" value={phone} onChange={e => setPhone(e.target.value)} required />
        <textarea placeholder="Tell us about yourself" value={message} onChange={e => setMessage(e.target.value)} required rows="4" />
        <label htmlFor="applicationForm">Upload Completed Application Form</label>
        <input
          id="applicationForm"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={e => setApplicationForm(e.target.files[0])}
          required
        />
        
        <label htmlFor="resume">Upload Resume (optional)</label>
        <input
          id="resume"
          type="file"
          accept=".pdf,.doc,.docx"
          onChange={e => setResume(e.target.files[0])}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Application'}
        </button>
      </form>
      <Footer />
    </div>
  );
}

export default JobDetailsPage;
