package com.hieu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import com.hieu.entity.User;

public interface IUserRepository extends JpaRepository<User, Integer>, JpaSpecificationExecutor<User>{
	
	public boolean existsByUsername(String username);
	
	public boolean existsByEmail(String email);
	
	public User findByUsername(String username);
	
	public User findByEmail(String email);
	
	public void deleteByIdIn(List<Integer> ids);	
}
