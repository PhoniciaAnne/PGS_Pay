package com.pgs.billpayment.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.*;

@Entity
@Table (name="customer")
public class Customer {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("custId")
	@Column(name="cust_id")
	private int custId;

	@JsonProperty("custName")
	@Column(name="cust_name")
	private String custName;

	@JsonProperty("contactNo")
	@Column(name="contact_no")
	private String contactNo;

	@JsonProperty("custUsername")
	@Column(name="cust_username")
	private String custUsername;

	@JsonProperty("custPassword")
	@Column(name="cust_password")
	private String custPassword;
	
	@JsonProperty("walletBalance")
	@Column(name="wallet_balance")
	private double walletBalance = 0.0;

	@JsonProperty("role")
	@Column(name="role")
	private String role = "CUSTOMER";

	public Customer() {
		
	}
	public Customer(int custId, String custName, String contactNo, String custUsername, String custPassword) {
		super();
		this.custId = custId;
		this.custName = custName;
		this.contactNo = contactNo;
		this.custUsername = custUsername;
		this.custPassword = custPassword;
		this.walletBalance = 0.0;

	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
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
	public String getCustPassword() {
		return custPassword;
	}
	public void setCustPassword(String custPassword) {
		this.custPassword = custPassword;
	}
	public double getWalletBalance() {
	    return walletBalance;
	}

	public void setWalletBalance(double walletBalance) {
	    this.walletBalance = walletBalance;
	}

	@Override
	public String toString() {
		return "Customer [custId=" + custId + ", custName=" + custName + ", contactNo=" + contactNo + ", custUsername="
				+ custUsername + ", custPassword=" + custPassword + ", walletBalance=" + walletBalance + ",role=" + role+"]";
	}
	
	
}