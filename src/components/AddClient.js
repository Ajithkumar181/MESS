import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/AddClient.css';

function AddClient() {
  const [formData, setFormData] = useState({
    Name: '',
    ContactNumber: '',
    Email: '',
    Address: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:5000/add-client', formData)
      .then((response) => {
        alert(response.data); // Show a success message
        setFormData({ Name: '', ContactNumber: '', Email: '', Address: '' }); // Clear the form fields
      })
      .catch((error) => {
        console.error('Error adding client:', error);
        alert('Failed to add client'); // Show an error message
      });
  };

  return (
    <div className="add-client-container">
      <h1>Add Client</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="Name"
            value={formData.Name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Contact Number:</label>
          <input
            type="text"
            name="ContactNumber"
            value={formData.ContactNumber}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="Email"
            value={formData.Email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Address:</label>
          <textarea
            name="Address"
            value={formData.Address}
            onChange={handleChange}
          ></textarea>
        </div>
        <button type="submit">Add Client</button>
      </form>
    </div>
  );
}

export default AddClient;
