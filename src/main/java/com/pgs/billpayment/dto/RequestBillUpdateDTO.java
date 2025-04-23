package com.pgs.billpayment.dto;

public class RequestBillUpdateDTO {

	private int bill_id;
    private int cust_id;
    private double amt;
	public int getBill_id() {
		return bill_id;
	}
	public void setBill_id(int bill_id) {
		this.bill_id = bill_id;
	}
	public int getCust_id() {
		return cust_id;
	}
	public void setCust_id(int cust_id) {
		this.cust_id = cust_id;
	}
	public double getAmt() {
		return amt;
	}
	public void setAmt(double amt) {
		this.amt = amt;
	}
    
    
}
