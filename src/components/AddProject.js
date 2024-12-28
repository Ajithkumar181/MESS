import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/Addproject.css';

function AddProject() {
  // State to hold form data
  const [name, setName] = useState('Residential'); // Default to "Residential"
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [clientID, setClientID] = useState('');
  const [budget, setBudget] = useState('');
  const [status, setStatus] = useState('Pending');
  const [address, setAddress] = useState('');  // New state for Address
  const [amountPaid, setAmountPaid] = useState(0);  // New state for AmountPaid
  const [message, setMessage] = useState('');

  // Validate if the inputs are correct
  const validateForm = () => {
    if (!name || !startDate || !endDate || !clientID || !budget || !status || !address || amountPaid === '') {
      setMessage('All fields are required.');
      return false;
    }

    // Check if the budget is a positive number
    if (parseFloat(budget) <= 0 || isNaN(budget)) {
      setMessage('Budget must be a positive number.');
      return false;
    }

    // Check if the client ID is a positive number
    if (clientID <= 0 || isNaN(clientID)) {
      setMessage('Client ID must be a positive number.');
      return false;
    }

    // Check if the amount paid is a positive number
    if (parseFloat(amountPaid) < 0 || isNaN(amountPaid)) {
      setMessage('Amount Paid must be a non-negative number.');
      return false;
    }

    return true;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form data
    if (!validateForm()) return;

    // Create project data object
    const projectData = {
      Name: name,  // The name is set to a selected value
      StartDate: startDate,
      EndDate: endDate,
      ClientID: clientID,
      Budget: parseFloat(budget),
      Status: status,
      Address: address,  // Include Address
      AmountPaid: parseFloat(amountPaid),  // Include AmountPaid
    };

    try {
      // Send POST request to the server to add the project
      const response = await axios.post('http://localhost:5000/projects', projectData);

      // Handle success response
      setMessage(response.data.message);

      // Reset the form fields
      setStartDate('');
      setEndDate('');
      setClientID('');
      setBudget('');
      setStatus('Pending');
      setAddress('');
      setAmountPaid(0);
      setName('Residential');  // Reset name to default "Residential"

      // Show success popup message
      alert('Project added successfully!');
    } catch (error) {
      // Handle error response
      if (error.response) {
        setMessage(`Error: ${error.response.data.error}`);
      } else {
        setMessage('An error occurred while adding the project');
      }
    }

    // Clear the message after 5 seconds
    setTimeout(() => setMessage(''), 5000);
  };

  return (
    <div>
      <h1>Add Project</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Project Name:</label>
          <select
            value={name}  // Display the selected project name
            onChange={(e) => setName(e.target.value)} // Allow user to change the name
            required
          >
            <option value="Residential">Residential</option>
            <option value="Commercial">Commercial</option>
            <option value="Planning">Planning</option>
          </select>
        </div>
        <div>
          <label>Start Date:</label>
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>End Date:</label>
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Client ID:</label>
          <input
            type="text"
            value={clientID}
            onChange={(e) => setClientID(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Budget:</label>
          <input
            type="text"
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Status:</label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            required
          >
            <option value="Pending">Pending</option>
            <option value="In Progress">In Progress</option>
            <option value="Completed">Completed</option>
          </select>
        </div>
        <div>
          <label>Address:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Amount Paid:</label>
          <input
            type="number"
            value={amountPaid}
            onChange={(e) => setAmountPaid(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Project</button>
      </form>

      {/* Display success/error message */}
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddProject;
