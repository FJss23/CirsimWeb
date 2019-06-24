package com.tfg.cirsim.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.tfg.cirsim.api.entities.Image;

/**
 * 
 * @author francisco riedemann
 * @date 22/06/2019
 */
@Repository
public interface ImageRepository extends CrudRepository<Image, Long> {

}
