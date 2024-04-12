package com.hieu.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.hieu.entity.Product;

public interface IProductRepository extends JpaRepository<Product, Integer>, JpaSpecificationExecutor<Product> {
	
	boolean existsByName(String name);
	
	Product findByName(String name);
	
	public void deleteByIdIn(List<Integer> ids);
}
