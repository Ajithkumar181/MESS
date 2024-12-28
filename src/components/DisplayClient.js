import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/DisplayClient.css';

const ClientsTable = () => {
  const [clients, setClients] = useState([]); // State to hold client data
  const [editClient, setEditClient] = useState(null); // State for editing a client
  const [formData, setFormData] = useState({
    Name: '',
    ContactNumber: '',
    Email: '',
    Address: '',
  }); // Form data

  // Fetch clients data from the backend
  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = async () => {
    try {
      const response = await axios.get('http://localhost:5000/clients');
      setClients(response.data);
    } catch (error) {
      console.error('Error fetching clients:', error);
      alert('Failed to fetch clients. Please try again later.');
    }
  };

  // Handle delete client
  const handleDelete = async (clientID) => {
    try {
      const response = await axios.delete(`http://localhost:5000/clients/${clientID}`);
      alert(response.data.message); // Show server message
      fetchClients(); // Refresh the client list
    } catch (error) {
      console.error('Error deleting client:', error);
      alert('Failed to delete client. Please try again.');
    }
  };

  // Handle edit button click
  const handleEdit = (client) => {
    setEditClient(client.ClientID);
    setFormData({
      Name: client.Name,
      ContactNumber: client.ContactNumber,
      Email: client.Email,
      Address: client.Address,
    });
  };

  // Handle input changes in the form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Handle form submission for editing
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`http://localhost:5000/clients/${editClient}`, formData);
      alert(response.data.message); // Show server message
      setEditClient(null);
      setFormData({
        Name: '',
        ContactNumber: '',
        Email: '',
        Address: '',
      });
      fetchClients(); // Refresh the list
    } catch (error) {
      console.error('Error updating client:', error);
      alert('Failed to update client. Please try again.');
    }
  };

  return (
    <div>
      <h1>Clients Table</h1>
      <table border="1" cellPadding="10" cellSpacing="0">
        <thead>
          <tr>
            <th>ClientID</th>
            <th>Name</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client) => (
            <tr key={client.ClientID}>
              <td>{client.ClientID}</td>
              <td>{client.Name}</td>
              <td>{client.ContactNumber}</td>
              <td>{client.Email}</td>
              <td>{client.Address}</td>
              <td>
                <button onClick={() => handleEdit(client)}>Edit</button>
                <button onClick={() => handleDelete(client.ClientID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editClient && (
        <div style={{ marginTop: '20px' }}>
          <h2>Edit Client</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name:</label>
              <input
                type="text"
                name="Name"
                value={formData.Name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Contact Number:</label>
              <input
                type="text"
                name="ContactNumber"
                value={formData.ContactNumber}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Email:</label>
              <input
                type="email"
                name="Email"
                value={formData.Email}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <label>Address:</label>
              <textarea
                name="Address"
                value={formData.Address}
                onChange={handleInputChange}
                required
              ></textarea>
            </div>
            <button type="submit">Save</button>
            <button type="button" onClick={() => setEditClient(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default ClientsTable;
