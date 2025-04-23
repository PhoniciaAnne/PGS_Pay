package com.pgs.billpayment.service;


import java.io.InputStreamReader;
import java.text.SimpleDateFormat;
import java.text.ParseException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.Scanner;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.opencsv.CSVReader;
import com.pgs.billpayment.dto.BillDTO;
import com.pgs.billpayment.dto.BulkUploadResultDTO;
import com.pgs.billpayment.dto.EditBillDTO;
import com.pgs.billpayment.dto.UpdateBillDTO;
import com.pgs.billpayment.entity.Bill;
import com.pgs.billpayment.entity.Biller;
import com.pgs.billpayment.entity.Customer;
import com.pgs.billpayment.entity.EditRequests;
import com.pgs.billpayment.repository.BillRepository;
import com.pgs.billpayment.repository.BillerRepository;
import com.pgs.billpayment.repository.CustomerRepository;
import com.pgs.billpayment.repository.EditRequestsRepository;

@Service
public class BillerServiceImpl implements BillerService {

	@Autowired
	private BillRepository billRepository;
	
	@Autowired
	private CustomerRepository customerRepository;
	
	@Autowired
	private BillerRepository billerRepository;
	
	@Autowired
	private EditRequestsRepository editRequestsRepository;

	public final PasswordEncoder passwordEncoder;
	private final SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");

	
	Scanner sc=new Scanner(System.in);

	public BillerServiceImpl(BillerRepository billerRepository, PasswordEncoder passwordEncoder) {
        this.billerRepository = billerRepository;
        this.passwordEncoder = passwordEncoder;
    }
	
//	@Override
//	public List<Bill> viewBill() {
//		return billRepository.findAll();
//	}

	 @Override
	    public List<Bill> viewBill(int billerId) {
	        return billRepository.findByBillerBillerId(billerId);
	    }
	@Override
	public Optional<Biller> findByUsername(String billerUsername) {
        return billerRepository.findByBillerUsername(billerUsername);
    }

//	@Override
//	public void generateBill(Bill bill) {
//		billRepository.save(bill);
//		
//	}
	@Override
	public void generateBill(BillDTO billDTO) {
	    Optional<Biller> billerOpt = billerRepository.findById(billDTO.getBillerId());
	    Optional<Customer> customerOpt = customerRepository.findById(billDTO.getCustomerId());

	    if (billerOpt.isPresent() && customerOpt.isPresent()) {
	        Bill bill = new Bill();
	        bill.setBiller(billerOpt.get());
	        bill.setCustomer(customerOpt.get());
	        bill.setAmount(billDTO.getAmount());
	        bill.setBillIssuedDate(billDTO.getBillIssuedDate());
	        bill.setDueDate(billDTO.getDueDate());
	        bill.setStatus(billDTO.getStatus());
	        bill.setCategory(billDTO.getCategory());

	        billRepository.save(bill);
	    } else {
	        throw new RuntimeException("Invalid Biller or Customer ID");
	    }
	}

	@Override
	public Biller register(Biller biller) {
        biller.setBillerPassword(passwordEncoder.encode(biller.getBillerPassword()));
        return billerRepository.save(biller);
    }

	@Override
	public void editBill(EditBillDTO dto) {
	    Optional<Bill> optional = billRepository.findById(dto.getBillId());
	    if (optional.isPresent()) {
	        Bill optionalBill = optional.get();
	        optionalBill.setDueDate(dto.getDueDate());
	        billRepository.save(optionalBill);
	    } else {
	        throw new RuntimeException("Bill not found");
	    }
	}
	
	


	@Override
	public void updateBill(UpdateBillDTO dto) {
	    Optional<Bill> optional = billRepository.findById(dto.getBillId());
	    if (optional.isPresent()) {
	        Bill optionalBill = optional.get();
	        optionalBill.setStatus("Paid");
	        billRepository.save(optionalBill);
	    }
	}
	
	@Override
	public void requestBillerUpdate(Biller biller) {
		
		Optional<Biller> optional=billerRepository.findById(biller.getBillerId());
		if(optional.isPresent()) {
			Biller optionalBiller=optional.get();
			
			EditRequests editRequests = new EditRequests();
	
			editRequests.setBillerId(optionalBiller.getBillerId());
			
			boolean flag=false;
			if(!optionalBiller.getBillerName().equals(biller.getBillerName())) {
				editRequests.setBillerName(biller.getBillerName());
				flag=true;
			}
			
			if(!optionalBiller.getBillerUsername().equals(biller.getBillerUsername())) {
				editRequests.setBillerUsername(biller.getBillerUsername());
				flag=true;
			}
			
			
			if (flag) {
			    editRequests.setRequestTime(LocalDateTime.now());
			    editRequestsRepository.save(editRequests);
			}
		}

			
		}
	
		
	 @Override
	    public Optional<Biller> findById(int billerId) {
	        return billerRepository.findById(billerId);
	    }

	 @Override
	    public BulkUploadResultDTO uploadBills(MultipartFile file, int billerId) {
	        BulkUploadResultDTO result = new BulkUploadResultDTO();
	        List<String> errors = new ArrayList<>();
	        int successCount = 0;

	        Biller biller = billerRepository.findById(billerId)
	            .orElseThrow(() -> new RuntimeException("Biller not found"));

	        String name = file.getOriginalFilename().toLowerCase();
	        try {
	            if (name.endsWith(".csv")) {
	                try (CSVReader reader = new CSVReader(new InputStreamReader(file.getInputStream()))) {
	                    String[] row; int line = 1;
	                    while ((row = reader.readNext()) != null) {
	                        try {
	                            processRow(row, biller);
	                            successCount++;
	                        } catch (Exception ex) {
	                            errors.add("Line " + line + ": " + ex.getMessage());
	                        }
	                        line++;
	                    }
	                }
	            } else if (name.endsWith(".xlsx") || name.endsWith(".xls")) {
	                try (Workbook wb = new XSSFWorkbook(file.getInputStream())) {
	                    Sheet sheet = wb.getSheetAt(0);
	                    int rowNum = 0;
	                    for (Row r : sheet) {
	                        if (rowNum++ == 0) continue; // skip header
	                        String[] cols = new String[r.getLastCellNum()];
	                        for (int i = 0; i < cols.length; i++) {
	                            Cell c = r.getCell(i);
	                            cols[i] = (c == null ? "" : c.toString());
	                        }
	                        try {
	                            processRow(cols, biller);
	                            successCount++;
	                        } catch (Exception ex) {
	                            errors.add("Row " + rowNum + ": " + ex.getMessage());
	                        }
	                    }
	                }
	            } else {
	                throw new RuntimeException("Unsupported file type");
	            }
	        } catch (Exception e) {
	            throw new RuntimeException("Failed upload: " + e.getMessage(), e);
	        }

	        result.setSuccessCount(successCount);
	        result.setErrors(errors);
	        return result;
	    }

	    
	    private void processRow(String[] cols, Biller biller) throws Exception {
	        String custCol = cols[0].trim();
	        if (custCol.endsWith(".0")) {
	            custCol = custCol.substring(0, custCol.length() - 2);
	        }
	        int custId = Integer.parseInt(custCol);

	        
	        double amt = Double.parseDouble(cols[1].trim());

	        Date issued = sdf.parse(cols[2].trim());
	        Date due    = sdf.parse(cols[3].trim());

	        String status   = cols[4].trim();

	        String category = cols[5].trim();

	        Customer customer = customerRepository.findById(custId)
	            .orElseThrow(() -> new RuntimeException("Customer " + custId + " not found"));

	        Bill b = new Bill();
	        b.setBiller(biller);
	        b.setCustomer(customer);
	        b.setAmount(amt);
	        b.setBillIssuedDate(issued);
	        b.setDueDate(due);
	        b.setStatus(status);
	        b.setCategory(category);

	        billRepository.save(b);
	    }
	}
