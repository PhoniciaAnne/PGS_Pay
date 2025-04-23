
package com.pgs.billpayment.entity;

import jakarta.persistence.*;
import java.util.Date;

@Entity
@Table (name="bill")
public class Bill {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name="bill_id")
	private int billId;
	
	@ManyToOne
    @JoinColumn(name = "billerId", referencedColumnName = "biller_id")
    private Biller biller;

    @ManyToOne
    @JoinColumn(name = "custId", referencedColumnName = "cust_id")
    private Customer customer;
    
	private double amount;
	
	@Column(name="bill_issued_date")
	private Date billIssuedDate;
	
	@Column(name="due_date")
	private Date dueDate;
	
	private String status;
	
	private String category;
	
	public Bill() {
		
	}
	public Bill(int billId, Biller biller, Customer customer, double amount, Date billIssuedDate, Date dueDate,
			String status, String category) {
		super();
		this.billId = billId;
		this.biller = biller;
		this.customer = customer;
		this.amount = amount;
		this.billIssuedDate = billIssuedDate;
		this.dueDate = dueDate;
		this.status = status;
		this.category=category;
	}
	public String getCategory() {
		return category;
	}
	public void setCategory(String category) {
		this.category = category;
	}
	public int getBillId() {
		return billId;
	}
	public void setBillId(int billId) {
		this.billId = billId;
	}
	public Biller getBiller() {
		return biller;
	}
	public void setBiller(Biller biller) {
		this.biller = biller;
	}
	public Customer getCustomer() {
		return customer;
	}
	public void setCustomer(Customer customer) {
		this.customer = customer;
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
	@Override
	public String toString() {
		return "Bill [billId=" + billId + ", biller=" + biller + ", customer=" + customer + ", amount=" + amount
				+ ", billIssuedDate=" + billIssuedDate + ", dueDate=" + dueDate + ", status=" + status + ", category=" + category +"]";
	}
	
	
	
	
}