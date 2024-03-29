package com.hieu.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "`Type`")
@Data
@NoArgsConstructor
public class Type implements Serializable{
	private static final long serialVersionUID = 1L;
	
	@Column(name = "id")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "typeName", length = 50, unique = true, nullable = false)
	private String typeName;
	
	@OneToMany(mappedBy = "type")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<Product> products;
}
