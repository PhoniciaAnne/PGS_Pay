import axios from 'axios';
import qs from 'qs';


const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:7981';

export const signupCustomer = async (customerData) => {
  return axios.post(`${API_BASE_URL}/auth/signup/customer`, customerData);
};

export const signupBiller = async (billerData) => {
  return axios.post(`${API_BASE_URL}/auth/signup/biller`, billerData);
};

export const loginCustomer = (username, password) =>
    axios.post(
      `${API_BASE_URL}/auth/login/customer`,
      { username, password },                       
      { headers: { 'Content-Type': 'application/json' } }
    );
  
//   export const loginBiller = (username, password) =>
//     axios.post(
//       `${API_BASE_URL}/auth/login/biller`,
//       { username, password },
//       { headers: { 'Content-Type': 'application/json' } }
//     );

export const loginBiller = (username, password) =>
    axios.post(
      `${API_BASE_URL}/auth/login/biller`,
      {
        billerUsername: username,   
        billerPassword: password,  
      },
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );



// export const loginCustomer = async (username, password) => {
//     const res = await axios.post(
//       `${API_BASE_URL}/auth/login/customer`,
//       { username, password },
//       { headers: { 'Content-Type':'application/json' } }
//     );
//     return res.data;
//   };
  
//   export const loginBiller = async (username, password) => {
//     const res = await axios.post(
//       `${API_BASE_URL}/auth/login/biller`,
//       qs.stringify({ username, password }),
//       { headers: { 'Content-Type':'application/x-www-form-urlencoded' } }
//     );
//     return res.data;
//   };
  

  export const loginAdmin = (username, password) =>
    axios.post(
      `${API_BASE_URL}/auth/login/admin`,
      { username, password },
      { headers: { 'Content-Type': 'application/json' } }
    );