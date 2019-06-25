package com.tfg.cirsim.api.services.impl;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.tfg.cirsim.api.entities.Exercise;
import com.tfg.cirsim.api.entities.Task;
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
	ConnectionService connectionService;
	
	@Autowired
	PointService pointService;
	
	@Autowired
	ImageService imageService;

	@Override
	public void addExercises(Set<Exercise> exercises, Task task) {
		exercises.forEach(exercise -> {
				exercise.setTask(task);
				pointService.addPoints(exercise.getPoints(), exercise);
				connectionService.addConnection(exercise.getConnections(),
						exercise);
				imageService.addImage(exercise.getImage(), exercise);
		});
	}


}
