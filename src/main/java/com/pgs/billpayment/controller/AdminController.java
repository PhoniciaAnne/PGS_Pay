package com.pgs.billpayment.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.pgs.billpayment.entity.Bill;
import com.pgs.billpayment.entity.Biller;
import com.pgs.billpayment.entity.Customer;
import com.pgs.billpayment.service.AdminService;
import com.pgs.billpayment.repository.*;

@RestController
@RequestMapping("/admin")
public class AdminController {
	@Autowired
	private AdminService adminService;
	
	
	@GetMapping("/viewBillers")
	List<Biller> viewBillers(){
		return adminService.viewBillers();
	}
	
	@GetMapping("/viewCustomers")
	List<Customer> viewCustomers(){
		return adminService.viewCustomers();
	}
	
	@DeleteMapping("/removeBiller")
	void removeBiller(@RequestParam int biller_id) {
		adminService.removeBiller(biller_id);
	}
	
	@DeleteMapping("/removeCustomer")
	void removeCustomer(@RequestParam int cust_id) {
		adminService.removeCustomer(cust_id);
	}
	
	//done
	
	@PatchMapping("/editBiller")
	void editBiller(@RequestBody Biller biller) {
		adminService.editBiller(biller);
	}
	
	@PatchMapping("/editCustomer")
	void editCustomer(@RequestBody Customer customer) {
		adminService.editCustomer(customer);
	}
	
}

