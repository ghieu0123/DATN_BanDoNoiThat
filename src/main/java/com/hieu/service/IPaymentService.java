package com.hieu.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hieu.entity.Payment;
import com.hieu.entity.User;

public interface IPaymentService {
	public Page<Payment> getAllPayment(Pageable pageable);
	
	public Page<Payment> getAllPaymentByUser(User user, Pageable pageable);
	
	public void CreatePayment(Integer shopOrderId);
}
