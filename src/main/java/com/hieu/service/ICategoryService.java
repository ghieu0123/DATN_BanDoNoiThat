package com.hieu.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hieu.entity.Category;
import com.hieu.form.category.CreatingCategoryForm;
import com.hieu.form.category.UpdatingCategoryForm;

public interface ICategoryService {
	
	public Category findByCategoryName (String categoryName);
	
	public Page<Category> getAllCategorys(Pageable pageable);
	
	public void createCategory(CreatingCategoryForm form);
	
	public void updateCategory(Integer id, UpdatingCategoryForm form);
	
	public void deleteCategory(List<Integer> ids);
	
	public boolean isCategoryExistsByCategoryName(String categoryName);
	
	public boolean isCategoryExistsByID(Integer id);
}
