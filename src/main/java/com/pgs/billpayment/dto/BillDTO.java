package com.pgs.billpayment.dto;

import java.util.Date;

public class BillDTO {
    private int billerId;
    private int customerId;
    private double amount;
    private Date billIssuedDate;
    private Date dueDate;
    private String status;
    private String category;

    public int getBillerId() {
        return billerId;
    }

    public void setBillerId(int billerId) {
        this.billerId = billerId;
    }

    public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    public double getAmount() {
        return amount;
    }

    public void setAmount(double amount) {
        this.amount = amount;
    }

    public Date getBillIssuedDate() {
        return billIssuedDate;
    }

    public void setBillIssuedDate(Date billIssuedDate) {
        this.billIssuedDate = billIssuedDate;
    }

    public Date getDueDate() {
        return dueDate;
    }

    public void setDueDate(Date dueDate) {
        this.dueDate = dueDate;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
