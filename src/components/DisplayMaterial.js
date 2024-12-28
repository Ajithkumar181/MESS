import React, { useState, useEffect } from 'react';
import '../CSS/Displaymaterial.css';
const MaterialManagement = () => {
  const [materials, setMaterials] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState({
    MaterialID: '',
    Name: '',
    UnitPrice: '',
    StockQuantity: ''
  });

  // Fetch materials from the server when the component mounts
  useEffect(() => {
    fetch('http://localhost:5000/materials')
      .then((response) => response.json())
      .then((data) => setMaterials(data))
      .catch((error) => console.error('Error fetching materials:', error));
  }, []);

  // Handle the edit button click
  const handleEdit = (material) => {
    setCurrentMaterial(material);
    setEditMode(true);
  };

  // Handle the delete button click
  const handleDelete = (id) => {
    fetch(`http://localhost:5000/materials/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        setMaterials(materials.filter((material) => material.MaterialID !== id));
      })
      .catch((error) => console.error('Error deleting material:', error));
  };

  // Handle the form submission for editing
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/materials/${currentMaterial.MaterialID}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(currentMaterial),
    })
      .then((response) => response.json())
      .then((data) => {
        alert(data.message);
        setEditMode(false);
        setMaterials(
          materials.map((material) =>
            material.MaterialID === currentMaterial.MaterialID ? currentMaterial : material
          )
        );
      })
      .catch((error) => console.error('Error updating material:', error));
  };

  // Handle input changes for the edit form
  const handleChange = (e) => {
    setCurrentMaterial({
      ...currentMaterial,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div>
      <h1>Material Management</h1>

      {/* Display the edit form if editMode is true */}
      {editMode ? (
        <div>
          <h2>Edit Material</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label>Name</label>
              <input
                type="text"
                name="Name"
                value={currentMaterial.Name}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Unit Price</label>
              <input
                type="number"
                name="UnitPrice"
                value={currentMaterial.UnitPrice}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label>Stock Quantity</label>
              <input
                type="number"
                name="StockQuantity"
                value={currentMaterial.StockQuantity}
                onChange={handleChange}
                required
              />
            </div>
            <button type="submit">Update Material</button>
            <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
          </form>
        </div>
      ) : (
        // Display the materials list when not in edit mode
        <div>
          <h2>Materials List</h2>
          <table>
            <thead>
              <tr>
                <th>MaterialID</th>
                <th>Name</th>
                <th>Unit Price</th>
                <th>Stock Quantity</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {materials.map((material) => (
                <tr key={material.MaterialID}>
                  <td>{material.MaterialID}</td>
                  <td>{material.Name}</td>
                  <td>{material.UnitPrice}</td>
                  <td>{material.StockQuantity}</td>
                  <td>
                    <button onClick={() => handleEdit(material)}>Edit</button>
                    <button onClick={() => handleDelete(material.MaterialID)}>Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MaterialManagement;
