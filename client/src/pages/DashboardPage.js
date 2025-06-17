import React, { useEffect, useState } from 'react';
import './DashboardPage.css';

function DashboardPage() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    fetch('http://localhost:5000/api/applications') // Adjust if using proxy
      .then(res => res.json())
      .then(data => setApplications(data))
      .catch(err => console.error('Error fetching applications:', err));
  }, []);

  return (
    <div className="dashboard-page">
      <h1>Submitted Applications</h1>
      {applications.length === 0 ? (
        <p>No applications submitted yet.</p>
      ) : (
        <table className="app-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Resume</th>
            </tr>
          </thead>
          <tbody>
            {applications.map(app => (
              <tr key={app._id}>
                <td>{app.name}</td>
                <td>{app.email}</td>
                <td>{app.phone}</td>
                <td>{app.message}</td>
                <td>
                  {app.resumePath ? (
                    <a href={`http://localhost:5000/${app.resumePath.replace(/\\/g, '/')}`}
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
}

export default DashboardPage;