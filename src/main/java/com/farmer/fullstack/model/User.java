package com.farmer.fullstack.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "farmer_registration_fullstack")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    public String getPassword_dummy() {
		return password_dummy;
	}
	public void setPassword_dummy(String password_dummy) {
		this.password_dummy = password_dummy;
	}
	private  String password_dummy;
	public Long getId() {
		return id;
	}
	public void setId(Long id) {
		this.id = id;
	}
	public String getFname() {
		return fname;
	}
	public void setFname(String fname) {
		this.fname = fname;
	}
	public String getLname() {
		return lname;
	}
	public void setLname(String lname) {
		this.lname = lname;
	}
	public String getEmail() {
		return email;
	}
	public void setEmail(String email) {
		this.email = email;
	}
	public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	public String getMobile() {
		return mobile;
	}
	public void setMobile(String mobile) {
		this.mobile = mobile;
	}
	public String getPlace() {
		return place;
	}
	public void setPlace(String place) {
		this.place = place;
	}
	public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	private String fname;
    @Override
	public String toString() {
		return "User [id=" + id + ", password_dummy=" + password_dummy + ", fname=" + fname + ", lname=" + lname
				+ ", email=" + email + ", password=" + password + ", mobile=" + mobile + ", place=" + place + ", role="
				+ role + "]";
	}
	private String lname;
    private String email;
    private String password;
    private String mobile;
    private String place;
    private String role;


   
}
