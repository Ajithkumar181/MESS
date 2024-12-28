import React, { useState, useEffect } from 'react';
import axios from 'axios';


const PaymentsContractor = () => {
  // State to store the payments data
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Function to fetch data from the API
  const fetchPayments = async () => {
    try {
      const response = await axios.get('http://localhost:5000/payments-contractor');
      setPayments(response.data);
      setLoading(false);
    } catch (err) {
      setError('Error fetching payments');
      setLoading(false);
      console.error(err);
    }
  };

  // useEffect to call fetchPayments when the component mounts
  useEffect(() => {
    fetchPayments();
  }, []);

  // Render the payments data in a table
  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <h1>Contractor Payments</h1>
      <table border="1" cellPadding="10" cellSpacing="0" style={{ width: '100%', marginTop: '20px', textAlign: 'left' }}>
        <thead>
          <tr>
            <th>PaymentID</th>
            <th>ContractorID</th>
            <th>Contractor Name</th>
            <th>Amount</th>
            <th>Payment Date</th>
            <th>ProjectID</th>
          </tr>
        </thead>
        <tbody>
          {payments.map((payment) => (
            <tr key={payment.PaymentID}>
              <td>{payment.PaymentID}</td>
              <td>{payment.ContractorID}</td>
              <td>{payment.ContractorName}</td>
              <td>{payment.Amount}</td>
              <td>{payment.PaymentDate}</td>
              <td>{payment.ProjectID}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentsContractor;
