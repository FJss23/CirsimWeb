package com.tfg.cirsim.api.services.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tfg.cirsim.api.entities.Connection;
import com.tfg.cirsim.api.repository.ConnectionRepository;
import com.tfg.cirsim.api.services.ConnectionService;

/**
 * 
 * @author francisco riedemann
 * @date 22/06/2019
 */
@Service
public class ConnectionServiceImpl implements ConnectionService {
	
	@Autowired
	ConnectionRepository connectionRepository;

	@Override
	public Set<Connection> getConnection() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Connection getConnection(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Connection updateConnection(Long id, Connection connection) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Connection deleteConnection(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Connection addConnection(Connection connection) {
		return connectionRepository.save(connection);
	}

}
