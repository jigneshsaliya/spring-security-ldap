package com.jetblue.bean.login.response;

import java.io.Serializable;
import java.util.List;

public class Person implements Serializable{
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String firstName;
	private String lastName;
	private List<String> userAuthorities;
	
	
	 public Person(String firstName, String lastName, List<String> userAuthorities) {
		    this.setFirstName(firstName);
		    this.setLastName(lastName);
		 this.setUserAuthorities(userAuthorities);;
		   
		  }
	
	public String getFirstName() {
		return firstName;
	}
	public void setFirstName(String firstName) {
		this.firstName = firstName;
	}
	public String getLastName() {
		return lastName;
	}
	public void setLastName(String lastName) {
		this.lastName = lastName;
	}

	public List<String> getUserAuthorities() {
		return userAuthorities;
	}

	public void setUserAuthorities(List<String> userAuthorities) {
		this.userAuthorities = userAuthorities;
	}

}
