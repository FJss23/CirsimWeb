package com.tfg.cirsim.api.services;

import java.util.Set;

import com.tfg.cirsim.api.entities.Connection;

/**
 * 
 * @author francisco riedemann
 * @date 20/06/2019
 *
 */
public interface ConnectionService {
	
	Set<Connection> getConnection();
	
	Connection getConnection(Long id);
	
	Connection updateConnection(Long id, Connection connection);
	
	Connection deleteConnection(Long id);
	
	Connection addConnection(Connection connection);
	
}
