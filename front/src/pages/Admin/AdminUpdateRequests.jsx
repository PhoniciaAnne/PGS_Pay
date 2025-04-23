import React, { useState, useEffect } from 'react';
import { Table, Button, Alert } from 'react-bootstrap';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:7981';

function AdminUpdateRequests() {
  const [customerRequests, setCustomerRequests] = useState([]);
  const [billerRequests, setBillerRequests] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchCustomerRequests();
    fetchBillerRequests();
  }, []);

  const fetchCustomerRequests = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/viewCustomerUpdateRequests`);
      setCustomerRequests(res.data);
    } catch (err) {
      console.error('Error fetching customer update requests:', err);
      setMessage('Error fetching customer update requests.');
    }
  };

  const fetchBillerRequests = async () => {
    try {
      const res = await axios.get(`${API_BASE_URL}/admin/viewBillerUpdateRequests`);
      setBillerRequests(res.data);
    } catch (err) {
      console.error('Error fetching biller update requests:', err);
      setMessage('Error fetching biller update requests.');
    }
  };

  const approveCustomerUpdate = async (requestId) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/admin/approveCustomerUpdate`,
        {},
        { params: { requestId } }
      );
      setMessage(`Customer update request ${requestId} approved.`);
      fetchCustomerRequests();
    } catch (err) {
      console.error(`Error approving customer update ${requestId}:`, err);
      setMessage(`Error approving customer update request ${requestId}.`);
    }
  };

  const approveBillerUpdate = async (requestId) => {
    try {
      const res = await axios.post(
        `${API_BASE_URL}/admin/approveBillerUpdate`,
        {},
        { params: { requestId } }
      );
      setMessage(`Biller update request ${requestId} approved.`);
      fetchBillerRequests();
    } catch (err) {
      console.error(`Error approving biller update ${requestId}:`, err);
      setMessage(`Error approving biller update request ${requestId}.`);
    }
  };

  return (
    <div className="mt-4">
      <h2 className="text-center mb-4">Admin - Update Requests</h2>
      {message && <Alert variant="info">{message}</Alert>}
      
      <h4>Customer Update Requests</h4>
      {customerRequests.length === 0 ? (
        <p>No customer update requests found.</p>
      ) : (
        <Table striped bordered hover className="mb-5">
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Customer ID</th>
              <th>New Name</th>
              <th>New Username</th>
              <th>New Contact No</th>
              <th>Request Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {customerRequests.map(req => (
              <tr key={req.requestId}>
                <td>{req.requestId}</td>
                <td>{req.custId}</td>
                <td>{req.custName}</td>
                <td>{req.custUsername}</td>
                <td>{req.contactNo}</td>
                <td>{req.requestTime}</td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => approveCustomerUpdate(req.requestId)}
                  >
                    Approve
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      <h4>Biller Update Requests</h4>
      {billerRequests.length === 0 ? (
        <p>No biller update requests found.</p>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Biller ID</th>
              <th>New Name</th>
              <th>New Username</th>
              <th>Request Time</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {billerRequests.map(req => (
              <tr key={req.requestId}>
                <td>{req.requestId}</td>
                <td>{req.billerId}</td>
                <td>{req.billerName}</td>
                <td>{req.billerUsername}</td>
                <td>{req.requestTime}</td>
                <td>
                  <Button
                    variant="success"
                    size="sm"
                    onClick={() => approveBillerUpdate(req.requestId)}
                  >
                    Approve
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
}

export default AdminUpdateRequests;
