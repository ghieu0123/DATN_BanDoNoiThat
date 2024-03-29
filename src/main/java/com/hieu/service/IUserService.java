package com.hieu.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hieu.entity.User;
import com.hieu.form.user.CreatingUserForm;
import com.hieu.form.user.UpdatingUserForm;
import com.hieu.form.user.UserFilterForm;
import com.hieu.form.user.UpdatingUserByAdminForm;

public interface IUserService{
	public void Register(User user);

	public void createUser(CreatingUserForm form);

	public Page<User> getAllUsers(Pageable pageable, String search, UserFilterForm filter);

	public User getUserByID(Integer id);

//	public void deleteUser(Integer id);

	public boolean isUserExistsByID(Integer id);

	public boolean isUserExistsByUsername(String username);

	public boolean existsUserByEmail(String email);

	public void updateUser(Integer id, UpdatingUserForm form);
	
	public void updateUserByAdmin(Integer id, UpdatingUserByAdminForm form);

	public User findUserByUsername(String username);

	public User findUserByEmail(String email);

	public boolean existsUserByUsername(String userName);

//	public void resetPasswordViaEmail(String email);
//
//	public void resetPassword(String token, String newPassword);
//
//	public void sendResetPasswordViaEmail(String email);

	public void deleteUsers(List<Integer> ids);
}
