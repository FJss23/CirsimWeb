package com.tfg.cirsim.api.entities;

import java.sql.Connection;
import java.util.List;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;

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
	
	private List<Point> points;
	
	private List<Connection> connection;
	
	private Image image;
	
	public Exercise() { }
	
	public Exercise(String title, String description, List<Point> points, List<Connection> connection,
			Image image) {
		this.title = title;
		this.description = description;
		this.points = points;
		this.connection = connection;
		this.image = image;
	}

	public Exercise(Long id, String title, String description, List<Point> points, List<Connection> connection,
			Image image) {
		super();
		this.id = id;
		this.title = title;
		this.description = description;
		this.points = points;
		this.connection = connection;
		this.image = image;
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

	public List<Point> getPoints() {
		return points;
	}

	public void setPoints(List<Point> points) {
		this.points = points;
	}

	public List<Connection> getConnection() {
		return connection;
	}

	public void setConnection(List<Connection> connection) {
		this.connection = connection;
	}

	public Image getImage() {
		return image;
	}

	public void setImage(Image image) {
		this.image = image;
	}

	@Override
	public String toString() {
		return "Exercise [id=" + id + ", title=" + title + ", description=" + description + ", points=" + points
				+ ", connection=" + connection + ", image=" + image + "]";
	}
	
}
