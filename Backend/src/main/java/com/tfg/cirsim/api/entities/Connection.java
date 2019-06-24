package com.tfg.cirsim.api.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;

/**
 * 
 * @author francisco riedemann
 * @date 20/06/2019
 *
 */
@Entity(name="TCONNECTION")
public class Connection {

	@Id
	@GeneratedValue
	private Long id;
	
	@Column(name = "vis_id")
	private String visId;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "point_from_id", referencedColumnName = "id")
	private Point from;
	
	@OneToOne(cascade = CascadeType.ALL)
	@JoinColumn(name = "point_to_id", referencedColumnName = "id")
	private Point to;
	
	private int width;
	
	@ManyToOne(fetch = FetchType.LAZY)
	private Exercise exercise;
	
	public Connection() { }

	public Connection(Long id, String visId, Point from, Point to, int width, Exercise exercise) {
		super();
		this.id = id;
		this.visId = visId;
		this.from = from;
		this.to = to;
		this.width = width;
		this.exercise = exercise;
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

	public Point getFrom() {
		return from;
	}

	public void setFrom(Point from) {
		this.from = from;
	}

	public Point getTo() {
		return to;
	}

	public void setTo(Point to) {
		this.to = to;
	}

	public int getWidth() {
		return width;
	}

	public void setWidth(int width) {
		this.width = width;
	}

	public Exercise getExercise() {
		return exercise;
	}

	public void setExercise(Exercise exercise) {
		this.exercise = exercise;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((visId == null) ? 0 : visId.hashCode());
		result = prime * result + width;
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
		Connection other = (Connection) obj;
		if (visId == null) {
			if (other.visId != null)
				return false;
		} else if (!visId.equals(other.visId))
			return false;
		if (width != other.width)
			return false;
		return true;
	}

	

}
