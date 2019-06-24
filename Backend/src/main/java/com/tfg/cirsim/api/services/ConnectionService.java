package com.tfg.cirsim.api.services;

import java.util.Set;

import com.tfg.cirsim.api.entities.Connection;
import com.tfg.cirsim.api.entities.Task;

/**
 * 
 * @author francisco riedemann
 * @date 20/06/2019
 *
 */
public interface ConnectionService {
	
	Set<Connection> getConnection();
	
	Task getConnection(Long id);
	
	Task updateConnection(Long id, Connection Connection);
	
	Task deleteConnection(Long id);
	
	Task addConnection(Connection Connection);
	
}
