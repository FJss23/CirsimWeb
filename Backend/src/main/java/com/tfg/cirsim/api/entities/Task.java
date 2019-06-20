package com.tfg.cirsim.api.entities;

import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

/**
 * 
 * @author francisco riedemann
 * @date 2o/06/2019
 *
 */
@Entity(name="TTASK")
public class Task {
	
	@Id
	@GeneratedValue
	private Long id;
	
	@Column(nullable = false, unique = true)
	private User author;
	
	private String grade;
	
	private String name;
	
	private Date openDate;
	
	private List<Exercise> exercises;
	
	public Task() { }
	
	public Task(User author, String grade, String name, Date openDate,
			List<Exercise> exercises) {
		this.author = author;
		this.grade = grade;
		this.name = name;
		this.openDate = openDate;
		this.exercises = exercises;
	}
	
	public Task(Long id, User author, String grade, String name, Date openDate,
			List<Exercise> exercises) {
		super();
		this.id = id;
		this.author = author;
		this.grade = grade;
		this.name = name;
		this.openDate = openDate;
		this.exercises = exercises;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public User getAuthor() {
		return author;
	}

	public void setAuthor(User author) {
		this.author = author;
	}

	public String getGrade() {
		return grade;
	}

	public void setGrade(String grade) {
		this.grade = grade;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Date getOpenDate() {
		return openDate;
	}

	public void setOpenDate(Date openDate) {
		this.openDate = openDate;
	}

	public List<Exercise> getExercises() {
		return exercises;
	}

	public void setExercises(List<Exercise> exercises) {
		this.exercises = exercises;
	}

	@Override
	public String toString() {
		return "Task [id=" + id + ", author=" + author + ", grade=" + grade + ", name=" + name + ", openDate="
				+ openDate + ", exercises=" + exercises + "]";
	}
	
}
