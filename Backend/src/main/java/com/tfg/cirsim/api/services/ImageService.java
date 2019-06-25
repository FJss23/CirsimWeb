package com.tfg.cirsim.api.services;

import com.tfg.cirsim.api.entities.Exercise;
import com.tfg.cirsim.api.entities.Image;

/**
 * 
 * @author francisco riedemann
 * @date 20/06/2019
 *
 */
public interface ImageService {

	void addImage(Image image, Exercise exercise);
	
}
