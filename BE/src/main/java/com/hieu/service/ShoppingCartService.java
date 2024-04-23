package com.hieu.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hieu.entity.Product;
import com.hieu.entity.ShoppingCart;
import com.hieu.entity.ShoppingCartItem;
import com.hieu.entity.User;
import com.hieu.repository.IProductRepository;
import com.hieu.repository.IShoppingCartItemRepository;
import com.hieu.repository.IShoppingCartRepository;

@Service
public class ShoppingCartService implements IShoppingCartService {
	@Autowired
	private IShoppingCartRepository repository;

	@Autowired
	private IShoppingCartItemRepository shoppingCartItemRepository;

	@Autowired
	private IProductRepository productRepository;

	@Override
	public ShoppingCart getCartByDate(User user) {
		return repository.findShoppingCartByUserId(user.getId()).get();
	}

//	@Override
//	public ShoppingCart getCartByDate(User user) {
//		List<ShoppingCart> carts = repository.findShoppingCartByUser(user);
//		Date date = carts.get(0).getCreatedDate();
//		ShoppingCart cartEntity = carts.get(0);
//		for(ShoppingCart cart: carts) {
//			if(cart.getCreatedDate().compareTo(date) >= 0) {
//				cartEntity = cart;
//			}
//		}
//		return cartEntity;
//	}

	@Override
	public void createShoppingCart(User user, Integer productId) {
		ShoppingCart shoppingCartEntity = new ShoppingCart();
		shoppingCartEntity.setUser(user);
		shoppingCartEntity = repository.save(shoppingCartEntity);
		Product product = productRepository.findById(productId).orElse(null);

		List<ShoppingCartItem> cartItems = new ArrayList<ShoppingCartItem>();
		ShoppingCartItem cartItem = new ShoppingCartItem(1, product, shoppingCartEntity);
		shoppingCartItemRepository.save(cartItem);
		cartItems.add(cartItem);

		shoppingCartEntity.setShoppingCartItems(cartItems);
		repository.save(shoppingCartEntity);
	}

	@Override
	public void increaseProductQuantityInCart(Integer shoppingCartId, Integer productId) {
		ShoppingCart shoppingCart = repository.findById(shoppingCartId).orElse(null);
		if (shoppingCart != null) {
			List<ShoppingCartItem> cartItems = shoppingCart.getShoppingCartItems();
			for (ShoppingCartItem item : cartItems) {
				if (item.getProduct().getId() == productId) {
					item.setQuantity(item.getQuantity() + 1);
					shoppingCartItemRepository.save(item);
					break;
				}
			}
			shoppingCart.setShoppingCartItems(cartItems);
			repository.save(shoppingCart);
		}
	}

	@Override
	public void decreaseProductQuantityInCart(Integer shoppingCartId, Integer productId) {
		ShoppingCart shoppingCart = repository.findById(shoppingCartId).orElse(null);
		if (shoppingCart != null) {
			List<ShoppingCartItem> cartItems = shoppingCart.getShoppingCartItems();
			for (ShoppingCartItem item : cartItems) {
				if (item.getProduct().getId() == productId) {
					if (item.getQuantity() > 1) {
						item.setQuantity(item.getQuantity() - 1);
						shoppingCartItemRepository.save(item);
						break;
					}
					break;
				}
			}
			shoppingCart.setShoppingCartItems(cartItems);
			repository.save(shoppingCart);
		}
	}

	@Override
	public void addProductToShoppingCart(Integer shoppingCartId, Integer productId) {
		ShoppingCart shoppingCart = repository.findById(shoppingCartId).orElse(null);
		Product product = productRepository.findById(productId).orElse(null);
		
		boolean isAvaliable = false;
		for(ShoppingCartItem item: shoppingCart.getShoppingCartItems()) {
			if(item.getProduct() == product) {
				isAvaliable = true;
			}
		}
		
		if (shoppingCart != null && product != null) {
			if(!isAvaliable) {
				List<ShoppingCartItem> cartItems = shoppingCart.getShoppingCartItems();
				ShoppingCartItem cartItem = new ShoppingCartItem(1, product, shoppingCart);
				cartItems.add(cartItem);
				shoppingCart.setShoppingCartItems(cartItems);
				shoppingCartItemRepository.save(cartItem);
				repository.save(shoppingCart);
			} else {
				increaseProductQuantityInCart(shoppingCart.getId(), product.getId());
			}
		}
	}
	
	public void deleteProductFromCart(Integer shoppingCartId, Integer productId) {
		ShoppingCart shoppingCart = repository.findById(shoppingCartId).orElse(null);
		Product product = productRepository.findById(productId).orElse(null);
		
		List<ShoppingCartItem> cartItems = new ArrayList<ShoppingCartItem>();
		for(ShoppingCartItem item: shoppingCart.getShoppingCartItems()) {
			if(item.getProduct().getId() != product.getId()) {
				cartItems.add(item); 
			} else {
				shoppingCartItemRepository.delete(item);
			}
		}
		shoppingCart.setShoppingCartItems(cartItems);
		repository.save(shoppingCart);
	}
	
	public void deleteShoppingCart(Integer cartId) {
		repository.deleteById(cartId);
	}

}
