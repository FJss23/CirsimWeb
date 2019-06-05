package com.tfg.cirsim.api.controllers;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.tfg.cirsim.api.security.TokenComponent;

/**
 * 
 * @author Francisco.Riedemann
 * @date 04/06/2019
 *
 */
@RestController
@EnableAutoConfiguration
@RequestMapping(value = "/api/cirsim", produces = { "application/json" })
public class AuthController {

	@Autowired
    private AuthenticationManager authManager;
	
    private TokenComponent tokenUtil;
	
	@PostMapping(value = "/generate-token")
	public String authenticate(@RequestBody String username, @RequestBody String password) {
		
		Authentication auth = authManager.authenticate(new UsernamePasswordAuthenticationToken(
				username, password));
		
		SecurityContextHolder.getContext().setAuthentication(auth);
		return tokenUtil.generateToken(auth);
	}
}
