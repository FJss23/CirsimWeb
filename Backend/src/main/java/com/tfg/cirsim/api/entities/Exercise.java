package com.tfg.cirsim.api.entities;

import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

/**
 * 
 * @author francisco riedemann
 * @date 20/06/2019
 */
@Entity(name="TEXERCISE")
public class Exercise {
	
	@Id
	@GeneratedValue
	private Long id;
	
	private String title;
	
	private String description;
	
	@OneToMany(mappedBy = "exercise")
	private Set<Connection> connections;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "image_id", referencedColumnName = "id")
	private Image image;
	
	@ManyToOne
	@JoinTable(name = "TEXERCISE_TASK",
 		joinColumns = @JoinColumn(name = "exercise_id"), 
 		inverseJoinColumns = @JoinColumn(name = "task_id"))
	private Task task;
	
	public Exercise() { }

	public Exercise(Long id, String title, String description, Set<Connection> connections, Image image, Task task) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.connections = connections;
		this.image = image;
		this.task = task;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Set<Connection> getConnections() {
		return connections;
	}

	public void setConnections(Set<Connection> connections) {
		this.connections = connections;
	}

	public Image getImage() {
		return image;
	}

	public void setImage(Image image) {
		this.image = image;
	}

	public Task getTask() {
		return task;
	}

	public void setTask(Task task) {
		this.task = task;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((title == null) ? 0 : title.hashCode());
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
		Exercise other = (Exercise) obj;
		if (description == null) {
			if (other.description != null)
				return false;
		} else if (!description.equals(other.description))
			return false;
		if (title == null) {
			if (other.title != null)
				return false;
		} else if (!title.equals(other.title))
			return false;
		return true;
	}

	
}
