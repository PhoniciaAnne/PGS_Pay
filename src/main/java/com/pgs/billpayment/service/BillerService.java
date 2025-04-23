package com.pgs.billpayment.service;

import java.util.List;
import java.util.Optional;

import org.springframework.web.multipart.MultipartFile;

import com.pgs.billpayment.dto.BillDTO;
import com.pgs.billpayment.dto.BulkUploadResultDTO;
import com.pgs.billpayment.dto.EditBillDTO;
import com.pgs.billpayment.dto.UpdateBillDTO;
import com.pgs.billpayment.entity.Bill;
import com.pgs.billpayment.entity.Biller;

public interface BillerService {
//	List<Bill> viewBill();
	void generateBill(BillDTO billDTO);
	void editBill(EditBillDTO dto);
	void updateBill(UpdateBillDTO dto);
	void requestBillerUpdate(Biller biller);
	Biller register(Biller biller);
	Optional<Biller> findByUsername(String username);
    Optional<Biller> findById(int billerId);
    BulkUploadResultDTO uploadBills(MultipartFile file, int billerId);
    List<Bill> viewBill(int billerId);



}
