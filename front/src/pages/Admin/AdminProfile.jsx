import React from 'react';
import '../shared/Profile.css'; 
const AdminProfile = () => {
  const username = localStorage.getItem('username') || 'admin';

  return (
    <section className="profile-center">
      <div className="profile-card admin-square-card">
        <div className="profile-avatar">👤</div>
        <div className="profile-info">
          <div><span className="profile-label">Role:</span> Admin</div>
          <div><span className="profile-label">Username:</span> {username}</div>
          <div><span className="profile-label">ID:</span> <span className="profile-badge">1</span></div>
        </div>
      </div>
    </section>
  );
};

export default AdminProfile;
