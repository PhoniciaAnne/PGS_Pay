package com.pgs.billpayment.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.pgs.billpayment.entity.EditRequests;

public interface EditRequestsRepository extends JpaRepository<EditRequests, Integer>{
	Optional<EditRequests> findByCustId(int custId);
	Optional<EditRequests> findByBillerId(int billerId);


}
