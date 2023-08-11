package com.project.api.entities;
// Generated Jul 25, 2023, 8:08:56 PM by Hibernate Tools 4.3.6.Final

import lombok.Data;

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
 * CartDetail generated by hbm2java
 */
@Data
@Entity
@Table(name = "CartDetail")
public class CartDetail implements java.io.Serializable {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "cart_detail_id", unique = true, nullable = false)
	private Integer cartDetailId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "cart_id", nullable = false)
	private Cart cart;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_id", nullable = false)
	private Product product;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_variant_id")
	private ProductVariant productVariant;

	@Column(name = "quantity", nullable = false)
	private int quantity;

	public CartDetail() {
	}

	public CartDetail(Cart cart, Product product, int quantity) {
		this.cart = cart;
		this.product = product;
		this.quantity = quantity;
	}

	public CartDetail(Product product, ProductVariant productVariant, int quantity) {
		this.product = product;
		this.productVariant = productVariant;
		this.quantity = quantity;
	}

	public CartDetail(Cart cart, Product product, ProductVariant productVariant, int quantity) {
		this.cart = cart;
		this.product = product;
		this.productVariant = productVariant;
		this.quantity = quantity;
	}

	@Override
	public int hashCode() {
		return Objects.hash(cartDetailId);
	}
}
