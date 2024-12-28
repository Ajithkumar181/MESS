import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../CSS/Displaycontractorpayment.css'
const App = () => {
  const [payments, setPayments] = useState([]);
  const [editing, setEditing] = useState(null);
  const [formData, setFormData] = useState({
    ContractorID: '',
    Amount: '',
    PaymentDate: '',
    ProjectID: ''
  });

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/payments');
      setPayments(response.data);
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const handleEdit = (payment) => {
    setEditing(payment.PaymentID);
    setFormData({
      ContractorID: payment.ContractorID,
      Amount: payment.Amount,
      PaymentDate: payment.PaymentDate,
      ProjectID: payment.ProjectID
    });
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/payments/${editing}`, formData);
      fetchPayments();
      setEditing(null);
    } catch (error) {
      console.error('Error updating payment:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/payments/${id}`);
      fetchPayments();
    } catch (error) {
      console.error('Error deleting payment:', error);
    }
  };

  return (
    <div>
      <h1>Contractor Payments</h1>
      <table border="1">
        <thead>
          <tr>
            <th>PaymentID</th>
            <th>ContractorID</th>
            <th>Amount</th>
            <th>PaymentDate</th>
            <th>ProjectID</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.PaymentID}>
              <td>{payment.PaymentID}</td>
              <td>{payment.ContractorID}</td>
              <td>{payment.Amount}</td>
              <td>{payment.PaymentDate}</td>
              <td>{payment.ProjectID}</td>
              <td>
                <button onClick={() => handleEdit(payment)}>Edit</button>
                <button onClick={() => handleDelete(payment.PaymentID)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {editing && (
        <div>
          <h2>Edit Payment</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate();
            }}
          >
            <input
              type="number"
              placeholder="ContractorID"
              value={formData.ContractorID}
              onChange={(e) => setFormData({ ...formData, ContractorID: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="Amount"
              value={formData.Amount}
              onChange={(e) => setFormData({ ...formData, Amount: e.target.value })}
              required
            />
            <input
              type="date"
              placeholder="PaymentDate"
              value={formData.PaymentDate}
              onChange={(e) => setFormData({ ...formData, PaymentDate: e.target.value })}
              required
            />
            <input
              type="number"
              placeholder="ProjectID"
              value={formData.ProjectID}
              onChange={(e) => setFormData({ ...formData, ProjectID: e.target.value })}
            />
            <button type="submit">Update</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default App;
