import axios from 'axios';
import { viewAllBills } from './billerService';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:7981';

export const viewBillers = async () => {
  return axios.get(`${API_BASE_URL}/admin/viewBillers`);
};

export const viewCustomers = async () => {
  return axios.get(`${API_BASE_URL}/admin/viewCustomers`);
};

export const removeBiller = async (billerId) => {
  return axios.delete(`${API_BASE_URL}/admin/removeBiller`, {
    params: { biller_id: billerId },
  });
};

export const removeCustomer = async (custId) => {
  return axios.delete(`${API_BASE_URL}/admin/removeCustomer`, {
    params: { cust_id: custId },
  });
};

// export const editBiller = async (biller) => {
//   return axios.patch(`${API_BASE_URL}/admin/editBiller`, biller);
// };

// export const editCustomer = async (customer) => {
//   return axios.patch(`${API_BASE_URL}/admin/editCustomer`, customer);
// };
// export const viewBills = () => axios.get(`${API_BASE_URL}/admin/viewBills`);

export const editCustomer = async (customer) => {
  const token = localStorage.getItem('token');
  return axios.patch(`${API_BASE_URL}/admin/editCustomer`, customer, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};

export const editBiller = async (biller) => {
  const token = localStorage.getItem('token');
  return axios.patch(`${API_BASE_URL}/admin/editBiller`, biller, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
};
export const viewAllBillsForAdmin = async () => {
    const billersRes = await viewBillers();
    const ids = billersRes.data.map(b => b.billerId);
    const results = await Promise.all(ids.map(id => viewAllBills(id)));
    return results.flatMap(r => r.data);
  };

export const getEditRequests = async () => {
  const token = localStorage.getItem('token');
  console.log('Token being sent:', token); 
  return axios.get(`${API_BASE_URL}/admin/viewEditRequests`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
