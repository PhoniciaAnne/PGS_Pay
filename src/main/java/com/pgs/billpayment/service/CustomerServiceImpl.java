package com.pgs.billpayment.service;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.pgs.billpayment.dto.BillDetailsDTO;
import com.pgs.billpayment.dto.UpdateBillDTO;
import com.pgs.billpayment.entity.Bill;
import com.pgs.billpayment.entity.Customer;
import com.pgs.billpayment.entity.EditRequests;
import com.pgs.billpayment.repository.BillRepository;
import com.pgs.billpayment.repository.CustomerRepository;
import com.pgs.billpayment.repository.EditRequestsRepository;

@Service
public class CustomerServiceImpl implements CustomerService {

	@Autowired
	private CustomerRepository customerRepository;

	public final PasswordEncoder passwordEncoder;
	
	@Autowired
	private BillerServiceImpl billerServiceImpl;
	
	@Autowired
	private BillRepository billRepository;
	
	@Autowired
	private EditRequestsRepository editRequestsRepository;
	
	public CustomerServiceImpl(CustomerRepository customerRepository, PasswordEncoder passwordEncoder) {
	    this.customerRepository = customerRepository;
	    this.passwordEncoder = passwordEncoder;
	}
	
	@Override
	public List<Bill> viewBill(int cust_id) {
		return billRepository.findByCustomerCustId(cust_id);
	}

//	@Override
//	public void payBill(int bill_id, int cust_id, double amt) {
//		requestBillUpdate(bill_id,cust_id,amt);
//	}

	@Override
    public Customer register(Customer customer) {
		customer.setWalletBalance(100.0);
        customer.setCustPassword(passwordEncoder.encode(customer.getCustPassword()));
        return customerRepository.save(customer);
    }

	@Override
	public Optional<Customer> findByUsername(String custUsername) {
        return customerRepository.findByCustUsername(custUsername);
    }
	
	@Override
	public void requestBillUpdate(int bill_id, int cust_id, double amt) {
	    Optional<Bill> optionalBill = billRepository.findById(bill_id);
	    if (optionalBill.isPresent()) {
	        Bill bill = optionalBill.get();
	        if (amt == bill.getAmount()) {

	            UpdateBillDTO updateBillDTO = new UpdateBillDTO();
	            updateBillDTO.setBillId(bill_id);
	            updateBillDTO.setCustomerId(cust_id);


	            billerServiceImpl.updateBill(updateBillDTO);
	        }
	    }
	}


	
	@Override
	public void requestCustomerUpdate(Customer customer) {
		
		Optional<Customer> optional=customerRepository.findById(customer.getCustId());
		if(optional.isPresent()) {
			Customer optionalCustomer=optional.get();
			
			EditRequests editRequests = new EditRequests();
			editRequests.setCustId(optionalCustomer.getCustId());
			
			boolean flag=false;
			if(!optionalCustomer.getCustName().equals(customer.getCustName())) {
				editRequests.setCustName(customer.getCustName());
				flag=true;
			}


			
			
			if(!optionalCustomer.getContactNo().equals(customer.getContactNo())) {
				editRequests.setContactNo(customer.getContactNo());
				flag=true;
			}
			 
			if(!optionalCustomer.getCustUsername().equals(customer.getCustUsername())) {
				editRequests.setCustUsername(customer.getCustUsername());
				flag=true;
			}
			
			if (flag) {
			    editRequests.setRequestTime(LocalDateTime.now());
			    editRequestsRepository.save(editRequests);
			}
		}
	}



@Override
public String topUpWallet(int customerId, double amount) {
    Optional<Customer> optionalCustomer = customerRepository.findById(customerId);
    if (optionalCustomer.isPresent()) {
        Customer customer = optionalCustomer.get();
        double currentBalance = customer.getWalletBalance();
        customer.setWalletBalance(currentBalance + amount);
        customerRepository.save(customer);
        return "Wallet topped up successfully. New Balance: ₹" + customer.getWalletBalance();
    } else {
        return "Customer not found.";
    }
}

	//paying using wallet
@Override
public String payBillUsingWallet(int customerId, int billId, String password) {
    Optional<Customer> optionalCustomer = customerRepository.findById(customerId);
    Optional<Bill> optionalBill = billRepository.findById(billId);

    if (optionalCustomer.isEmpty() || optionalBill.isEmpty()) {
        return "Customer or Bill not found.";
    }

    Customer customer = optionalCustomer.get();
    Bill bill = optionalBill.get();

    if (!passwordEncoder.matches(password, customer.getCustPassword())) {
        return "Incorrect password.";
    }


    if ("Paid".equalsIgnoreCase(bill.getStatus())) {
        return "Bill is already paid.";
    }

    double amount = bill.getAmount();
    double walletBalance = customer.getWalletBalance();

    if (walletBalance < amount) {
        return "Insufficient wallet balance.";
    }

    customer.setWalletBalance(walletBalance - amount);
    bill.setStatus("Paid");

    customerRepository.save(customer);
    billRepository.save(bill);

    return "Bill paid successfully using wallet. Remaining Balance: ₹" + customer.getWalletBalance();
}
@Override
public Optional<Customer> findById(int custId) {
    return customerRepository.findById(custId);
}
@Override
public BillDetailsDTO viewBillReceipt(int billId) {
    Bill bill = billRepository.findById(billId)
        .orElseThrow(() -> new RuntimeException("Bill not found"));

    if (!"Paid".equalsIgnoreCase(bill.getStatus())) {
        throw new RuntimeException("Bill not paid. Receipt not available.");
    }

    BillDetailsDTO dto = new BillDetailsDTO();
    dto.setBillId(bill.getBillId());
    dto.setBillerName(bill.getBiller().getBillerName());
    dto.setCustomerName(bill.getCustomer().getCustName());
    dto.setAmount(bill.getAmount());
    dto.setStatus(bill.getStatus());
    dto.setReceiptGeneratedDate(new Date()); 

    return dto;
}



}