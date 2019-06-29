package com.tfg.cirsim.api.entities;

import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;

import com.fasterxml.jackson.annotation.JsonIgnore;

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
	
	@Column(length = 256)
	private String description;
	
	@OneToMany(mappedBy = "exercise", fetch = FetchType.EAGER, 
			cascade = CascadeType.ALL)
	private Set<Connection> connections = new HashSet<Connection>();
	
	@OneToMany(mappedBy = "exercise", fetch = FetchType.EAGER,
			 cascade = CascadeType.ALL)
	private Set<Point> points = new HashSet<Point>();
	
	@OneToOne(mappedBy = "exercise", cascade = CascadeType.ALL)
	private Image image;
	
	@ManyToOne(fetch = FetchType.EAGER)
	@JsonIgnore
	private Task task;
	
	private Long seed;
	
	public Exercise() { }

	public Exercise(Long id, String title, String description, Set<Connection> 
			connections, Set<Point> points, Image image, Long seed) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.connections = connections;
		this.points = points;
		this.image = image;
		this.seed = seed;
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


	public Set<Point> getPoints() {
		return points;
	}


	public void setPoints(Set<Point> points) {
		this.points = points;
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

	public Long getSeed() {
		return seed;
	}

	public void setSeed(Long seed) {
		this.seed = seed;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((description == null) ? 0 : description.hashCode());
		result = prime * result + ((seed == null) ? 0 : seed.hashCode());
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
		if (seed == null) {
			if (other.seed != null)
				return false;
		} else if (!seed.equals(other.seed))
			return false;
		if (title == null) {
			if (other.title != null)
				return false;
		} else if (!title.equals(other.title))
			return false;
		return true;
	}
	
}
