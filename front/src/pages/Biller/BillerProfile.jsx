import React, { useEffect, useState } from 'react';
import { getBillerProfile } from '../../services/billerService';
import Button from '../../components/Button/Button';
import { useNavigate } from 'react-router-dom';
import '../shared/Profile.css'; 
const BillerProfile = () => {
  const [profile, setProfile] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const billerId = localStorage.getItem('billerId');

  useEffect(() => {
    if (!billerId) return setError('Not logged in');
    getBillerProfile(billerId)
      .then(res => setProfile(res.data))
      .catch(() => setError('Failed to load profile'));
  }, [billerId]);

  if (error) return <p className="error">{error}</p>;
  if (!profile) return <p>Loading…</p>;

  return (
    <section className="profile-center">
      <div className="profile-card">
        <div className="profile-avatar">👤</div>
        <div className="profile-info">
          <div><span className="profile-label">Name:</span> {profile.billerName}</div>
          <div><span className="profile-label">Username:</span> {profile.billerUsername}</div>
          <div><span className="profile-label">ID:</span> <span className="profile-badge">{profile.billerId}</span></div>
        </div>
        <div className="profile-btn">
          <Button onClick={() => navigate('/biller/update-profile')}>Edit Profile</Button>
        </div>
      </div>
    </section>
  );
};

export default BillerProfile;
