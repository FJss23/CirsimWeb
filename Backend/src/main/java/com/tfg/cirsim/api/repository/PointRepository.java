package com.tfg.cirsim.api.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.tfg.cirsim.api.entities.Point;

/**
 * 
 * @author francisco riedemann
 * @date 22/06/2019
 */
@Repository
public interface PointRepository extends CrudRepository<Point, Long> {

}
