package com.tfg.cirsim.api.controller;

import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * 
 * @author Francisco.Riedemann
 * @date 03/06/2019
 *
 */

@RestController
@EnableAutoConfiguration
@RequestMapping("api")
public class UserController {

	@RequestMapping("/")
	public String testing() {
		return "Testing API";
	}
}
