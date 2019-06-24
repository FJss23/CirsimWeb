package com.tfg.cirsim.api.repository;

import org.springframework.data.repository.CrudRepository;

import com.tfg.cirsim.api.entities.Point;

public interface PointRepository extends CrudRepository<Point, Long> {

}
