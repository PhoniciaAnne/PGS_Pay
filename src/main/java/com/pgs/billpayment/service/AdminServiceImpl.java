package com.pgs.billpayment.service;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.pgs.billpayment.entity.Biller;
import com.pgs.billpayment.entity.Customer;
import com.pgs.billpayment.entity.EditRequests;
import com.pgs.billpayment.repository.BillerRepository;
import com.pgs.billpayment.repository.CustomerRepository;
import com.pgs.billpayment.repository.EditRequestsRepository;

import jakarta.transaction.Transactional;

@Service
public class AdminServiceImpl implements AdminService{

	@Autowired
	private BillerRepository billerRepository;
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private EditRequestsRepository editRequestsRepository;
	
	@Override
	public List<Biller> viewBillers() {
		return billerRepository.findAll();
	}

	@Override
	public List<Customer> viewCustomers() {
		return customerRepository.findAll();
	}

	@Override
	public void removeBiller(int biller_id) {
		billerRepository.deleteById(biller_id);
	}

	@Override
	public void removeCustomer(int cust_id) {
		customerRepository.deleteById(cust_id);
	}

	@Transactional
	@Override
	public void editBiller(Biller biller) {
		Optional<Biller> optional = billerRepository.findById(biller.getBillerId());
		if (optional.isPresent()) {
	        Biller optionalBiller = optional.get();
	
	        Optional<EditRequests> editReq = editRequestsRepository.findByBillerId(biller.getBillerId());
	        if (editReq.isPresent()) {
	            EditRequests editRequests = editReq.get();
	            if(editRequests.getBillerName()!=null) {
	            	optionalBiller.setBillerName(editRequests.getBillerName());
	            }
	            if(editRequests.getBillerUsername()!=null) {
	            	optionalBiller.setBillerUsername(editRequests.getBillerUsername());
	            }

	            billerRepository.save(optionalBiller);
	            editRequestsRepository.delete(editRequests);

	        }
		}
}
	
	
	@Transactional
	@Override
	public void editCustomer(Customer customer) {
	    Optional<Customer> optional = customerRepository.findById(customer.getCustId());
	    if (optional.isPresent()) {
	        Customer optionalCustomer = optional.get();

	        Optional<EditRequests> editReq = editRequestsRepository.findByCustId(customer.getCustId());
	        if (editReq.isPresent()) {
	            EditRequests editRequests = editReq.get();
	            if (editRequests.getCustName() != null) {
	                optionalCustomer.setCustName(editRequests.getCustName());
	            }
	            if (editRequests.getContactNo() != null) {
	                optionalCustomer.setContactNo(editRequests.getContactNo());
	            }
	            if (editRequests.getCustUsername() != null) {
	                optionalCustomer.setCustUsername(editRequests.getCustUsername());
	            }

	            customerRepository.save(optionalCustomer);
	            editRequestsRepository.delete(editRequests);
	        }
	    }
	}

}
