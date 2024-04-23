package com.hieu.form.user;

import com.hieu.entity.Role;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UserFilterForm {
	private Role role;
}
