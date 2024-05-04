package com.hieu.specification.shoporder;

import org.springframework.data.jpa.domain.Specification;
import org.springframework.util.StringUtils;

import com.hieu.entity.ShopOrder;

import jakarta.persistence.criteria.CriteriaBuilder;
import jakarta.persistence.criteria.CriteriaQuery;
import jakarta.persistence.criteria.Predicate;
import jakarta.persistence.criteria.Root;
import lombok.NonNull;
import lombok.RequiredArgsConstructor;

public class ShopOrderSpecification {

	@SuppressWarnings("deprecation")
	public static Specification<ShopOrder> buildWhere(String filter) {
		
		//khởi tạo where
		Specification<ShopOrder> where = null;
		
		CustomSpecification init = new CustomSpecification("init", "init");
		where = Specification.where(init);
		//Search
		if (!StringUtils.isEmpty(filter)) {
			filter = filter.trim();
			CustomSpecification orderStatus = new CustomSpecification("orderStatus", filter);
			where = where.and(orderStatus);
		}

		return where;
	}
}

@RequiredArgsConstructor
class CustomSpecification implements Specification<ShopOrder>{
	
	private static final long serialVersionUID = 1L;
	@NonNull
	private String field;
	@NonNull
	private Object value;
	@Override
	public Predicate toPredicate(
			Root<ShopOrder> root, 
			CriteriaQuery<?> query, 
			CriteriaBuilder criteriaBuilder) {
		
		if(field.equalsIgnoreCase("init")) {
			return criteriaBuilder.equal(criteriaBuilder.literal(1), 1);
		}
		if (field.equalsIgnoreCase("orderStatus")) {
			return criteriaBuilder.equal(root.get("orderStatus"), value);
		}
		return null;
	}
	
	
}