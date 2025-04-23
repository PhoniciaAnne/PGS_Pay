package com.pgs.billpayment.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.pgs.billpayment.dto.BillDetailsDTO;
import com.pgs.billpayment.dto.RequestBillUpdateDTO;
import com.pgs.billpayment.entity.Bill;
import com.pgs.billpayment.entity.Customer;
import com.pgs.billpayment.repository.CustomerRepository;
import com.pgs.billpayment.service.CustomerService;

@RestController
@CrossOrigin(origins = "http://localhost:7981")

@RequestMapping("/customer")
public class CustomerController {
	
	@Autowired
	private CustomerService customerService;
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@GetMapping("/viewBill")
	public List<Bill> viewBill(@RequestParam int cust_id){
		return customerService.viewBill(cust_id);
	}
	
	@PatchMapping("/requestBillUpdate")
	public void requestBillUpdate(@RequestBody RequestBillUpdateDTO request) {
	    customerService.requestBillUpdate(request.getBill_id(), request.getCust_id(), request.getAmt());
	}

	
	
//	@PostMapping("/payBill")
//	public void payBill(@RequestParam int bill_id,@RequestParam int cust_id,@RequestParam double amt) {
//		customerService.payBill(bill_id, cust_id, amt);
//	}
//	
	@PostMapping("/payBill")
	public String payBillWithWallet(@RequestParam int customerId, @RequestParam int billId, @RequestParam String password) {
	    String result = customerService.payBillUsingWallet(customerId, billId, password);
	    return result;
	}

//	@PostMapping("/requestCustomerUpdate")
//	public void requestCustomerUpdate(@RequestBody Customer customer) {
//	    customerService.requestCustomerUpdate(customer);
//	}
	
	
	@PostMapping("/requestCustomerUpdate")
	public void requestCustomerUpdate(@RequestBody Customer customer) {
	    System.out.println("Received name: " + customer.getCustName());
	    customerService.requestCustomerUpdate(customer);
	}

	@GetMapping("/profile")
    public Customer getProfile(@RequestParam("cust_id") int custId) {
        return customerService
                .findById(custId)
                .orElseThrow(() -> new ResponseStatusException(
                    HttpStatus.NOT_FOUND, "Customer not found"
                ));
    }
	@PutMapping("/topup")
	public String topUpWallet(@RequestParam int customerId, @RequestParam double amount) {
	    return customerService.topUpWallet(customerId, amount);
	}


	@GetMapping("/viewBillReceipt")
	public ResponseEntity<BillDetailsDTO> viewBillReceipt(@RequestParam int billId) {
	    BillDetailsDTO receipt = customerService.viewBillReceipt(billId);
	    return ResponseEntity.ok(receipt);
	}
}
