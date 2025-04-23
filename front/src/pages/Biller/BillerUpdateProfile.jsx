import React, { useState } from 'react';
import { requestBillerUpdate } from '../../services/billerService';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const BillerUpdateProfile = () => {
  const [form, setForm] = useState({
    billerId: '',
    billerName: '',
    billerUsername: ''
   
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleUpdate = async () => {
    try {
      await requestBillerUpdate(form);
      setMessage('Update request sent!');
    } catch (error) {
      console.error(error);
      setMessage('Request update failed.');
    }
  };

  return (
    <div>
      <h2>Update Biller Profile</h2>
      <Input
        label="Biller ID"
        name="billerId"
        value={form.billerId}
        onChange={handleChange}
      />
      <Input
        label="New Biller Name"
        name="billerName"
        value={form.billerName}
        onChange={handleChange}
      />
      <Input
        label="New Biller Username"
        name="billerUsername"
        value={form.billerUsername}
        onChange={handleChange}
      />
      <Button onClick={handleUpdate}>Submit</Button>
      {message && <p style={{ marginTop: '1rem' }}>{message}</p>}
    </div>
  );
};

export default BillerUpdateProfile;
