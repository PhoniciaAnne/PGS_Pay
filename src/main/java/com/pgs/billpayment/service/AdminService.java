package com.pgs.billpayment.service;

import java.util.List;

import com.pgs.billpayment.entity.Biller;
import com.pgs.billpayment.entity.Customer;

public interface AdminService {
	List<Biller> viewBillers();
	List<Customer> viewCustomers();
	void removeBiller(int biller_id);
	void removeCustomer(int cust_id);
	void editBiller(Biller biller);
	void editCustomer(Customer customer);
	
}

