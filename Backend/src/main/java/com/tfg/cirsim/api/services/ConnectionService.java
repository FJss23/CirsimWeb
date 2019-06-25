package com.tfg.cirsim.api.services;

import java.util.Set;

import com.tfg.cirsim.api.entities.Connection;
import com.tfg.cirsim.api.entities.Exercise;

/**
 * 
 * @author francisco riedemann
 * @date 20/06/2019
 *
 */
public interface ConnectionService {

	void addConnection(Set<Connection> connections, Exercise exercise);
	
}
