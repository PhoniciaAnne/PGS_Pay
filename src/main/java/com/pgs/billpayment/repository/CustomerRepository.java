package com.pgs.billpayment.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pgs.billpayment.entity.Customer;

@Repository
public interface CustomerRepository extends JpaRepository<Customer, Integer>{
    
    Optional<Customer> findByCustUsername(String custUsername);
}
