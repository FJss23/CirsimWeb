package com.tfg.cirsim.api.services.impl;

import java.util.Set;

import org.springframework.stereotype.Service;

import com.tfg.cirsim.api.entities.Exercise;
import com.tfg.cirsim.api.entities.Point;
import com.tfg.cirsim.api.services.PointService;

/**
 * 
 * @author francisco riedemann
 * @date 22/06/2019
 */
@Service
public class PointServiceImpl implements PointService {

	@Override
	public void addPoints(Set<Point> points, Exercise exercise) {
		points.forEach(point -> {
			point.setExercise(exercise);
		});
	}
}
