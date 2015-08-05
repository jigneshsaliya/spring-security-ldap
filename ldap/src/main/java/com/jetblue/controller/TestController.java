package com.jetblue.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TestController {
	
	@RequestMapping("test/admin")
	public String welcomeAdmin(){
		return "Hi Admin";
	}

	@RequestMapping("test/user")
	public String welcomeUser(){
		return "Hi User";
	}
}
