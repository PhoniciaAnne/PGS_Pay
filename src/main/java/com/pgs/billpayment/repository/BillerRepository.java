package com.pgs.billpayment.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pgs.billpayment.entity.Bill;
import com.pgs.billpayment.entity.Biller;

@Repository
public interface BillerRepository extends JpaRepository<Biller, Integer>{
    Optional<Biller> findByBillerUsername(String billerUsername);

}

