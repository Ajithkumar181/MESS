import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ClientProjectList() {
  const [clientProjects, setClientProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Using Axios to fetch data from the server
    axios.get('http://localhost:5000/client-projects')
      .then((response) => {
        setClientProjects(response.data); // Axios automatically parses JSON
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <div className="client-project-container">
      <h2>Client and Project Details</h2>
      <table className="client-project-table">
        <thead>
          <tr>
            <th>Client ID</th>
            <th>Client Name</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Client Address</th>
            <th>Project ID</th>
            <th>Project Name</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Budget</th>
            <th>Status</th>
            <th>Project Address</th>
            <th>Amount Paid</th>
          </tr>
        </thead>
        <tbody>
          {clientProjects.map((clientProject) => (
            <tr key={clientProject.ClientID}>
              <td>{clientProject.ClientID}</td>
              <td>{clientProject.ClientName}</td>
              <td>{clientProject.ContactNumber}</td>
              <td>{clientProject.Email}</td>
              <td>{clientProject.ClientAddress}</td>
              <td>{clientProject.ProjectID || 'N/A'}</td>
              <td>{clientProject.ProjectName || 'N/A'}</td>
              <td>{clientProject.StartDate || 'N/A'}</td>
              <td>{clientProject.EndDate || 'N/A'}</td>
              <td>{clientProject.Budget || 'N/A'}</td>
              <td>{clientProject.Status || 'N/A'}</td>
              <td>{clientProject.ProjectAddress || 'N/A'}</td>
              <td>{clientProject.AmountPaid || 'N/A'}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ClientProjectList;
