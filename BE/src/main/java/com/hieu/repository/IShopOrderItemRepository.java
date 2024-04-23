package com.hieu.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import com.hieu.entity.ShopOrderItem;

public interface IShopOrderItemRepository extends JpaRepository<ShopOrderItem, Integer>, JpaSpecificationExecutor<ShopOrderItem>{

}
