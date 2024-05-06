package com.hieu.service;

import java.util.ArrayList;
import java.util.List;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.hieu.entity.Payment;
import com.hieu.entity.Product;
import com.hieu.entity.Role;
import com.hieu.entity.ShopOrder;
import com.hieu.entity.ShopOrderItem;
import com.hieu.entity.ShopOrderStatus;
import com.hieu.entity.ShoppingCart;
import com.hieu.entity.ShoppingCartItem;
import com.hieu.entity.User;
import com.hieu.form.shoporder.CreatingShopOrderForm;
import com.hieu.form.shoporder.UpdatingShopOrderForm;
import com.hieu.form.user.UserFilterForm;
import com.hieu.repository.IPaymentRepository;
import com.hieu.repository.IProductRepository;
import com.hieu.repository.IShopOrderItemRepository;
import com.hieu.repository.IShopOrderRepository;
import com.hieu.repository.IShoppingCartRepository;
import com.hieu.specification.shoporder.ShopOrderSpecification;
import com.hieu.specification.user.UserSpecification;

@Service
public class ShopOrderService implements IShopOrderService {

	@Autowired
	private IShopOrderRepository repository;

	@Autowired
	private IShoppingCartRepository shoppingCartRepository;

	@Autowired
	private IShopOrderItemRepository shopOrderItemRepository;

	@Autowired
	private IPaymentRepository paymentRepository;

	@Autowired
	private IProductRepository productRepository;

	@Autowired
	private ModelMapper modelMapper;

	@Override
	public Page<ShopOrder> getAllShopOrders(String filter, Pageable pageable) {
		if (filter != null) {
//			ShopOrderStatus status = ShopOrderStatus.valueOf(filter.toUpperCase());
			Specification<ShopOrder> where = ShopOrderSpecification.buildWhere(filter);
			return repository.findAll(where, pageable);
		}
		return repository.findAll(pageable);
	}

	public Page<ShopOrder> getAllShopOrdersByUser(User user, String filter, Pageable pageable) {
		if (filter != null) {
			ShopOrderStatus orderStatus = ShopOrderStatus.valueOf(filter.toUpperCase());
			return repository.findByUserAndOrderStatus(user, orderStatus, pageable);
		}
		return repository.findByUser(user, pageable);
	}

	@Override
	public ShopOrder getShopOrderByID(Integer id) {
		return repository.findById(id).get();
	}

	@Override
	public boolean isShopOrderExistsByID(Integer id) {
		return repository.existsById(id);
	}

	@Override
	@Transactional
	public Integer createShopOrderByCart(Integer shoppingCartId, CreatingShopOrderForm form) {
		ShopOrder orderEntity = new ShopOrder();
		ShopOrder orderForm = modelMapper.map(form, ShopOrder.class);
		ShoppingCart myCart = shoppingCartRepository.findById(shoppingCartId).get();
		// Gán OrderStatus cho Entity
		orderEntity.setOrderStatus(orderForm.getOrderStatus());

		// Lấy ra list product từ giỏ hàng
		List<ShoppingCartItem> cartItems = myCart.getShoppingCartItems();

		// Khởi tạo Price tạm cho Enity và set các thuộc tính khác để Save()
		orderEntity.setTotalPrice(0);
		orderEntity.setUser(myCart.getUser());
		orderEntity.setAddressShipping(myCart.getUser().getAddress());
		// Save Entity lại và gán cho Entity ban đầu
		orderEntity = repository.save(orderEntity);

		Integer totalPrice = 0;
		// Tạo list order item từ product vừa lấy
		List<ShopOrderItem> orderItems = new ArrayList<>();

		// Khởi tạo và tính total price cho đơn hàng
		// KHởi tạo List các OrderItem và lưu lại
		for (ShoppingCartItem item : cartItems) {
			ShopOrderItem newOrderItems = new ShopOrderItem(item.getQuantity(), item.getProduct(), orderEntity);
			orderItems.add(newOrderItems);
			totalPrice += item.getQuantity() * item.getProduct().getPrice();
			shopOrderItemRepository.save(newOrderItems);
		}

		// Gán nốt các thuộc tính còn thiếu cho Entity
		orderEntity.setShopOrderItems(orderItems);
		orderEntity.setTotalPrice(totalPrice);

		// Tạo payment mới cho đơn hàng nếu đã thanh toán
		if (form.getOrderStatus().equals("PAY")) {
			Payment newPayment = new Payment(myCart.getUser(), orderEntity);
			paymentRepository.save(newPayment);
		}
		// Lưu lại Enity sau khi đã Set các thuộc tính
		repository.save(orderEntity);
		return orderEntity.getId();
	}

	@Override
	public Integer createShopOrderByProduct(User user, Integer prouductId, int quantity, CreatingShopOrderForm form) {
		ShopOrder orderEntity = new ShopOrder();
		ShopOrder orderForm = modelMapper.map(form, ShopOrder.class);
		orderEntity.setOrderStatus(orderForm.getOrderStatus());

		Product productEnitity = productRepository.findById(prouductId).get();

		orderEntity.setTotalPrice(productEnitity.getPrice() * quantity);
		orderEntity.setUser(user);
		orderEntity.setAddressShipping(user.getAddress());

		// Save Entity lại và gán cho Entity ban đầu
		orderEntity = repository.save(orderEntity);

		// Khởi tạo OrderItem và lưu lại
		List<ShopOrderItem> orderItems = new ArrayList<>();
		ShopOrderItem OrderItem = new ShopOrderItem(quantity, productEnitity, orderEntity);
		orderItems.add(OrderItem);
		shopOrderItemRepository.save(OrderItem);

		orderEntity.setShopOrderItems(orderItems);

		// Tạo payment mới cho đơn hàng nếu đã thanh toán
		if (form.getOrderStatus().equals("PAY")) {
			Payment newPayment = new Payment(user, orderEntity);
			paymentRepository.save(newPayment);
		}
		// Lưu lại Enity sau khi đã Set các thuộc tính
		repository.save(orderEntity);
		return orderEntity.getId();
	}

	@Override
	public void updateShopOrder(User user, Integer id, UpdatingShopOrderForm form) {
		// TODO Auto-generated method stub

	}

	@Override
	@Transactional
	public void deleteShopOrder(List<Integer> ids) {
		repository.deleteByIdIn(ids);
	}

	@Override
	@Transactional
	public void deleteShopOrder(Integer id) {
		repository.deleteById(id);
	}

	@Override
	public Long getTotalPrice() {
	    List<ShopOrder> orders = repository.findAllByOrderStatus(ShopOrderStatus.PAY);
	    Long total = 0L;
	    for(ShopOrder order: orders) {
	        total += order.getTotalPrice();
	    }
	    return total;
	}


}
