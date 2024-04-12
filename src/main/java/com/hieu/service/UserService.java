package com.hieu.service;

import java.util.List;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hieu.entity.RegistrationUserToken;
import com.hieu.entity.ResetPasswordToken;
import com.hieu.entity.Role;
import com.hieu.entity.User;
import com.hieu.entity.UserStatus;
import com.hieu.event.OnResetPasswordViaEmailEvent;
import com.hieu.event.OnSendRegistrationUserConfirmViaEmailEvent;
import com.hieu.form.user.CreatingUserByAdminForm;
import com.hieu.form.user.UpdatingUserByAdminForm;
import com.hieu.form.user.UpdatingUserForm;
import com.hieu.form.user.UserFilterForm;
import com.hieu.repository.IUserRepository;
import com.hieu.repository.RegistrationUserTokenRepository;
import com.hieu.repository.ResetPasswordTokenRepository;
import com.hieu.specification.user.UserSpecification;

@Service
public class UserService implements IUserService{
	@Autowired
	private IUserRepository repository;

	@Autowired
	private ModelMapper modelMapper;

	@Autowired
	private PasswordEncoder passwordEncoder;

	@Autowired
	private ApplicationEventPublisher eventPublisher;
	
	@Autowired
	private ResetPasswordTokenRepository resetPasswordTokenRepository;
	
	@Autowired
	private RegistrationUserTokenRepository registrationUserTokenRepository;

	@Override
	public Page<User> getAllUsers(Pageable pageable, String search, UserFilterForm filter) {

		Specification<User> where = UserSpecification.buildWhere(search, filter);
		
		return repository.findAll(where ,pageable);
	}

	@Override
	public User getUserByID(Integer id) {
		return repository.getById(id);
	}

	@Override
	public boolean isUserExistsByID(Integer id) {
		return repository.existsById(id);
	}

	@Override
	public boolean isUserExistsByUsername(String username) {
		return repository.existsByUsername(username);
	}

//	@Override
//	public void deleteUser(Integer id) {
//		repository.deleteById(id);
//	}

	@Override
	public boolean existsUserByEmail(String email) {
		return repository.existsByEmail(email);
	}

	@Override
	@Transactional
	public void updateUser(Integer id, UpdatingUserForm form) {
		User userForm = modelMapper.map(form, User.class);
		
		User userEnity = repository.findById(id).get();
		
		userEnity.setAddress(userForm.getAddress());
		userEnity.setPhone(userForm.getPhone());
		userEnity.setFirstName(userForm.getFirstName());
		userEnity.setLastName(userForm.getLastName());

	    repository.save(userEnity);
	}
	
	@Override
	public void updateUserByAdmin(Integer id, UpdatingUserByAdminForm form) {
		User userForm = modelMapper.map(form, User.class);
		
		User userEnity = repository.findById(id).get();
		
		userEnity.setAddress(userForm.getAddress());
		userEnity.setPhone(userForm.getPhone());
		userEnity.setFirstName(userForm.getFirstName());
		userEnity.setLastName(userForm.getLastName());
		userEnity.setRole(userForm.getRole());

	    repository.save(userEnity);
	}

	@Override
	public User findUserByUsername(String username) {
		return repository.findByUsername(username).get();
	}

	@Override
	public User findUserByEmail(String email) {
		return repository.findByEmail(email);
	}
	
	@Override
	public boolean existsUserByUsername(String userName) {
		return repository.existsByUsername(userName);
	}
	
	@Transactional
	public void deleteUsers(List<Integer> ids) {
		repository.deleteByIdIn(ids);
	}
	
	@Override
	public void Register(User user) {
		// encode password
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		
		user.setRole(Role.USER);

		// create user
		repository.save(user);

		// create new user registration token
		createNewRegistrationUserToken(user);

		// send email to confirm
		sendConfirmUserRegistrationViaEmail(user.getEmail());
	}
	
	@Override
	public void createUserByAdmin(CreatingUserByAdminForm form) {
		
		User user = modelMapper.map(form, User.class);
		
		// encode password
		user.setPassword(passwordEncoder.encode(user.getPassword()));
		
		user.setStatus(UserStatus.ACTIVE);
		
		// create user
		repository.save(user);
	}
	
	@Override
	public void sendResetPasswordViaEmail(String email) {
		eventPublisher.publishEvent(new OnResetPasswordViaEmailEvent(email));
	}

	@Override
	public void resetPasswordViaEmail(String email) {
		// find user by email
		User user = findUserByEmail(email);

		// remove token token if exists
		resetPasswordTokenRepository.deleteByUserId(user.getId());

		// create new reset password token
		createNewResetPasswordToken(user);

		// send email
		sendResetPasswordViaEmail(email);
		
	}
	
	private void createNewResetPasswordToken(User user) {

		// create new token for Reseting password
		final String newToken = UUID.randomUUID().toString();
		ResetPasswordToken token = new ResetPasswordToken(newToken, user);

		resetPasswordTokenRepository.save(token);
	}

	@Override
	public void resetPassword(String token, String newPassword) {
		
		// get token
		ResetPasswordToken resetPasswordToken = resetPasswordTokenRepository.findByToken(token);

		// change password
		User user = resetPasswordToken.getUser();
		user.setPassword(passwordEncoder.encode(newPassword));
		repository.save(user);

		// remove Reset Password
		resetPasswordTokenRepository.deleteById(resetPasswordToken.getId());
	}
	
	@Override
	public void createNewRegistrationUserToken(User user) {

		// create new token for confirm Registration
		final String newToken = UUID.randomUUID().toString();
		RegistrationUserToken token = new RegistrationUserToken(newToken, user);

		registrationUserTokenRepository.save(token);
	}

	@Override
	public void activeUser(String token) {
		// get token
		RegistrationUserToken registrationUserToken = registrationUserTokenRepository.findByToken(token);

		// active user
		User user = registrationUserToken.getUser();
		user.setStatus(UserStatus.ACTIVE);
		repository.save(user);

		// remove Registration User Token
		registrationUserTokenRepository.deleteById(registrationUserToken.getId());
	}

	@Override
	public void sendConfirmUserRegistrationViaEmail(String email) {
		eventPublisher.publishEvent(new OnSendRegistrationUserConfirmViaEmailEvent(email));
	}
}
