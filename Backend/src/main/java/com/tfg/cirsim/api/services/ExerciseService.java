package com.tfg.cirsim.api.services;

import java.util.Set;

import com.tfg.cirsim.api.entities.Exercise;

/**
 * 
 * @author francisco riedemann
 * @date 20/06/2019
 *
 */
public interface ExerciseService {
	
	Set<Exercise> getExercise();
	
	Exercise getExercise(Long id);
	
	Exercise updateExercise(Long id, Exercise exercise);
	
	Exercise deleteExercise(Long id);
	
	Exercise addExercise(Exercise exercise);
	
}
