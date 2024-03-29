package com.hieu.form.user;

import javax.validation.constraints.Email;
import javax.validation.constraints.NotBlank;

import org.hibernate.validator.constraints.Length;

import com.hieu.entity.User;
import com.hieu.validation.user.EmailNotExists;
import com.hieu.validation.user.UsernameNotExists;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreatingUserForm {
	
	@NotBlank(message = "The username mustn't be null value")
	@Length(max = 50, message = "The username's length is max 50 characters")
	@Length(min = 6, message = "The username's length is min 6 characters")
	@UsernameNotExists
	private String username;
	
	@NotBlank(message = "The email mustn't be null value")
	@Length(max = 50, message = "The email's length is max 50 characters")
	@Length(min = 6, message = "The email's length is min 6 characters")
	@Email
	@EmailNotExists
	private String email;
	
	@NotBlank(message = "The address mustn't be null value")
	@Length(max = 50, message = "The email's length is max 100 characters")
	private String address;
	
	@NotBlank(message = "The phone mustn't be null value")
	private Integer phone;
	
	@NotBlank(message = "The password mustn't be null value")
	private String password;
	
	@NotBlank(message = "The first name mustn't be null value")
	private String firstName;
	
	@NotBlank(message = "The last name mustn't be null value")
	private String lastName;
	
	public User toEntity() {
		return new User(username, email, password, address, phone,  firstName, lastName);
	}
}
