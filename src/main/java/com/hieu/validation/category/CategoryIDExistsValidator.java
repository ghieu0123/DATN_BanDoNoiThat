package com.hieu.validation.category;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.StringUtils;

import com.hieu.service.IUserService;


public class CategoryIDExistsValidator implements ConstraintValidator<CategoryIDExists, Integer>{
	
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
