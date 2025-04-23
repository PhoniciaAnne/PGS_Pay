import React, { useState, useEffect } from 'react';
import { editBiller, editCustomer, getEditRequests } from '../../services/adminService';
import Button from '../../components/Button/Button';
import './admincss/AdminEntities.css';

const AdminEditRequests = () => {
  const [editRequests, setEditRequests] = useState([]);
  const [message, setMessage] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    const fetchEditRequests = async () => {
      try {
        const response = await getEditRequests();
        if (Array.isArray(response.data)) {
          setEditRequests(response.data);
        } else {
          setMessage('Invalid data format received.');
        }
      } catch (error) {
        console.error(error);
        setMessage('Failed to fetch edit requests.');
      }
    };

    fetchEditRequests();
  }, []);

  const handleApprove = async (id, type) => {
    try {
      if (type === 'customer') {
        await editCustomer({ custId: id });
        setMessage(`Customer (ID ${id}) updated successfully.`);
      } else {
        await editBiller({ billerId: id });
        setMessage(`Biller (ID ${id}) updated successfully.`);
      }
    } catch (error) {
      console.error(error);
      setMessage(`Failed to approve ${type} edit.`);
    }
  };

  const renderFields = (data) => {
    return Object.entries(data)
      .filter(([_, value]) => value && value !== '' && value !== 0)
      .map(([key, value]) => (
        <div key={key} className="edit-field">
          <span className="field-name">{key.replace(/([A-Z])/g, ' $1')}: </span>
          <span className="field-value">{value}</span>
        </div>
      ));
  };

  const filteredRequests = editRequests.filter((req) => {
    if (filter === 'customer') return req.billerId === 0;
    if (filter === 'biller') return req.custId === 0;
    return true;
  });

  return (
    <div className="edit-requests-page">
      <h2>Edit Requests</h2>
      <div className="filter-buttons">
        <Button onClick={() => setFilter('all')} variant={filter === 'all' ? 'primary' : 'outline'}>All</Button>
        <Button onClick={() => setFilter('customer')} variant={filter === 'customer' ? 'primary' : 'outline'}>Customer</Button>
        <Button onClick={() => setFilter('biller')} variant={filter === 'biller' ? 'primary' : 'outline'}>Biller</Button>
      </div>

      {message && <p className="toast">{message}</p>}

      <div className="edit-request-grid">
        {filteredRequests.map((req) => {
          const isCustomer = req.billerId === 0;
          const type = isCustomer ? 'customer' : 'biller';

          return (
            <div className="edit-card" key={req.editId}>
              <h4>{isCustomer ? 'Customer Edit Request' : 'Biller Edit Request'}</h4>
              <div className="edit-fields">
                {isCustomer
                  ? renderFields({
                      'Customer ID': req.custId,
                      'Customer Name': req.custName,
                      'Contact No': req.contactNo,
                      'Username': req.custUsername
                    })
                  : renderFields({
                      'Biller ID': req.billerId,
                      'Biller Name': req.billerName,
                      'Username': req.billerUsername
                    })}
              </div>
              <p className="edit-time">
                Requested At: {new Date(req.requestTime).toLocaleString()}
              </p>
              <Button onClick={() => handleApprove(isCustomer ? req.custId : req.billerId, type)}>
                Approve Changes
              </Button>
            </div>
          );
        })}
        {filteredRequests.length === 0 && <p>No {filter} requests found.</p>}
      </div>
    </div>
  );
};

export default AdminEditRequests;



