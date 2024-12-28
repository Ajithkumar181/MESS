import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../CSS/Dashboard.css'; // Import the extraordinary CSS file

// Dashboard component to display statistics
const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState({
    totalClients: 0,
    ongoingProjects: 0,
    materialsInStock: 0,
    totalProjectValue: 0,
    totalPaymentsReceived: 0,
  });

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/dashboard');
      setDashboardData(response.data);
    } catch (error) {
      console.error('Error fetching dashboard data', error);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  return (
    <div style={{ padding: '20px', backgroundColor: '#f4f4f4' }}>
      <h1>Dashboard Overview</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
        {/* Total Clients */}
        <div className="card" style={cardStyle}>
          <h2>Total Clients</h2>
          <p>{dashboardData.totalClients}</p>
        </div>

        {/* Ongoing Projects */}
        <div className="card" style={cardStyle}>
          <h2>Ongoing Projects</h2>
          <p>{dashboardData.ongoingProjects}</p>
        </div>

        {/* Materials in Stock */}
        <div className="card" style={cardStyle}>
          <h2>Materials in Stock</h2>
          <p>{dashboardData.materialsInStock}</p>
        </div>

        {/* Total Project Value */}
        <div className="card" style={cardStyle}>
          <h2>Total Project Value</h2>
          <p>${dashboardData.totalProjectValue.toLocaleString()}</p>
        </div>

        {/* Total Payments Received */}
        <div className="card" style={cardStyle}>
          <h2>Total Payments Received</h2>
          <p>${dashboardData.totalPaymentsReceived.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
};

// Card style
const cardStyle = {
  backgroundColor: '#fff',
  padding: '20px',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  width: '250px',
  textAlign: 'center',
};

export default Dashboard;
