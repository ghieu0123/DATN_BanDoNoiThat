package com.hieu.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.hieu.entity.Type;
import com.hieu.form.type.CreatingTypeForm;
import com.hieu.form.type.UpdatingTypeForm;

public interface ITypeService {
	public Page<Type> getAllTypes(Pageable pageable);

	public void createType(CreatingTypeForm form);

	public void updateType(Integer id, UpdatingTypeForm form);

	public void deleteType(List<Integer> ids);

	public boolean isTypeExistsByTypeName(String typeName);

	public boolean isTypeExistsByID(Integer id);
	
	public Type findByTypeName(String typeName);
}
