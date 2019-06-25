package com.tfg.cirsim.api.services.impl;

import java.util.Set;

import org.springframework.stereotype.Service;

import com.tfg.cirsim.api.entities.Connection;
import com.tfg.cirsim.api.entities.Exercise;
import com.tfg.cirsim.api.services.ConnectionService;

/**
 * 
 * @author francisco riedemann
 * @date 22/06/2019
 */
@Service
public class ConnectionServiceImpl implements ConnectionService {
	
	@Override
	public void addConnection(Set<Connection> connections, Exercise exercise) {
		connections.forEach(connection -> {
			connection.setExercise(exercise);
		});
	}

}
