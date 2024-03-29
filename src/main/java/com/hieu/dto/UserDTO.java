package com.hieu.dto;

import java.util.Date;
import java.util.List;

import com.hieu.entity.Role;
import com.hieu.entity.User;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserDTO {
	
	private Integer userId;
	
	private String username;
	
	private String email;
	
	private String password;
	
	private String address;
	
	private Integer phone;
	
	private String firstName;
	
	private String lastName;
	
	private Role role;
	
	private List<ShoppingCartDTO> shoppingCarts;
	
	private List<PaymentDTO> payments; 
	
	@Data
	@NoArgsConstructor
	public static class ShoppingCartDTO{
		
		private Integer id;
	}
	
	@Data
	@NoArgsConstructor
	public static class PaymentDTO{
		
		private Integer id;
		
		private Date datePayment;
	}
	
	public User toEntity() {
		return new User(username, email, password, address, phone, firstName, lastName);
	}
}