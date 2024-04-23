package com.hieu.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import com.hieu.entity.ShoppingCart;
import com.hieu.entity.User;

public interface IShoppingCartRepository extends JpaRepository<ShoppingCart, Integer>, JpaSpecificationExecutor<ShoppingCart> {
	@Query("SELECT c FROM ShoppingCart c WHERE c.user.id = :userId AND c.createdDate = (SELECT MAX(c2.createdDate) FROM ShoppingCart c2 WHERE c2.user.id = :userId)")
	public Optional<ShoppingCart> findShoppingCartByUserId(Integer userId);
	
	public List<ShoppingCart> findShoppingCartByUser(User user);
}
