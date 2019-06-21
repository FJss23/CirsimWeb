package com.tfg.cirsim.api.entities;

import java.util.List;

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
	
	private String visId;
	
	private String title;
	
	private String description;
	
	@OneToMany(mappedBy = "exercise")
	private List<Connection> connection;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "image_id", referencedColumnName = "id")
	private Image image;
	
	@ManyToOne
	@JoinTable(name = "TEXERCISE_TASK",
 		joinColumns = @JoinColumn(name = "exercise_id"), 
 		inverseJoinColumns = @JoinColumn(name = "task_id"))
	private Task task;
	
	public Exercise() { }
	
	public Exercise(String visId, String title, String description,
			List<Connection> connection, Image image) {
		this.visId = visId;
		this.title = title;
		this.description = description;
		this.connection = connection;
		this.image = image;
	}

	public Exercise(Long id, String visId, String title, String description,
			List<Connection> connection, Image image) {
		super();
		this.id = id;
		this.visId = visId;
		this.title = title;
		this.description = description;
		this.connection = connection;
		this.image = image;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getVisId() {
		return visId;
	}

	public void setVisId(String visId) {
		this.visId = visId;
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
		return "Exercise [id=" + id + ", visId=" + visId + ", title=" + title + ", description=" + description
				+ ", connection=" + connection + ", image=" + image + "]";
	}
}
