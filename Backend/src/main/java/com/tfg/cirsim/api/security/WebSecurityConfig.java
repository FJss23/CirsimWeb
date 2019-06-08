package com.tfg.cirsim.api.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.tfg.cirsim.api.services.utility.UserDetailsServiceImpl;

/**
 * 
 * @author francisco.riedemann
 * @date 04/06/2019
 */
@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter{
	
	@Autowired
    public UserDetailsServiceImpl userDetailsService;
	
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
	    source.registerCorsConfiguration("/**", new CorsConfiguration()
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
         .addFilterBefore(new JwtAuthenticationFilter(authenticationManager()), JwtAuthenticationFilter.class)
         .addFilterBefore(new JwtAuthorizationFilter(authenticationManager()), JwtAuthorizationFilter.class)
         .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
         .and()  
         .exceptionHandling().authenticationEntryPoint(authenticationEntryPoint);
	}

}
