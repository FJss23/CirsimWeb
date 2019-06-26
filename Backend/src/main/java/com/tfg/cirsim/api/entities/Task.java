package com.tfg.cirsim.api.entities;

import java.util.Date;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;

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
	
	@ManyToOne
	private User author;
	
	@ManyToMany
	@JoinTable(name = "TTASK_ASIGNED_TO",
		joinColumns = @JoinColumn(name = "task_id"), 
		inverseJoinColumns = @JoinColumn(name = "user_id"))
	private Set<User> students;
	
	private String name;
	
	@Column(name = "open_date")
	private Date openDate;
	
	@OneToMany(mappedBy = "task", cascade = CascadeType.ALL)
	private Set<Exercise> exercises = new HashSet<Exercise>();
	
	private String description;
	
	public Task() { }
	
	public Task(Long id, String name, Date openDate, Set<Exercise> exercises,
			String description) {
		super();
		this.id = id;
		this.name = name;
		this.openDate = openDate;
		this.exercises = exercises;
		this.description = description;
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

	public Set<User> getStudents() {
		return students;
	}

	public void setStudents(Set<User> students) {
		this.students = students;
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

	public Set<Exercise> getExercises() {
		return exercises;
	}

	public void setExercises(Set<Exercise> exercises) {
		this.exercises = exercises;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((name == null) ? 0 : name.hashCode());
		result = prime * result + ((openDate == null) ? 0 : openDate.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Task other = (Task) obj;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (name == null) {
			if (other.name != null)
				return false;
		} else if (!name.equals(other.name))
			return false;
		if (openDate == null) {
			if (other.openDate != null)
				return false;
		} else if (!openDate.equals(other.openDate))
			return false;
		return true;
	}
	
}
