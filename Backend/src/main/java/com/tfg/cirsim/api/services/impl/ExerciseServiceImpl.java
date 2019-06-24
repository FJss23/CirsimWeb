package com.tfg.cirsim.api.services.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tfg.cirsim.api.entities.Exercise;
import com.tfg.cirsim.api.repository.ExerciseRepository;
import com.tfg.cirsim.api.services.ConnectionService;
import com.tfg.cirsim.api.services.ExerciseService;
import com.tfg.cirsim.api.services.ImageService;
import com.tfg.cirsim.api.services.PointService;

/**
 * 
 * @author francisco riedemann
 * @date 22/06/2019
 */
@Service
public class ExerciseServiceImpl implements ExerciseService {
	
	@Autowired
	ExerciseRepository exerciseRepository;
	
	@Autowired
	ConnectionService connectionService;
	
	@Autowired
	PointService pointService;
	
	@Autowired
	ImageService imageService;

	@Override
	public Set<Exercise> getExercise() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Exercise getExercise(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Exercise updateExercise(Long id, Exercise exercise) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Exercise deleteExercise(Long id) {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public Exercise addExercise(Exercise exercise) {
		exercise.getConnections().forEach(connection ->
		connectionService.addConnection(connection));
		exercise.getPoints().forEach(point -> 
		pointService.addPoint(point));
		imageService.addImage(exercise.getImage());
		
		return exerciseRepository.save(exercise);
	}


}
