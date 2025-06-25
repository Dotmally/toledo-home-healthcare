import { useState, useEffect } from 'react';
import axios from 'axios';
import './CareersPage.css';
import Footer from '../components/Footer';

function CareersPage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
  axios.get(`${process.env.REACT_APP_API_URL}/api/jobs`)
    .then(res => {
      if (Array.isArray(res.data)) { // Add validation
        setJobs(res.data);
      } else {
        console.error('Expected array but got:', res.data);
        setJobs([]);
      }
    })
    .catch(err => console.error('Error fetching jobs:', err));
}, []);

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

      <Footer />
    </div>
  );
}

export default CareersPage;
