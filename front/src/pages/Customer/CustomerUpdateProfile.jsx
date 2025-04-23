import React, { useState } from 'react';
import { requestCustomerUpdate } from '../../services/customerService';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const CustomerUpdateProfile = () => {
  const [form, setForm] = useState({
    custId: '',
    custName: '',
    contactNo: '',
    custUsername: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    try {
      await requestCustomerUpdate(form);
      setMessage('Update request sent successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Update request failed.');
    }
  };

  return (
    <div>
      <h2>Update Profile</h2>
      <Input
        label="Customer ID"
        name="custId"
        type="number"
        value={form.custId}
        onChange={handleChange}
      />
      <Input
        label="New Name"
        name="custName"
        value={form.custName}
        onChange={handleChange}
      />
      <Input
        label="New Contact No"
        name="contactNo"
        value={form.contactNo}
        onChange={handleChange}
      />
      <Input
        label="New Username"
        name="custUsername"
        value={form.custUsername}
        onChange={handleChange}
      />
      <Button onClick={handleSubmit}>Submit</Button>

      {message && <p>{message}</p>}
    </div>
  );
};

export default CustomerUpdateProfile;
