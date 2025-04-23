package com.pgs.billpayment.dto;


import java.util.Date;

public class BillDetailsDTO {
    private int billId;
    private String billerName;
    private String customerName;
    private double amount;
    private String status;
    private Date receiptGeneratedDate;

    public BillDetailsDTO() {
    	
    }

	public BillDetailsDTO(int billId, String billerName, String customerName, double amount, String status,
			Date receiptGeneratedDate) {
		super();
		this.billId = billId;
		this.billerName = billerName;
		this.customerName = customerName;
		this.amount = amount;
		this.status = status;
		this.receiptGeneratedDate = receiptGeneratedDate;
	}

	public int getBillId() {
		return billId;
	}

	public void setBillId(int billId) {
		this.billId = billId;
	}

	public String getBillerName() {
		return billerName;
	}

	public void setBillerName(String billerName) {
		this.billerName = billerName;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public double getAmount() {
		return amount;
	}

	public void setAmount(double amount) {
		this.amount = amount;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public Date getReceiptGeneratedDate() {
		return receiptGeneratedDate;
	}

	public void setReceiptGeneratedDate(Date receiptGeneratedDate) {
		this.receiptGeneratedDate = receiptGeneratedDate;
	}
}
