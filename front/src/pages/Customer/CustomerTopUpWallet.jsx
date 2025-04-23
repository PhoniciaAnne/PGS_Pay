

// import React, { useState, useEffect } from 'react';
// import Input from '../../components/Input/Input';
// import Button from '../../components/Button/Button';
// import axios from 'axios';
// import './../shared/TopUpWallet.css'
// const CustomerTopUpWallet = () => {
//   const [amount, setAmount]   = useState('');
//   const [message, setMessage] = useState('');
//   const [custId, setCustId]   = useState('');

//   const [showModal, setShowModal] = useState(false);
//   const [method, setMethod]       = useState('');
//   const [cardNumber, setCardNumber] = useState('');
//   const [expiry, setExpiry]       = useState('');
//   const [cvv, setCvv]             = useState('');
//   const [upiId, setUpiId]         = useState('');

//   useEffect(() => {
//     const stored = localStorage.getItem('custId');
//     if (stored) setCustId(stored);
//   }, []);

//   const openModal = () => {
//     if (!amount || Number(amount) <= 0) {
//       setMessage('Please enter a valid amount first.');
//       return;
//     }
//     setMessage('');
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setMethod('');
//     setCardNumber('');
//     setExpiry('');
//     setCvv('');
//     setUpiId('');
//   };

//   const handleTopUp = async () => {
//     try {
//       const res = await axios.put(
//         '/customer/topup',
//         {},
//         { params: { customerId: custId, amount } }
//       );
//       setMessage(res.data);
//       setAmount('');
//     } catch (err) {
//       if (err.request && !err.response) {
//         setMessage('Network Error: could not reach server.');
//       } else if (err.response) {
//         setMessage(`Server Error ${err.response.status}: ${err.response.data}`);
//       } else {
//         setMessage(`Error: ${err.message}`);
//       }
//       console.error(err);
//     }
//   };

//   const handlePay = () => {
//     closeModal();
//     handleTopUp();
//   };

//   return (
//     <div className="topup-container">
//       <h2>Top Up Wallet</h2>
//       <Input
//         label="Amount"
//         type="number"
//         value={amount}
//         onChange={e => setAmount(e.target.value)}
//       />
//       <Button onClick={openModal} disabled={!amount}>
//         Top Up
//       </Button>

//       {message && <p className="message">{message}</p>}

//       {showModal && (
//         <div className="modal-overlay">
//           <div className="modal">
//             <h3>Select Payment Method</h3>
//             <select
//               value={method}
//               onChange={e => setMethod(e.target.value)}
//             >
//               <option value="">-- Choose --</option>
//               <option value="credit">Credit Card</option>
//               <option value="debit">Debit Card</option>
//               <option value="upi">UPI</option>
//             </select>

//             {(method === 'credit' || method === 'debit') && (
//               <>
//                 <Input
//                   label="Card Number"
//                   type="text"
//                   value={cardNumber}
//                   onChange={e => setCardNumber(e.target.value)}
//                 />
//                 <Input
//                   label="Expiry Date (MM/YY)"
//                   type="text"
//                   value={expiry}
//                   onChange={e => setExpiry(e.target.value)}
//                 />
//                 <Input
//                   label="CVV"
//                   type="password"
//                   value={cvv}
//                   onChange={e => setCvv(e.target.value)}
//                 />
//               </>
//             )}

//             {method === 'upi' && (
//               <Input
//                 label="UPI ID"
//                 type="text"
//                 value={upiId}
//                 onChange={e => setUpiId(e.target.value)}
//               />
//             )}

//             <div className="modal-actions">
//               <Button variant="secondary" onClick={closeModal}>
//                 Cancel
//               </Button>
//               <Button
//                 onClick={handlePay}
//                 disabled={
//                   !method ||
//                   (method === 'upi'
//                     ? !upiId
//                     : !(cardNumber && expiry && cvv))
//                 }
//               >
//                 Pay ₹{amount}
//               </Button>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CustomerTopUpWallet;
// src/pages/Customer/CustomerTopUpWallet.jsx
import React, { useState, useEffect } from 'react';
import Input from '../../components/Input/Input';
import Button from '../../components/Button/Button';
import {
  FaCreditCard,
  FaUniversity,
  FaWallet,
  FaMobileAlt,
  FaLock
} from 'react-icons/fa';
import axios from 'axios';
import '../shared/TopUpWallet.css';

export default function CustomerTopUpWallet() {
  const [amount, setAmount]     = useState('');
  const [message, setMessage]   = useState('');
  const [custId, setCustId]     = useState('');
  const [showModal, setShowModal] = useState(false);
  const [method, setMethod]     = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [expiry, setExpiry]     = useState('');
  const [cvv, setCvv]           = useState('');
  const [upiId, setUpiId]       = useState('');

  useEffect(() => {
    const stored = localStorage.getItem('custId');
    if (stored) setCustId(stored);
  }, []);

  const openModal = () => {
    if (!amount || Number(amount) <= 0) {
      setMessage('Enter a valid amount.');
      return;
    }
    setMessage('');
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setMethod('');
    setCardNumber(''); setExpiry(''); setCvv(''); setUpiId('');
  };

  const handleTopUp = async () => {
    try {
      const res = await axios.put('/customer/topup', {}, {
        params: { customerId: custId, amount }
      });
      setMessage(res.data);
      setAmount('');
    } catch (err) {
      if (err.request && !err.response) {
        setMessage('Network error.');
      } else if (err.response) {
        setMessage(`Error ${err.response.status}: ${err.response.data}`);
      } else {
        setMessage(err.message);
      }
    }
  };

  const handlePay = () => {
    closeModal();
    handleTopUp();
  };

  const methods = [
    { key: 'credit', icon: <FaCreditCard />, label: 'Credit/Debit Card' },
    { key: 'netbanking', icon: <FaUniversity />, label: 'Netbanking' },
    { key: 'upi', icon: <FaMobileAlt />, label: 'UPI' },
  ];

  return (
    <div className="topup-container">
      <h2>Top Up Wallet</h2>
      <Input
        label="Amount"
        type="number"
        value={amount}
        onChange={e => setAmount(e.target.value)}
      />
      <Button onClick={openModal} disabled={!amount}>Top Up</Button>
      {message && <p className="message">{message}</p>}

      {showModal && (
        <div className="modal-overlay">
          <div className="modal checkout-modal">
            {}
            <div className="modal-header">
              <div className="merchant-info">
                <div className="merchant-logo">P</div>
                <div>
                  <h4>PGS PAY</h4>
                  <small>Trusted Payment Partner</small>
                </div>
              </div>
              <div className="amount-summary">
                <div>Amount</div>
                <div className="amount-value">₹{amount}</div>
              </div>
            </div>

            {}
            <div className="modal-body">
              {/* LEFT COLUMN */}
              <div className="methods-list">
                <h5>Select a payment method</h5>
                {methods.map(m => (
                  <div
                    key={m.key}
                    className={`method-item ${method===m.key?'active':''}`}
                    onClick={() => setMethod(m.key)}
                  >
                    <span className="icon">{m.icon}</span>
                    <span>{m.label}</span>
                  </div>
                ))}
              </div>

              {}
              <div className="method-form">
                {method
                  ? <h5>
                      {method === 'credit' ? 'Credit / Debit Card'
                        : method === 'netbanking' ? 'Netbanking'
                        : method === 'wallet'     ? 'Wallet'
                        : 'UPI'}
                    </h5>
                  : <h5>Choose a method</h5>
                }

                {method === 'credit' && (
                  <>
                    <Input
                      label="Card Number"
                      type="text"
                      value={cardNumber}
                      onChange={e => setCardNumber(e.target.value)}
                    />
                    <div className="split-inputs">
                      <Input
                        label="Expiry (MM/YY)"
                        type="text"
                        value={expiry}
                        onChange={e => setExpiry(e.target.value)}
                      />
                      <Input
                        label="CVV"
                        type="password"
                        value={cvv}
                        onChange={e => setCvv(e.target.value)}
                      />
                    </div>
                    <Input
                      label="Cardholder’s Name"
                      type="text"
                    />
                  </>
                )}

                {method === 'netbanking' && (
                  <p>Select your bank (mock UI).</p>
                )}
                {method === 'wallet' && (
                  <p>Select your wallet (mock UI).</p>
                )}
                {method === 'upi' && (
                  <Input
                    label="Enter UPI ID"
                    type="text"
                    value={upiId}
                    onChange={e => setUpiId(e.target.value)}
                  />
                )}

                <Button
                  className="pay-button"
                  onClick={handlePay}
                  disabled={!method}
                >
                  <FaLock className="lock-icon"/> Pay Now
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
