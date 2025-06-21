import { useState, useEffect } from 'react';
import axios from 'axios';
import './CareersPage.css';

function CareersPage() {
  const [jobs, setJobs] = useState([]);
  const [formStates, setFormStates] = useState({}); // Track form input for each job

  useEffect(() => {
    axios.get('/api/jobs')
      .then(res => {
        setJobs(res.data);
        // Initialize form state for each job
        const initialState = {};
        res.data.forEach(job => {
          initialState[job._id] = {
            name: '',
            email: '',
            phone: '',
            message: '',
            resume: null,
          };
        });
        setFormStates(initialState);
      })
      .catch(err => console.error('Error fetching jobs:', err));
  }, []);

  const handleChange = (jobId, field, value) => {
    setFormStates(prev => ({
      ...prev,
      [jobId]: {
        ...prev[jobId],
        [field]: value
      }
    }));
  };

  const handleSubmit = async (e, jobId) => {
    e.preventDefault();
    const formData = new FormData();
    const state = formStates[jobId];

    formData.append('name', state.name);
    formData.append('email', state.email);
    formData.append('phone', state.phone);
    formData.append('message', state.message);
    formData.append('resume', state.resume);
    formData.append('jobId', jobId);

    try {
      await axios.post('/api/applications', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Application submitted successfully!');
      // Reset form for this job
      setFormStates(prev => ({
        ...prev,
        [jobId]: {
          name: '',
          email: '',
          phone: '',
          message: '',
          resume: null
        }
      }));
    } catch (err) {
      console.error(err);
      alert('There was an error submitting your application.');
    }
  };

  return (
    <div className="careers-page">
      <section className="careers-header">
        <h1>Join Our Caring Team</h1>
        <p>We’re always looking for compassionate caregivers to serve our Toledo community.</p>
      </section>

      <section className="job-openings">
  <h2>Current Openings</h2>
  <div className="job-list">
    {jobs.map((job) => (
      <div key={job._id} className="job-card">
        <h3>{job.title}</h3>
        <p className="job-snippet">
          {job.description.length > 150
            ? job.description.substring(0, 150) + '...'
            : job.description}
        </p>
        <a href={`/careers/job/${job._id}`} className="btn-view-details">
          View Details
        </a>
      </div>
    ))}
  </div>
</section>
    </div>
  );
}

export default CareersPage;