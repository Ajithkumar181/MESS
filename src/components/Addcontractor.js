import React, { useState } from "react";
import axios from "axios";


const AddContractor = () => {
  const [formData, setFormData] = useState({
    Name: "",
    ContactNumber: "",
    Email: "",
    Specialization: "",
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);  // Loading state to indicate submission
  const [showPopup, setShowPopup] = useState(false);  // State to show the popup

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.Name || !formData.ContactNumber || !formData.Email || !formData.Specialization) {
      setMessage("All fields are required.");
      return;
    }

    setLoading(true);  // Set loading to true when API request is being made

    try {
      // Change the server URL to http://localhost:5000
      const response = await axios.post("http://localhost:5000/add-contractor", formData);
      setMessage(response.data.message);
      setFormData({
        Name: "",
        ContactNumber: "",
        Email: "",
        Specialization: "",
      });
      setLoading(false);  // Set loading to false after receiving response
      setShowPopup(true);  // Show the popup upon successful submission

      // Optional: Reset the message after 5 seconds
      setTimeout(() => {
        setMessage("");
        setShowPopup(false);  // Hide the popup after 5 seconds
      }, 5000);

    } catch (error) {
      setMessage(`Error: ${error.response ? error.response.data.message : error.message}`);  // Show the error message from the backend
      setLoading(false);  // Set loading to false on error
      console.error("API Error:", error);  // Log the error for debugging
    }
  };

  return (
    <div>
      <h1>Add Contractor</h1>
      <form onSubmit={handleSubmit}>
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
        <button type="submit" disabled={loading}>
          {loading ? "Adding Contractor..." : "Add Contractor"}
        </button>
      </form>
      {message && <p>{message}</p>}

      {/* Popup Message */}
      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <p>Contractor added successfully!</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddContractor;
