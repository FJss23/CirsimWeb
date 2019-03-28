package com.api.cirsimweb.repositories;

import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;

import com.api.cirsimweb.entities.User;

@RepositoryRestResource
public interface UserRepository extends PagingAndSortingRepository<User, Long>{

}
