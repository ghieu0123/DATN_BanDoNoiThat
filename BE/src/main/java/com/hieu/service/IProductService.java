package com.hieu.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hieu.entity.Product;
import com.hieu.form.product.CreatingProductForm;
import com.hieu.form.product.ProductFilterForm;
import com.hieu.form.product.UpdatingProductForm;

public interface IProductService {
	public Page<Product> getAllProducts(Pageable pageable, String search, String category, ProductFilterForm filter);

	public Product getProductByID(Integer id);

	public boolean isProductExistsByName(String name);

	public boolean isProductExistsByID(Integer id);

	public void createProduct(CreatingProductForm form);

	public void updateProduct(Integer id, UpdatingProductForm form);

	public void deleteProduct(List<Integer> ids);
}
