// // src/pages/Customer/CustomerProfile.jsx
// import React, { useState } from 'react';
// import { getCustomerProfile } from '../../services/customerService';
// import Button from '../../components/Button/Button';
// import Input from '../../components/Input/Input';
// import { useNavigate } from 'react-router-dom';

// const CustomerProfile = () => {
//   const [custId, setCustId]         = useState('');
//   const [profile, setProfile]       = useState(null);
//   const [message, setMessage]       = useState('');
//   const navigate                     = useNavigate();

//   const fetchProfile = async () => {
//     if (!custId) return setMessage('Please enter your Customer ID.');
//     try {
//       const res = await getCustomerProfile(custId);
//       setProfile(res.data);
//       setMessage('');
//     } catch (err) {
//       console.error(err);
//       setProfile(null);
//       setMessage('Failed to load profile.');
//     }
//   };

//   return (
//     <section style={{ maxWidth: 600, margin: '2rem auto', padding: '0 1rem' }}>
//       <h2>Your Profile</h2>

//       <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
//         <Input
//           label="Customer ID"
//           type="number"
//           value={custId}
//           name="custId"
//           onChange={e => setCustId(e.target.value)}
//         />
//         <Button onClick={fetchProfile}>Load</Button>
//       </div>

//       {message && <p style={{ color: 'red' }}>{message}</p>}

//       {profile && (
//         <div style={{
//           background: '#fff',
//           padding: '1rem',
//           borderRadius: '8px',
//           boxShadow: '0 2px 8px rgba(0,0,0,0.1)'
//         }}>
//           <p><strong>ID:</strong> {profile.custId}</p>
//           <p><strong>Name:</strong> {profile.custName}</p>
//           <p><strong>Username:</strong> {profile.custUsername}</p>
//           <p><strong>Contact:</strong> {profile.contactNo}</p>
//           <p><strong>Wallet Balance:</strong> ₹{profile.walletBalance.toFixed(2)}</p>
//           <Button
//             onClick={() => navigate('/customer/update-profile')}
//             style={{ marginTop: '1rem' }}
//           >
//             Edit Profile
//           </Button>
//         </div>
//       )}
//     </section>
//   );
// };

// export default CustomerProfile;


// import React, { useEffect, useState } from 'react';
// import { getCustomerProfile } from '../../services/customerService';
// import Button from '../../components/Button/Button';
// import { useNavigate } from 'react-router-dom';
// import '../shared/Profile.css';

// const CustomerProfile = () => {
//   const [profile, setProfile] = useState(null);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();
//   const custId = localStorage.getItem('custId');

//   useEffect(() => {
//     if (!custId) {
//       setError('Not logged in');
//       return;
//     }
//     getCustomerProfile(custId)
//       .then(res => setProfile(res.data))
//       .catch(() => setError('Failed to load profile.'));
//   }, [custId]);

//   if (error) return <p className="error">{error}</p>;
//   if (!profile) return <p>Loading…</p>;

//   return (
//     <section className="profile-page">
//       <h2>My Profile</h2>
//       <div className="profile-field">
//         <span className="label">ID:</span> {profile.custId}
//       </div>
//       <div className="profile-field">
//         <span className="label">Name:</span> {profile.custName}
//       </div>
//       <div className="profile-field">
//         <span className="label">Contact:</span> {profile.contactNo}
//       </div>
//       <div className="profile-field">
//         <span className="label">Username:</span> {profile.custUsername}
//       </div>
//       <div className="profile-field">
//         <span className="label">Wallet:</span> ₹{profile.walletBalance.toFixed(2)}
//       </div>

//       <Button onClick={() => navigate('/customer/update-profile')}>
//         Edit Profile
//       </Button>
//     </section>
//   );
// };

// export default CustomerProfile;


import React, { useEffect, useState } from 'react';
import { getCustomerProfile } from '../../services/customerService';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import './../shared/Profile.css';
const defaultAvatar = '/default-user.png';

const CustomerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const custId = localStorage.getItem('custId');

  useEffect(() => {
    if (!custId) {
      setError('Not logged in');
      return;
    }
    getCustomerProfile(custId)
      .then(res => setProfile(res.data))
      .catch(() => setError('Failed to load profile.'));
  }, [custId]);

  if (error) return <p className="error">{error}</p>;
  if (!profile) return <p>Loading…</p>;

  return (
    <section className="entity-page">
      <div className="entity-header">
        <h2 className="entity-title">Customer Profile</h2>
      </div>
      <div className="profile-center">
  <div className="profile-card">
    <div className="profile-avatar">👤</div>
    <div className="profile-info">
      <div><span className="profile-label">Name:</span> {profile.custName}</div>
      <div><span className="profile-label">Username:</span> {profile.custUsername}</div>
      <div><span className="profile-label">Contact:</span> {profile.contactNo}</div>
      <div><span className="profile-label">Wallet:</span> ₹{profile.walletBalance.toFixed(2)}</div>
      <div><span className="profile-label">ID:</span> <span className="profile-badge">{profile.custId}</span></div>
    </div>
    <div className="profile-btn">
      <Button onClick={() => navigate('/customer/update-profile')}>Edit Profile</Button>
    </div>
  </div>
</div>

    </section>
  );
};

export default CustomerProfile;
