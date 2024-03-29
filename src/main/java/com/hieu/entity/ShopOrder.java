package com.hieu.entity;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "`ShopOrder`")
@Data
@NoArgsConstructor
public class ShopOrder implements Serializable{

	private static final long serialVersionUID = 1L;

	@Column(name = "id")
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer id;
	
	@Column(name = "orderDate", nullable = false)
	@Temporal(TemporalType.TIMESTAMP)
//	@CreationTimestamp
	private Date orderDate;
	
	@Column(name ="`totalPrice`", nullable = false)
	private Integer totalPrice;
	
	@Column(name ="`addressShipping`", length = 100, nullable = false)
	private String addressShipping;
	
	@Column(name = "`orderStatus`", nullable = false)
	private ShopOrderStatus orderStatus = ShopOrderStatus.NOT_PAY;
	
	@OneToOne(mappedBy = "shopOrder")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private Payment payment;

	@OneToMany(mappedBy = "shopOrder")
	@OnDelete(action = OnDeleteAction.CASCADE)
	private List<ShoppingCart> shoppingCarts;
}
