package com.pgs.billpayment.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.pgs.billpayment.entity.Bill;

@Repository
public interface BillRepository extends JpaRepository<Bill, Integer>{
	List<Bill> findByCustomerCustId(int custId);

	List<Bill> findByBillerBillerId(int billerId);

}
