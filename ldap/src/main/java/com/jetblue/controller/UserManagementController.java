/**
 * 
 */
package com.jetblue.controller;

import java.io.IOException;
import java.security.Principal;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.util.CookieGenerator;

import com.jetblue.bean.login.response.Person;

/**
 * @author 754305
 *
 */
@RestController
public class UserManagementController {

		@Autowired 
		ObjectMapper objectMapper;
	
		@SuppressWarnings("unchecked")
		@RequestMapping(value="usermgmt/landing",produces={MediaType.APPLICATION_JSON_VALUE})
		//usermgmt/landing
		public Person welcome(Principal principal,HttpServletResponse servletResponse) throws JsonGenerationException, JsonMappingException, IOException{
			
			System.out.println("principal : "+objectMapper.writeValueAsString(principal));
			UserDetails user= (UserDetails) ((Authentication) principal).getPrincipal();
			System.out.println("user : "+objectMapper.writeValueAsString(user));
		
			CookieGenerator cookieGenerator = new CookieGenerator();
			cookieGenerator.addCookie(servletResponse, user.getUsername());
			cookieGenerator.setCookieName("UserName");
		
		    
	        
		    Collection<GrantedAuthority> authorities =(Collection<GrantedAuthority>) ((UserDetails)principal).getAuthorities();
		
		    List<String> listString=new ArrayList<String>();
		    for (GrantedAuthority s : authorities)
		    {
		        listString.add(s.toString());
		    }
		    System.out.println("List String"+listString);
		    Person person= new Person(user.getUsername(),"",listString);
					
			return person;
		}
		
		@RequestMapping("usermgmt/entryfailure")
		@ResponseStatus(HttpStatus.FORBIDDEN)
		public String invalidLogin(){
			return "invalid";
		}
}
