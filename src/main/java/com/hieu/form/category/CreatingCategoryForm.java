package com.hieu.form.category;

import javax.validation.constraints.NotBlank;

import com.hieu.entity.Category;
import com.hieu.validation.category.CategoryIDExists;

import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class CreatingCategoryForm {
	@NotBlank(message = "The Category Name mustn't be null value")
	@CategoryIDExists
	private String categoryName;
	
	public Category toEntity() {
		return new Category(categoryName);
	}
}
