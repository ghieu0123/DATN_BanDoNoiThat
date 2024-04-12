package com.hieu.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hieu.entity.ShopOrder;
import com.hieu.entity.User;
import com.hieu.form.shoporder.CreatingShopOrderForm;
import com.hieu.form.shoporder.UpdatingShopOrderForm;
  

public interface IShopOrderService {
	public Page<ShopOrder> getAllShopOrders(Pageable pageable);
	
	public Page<ShopOrder> getAllShopOrdersByUser(User user, Pageable pageable);

	public ShopOrder getShopOrderByID(Integer id);

	public boolean isShopOrderExistsByID(Integer id);

	public void createShopOrderByCart(Integer shoppingCartId, CreatingShopOrderForm form);
	
	public void createShopOrderByProduct(User user, Integer prouductId, int quantity, CreatingShopOrderForm form);

	public void updateShopOrder(User user, Integer id, UpdatingShopOrderForm form);

	public void deleteShopOrder(List<Integer> ids);
	
	public void deleteShopOrder(Integer id);
}
