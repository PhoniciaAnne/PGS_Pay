
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:7981';


export const viewAllBills = (billerId) => {
  return axios.get(`${API_BASE_URL}/biller/viewBill`, {
    params: { billerId }
  });
};


export const generateBill = async (billDTO) => {
  return axios.post(`${API_BASE_URL}/biller/generateBill`, billDTO);
};

// export const editBill = async (editBillDTO) => {
//   return axios.patch(`${API_BASE_URL}/biller/editBill`, editBillDTO);
// };

export const requestBillerUpdate = async (billerData) => {
  return axios.post(`${API_BASE_URL}/biller/requestBillerUpdate`, billerData);
};




export const getBillerProfile = billerId =>
  axios.get(`${API_BASE_URL}/biller/profile`, { params: { biller_id: billerId } });



export const editBill = async ({ billId, customerId, dueDate }) => {
        return axios.patch(
          `${API_BASE_URL}/biller/editBill`,
          { billId, customerId, dueDate },
          { headers: { 'Content-Type': 'application/json' } }
        );
};



export const uploadBills = (file, billerId) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('biller_id', billerId);
    return axios.post(`${API_BASE_URL}/biller/uploadBills`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
  };