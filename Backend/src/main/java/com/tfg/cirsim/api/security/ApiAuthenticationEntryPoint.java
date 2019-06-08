package com.tfg.cirsim.api.security;

/**
 * 
 * @author francisco.riedemann
 * @date 08/06/2019
 */
import java.io.IOException;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.ObjectMapper;

@Component
public class ApiAuthenticationEntryPoint implements AuthenticationEntryPoint{
	
    @Autowired
    private ObjectMapper objectMapper;

	@Override
	public void commence(HttpServletRequest request, HttpServletResponse response,
			AuthenticationException authException) throws IOException, ServletException {
		
		Map<String, Object> result = new HashMap<String, Object>();
		Long timestamp = new Date().getTime();
		
		result.put("timestamp", timestamp.toString());
        result.put("status", 401);
		result.put("error", "Unauthorized");
		result.put("message", "Not authenticated or bad credentials");
        result.put("path",request.getServletPath());
      
		response.setContentType("application/json");
		response.getWriter().write( objectMapper.writeValueAsString(result));
        response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
	}

}
