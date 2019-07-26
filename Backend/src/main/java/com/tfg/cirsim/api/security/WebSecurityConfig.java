package com.tfg.cirsim.api.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.tfg.cirsim.api.repository.UserRepository;

/**
 * 
 * @author francisco.riedemann
 */
@Configuration
@EnableWebSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true)
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{
	
	@Autowired
	private UserDetailsService userDetailsService;
	
	@Autowired
	private UserRepository userRepository;
	
	@Autowired
	public ApiAuthenticationEntryPoint authenticationEntryPoint;
	
	@Bean
	public BCryptPasswordEncoder bCryptPasswordEncoder() {
		return new BCryptPasswordEncoder();
	}
	
    @Bean
    @Override
    public AuthenticationManager authenticationManagerBean() throws Exception {
        return super.authenticationManagerBean();
    }
	
	@Bean
	public CorsConfigurationSource corsConfigurationSource() {
	    final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
	    CorsConfiguration config = new CorsConfiguration();
	    config.setAllowCredentials(true);
	    config.addAllowedOrigin("*");
	    config.addAllowedHeader("Access-Control-Expose-Headers");
	    config.addAllowedHeader("X-Requested-With");
	    config.addAllowedHeader("Authorization");
	    config.addAllowedHeader("Content-Type");
	    config.addAllowedHeader("If-None-Match");
	    config.addAllowedHeader("Access-Control-Allow-Headers");
	    
	    config.addExposedHeader("Access-Control-Allow-Origin");
	    config.addExposedHeader("Access-Control-Allow-Headers");
	    config.addExposedHeader("Authorization");
	    config.addAllowedMethod("GET");
	    config.addAllowedMethod("POST");
	    config.addAllowedMethod("PUT");
	    config.addAllowedMethod("DELETE");
	    config.addAllowedMethod("OPTIONS");
	    config.addAllowedMethod("HEAD");
	    config.addAllowedMethod("PATCH");
	    
	    source.registerCorsConfiguration("/**", config
	    		.applyPermitDefaultValues());
	    return source;
	}
	
    
	@Override
    public void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(bCryptPasswordEncoder());
    }
	
	@Override
	protected void configure(HttpSecurity http) throws Exception {
		 http.cors().and().csrf().disable().authorizeRequests()
         .antMatchers(HttpMethod.POST, "/login").permitAll()
         .anyRequest().authenticated()
         .and()
         .addFilterBefore(new JwtAuthenticationFilter(authenticationManager(), userRepository), JwtAuthenticationFilter.class)
         .addFilterBefore(new JwtAuthorizationFilter(authenticationManager(), getApplicationContext()), JwtAuthorizationFilter.class)
         .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
         .and()  
         .exceptionHandling().authenticationEntryPoint(authenticationEntryPoint);
	}

}
