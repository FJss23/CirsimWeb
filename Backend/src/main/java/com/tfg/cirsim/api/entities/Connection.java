package com.tfg.cirsim.api.entities;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.JoinTable;
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
	
	@ManyToOne
	@JoinTable(name = "TEXERCISE_CONNECTION",
		joinColumns = @JoinColumn(name = "connection_id"), 
		inverseJoinColumns = @JoinColumn(name = "exercise_id"))
	private Exercise exercise;
	
	public Connection() { }

	public Connection(String visId, Point from, Point to, int width) {
		this.visId = visId;
		this.from = from;
		this.to = to;
		this.width = width;
	}
	
	public Connection(Long id, String visId, Point from, Point to, int width) {
		super();
		this.id = id;
		this.visId = visId;
		this.from = from;
		this.to = to;
		this.width = width;
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

	@Override
	public String toString() {
		return "Connection [id=" + id + ", visId=" + visId + ", from=" + from + ", to=" + to + ", width=" + width + "]";
	}

}
