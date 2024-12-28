import React, { useState } from 'react';
import axios from 'axios';
import '../CSS/AddMaterial.css'

const AddMaterial = () => {
  // State for form fields
  const [name, setName] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [stockQuantity, setStockQuantity] = useState('');

  // State for error/success messages
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!name || !unitPrice || !stockQuantity) {
      setError('Please fill in all the fields.');
      return;
    }

    // Prepare data to send to the server
    const materialData = {
      Name: name,
      UnitPrice: parseFloat(unitPrice),
      StockQuantity: parseInt(stockQuantity),
    };

    try {
      // Send POST request to server to add material
      const response = await axios.post('http://localhost:5000/add-material', materialData);
      setMessage(response.data.message);
      setError('');
      
      // Clear input fields after successful submission
      setName('');
      setUnitPrice('');
      setStockQuantity('');
    } catch (err) {
      setMessage('');
      setError(err.response ? err.response.data.message : 'Error adding material');
    }
  };

  return (
    <div>
      <h2>Add New Material</h2>
      
      {/* Display success or error message */}
      {message && <div style={{ color: 'green' }}>{message}</div>}
      {error && <div style={{ color: 'red' }}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Material Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Unit Price:</label>
          <input
            type="number"
            value={unitPrice}
            onChange={(e) => setUnitPrice(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Stock Quantity:</label>
          <input
            type="number"
            value={stockQuantity}
            onChange={(e) => setStockQuantity(e.target.value)}
            required
          />
        </div>
        <div>
          <button type="submit">Add Material</button>
        </div>
      </form>
    </div>
  );
};

export default AddMaterial;