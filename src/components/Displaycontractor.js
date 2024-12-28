import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Contractors = () => {
  const [contractors, setContractors] = useState([]);
  const [selectedContractor, setSelectedContractor] = useState(null);
  const [formData, setFormData] = useState({
    Name: '',
    ContactNumber: '',
    Email: '',
    Specialization: '',
  });
  const [message, setMessage] = useState('');

  // Fetch contractors when the component mounts
  useEffect(() => {
    fetchContractors();
  }, []);

  // Fetch contractors from the server
  const fetchContractors = async () => {
    try {
      const response = await axios.get('http://localhost:5000/contractors');
      setContractors(response.data);
    } catch (error) {
      console.error('Error fetching contractors:', error);
      setMessage('Error fetching contractors.');
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle contractor selection for editing
  const handleEdit = (contractor) => {
    setSelectedContractor(contractor);
    setFormData({
      Name: contractor.Name,
      ContactNumber: contractor.ContactNumber,
      Email: contractor.Email,
      Specialization: contractor.Specialization,
    });
  };

  // Handle form submission (update contractor)
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.Name || !formData.ContactNumber || !formData.Email || !formData.Specialization) {
      setMessage('All fields are required.');
      return;
    }

    try {
      const response = await axios.put(`http://localhost:5000/contractor/${selectedContractor.ContractorID}`, formData);
      setMessage(response.data.message || 'Contractor updated successfully.');
      setFormData({
        Name: '',
        ContactNumber: '',
        Email: '',
        Specialization: '',
      });
      setSelectedContractor(null);
      fetchContractors(); // Refresh the list of contractors
    } catch (error) {
      console.error('Error updating contractor:', error);
      setMessage('Error updating contractor.');
    }
  };

  // Handle contractor deletion
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this contractor?')) {
      try {
        const response = await axios.delete(`http://localhost:5000/contractor/${id}`);
        setMessage(response.data.message || 'Contractor deleted successfully.');
        fetchContractors(); // Refresh the list of contractors
      } catch (error) {
        console.error('Error deleting contractor:', error);
        setMessage('Error deleting contractor.');
      }
    }
  };

  return (
    <div>
      <h1>Contractors</h1>
      
      {/* Message Display */}
      {message && <p>{message}</p>}

      {/* Table for displaying contractors */}
      <table border="1">
        <thead>
          <tr>
            <th>Contractor ID</th> {/* Added column for Contractor ID */}
            <th>Name</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Specialization</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {contractors.map((contractor) => (
            <tr key={contractor.ContractorID}>
              <td>{contractor.ContractorID}</td> {/* Display Contractor ID */}
              <td>{contractor.Name}</td>
              <td>{contractor.ContactNumber}</td>
              <td>{contractor.Email}</td>
              <td>{contractor.Specialization}</td>
              <td>
                <button onClick={() => handleEdit(contractor)}>Edit</button>
                <button onClick={() => handleDelete(contractor.ContractorID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Form for editing contractor */}
      {selectedContractor && (
        <form onSubmit={handleSubmit}>
          <h2>Edit Contractor</h2>
          <div>
            <label>Name:</label>
            <input
              type="text"
              name="Name"
              value={formData.Name}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Contact Number:</label>
            <input
              type="text"
              name="ContactNumber"
              value={formData.ContactNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              name="Email"
              value={formData.Email}
              onChange={handleChange}
              required
            />
          </div>
          <div>
            <label>Specialization:</label>
            <input
              type="text"
              name="Specialization"
              value={formData.Specialization}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Update Contractor</button>
        </form>
      )}
    </div>
  );
};

export default Contractors;
