package com.tfg.cirsim.api.entities;

import javax.persistence.Entity;
import javax.persistence.Column;
import javax.persistence.GeneratedValue;
import javax.persistence.Id;
import javax.persistence.OneToOne;

/**
 * 
 * @author francisco riedemann
 * @date 20/06/2019
 */
@Entity(name="TPOINT")
public class Point {
	
	@Id
	@GeneratedValue
	private Long id;
	
	@Column(name = "vis_id")
	private String visId;
	
	@Column(name = "position_x")
	private String positionX;
	
	@Column(name = "position_y")
	private String positionY;
	
	private String label;
	
	private String color;
	
	private String shape;
	
	private int size;
	
	@OneToOne(mappedBy = "from")
	private Connection connectionTo;
	
	@OneToOne(mappedBy = "to")
	private Connection connectionFrom;
	
	public Point() { }

	public Point(Long id, String visId, String positionX, String positionY, String label, String color, String shape,
			int size, Connection connectionTo, Connection connectionFrom) {
		super();
		this.id = id;
		this.visId = visId;
		this.positionX = positionX;
		this.positionY = positionY;
		this.label = label;
		this.color = color;
		this.shape = shape;
		this.size = size;
		this.connectionTo = connectionTo;
		this.connectionFrom = connectionFrom;
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

	public String getPositionX() {
		return positionX;
	}

	public void setPositionX(String positionX) {
		this.positionX = positionX;
	}

	public String getPositionY() {
		return positionY;
	}

	public void setPositionY(String positionY) {
		this.positionY = positionY;
	}

	public String getLabel() {
		return label;
	}

	public void setLabel(String label) {
		this.label = label;
	}

	public String getColor() {
		return color;
	}

	public void setColor(String color) {
		this.color = color;
	}

	public String getShape() {
		return shape;
	}

	public void setShape(String shape) {
		this.shape = shape;
	}

	public int getSize() {
		return size;
	}

	public void setSize(int size) {
		this.size = size;
	}

	public Connection getConnectionTo() {
		return connectionTo;
	}

	public void setConnectionTo(Connection connectionTo) {
		this.connectionTo = connectionTo;
	}

	public Connection getConnectionFrom() {
		return connectionFrom;
	}

	public void setConnectionFrom(Connection connectionFrom) {
		this.connectionFrom = connectionFrom;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((color == null) ? 0 : color.hashCode());
		result = prime * result + ((label == null) ? 0 : label.hashCode());
		result = prime * result + ((positionX == null) ? 0 : positionX.hashCode());
		result = prime * result + ((positionY == null) ? 0 : positionY.hashCode());
		result = prime * result + ((shape == null) ? 0 : shape.hashCode());
		result = prime * result + size;
		result = prime * result + ((visId == null) ? 0 : visId.hashCode());
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
		Point other = (Point) obj;
		if (color == null) {
			if (other.color != null)
				return false;
		} else if (!color.equals(other.color))
			return false;
		if (label == null) {
			if (other.label != null)
				return false;
		} else if (!label.equals(other.label))
			return false;
		if (positionX == null) {
			if (other.positionX != null)
				return false;
		} else if (!positionX.equals(other.positionX))
			return false;
		if (positionY == null) {
			if (other.positionY != null)
				return false;
		} else if (!positionY.equals(other.positionY))
			return false;
		if (shape == null) {
			if (other.shape != null)
				return false;
		} else if (!shape.equals(other.shape))
			return false;
		if (size != other.size)
			return false;
		if (visId == null) {
			if (other.visId != null)
				return false;
		} else if (!visId.equals(other.visId))
			return false;
		return true;
	}

	

}
