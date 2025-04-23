package com.pgs.billpayment.controller;


import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import com.pgs.billpayment.dto.BillDTO;
import com.pgs.billpayment.dto.BulkUploadResultDTO;
import com.pgs.billpayment.dto.EditBillDTO;
import com.pgs.billpayment.dto.UpdateBillDTO;
import com.pgs.billpayment.entity.Bill;
import com.pgs.billpayment.entity.Biller;
import com.pgs.billpayment.repository.BillerRepository;
import com.pgs.billpayment.service.BillerService;

@RestController
@RequestMapping("/biller")
public class BillerController {
	
	@Autowired
	private BillerService billerService;
	
	@Autowired
	private BillerRepository billerRepository;
	
//	@GetMapping("/viewBill")
//	public List<Bill> viewBill(){
//		return billerService.viewBill();
//	}
//	
	@PostMapping("/generateBill")
	public void generateBill(@RequestBody BillDTO billDTO) {
	    billerService.generateBill(billDTO);	
	}
	
	
	@PatchMapping("/editBill")
	public void editBill(@RequestBody EditBillDTO dto) {
	    billerService.editBill(dto);
	}

	
	@PatchMapping("/updateBill")
	public void updateBill(@RequestBody UpdateBillDTO updateBillDTO) {
	    billerService.updateBill(updateBillDTO);
	}

	//done
	
	@PostMapping("/requestBillerUpdate")
	public void requestBillerUpdate(@RequestBody Biller biller) {
		billerService.requestBillerUpdate(biller);
	}
	
	@GetMapping("/profile")
    public Biller getProfile(@RequestParam("biller_id") int billerId) {
        return billerService.findById(billerId)
            .orElseThrow(() -> new ResponseStatusException(
                 HttpStatus.NOT_FOUND, "Biller not found"
            ));
    }
	@PostMapping("/uploadBills")
    public BulkUploadResultDTO uploadBills(
            @RequestParam("file") MultipartFile file,
            @RequestParam("biller_id") int billerId
    ) {
        return billerService.uploadBills(file, billerId);
    }
	
	
	@GetMapping("/viewBill")
	public List<Bill> viewBill(@RequestParam int billerId){
		return billerService.viewBill(billerId);
	}

}
