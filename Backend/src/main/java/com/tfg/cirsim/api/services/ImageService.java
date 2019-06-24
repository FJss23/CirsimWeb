package com.tfg.cirsim.api.services;

import java.util.Set;

import com.tfg.cirsim.api.entities.Image;

/**
 * 
 * @author francisco riedemann
 * @date 20/06/2019
 *
 */
public interface ImageService {
	
	Set<Image> getImage();
	
	Image getImage(Long id);
	
	Image updateImage(Long id, Image image);
	
	Image deleteImage(Long id);
	
	Image addImage(Image image);
	
}
