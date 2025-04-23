package com.pgs.billpayment.entity;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;


@Entity
@Table (name="edit")
public class EditRequests {
	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "edit_id")
    private int editId;
	
	
	@Column(name = "biller_id")
	private int billerId;
	
	
	@Column(name = "biller_name")
	private String billerName;
	
	@Column(name = "biller_username")
	private String billerUsername;
	
	@Column(name = "cust_id")
	private int custId;
	
	@Column(name = "cust_name")
	private String custName;
	
	@Column(name = "contact_no")
	private String contactNo;
	
	@Column(name = "cust_username")
	private String custUsername;
	
	@Column(name = "request_time")
	private LocalDateTime requestTime;
	public EditRequests() {
		
	}
	public EditRequests(int editId, int billerId, String billerName, String billerUsername, int custId, String custName,
			String contactNo, String custUsername, LocalDateTime requestTime) {
		super();
		this.editId = editId;
		this.billerId = billerId;
		this.billerName = billerName;
		this.billerUsername = billerUsername;
		this.custId = custId;
		this.custName = custName;
		this.contactNo = contactNo;
		this.custUsername = custUsername;
		this.requestTime = requestTime;
	}
	public int getEditId() {
		return editId;
	}
	public void setEditId(int editId) {
		this.editId = editId;
	}
	public int getBillerId() {
		return billerId;
	}
	public void setBillerId(int billerId) {
		this.billerId = billerId;
	}
	public String getBillerName() {
		return billerName;
	}
	public void setBillerName(String billerName) {
		this.billerName = billerName;
	}
	public String getBillerUsername() {
		return billerUsername;
	}
	public void setBillerUsername(String billerUsername) {
		this.billerUsername = billerUsername;
	}
	public int getCustId() {
		return custId;
	}
	public void setCustId(int custId) {
		this.custId = custId;
	}
	public String getCustName() {
		return custName;
	}
	public void setCustName(String custName) {
		this.custName = custName;
	}
	public String getContactNo() {
		return contactNo;
	}
	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}
	public String getCustUsername() {
		return custUsername;
	}
	public void setCustUsername(String custUsername) {
		this.custUsername = custUsername;
	}
	public LocalDateTime getRequestTime() {
		return requestTime;
	}
	public void setRequestTime(LocalDateTime requestTime) {
		this.requestTime = requestTime;
	}
	@Override
	public String toString() {
		return "EditRequests [editId=" + editId + ", billerId=" + billerId + ", billerName=" + billerName
				+ ", billerUsername=" + billerUsername + ", custId=" + custId + ", custName=" + custName
				+ ", contactNo=" + contactNo + ", custUsername=" + custUsername + ", requestTime=" + requestTime + "]";
	}
	
	
	
}
