package com.pgs.billpayment.service;

import java.util.List;
import java.util.Optional;

import com.pgs.billpayment.dto.BillDetailsDTO;
import com.pgs.billpayment.entity.Bill;
import com.pgs.billpayment.entity.Customer;

public interface CustomerService {
	List<Bill> viewBill(int cust_id);
	void requestBillUpdate(int bill_id, int cust_id, double amt);
//	void payBill(int bill_id, int cust_id,double amt);
	void requestCustomerUpdate(Customer customer);
	Customer register(Customer customer);
	Optional<Customer> findByUsername(String username);
	public String topUpWallet(int customerId, double amount);
	String payBillUsingWallet(int customerId, int billId, String password);
    Optional<Customer> findById(int custId);
    
    BillDetailsDTO viewBillReceipt(int billId);

}
