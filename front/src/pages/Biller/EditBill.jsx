// src/pages/Biller/EditBill.jsx
import React, { useState } from 'react';
import { editBill }       from '../../services/billerService';
import Button             from '../../components/Button/Button';
import Input              from '../../components/Input/Input';

const EditBill = () => {
  const [form, setForm]     = useState({ billId: '', customerId: '', dueDate: '' });
  const [message, setMsg]   = useState('');

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await editBill({
        billId:      parseInt(form.billId, 10),
        customerId:  parseInt(form.customerId, 10),
        dueDate:     form.dueDate        
      });
      setMsg('Bill due date updated successfully!');
    } catch (err) {
      console.error(err);
      setMsg('Failed to update bill.');  
    }
  };

  return (
    <section style={{ maxWidth: 400, margin: '2rem auto' }}>
      <h2>Edit Bill Due Date</h2>

      <Input
        label="Bill ID"
        name="billId"
        type="number"
        value={form.billId}
        onChange={handleChange}
      />

      <Input
        label="Customer ID"
        name="customerId"
        type="number"
        value={form.customerId}
        onChange={handleChange}
      />

      <Input
        label="New Due Date"
        name="dueDate"
        type="date"
        value={form.dueDate}
        onChange={handleChange}
      />

      <Button onClick={handleSubmit}>Submit</Button>

      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </section>
  );
};

export default EditBill;
