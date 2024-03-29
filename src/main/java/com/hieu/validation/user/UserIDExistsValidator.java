package com.hieu.validation.user;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import com.hieu.service.IUserService;


public class UserIDExistsValidator implements ConstraintValidator<UserIDExists, Integer>{
	
	@Autowired
	private IUserService userService;

	@SuppressWarnings("deprecation")
	@Override
	public boolean isValid(Integer id, ConstraintValidatorContext context) {
		
		if(StringUtils.isEmpty(id)) {
			return true;
		}
		
		return userService.isUserExistsByID(id);
	}

}
