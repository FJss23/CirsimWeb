package com.tfg.cirsim.api.services.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tfg.cirsim.api.entities.Point;
import com.tfg.cirsim.api.repository.PointRepository;
import com.tfg.cirsim.api.services.PointService;

/**
 * 
 * @author francisco riedemann
 * @date 22/06/2019
 */
@Service
public class PointServiceImpl implements PointService {
	
	@Autowired
	PointRepository pointRepository;

	@Override
	public Set<Point> getPoint() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Point getPoint(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Point updatePointk(Long id, Point point) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Point deletePoint(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Point addPoint(Point point) {
		return pointRepository.save(point);
	}


}
