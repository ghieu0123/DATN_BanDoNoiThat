package com.hieu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.hieu.entity.ShoppingCartItem;

public interface IShoppingCartItemRepository extends JpaRepository<ShoppingCartItem, Integer>, JpaSpecificationExecutor<ShoppingCartItem>{

}
