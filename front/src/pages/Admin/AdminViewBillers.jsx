import React, { useState, useEffect, useCallback } from 'react';
import { viewBillers, removeBiller } from '../../services/adminService';
import Button from '../../components/Button/Button';
import './admincss/AdminEntities.css';

const defaultAvatar = '/default-user.png';   

const AdminViewBillers = () => {
  const [billers, setBillers] = useState([]);
  const [message, setMessage] = useState('');

  const fetchBillers = useCallback(async () => {
    try {
      const res = await viewBillers();
      setBillers(res.data);
      setMessage('');
    } catch (err) {
      console.error(err);
      setMessage('Failed to fetch billers.');
    }
  }, []);

  const handleRemove = async (billerId) => {
    try {
      await removeBiller(billerId);
      setMessage(`Removed biller with ID ${billerId}`);
      fetchBillers();                       
    } catch (err) {
      console.error(err);
      setMessage('Remove failed.');
    }
  };

  useEffect(() => { fetchBillers(); }, [fetchBillers]);

  return (
    <section className="entity-page">
      {}
      <div className="entity-header">
        <h2 className="entity-title">All Billers</h2>
      </div>

      {message && <p className="entity-message">{message}</p>}

      <div className="entity-list">
        {billers.map((b) => (
          <div key={b.billerId} className="entity-card">
            <img src={defaultAvatar} alt="avatar" className="entity-avatar" />

            <div className="entity-info">
              <div><span className="entity-label">Name:</span> {b.billerName}</div>
              <div><span className="entity-label">Username:</span> {b.billerUsername}</div>
              <div>
                <span className="entity-label">ID</span>
                <span className="badge">{b.billerId}</span>
              </div>

              <div className="btn-row">
                <Button onClick={() => handleRemove(b.billerId)} className="danger">
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

export default AdminViewBillers;
