// import React, { useState } from 'react';
// import { generateBill } from '../../services/billerService';
// import Input from '../../components/Input/Input';
// import Button from '../../components/Button/Button';

// const BillerGenerateBill = () => {
//   const [form, setForm] = useState({
//     billerId: '',
//     customerId: '',
//     amount: '',
//     billIssuedDate: '',
//     dueDate: '',
//     status: 'Unpaid'
//   });
//   const [message, setMessage] = useState('');

//   const handleChange = (e) => {
//     setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
//   };

//   const handleGenerate = async () => {
//     try {
//       await generateBill({
//         ...form,
//         amount: parseFloat(form.amount)
//       });
//       setMessage('Bill generated successfully!');
//     } catch (error) {
//       console.error(error);
//       setMessage('Failed to generate bill.');
//     }
//   };

//   return (
//     <div>
//       <h2>Generate Bill</h2>
//       <Input label="Biller ID" name="billerId" value={form.billerId} onChange={handleChange} />
//       <Input label="Customer ID" name="customerId" value={form.customerId} onChange={handleChange} />
//       <Input label="Amount" name="amount" value={form.amount} onChange={handleChange} />
//       <Input label="Issued Date" type="date" name="billIssuedDate" value={form.billIssuedDate} onChange={handleChange} />
//       <Input label="Due Date" type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />
//       <Button onClick={handleGenerate}>Generate</Button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// };

// export default BillerGenerateBill;

import React, { useState, useEffect } from 'react';
import { generateBill } from '../../services/billerService';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';

const BillerGenerateBill = () => {
  const [form, setForm] = useState({
    billerId: '',       
    customerId: '',
    amount: '',
    billIssuedDate: '',
    dueDate: '',
    status: 'Unpaid',
    category: ''
  });

  const [message, setMessage] = useState('');
  const [categoryImage, setCategoryImage] = useState('');

  const categoryImages = {
    Electricity: 'http://localhost:7985/images/electricity.png',
    Water: 'http://localhost:7985/images/water.png',
    TV: 'http://localhost:7985/images/tv.png',
    Mobile: 'http://localhost:7985/images/mobile.png',
    'LPG Gas': 'http://localhost:7985/images/lpg.png'
  };

  useEffect(() => {
    const storedBillerId = localStorage.getItem('billerId');
    if (storedBillerId) {
      setForm(prev => ({ ...prev, billerId: storedBillerId }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));

    if (name === 'category') {
      setCategoryImage(categoryImages[value] || '');
    }
  };

  const handleGenerate = async () => {
    try {
      await generateBill({
        ...form,
        amount: parseFloat(form.amount)
      });
      setMessage('Bill generated successfully!');
    } catch (error) {
      console.error(error);
      setMessage('Failed to generate bill.');
    }
  };

  return (
    <div>
      <h2>Generate Bill</h2>
      <Input label="Biller ID" name="billerId" value={form.billerId} disabled />
      <Input label="Customer ID" name="customerId" value={form.customerId} onChange={handleChange} />
      <Input label="Amount" name="amount" value={form.amount} onChange={handleChange} />
      <Input label="Issued Date" type="date" name="billIssuedDate" value={form.billIssuedDate} onChange={handleChange} />
      <Input label="Due Date" type="date" name="dueDate" value={form.dueDate} onChange={handleChange} />

      <div>
        <label>Category:</label>
        <select name="category" value={form.category} onChange={handleChange}>
          <option value="">Select Category</option>
          <option value="Electricity">Electricity</option>
          <option value="Water">Water</option>
          <option value="TV">TV</option>
          <option value="Mobile">Mobile</option>
          <option value="LPG Gas">LPG Gas</option>
        </select>
      </div>

      {categoryImage && (
        <div>
          <img src={categoryImage} alt={form.category} style={{ width: '150px', marginTop: '10px' }} />
        </div>
      )}

      <Button onClick={handleGenerate}>Generate</Button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default BillerGenerateBill;