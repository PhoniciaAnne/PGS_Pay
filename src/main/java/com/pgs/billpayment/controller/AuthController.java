package com.pgs.billpayment.controller;

import java.util.Map;
import java.util.Optional;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.pgs.billpayment.entity.Biller;
import com.pgs.billpayment.entity.Customer;
import com.pgs.billpayment.service.BillerServiceImpl;
import com.pgs.billpayment.service.CustomerServiceImpl;

@RestController
@RequestMapping("/auth")
public class AuthController {

    private final CustomerServiceImpl customerService;
    private final BillerServiceImpl billerService;

    public AuthController(CustomerServiceImpl customerService, BillerServiceImpl billerService) {
        this.customerService = customerService;
        this.billerService = billerService;
    }


    @PostMapping("/signup/customer")
    public Customer registerCustomer(@RequestBody Customer customer) {
        return customerService.register(customer);
    }

    @PostMapping("/signup/biller")
    public Biller registerBiller(@RequestBody Biller biller) {
        return billerService.register(biller);
    }


    
    @PostMapping("/login/customer")
    public ResponseEntity<Map<String, String>> loginCustomer(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("username");
        String password = loginRequest.get("password");

        Optional<Customer> optional = customerService.findByUsername(username);
        if (optional.isPresent()) {
            Customer customer = optional.get();
            if (customerService.passwordEncoder.matches(password, customer.getCustPassword())) {
//                return ResponseEntity.ok(Map.of("message", "Login successful for customer: " + username));
            	return ResponseEntity.ok(Map.of(
            		    "message", "Login successful for customer: " + username,
            		    "custId", String.valueOf(customer.getCustId())
            		));

            }
        }
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                             .body(Map.of("message", "Invalid credentials for customer."));
    }
    @PostMapping("/login/biller")
    public ResponseEntity<Map<String, String>> loginBiller(@RequestBody Map<String, String> loginRequest) {
        String username = loginRequest.get("billerUsername");
        String password = loginRequest.get("billerPassword");

        Optional<Biller> optional = billerService.findByUsername(username);
        if (optional.isPresent()) {
            Biller biller = optional.get();
            if (billerService.passwordEncoder.matches(password, biller.getBillerPassword())) {
//                return ResponseEntity.ok(Map.of("message", "Login successful for biller: " + username));
            	return ResponseEntity.ok(Map.of(
                        "message", "Login successful for biller: " + username,
                        "billerId", String.valueOf(biller.getBillerId())
                       ));
            }
        }
        
        
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                             .body(Map.of("message", "Invalid credentials for biller."));
    }
}


