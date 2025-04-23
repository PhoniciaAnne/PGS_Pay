 package com.pgs.billpayment.entity;

import com.fasterxml.jackson.annotation.JsonProperty;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table (name="biller")
public class Biller {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@JsonProperty("billerId")
	@Column(name="biller_id")
	private int billerId;
	
	@JsonProperty("billerName")
	@Column(name="biller_name")
	private String billerName;
	
	@JsonProperty("billerUsername")
	@Column(name="biller_username")
	private String billerUsername;
	
	@JsonProperty("billerPassword")
	@Column(name="biller_password")
	private String billerPassword;
	
	@JsonProperty("role")
	@Column(name="role")
	private String role = "BILLER";
	
	public Biller() {
		
	}
	public Biller(int billerId, String billerName, String billerUsername, String billerPassword) {
		super();
		this.billerId = billerId;
		this.billerName = billerName;
		this.billerUsername = billerUsername;
		this.billerPassword = billerPassword;
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
	public String getBillerPassword() {
		return billerPassword;
	}
	public void setBillerPassword(String billerPassword) {
		this.billerPassword = billerPassword;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	
	@Override
	public String toString() {
		return "Biller [billerId=" + billerId + ", billerName=" + billerName + ", billerUsername=" + billerUsername
				+ ", billerPassword=" + billerPassword + ",role=" + role+"]";
	}
	
	
}