package com.hieu.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.hieu.entity.ShopOrder;
import com.hieu.entity.ShopOrderStatus;
import com.hieu.entity.User;

public interface IShopOrderRepository extends JpaRepository<ShopOrder, Integer>, JpaSpecificationExecutor<ShopOrder>{
	public Page<ShopOrder> findByUserAndOrderStatus(User user, ShopOrderStatus orderStatus, Pageable pageable);
	
	public Page<ShopOrder> findByUser(User user, Pageable pageable);
}
