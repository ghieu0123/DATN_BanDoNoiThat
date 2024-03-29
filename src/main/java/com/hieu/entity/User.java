package com.hieu.entity;

import java.io.Serializable;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.hibernate.annotations.Formula;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name="`User`")
@Data
@NoArgsConstructor
public class User implements Serializable {
	private static final long serialVersionUID = 1L;
	
	@Column(name = "`id`")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "`username`", length = 50, nullable = false, unique = true)
	private String username;
	
	@Column(name = "`email`", length = 50, unique = true)
	private String email;
	
	@Column(name = "`password`", length = 800, nullable = false)
	private String password;
	
	@Column(name = "`address`", length = 100, nullable = false)
	private String address;
	
	@Column(name = "`phone`", nullable = false)
	private Integer phone;
	
	@Column(name = "`firstName`", length = 50, nullable = false)
	private String firstName;
	
	@Column(name = "`lastName`", length = 50, nullable = false)
	private String lastName;
	
	@Formula("concat(firstName, ' ', lastName)")
	private String fullName;
	
	@Enumerated(EnumType.STRING)
	@Column(name = "role", nullable = false)
	private Role role = Role.USER;
	
	@Enumerated(EnumType.ORDINAL)
	@Column(name = "`status`", nullable = false)
	private UserStatus status = UserStatus.NOT_ACTIVE;
	
	@OneToMany(mappedBy = "user")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<ShoppingCart> shoppingCarts;
	
	@OneToMany(mappedBy = "user")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<Payment> payments;
	
	public User(String username, String email, String password, String address, Integer phone, String firstName, String lastName) {
		super();
		this.username = username;
		this.email = email;
		this.password = password;
		this.address = address;
		this.phone = phone;
		this.firstName = firstName;
		this.lastName = lastName;
	}

	public User(Integer id, String username, String email, String password, String firstName, String lastName,
			Role role, UserStatus status) {
		super();
		this.id = id;
		this.username = username;
		this.email = email;
		this.password = password;
		this.firstName = firstName;
		this.lastName = lastName;
		this.role = role;
		this.status = status;
	}
	
}
