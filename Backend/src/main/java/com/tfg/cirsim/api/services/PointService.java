package com.tfg.cirsim.api.services;

import java.util.Set;

import com.tfg.cirsim.api.entities.Point;

/**
 * 
 * @author francisco riedemann
 * @date 20/06/2019
 *
 */
public interface PointService {
	
	Set<Point> getPoint();
	
	Point getPoint(Long id);
	
	Point updatePointk(Long id, Point point);
	
	Point deletePoint(Long id);
	
	Point addPoint(Point point);
	
}
