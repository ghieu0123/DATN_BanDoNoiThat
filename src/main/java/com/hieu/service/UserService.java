package com.hieu.service;

import java.util.List;

import javax.persistence.EntityNotFoundException;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hieu.entity.Role;
import com.hieu.entity.User;
import com.hieu.entity.UserStatus;
import com.hieu.form.user.CreatingUserForm;
import com.hieu.form.user.UpdatingUserByAdminForm;
import com.hieu.form.user.UpdatingUserForm;
import com.hieu.form.user.UserFilterForm;
import com.hieu.repository.IUserRepository;
import com.hieu.specification.user.UserSpecification;

@Service
public class UserService implements IUserService{
	@Autowired
	private IUserRepository repository;

	@Autowired
	private ModelMapper modelMapper;

//	@Autowired
//	private PasswordEncoder passwordEncoder;

	@Autowired
	private ApplicationEventPublisher eventPublisher;

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
		return repository.findByUsername(username);
	}

	@Override
	public User findUserByEmail(String email) {
		return repository.findByEmail(email);
	}
	
//	@Override
//	public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
//		// Check user exists by username
//		User user = repository.findByUsername(username);
//
//		if (user == null) {
//			throw new UsernameNotFoundException(username);
//		}
//		
//		List<GrantedAuthority> authorities = new ArrayList<>();
//		authorities.add(new SimpleGrantedAuthority(user.getRole().name()));
//
//		return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(),authorities);
//	}
	


	@Override
	public void Register(User user) {
		// encode password
//		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setPassword(user.getPassword());
		user.setRole(Role.USER);

		// create user
		repository.save(user);

		// create new user registration token
//		createNewRegistrationUserToken(user);

		// send email to confirm
//		sendConfirmUserRegistrationViaEmail(user.getEmail());
	}
	
	
	@Override
	public void createUser(CreatingUserForm form) {
		
		User user = form.toEntity();
		
		// encode password
//		user.setPassword(passwordEncoder.encode(user.getPassword()));
		user.setStatus(UserStatus.ACTIVE);
		user.setRole(Role.USER);
		
		// create user
		repository.save(user);
	}
	
	@Override
	public boolean existsUserByUsername(String userName) {
		return repository.existsByUsername(userName);
	}
	
	@Transactional
	public void deleteUsers(List<Integer> ids) {
		repository.deleteByIdIn(ids);
	}
	
//	private void createNewRegistrationUserToken(User user) {
//
//		// create new token for confirm Registration
//		final String newToken = UUID.randomUUID().toString();
//		RegistrationUserToken token = new RegistrationUserToken(newToken, user);
//
//		registrationUserTokenRepository.save(token);
//	}

//	@Override
//	public void activeUser(String token) {
//		// get token
//		RegistrationUserToken registrationUserToken = registrationUserTokenRepository.findByToken(token);
//
//		// active user
//		User user = registrationUserToken.getUser();
//		user.setStatus(UserStatus.ACTIVE);
//		repository.save(user);
//
//		// remove Registration User Token
//		registrationUserTokenRepository.deleteById(registrationUserToken.getId());
//	}

//	@Override
//	public void sendConfirmUserRegistrationViaEmail(String email) {
//		eventPublisher.publishEvent(new OnSendRegistrationUserConfirmViaEmailEvent(email));
//	}
}
