import React, { useEffect, useState } from 'react';
import './DashboardPage.css';

function DashboardPage() {
  const [applications, setApplications] = useState([]);
  const [jobs, setJobs] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const handleLogout = () => {
  localStorage.removeItem('admin-auth');
  window.location.href = '/admin';
};

  useEffect(() => {
    // Fetch applications
    fetch(`${process.env.REACT_APP_API_URL}/api/applications`)
      .then(res => res.json())
      .then(data => setApplications(data))
      .catch(err => console.error('Error fetching applications:', err));

    // Fetch job postings
    fetch(`${process.env.REACT_APP_API_URL}/api/jobs`)
      .then(res => res.json())
      .then(data => setJobs(data))
      .catch(err => console.error('Error fetching jobs:', err));
  }, []);

  const handlePostJob = async (e) => {
  e.preventDefault();
  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/jobs`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ title, description }),
    });
    if (!res.ok) throw new Error('Failed to post job');
    alert('Job posted successfully!');
    setTitle('');
    setDescription('');
    
    // Refresh jobs
    const newJobs = await fetch(`${process.env.REACT_APP_API_URL}/api/jobs`).then(res => res.json());
    setJobs(newJobs);
  } catch (err) {
    console.error('Error posting job:', err);
    alert('Error posting job');
  }
};

  // Helper: Group applications by jobId
  const getJobApplications = (jobId) =>
    applications.filter(app => app.jobId === jobId);

  const handleDeleteJob = async (jobId) => {
  if (!window.confirm('Are you sure you want to delete this job posting?')) return;

  try {
    const res = await fetch(`${process.env.REACT_APP_API_URL}/api/jobs/${jobId}`, {
      method: 'DELETE',
    });
    if (!res.ok) throw new Error('Failed to delete job');

    // Update UI after delete
    setJobs(prevJobs => prevJobs.filter(job => job._id !== jobId));
    setApplications(prevApps => prevApps.filter(app => app.jobId !== jobId));
  } catch (err) {
    console.error('Error deleting job:', err);
    alert('Failed to delete job');
  }
};


  return (
    <div className="dashboard-page">
      <div className="post-job-form">
        <button onClick={handleLogout} style={{ float: 'right' }}>Logout</button>
  <h2>Post a New Job</h2>
  <form onSubmit={handlePostJob}>
    <input
      type="text"
      placeholder="Job Title"
      value={title}
      onChange={(e) => setTitle(e.target.value)}
      required
    />
    <textarea
      placeholder="Job Description"
      value={description}
      onChange={(e) => setDescription(e.target.value)}
      rows="4"
      required
    />
    <button type="submit">Post Job</button>
  </form>
</div>
      <h1>Submitted Applications</h1>

      {jobs.length === 0 ? (
        <p>No job postings yet.</p>
      ) : (
        jobs.map(job => {
          const appsForJob = getJobApplications(job._id);
          return (
            <div key={job._id} className="job-section">
              <h2>
  {job.title}
  <button onClick={() => handleDeleteJob(job._id)} style={{ marginLeft: '1rem', color: 'red' }}>
    Delete
  </button>
</h2>
              {appsForJob.length === 0 ? (
                <p>No applications yet.</p>
              ) : (
                <table className="app-table">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Message</th>
                      <th>Application Form</th>
                      <th>Resume</th>
                    </tr>
                  </thead>
                  <tbody>
                    {appsForJob.map(app => (
                      <tr key={app._id}>
                        <td>{app.name}</td>
                        <td>{app.email}</td>
                        <td>{app.phone}</td>
                        <td>{app.message}</td>
                        <td>
                          {app.applicationFormPath ? (
                            <a
                              href={`${process.env.REACT_APP_API_URL}/${app.applicationFormPath.replace(/\\/g, '/')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Form
                            </a>
                          ) : (
                            'No File'
                          )}
                        </td>
                        <td>
                          {app.resumePath ? (
                            <a
                              href={`${process.env.REACT_APP_API_URL}/${app.resumePath.replace(/\\/g, '/')}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              View Resume
                            </a>
                          ) : (
                            'No File'
                          )}
                        </td>

                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          );
        })
      )}
    </div>
  );
}

export default DashboardPage;
