package com.project.api.entities;
// Generated Jul 25, 2023, 8:08:56 PM by Hibernate Tools 4.3.6.Final

import lombok.Data;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

/**
 * OrderDetail generated by hbm2java
 */

@Data
@Entity
@Table(name = "OrderDetail")
public class OrderDetail implements Serializable {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "order_detail_id", unique = true, nullable = false)
	private Integer orderDetailId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "order_id", nullable = false)
	private Order order;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id")
	private Product product;

	@Column(name = "product_name")
	private String productName;

	@Column(name = "quantity", nullable = false)
	private int quantity;

	@Column(name = "size")
	private String size;

	@Column(name = "price", nullable = false, precision = 18)
	private BigDecimal price;

	public OrderDetail() {
	}

	public OrderDetail(Order order, Product product, int quantity, BigDecimal price) {
		this.order = order;
		this.product = product;
		this.quantity = quantity;
		this.price = price;
	}

	public OrderDetail(Order order, Product product, String productName, int quantity,
			String size, BigDecimal price) {
		this.order = order;
		this.product = product;
		this.productName = productName;
		this.quantity = quantity;
		this.size = size;
		this.price = price;
	}

	@Override
	public int hashCode() {
		return Objects.hash(orderDetailId);
	}



}
