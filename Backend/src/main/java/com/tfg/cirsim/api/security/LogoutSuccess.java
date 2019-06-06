package com.tfg.cirsim.api.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * 
 * @author francisco riedemann
 * @date 07(06/2019
 *
 */
@Component
public class LogoutSuccess implements LogoutSuccessHandler {
	
    @Autowired
    ObjectMapper mapper;

	@Override
	public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, 
			Authentication authentication) throws IOException, ServletException {
		
		response.setStatus(HttpServletResponse.SC_OK);
		
	}

}
