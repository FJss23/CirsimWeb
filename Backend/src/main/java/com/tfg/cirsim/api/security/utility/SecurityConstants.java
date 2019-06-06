package com.tfg.cirsim.api.security.utility;

/*
 * 
 * @author francisco riedemann
 * @date 06/06/2019
 *
 */
public final class SecurityConstants {

	public static final String SIGN_KEY = "cirsim265";
	public static final long VALID_TIME_TOKEN = 600 * 1000;
	public static final String AUTH_HEADER = "Authorization";
	public static final String TOKEN_PREFIX = "Bearer ";
}
