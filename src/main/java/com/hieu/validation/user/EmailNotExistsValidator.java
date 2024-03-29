package com.hieu.validation.user;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import com.hieu.service.IUserService;

public class EmailNotExistsValidator implements ConstraintValidator<EmailNotExists, String>{

	@Autowired
	private IUserService service;

	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(String email, ConstraintValidatorContext constraintValidatorContext) {

		if (StringUtils.isEmpty(email)) {
			return true;
		}
		
		return !service.existsUserByEmail(email);
	}
	
	
}
