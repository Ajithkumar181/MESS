import React, { useState } from "react";
import axios from "axios";

const AddPayment = () => {
  const [contractorId, setContractorId] = useState("");  // State for Contractor ID
  const [amount, setAmount] = useState("");  // State for Amount
  const [paymentDate, setPaymentDate] = useState("");  // State for Payment Date
  const [projectId, setProjectId] = useState("");  // State for Project ID (optional)
  const [message, setMessage] = useState("");  // State for success message
  const [error, setError] = useState("");  // State for error message

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();  // Prevent default form submission behavior

    // Validate required fields
    if (!contractorId || !paymentDate) {
      setError("ContractorID and PaymentDate are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/add-payment", {
        contractorId: parseInt(contractorId),  // Ensure contractorId is an integer
        amount: parseInt(amount) || 0,  // Default to 0 if no amount is provided
        paymentDate: paymentDate,  // Payment date in 'YYYY-MM-DD' format
        projectId: projectId || null,  // Set ProjectID as null if not provided
      });

      setMessage(response.data.message);  // Set success message
      setError("");  // Clear any previous error messages
    } catch (err) {
      console.error("Error adding payment:", err.response || err.message);
      setError(
        err.response?.data?.message || "An unexpected error occurred."  // Handle error from backend
      );
      setMessage("");  // Clear success message on error
    }
  };

  return (
    <div>
      <h2>Add Contractor Payment</h2>

      {/* Show success or error message */}
      {message && <p style={{ color: "green" }}>{message}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}

      {/* Payment form */}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Contractor ID:</label>
          <input
            type="number"
            value={contractorId}
            onChange={(e) => setContractorId(e.target.value)}  // Update contractorId on change
            required
            min="1"  // No auto-increment behavior, just allowing positive integers
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}  // Update amount on change
            min="0"  // Amount can be any positive number, no range limit
          />
        </div>
        <div>
          <label>Payment Date:</label>
          <input
            type="date"
            value={paymentDate}
            onChange={(e) => setPaymentDate(e.target.value)}  // Update paymentDate on change
            required
          />
        </div>
        <div>
          <label>Project ID (Optional):</label>
          <input
            type="number"
            value={projectId}
            onChange={(e) => setProjectId(e.target.value)}  // Update projectId on change
            min="1"  // Allow positive integer or empty
          />
        </div>
        <button type="submit">Add Payment</button>
      </form>
      
    </div>
    
  );
};

export default AddPayment;
