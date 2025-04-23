import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  signupCustomer,
  signupBiller,
} from '../../services/authService';
import './Auth.css';
import BillPaymentImage from './main.png';   
const Signup = () => {
  const navigate = useNavigate();
  const [role, setRole] = useState('customer');
  const [formData, setFormData] = useState({
    custName: '', custUsername: '', custPassword: '', contactNo: '',
    billerName: '', billerUsername: '', billerPassword: '',
  });
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = e =>
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));

  const handleSignup = async e => {
    e.preventDefault();
    setLoading(true); setMsg('');
    try {
      if (role === 'customer') {
        await signupCustomer({
          custName: formData.custName,
          custUsername: formData.custUsername,
          custPassword: formData.custPassword,
          contactNo: formData.contactNo,
        });
      } else {
        await signupBiller({
          billerName: formData.billerName,
          billerUsername: formData.billerUsername,
          billerPassword: formData.billerPassword,
        });
      }
      setMsg('Signup successful!'); navigate('/auth/login');
    } catch (err) {
      setMsg(err?.response?.data?.message || 'Signup failed. Try again.');
    } finally { setLoading(false); }
  };

  return (
    <section className="auth-bg">
      <div className="card">
        {}
        <div className="illustration">
          {}
          <img src={BillPaymentImage} alt="Bill payment" />
        </div>

        {}
        <form className="form" onSubmit={handleSignup}>
          <h2>Save Your Account Now</h2>
          <p className="subtitle">
          Create Your Account. Control Your Bills.
          </p>

          <div className="field">
            <label>Role</label>
            <select value={role} onChange={e => setRole(e.target.value)}>
              <option value="customer">Customer</option>
              <option value="biller">Biller</option>
            </select>
          </div>

          {role === 'customer' && (
            <>
              <div className="field"><input placeholder="Full Name" name="custName" value={formData.custName} onChange={handleChange} required /></div>
              <div className="field"><input placeholder="Username" name="custUsername" value={formData.custUsername} onChange={handleChange} required /></div>
              <div className="field"><input type="password" placeholder="Password" name="custPassword" value={formData.custPassword} onChange={handleChange} required /></div>
              <div className="field"><input placeholder="Contact No" name="contactNo" value={formData.contactNo} onChange={handleChange} required /></div>
            </>
          )}

          {role === 'biller' && (
            <>
              <div className="field"><input placeholder="Biller Name" name="billerName" value={formData.billerName} onChange={handleChange} required /></div>
              <div className="field"><input placeholder="Username" name="billerUsername" value={formData.billerUsername} onChange={handleChange} required /></div>
              <div className="field"><input type="password" placeholder="Password" name="billerPassword" value={formData.billerPassword} onChange={handleChange} required /></div>
            </>
          )}

          <button type="submit" className="primary-btn" disabled={loading}>
            {loading ? 'Creating…' : 'Sign Up'}
          </button>

          {msg && <p className="msg">{msg}</p>}

          <p className="switch">
            Already have an account? <Link to="/auth/login">Login</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Signup;
