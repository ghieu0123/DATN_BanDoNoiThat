package com.hieu.form.user;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.Pattern;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class UpdatingUserByAdminForm extends UpdatingUserForm{
	@NotBlank(message = "Không được để trống")
	@Pattern(regexp = "ADMIN|USER|MANAGER")
	private String role;
}
