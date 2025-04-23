import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:7891';

export const viewBill = async (custId) => {
  return axios.get(`${API_BASE_URL}/customer/viewBill`, {
    params: { cust_id: custId },
  });
};

// export const payBill = async (billId, custId, amt) => {
//   return axios.post(
//     `${API_BASE_URL}/customer/payBill`,
//     {},
//     {
//       params: { bill_id: billId, cust_id: custId, amt },
//     }
//   );
// };

// export const requestCustomerUpdate = async (customerData) => {
//   return axios.post(`${API_BASE_URL}/customer/requestCustomerUpdate`, customerData);
// };
// import axios from 'axios';

// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:7981';

// If your backend expects 'customerId' (instead of 'cust_id') in viewBill, change accordingly.
// export const viewBill = async (customerId) => {
//   return axios.get(`${API_BASE_URL}/customer/viewBill`, {
//     params: { customerId },
//   });
// };

// Updated payBill function:
// It now sends the query parameters with keys: customerId, billId, and password.
export const payBill = async (billId, customerId, password) => {
  return axios.post(
    `${API_BASE_URL}/customer/payBill`,
    {},
    {
      params: { customerId, billId, password },
    }
  );
};

export const payBillWithWallet = (customerId, billId, password) =>
    axios.post(
      `${API_BASE_URL}/customer/payBill`,
      null,                                
      { params: { customerId, billId, password } }
    );
  

export const requestCustomerUpdate = async (customerData) => {
  return axios.post(`${API_BASE_URL}/customer/requestCustomerUpdate`, customerData);
};

export const getCustomerProfile = (custId) =>
    axios.get(`${API_BASE_URL}/customer/profile`, {
      params: { cust_id: custId },
     });

export const viewBillReceipt = (billId) => {
    return axios.get(`http://localhost:7981/customer/viewBillReceipt?billId=${billId}`);
  };

