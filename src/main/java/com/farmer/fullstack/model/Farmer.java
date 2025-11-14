package com.farmer.fullstack.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

@Entity
@Table(name = "farmer_registration")
public class Farmer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Override
	public String toString() {
		return "Farmer [id=" + id + ", userId=" + userId + ", fname=" + fname + ", lname=" + lname + ", email=" + email
				+ ", mobile=" + mobile + ", place=" + place + ", role=" + role + "]";
	}
	private Long userId;
    private String fname;
    private String lname;
    private String email;
    private String mobile;
    private String place;
    private String role;
    public String getPassword() {
		return password;
	}
	public void setPassword(String password) {
		this.password = password;
	}
	private String password;
    
    public String getRole() {
		return role;
	}
	public void setRole(String role) {
		this.role = role;
	}
	

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }

    public String getFname() { return fname; }
    public void setFname(String fname) { this.fname = fname; }

    public String getLname() { return lname; }
    public void setLname(String lname) { this.lname = lname; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getMobile() { return mobile; }
    public void setMobile(String mobile) { this.mobile = mobile; }

    public String getPlace() { return place; }
    public void setPlace(String place) { this.place = place; }
}
