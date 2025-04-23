// // import React, { useState } from 'react';
// // import { useNavigate, Link } from 'react-router-dom';
// // import Input   from '../../components/Input/Input';
// // import Button  from '../../components/Button/Button';
// // import {
// //   loginCustomer,
// //   loginBiller,
// // } from '../../services/authService';
// // import './Auth.css';
// // import BillPaymentImage from './main.png';   
// // const Login = () => {
// //   const navigate = useNavigate();

// //   const [role, setRole]         = useState('customer');
// //   const [username, setUsername] = useState('');
// //   const [password, setPassword] = useState('');
// //   const [message, setMessage]   = useState('');
// //   const [loading, setLoading]   = useState(false);

// //   const persistLogin = (token, role) => {
// //     localStorage.setItem('token',     token);
// //     localStorage.setItem('loggedin', 'true');
// //     localStorage.setItem('role',      role);
// //   };

// //   const handleLogin = async e => {
// //     e.preventDefault();
// //     setLoading(true); setMessage('');

// //     try {
// //       if (role === 'admin') {
// //         if (username === 'admin' && password === 'admin123') {
// //           persistLogin('dummy-admin-token', 'admin');
// //           setMessage('Login successful!');
// //           return navigate('/admin');
// //         }
// //         setMessage('Invalid admin credentials.'); return;
// //       }

// //       const res = role === 'customer'
// //         ? await loginCustomer(username, password)
// //         : await loginBiller(username,  password);

// //       persistLogin(res.data.token, role);
// //       setMessage('Login successful!');
// //       navigate(`/${role}`);
// //     } catch (err) {
// //       const serverMsg = err?.response?.data?.message || 'Invalid credentials.';
// //       setMessage(serverMsg);
// //     } finally { setLoading(false); }
// //   };

// //   return (
// //     <section className="auth-bg">
// //       <div className="card">
// //         {}
// //         <div className="illustration">
// //           <img src={BillPaymentImage} alt="Bill payment" />
// //         </div>

// //         {}
// //         <form className="form" onSubmit={handleLogin}>
// //           <h2>Welcome Back!</h2>
// //           <p className="subtitle">Sign in to continue</p>

// //           <div className="field">
// //             <label>Role</label>
// //             <select value={role} onChange={e => setRole(e.target.value)}>
// //               <option value="customer">Customer</option>
// //               <option value="biller">Biller</option>
// //               <option value="admin">Admin</option>
// //             </select>
// //           </div>

// //           <div className="field">
// //             <Input
// //               label="Username"
// //               name="username"
// //               value={username}
// //               onChange={e => setUsername(e.target.value)}
// //             />
// //           </div>

// //           <div className="field">
// //             <Input
// //               label="Password"
// //               type="password"
// //               name="password"
// //               value={password}
// //               onChange={e => setPassword(e.target.value)}
// //             />
// //           </div>

// //           <button className="primary-btn" type="submit" disabled={loading}>
// //             {loading ? 'Verifying…' : 'Login'}
// //           </button>

// //           {message && <p className="msg">{message}</p>}

// //           <p className="switch">
// //             Don’t have an account? 
// //             <Link to="/auth/signup">Sign Up</Link>
// //           </p>
// //         </form>
// //       </div>
// //     </section>
// //   );
// // };

// // export default Login;
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Input   from '../../components/Input/Input';
import Button  from '../../components/Button/Button';
import {
  loginCustomer,
  loginBiller,
} from '../../services/authService';
import './Auth.css';
import BillPaymentImage from './main.png';

const Login = () => {
  const navigate = useNavigate();

  const [role, setRole]         = useState('customer');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage]   = useState('');
  const [loading, setLoading]   = useState(false);

  const persistLogin = (token, role) => {
    localStorage.setItem('token',     token);
    localStorage.setItem('loggedin', 'true');
    localStorage.setItem('role',      role);
  };

  const handleLogin = async e => {
    e.preventDefault();
    setLoading(true);
    setMessage('');

    try {
        if (role === 'admin') {
          if (username === 'admin' && password === 'admin123') {
            persistLogin('dummy-admin-token', 'admin');
            setMessage('Login successful!');
            return navigate('/admin');
          }
          setMessage('Invalid admin credentials.');
          return;
        }
      
        let res;
        if (role === 'customer') {
          res = await loginCustomer(username, password);
          persistLogin(res.data.token || '', role);
          if (res.data.custId) {
            localStorage.setItem('custId', res.data.custId);
          }
        } else if (role === 'biller') {
          res = await loginBiller(username, password);
          persistLogin(res.data.token || '', role);
          if (res.data.billerId) {
            localStorage.setItem('billerId', res.data.billerId);
          }
        }
      
        setMessage('Login successful!');
        navigate(`/${role}`);
      } catch (err) {
        const serverMsg = err?.response?.data?.message || 'Invalid credentials.';
        setMessage(serverMsg);
      } finally {
        setLoading(false);
      }
    };      

  return (
    <section className="auth-bg">
      <div className="card">
        {}
        <div className="illustration">
          <img src={BillPaymentImage} alt="Bill payment" />
        </div>

        {}
        <form className="form" onSubmit={handleLogin}>
          <h2>Welcome Back!</h2>
          <p className="subtitle">Sign in to continue</p>

          <div className="field">
            <label>Role</label>
            <select value={role} onChange={e => setRole(e.target.value)}>
              <option value="customer">Customer</option>
              <option value="biller">Biller</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          <div className="field">
            <Input
              label="Username"
              name="username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
          </div>

          <div className="field">
            <Input
              label="Password"
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>

          <button className="primary-btn" type="submit" disabled={loading}>
            {loading ? 'Verifying…' : 'Login'}
          </button>

          {message && <p className="msg">{message}</p>}

          <p className="switch">
            Don’t have an account? 
            <Link to="/auth/signup">Sign Up</Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;

// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import { loginCustomer, loginBiller } from '../../services/authService';
// import Input  from '../../components/Input/Input';
// import Button from '../../components/Button/Button';
// import './Auth.css';
// import BillPaymentImage from './main.png';

// export default function Login() {
//   const nav = useNavigate();
//   const [role, setRole] = useState('customer');
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [msg, setMsg] = useState('');
//   const [loading, setLoading] = useState(false);

//   const persist = (token, role) => {
//     localStorage.setItem('token', token);
//     localStorage.setItem('role',  role);
//     localStorage.setItem('loggedin', 'true');
//   };

//   const handleLogin = async e => {
//     e.preventDefault();
//     setLoading(true);
//     setMsg('');
//     try {
//         if (role === 'customer') {
//             const data = await loginCustomer(username, password);
//             persist(data.token, 'customer');
          
//             localStorage.setItem('custId', data.custId);
    
//       } else if (role === 'biller') {
//         const data = await loginBiller(username, password);
//         persist(data.token, 'biller');
//         localStorage.setItem('billerId', data.billerId);
//       } else { 
//         if (username==='admin' && password==='admin123') {
//           persist('dummy-admin-token','admin');
//         } else throw new Error('Invalid admin creds');
//       }
//       nav(`/${role}`);
//     } catch (err) {
//       setMsg(err.message || 'Login failed');
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <section className="auth-bg">
//       <div className="card">
//         <div className="illustration">
//           <img src={BillPaymentImage} alt="Welcome"/>
//         </div>
//         <form className="form" onSubmit={handleLogin}>
//           <h2>Welcome Back!</h2>
//           <p className="subtitle">Sign in to continue</p>
//           <div className="field">
//             <label>Role</label>
//             <select value={role} onChange={e=>setRole(e.target.value)}>
//               <option value="customer">Customer</option>
//               <option value="biller">Biller</option>
//               <option value="admin">Admin</option>
//             </select>
//           </div>
//           <Input label="Username" value={username}
//             onChange={e=>setUsername(e.target.value)} />
//           <Input label="Password" type="password"
//             value={password} onChange={e=>setPassword(e.target.value)} />
//           <button className="primary-btn" disabled={loading}>
//             {loading?'Verifying…':'Login'}
//           </button>
//           {msg && <p className="msg">{msg}</p>}
//           <p className="switch">
//             Don’t have an account? <Link to="/auth/signup">Sign Up</Link>
//           </p>
//         </form>
//       </div>
//     </section>
//   );
// }
