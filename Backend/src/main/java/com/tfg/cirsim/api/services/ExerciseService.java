package com.tfg.cirsim.api.services;

import java.util.Set;

import com.tfg.cirsim.api.entities.Exercise;
import com.tfg.cirsim.api.entities.Task;

/**
 * 
 * @author francisco riedemann
 * @date 20/06/2019
 *
 */
public interface ExerciseService {

	void addExercises(Set<Exercise> exercises, Task task);
	
}
