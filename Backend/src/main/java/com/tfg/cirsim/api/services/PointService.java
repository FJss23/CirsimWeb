package com.tfg.cirsim.api.services;

import java.util.Set;

import com.tfg.cirsim.api.entities.Exercise;
import com.tfg.cirsim.api.entities.Point;

/**
 * 
 * @author francisco riedemann
 * @date 20/06/2019
 *
 */
public interface PointService {

	void addPoints(Set<Point> points, Exercise exercise);
	
}
