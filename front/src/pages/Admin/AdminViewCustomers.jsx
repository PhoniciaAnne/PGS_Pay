import React, { useState, useEffect, useCallback } from 'react';
import { viewCustomers, removeCustomer } from '../../services/adminService';
import Button from '../../components/Button/Button';
import './admincss/AdminEntities.css';

const defaultAvatar = '/default-user.png';

const AdminViewCustomers = () => {
  const [customers, setCustomers] = useState([]);
  const [message,   setMessage]   = useState('');

  const fetchCustomers = useCallback(async () => {
    try {
      const res = await viewCustomers();
      setCustomers(res.data);
      setMessage('');
    } catch (err) {
      console.error(err);
      setMessage('Failed to fetch customers.');
    }
  }, []);

  const handleRemove = async (custId) => {
    try {
      await removeCustomer(custId);
      setMessage(`Removed customer #${custId}`);
      fetchCustomers();                
    } catch (err) {
      console.error(err);
      setMessage('Remove failed.');
    }
  };

  useEffect(() => { fetchCustomers(); }, [fetchCustomers]);

  return (
    <section className="entity-page">
      <header className="entity-header">
        <h2 className="entity-title">All Customers</h2>
      </header>

      {message && <p className="entity-message">{message}</p>}

      <div className="entity-list">
        {customers.map((c) => (
          <div key={c.custId} className="entity-card">
            <img src={defaultAvatar} alt="avatar" className="entity-avatar" />

            <div className="entity-info">
              <div><span className="entity-label">Name:</span> {c.custName}</div>
              <div><span className="entity-label">Username:</span> {c.custUsername}</div>
              <div><span className="entity-label">Contact:</span> {c.contactNo}</div>

              <div>
                <span className="entity-label">ID</span>
                <span className="badge">{c.custId}</span>
              </div>

              <div className="btn-row">
                <Button className="danger" onClick={() => handleRemove(c.custId)}>
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default AdminViewCustomers;
