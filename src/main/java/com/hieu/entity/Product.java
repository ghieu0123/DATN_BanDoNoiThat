package com.hieu.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "`Product`")
@Data
@NoArgsConstructor
public class Product implements Serializable{

	private static final long serialVersionUID = 1L;

	@Column(name = "id")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "name", length = 100, unique = true, nullable = false)
	private String name;
	
	@Column(name = "collection", length = 50, nullable = false)
	private String collection;
	
	@Column(name = "size", length = 50, nullable = false)
	private String size;
	
	@Column(name = "material", length = 50, nullable = false)
	private String material;
	
	@Column(name = "description", length = 200, nullable = false)
	private String description;
	
	@Column(name = "price", nullable = false)
	private Integer price;
	
	@Column(name = "image", nullable = false)
	private String image;
	
	@ManyToOne
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JoinColumn(name = "`categoryId`")
	private Category category;
	
	@ManyToOne
	@OnDelete(action = OnDeleteAction.CASCADE)
	@JoinColumn(name = "`typeId`")
	private Type type;
	
	@OneToMany(mappedBy = "product")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<ShoppingCartItem> shoppingCartItems;
	
	public Product(String name,String collection,String size, String material, String description, Integer price, String image) {
		super();
		this.name = name;
		this.collection = collection;
		this.size = size;
		this.material = material;
		this.description = description;
		this.price = price;
		this.image = image;
	}
}
