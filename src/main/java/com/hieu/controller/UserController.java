package com.hieu.controller;

import java.util.List;

import org.modelmapper.ModelMapper;
import org.modelmapper.TypeToken;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.hieu.dto.UserDTO;
import com.hieu.entity.User;
import com.hieu.form.user.CreatingUserForm;
import com.hieu.form.user.UpdatingUserByAdminForm;
import com.hieu.form.user.UpdatingUserForm;
import com.hieu.form.user.UserFilterForm;
import com.hieu.service.IUserService;
import com.hieu.validation.user.UserIDExists;

@Validated
@RestController
@CrossOrigin("*")
@RequestMapping(value = "api/v1/users")
public class UserController {
	@Autowired
	private IUserService service;
	
	@Autowired
	private ModelMapper modelMapper;
	
	@GetMapping()
	public ResponseEntity<?> getAllUsers(
			@PageableDefault(sort = {"id"}, direction = Sort.Direction.ASC) 
			Pageable pageable,
			@RequestParam(value = "search", required = false) String search,
			@RequestBody(required = false) UserFilterForm filter){
			
		Page<User> entityPages = service.getAllUsers(pageable, search, filter);
		
		List<UserDTO> dtos = modelMapper.map(entityPages.getContent(), new TypeToken<List<UserDTO>>() {
		}.getType());
			
		Page<UserDTO> dtoPage = new PageImpl<>(dtos, pageable, entityPages.getTotalElements());
		
		return new ResponseEntity<>(dtoPage, HttpStatus.OK);
	}
			
	
	@GetMapping(value = "/{id}")
	public ResponseEntity<?> getUserByID(@PathVariable(name = "id") @UserIDExists Integer id){
		
		User entity = service.getUserByID(id);
		
		UserDTO dto = modelMapper.map(entity, UserDTO.class);
		
		return new ResponseEntity<>(dto, HttpStatus.OK);
	}
	
	@GetMapping(value = "/id/{id}")
	public ResponseEntity<?> existsByID(@PathVariable(name = "id") Integer id) {
		boolean result = service.isUserExistsByID(id);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@GetMapping(value = "/username/{username}")
	public ResponseEntity<?> existsByUsername(@PathVariable(name = "username") String username) {
		boolean result = service.isUserExistsByUsername(username);
		return new ResponseEntity<>(result, HttpStatus.OK);
	}
	
	@PostMapping()
	public ResponseEntity<?> userRegister(@RequestBody CreatingUserForm form) {
		service.createUser(form);
		return new ResponseEntity<>("Create successfully!", HttpStatus.OK);
	}
	
	@PutMapping(value = "/{id}")
	public ResponseEntity<?> updateUser(@RequestBody UpdatingUserForm form, @PathVariable(name = "id") Integer id){
		service.updateUser(id, form);
		return new ResponseEntity<>("Update successfully!", HttpStatus.OK);
	}
	
	@PutMapping(value = "/admin/{id}")
	public ResponseEntity<?> updateUserByAdmin(@RequestBody UpdatingUserByAdminForm form, @PathVariable(name = "id") Integer id){
		service.updateUserByAdmin(id, form);
		return new ResponseEntity<>("Update successfully!", HttpStatus.OK);
	}
	
	@DeleteMapping(value = "/{ids}")
	public ResponseEntity<?> deleteUsers(@PathVariable(name = "ids") List<Integer> ids){
		service.deleteUsers(ids);
		return new ResponseEntity<>("Delete Successfully!", HttpStatus.OK);
	}
}
