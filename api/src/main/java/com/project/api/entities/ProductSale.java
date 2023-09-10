package com.project.api.entities;
// Generated Jul 25, 2023, 8:08:56 PM by Hibernate Tools 4.3.6.Final

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.Date;
import java.util.HashSet;
import java.util.Set;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import static javax.persistence.GenerationType.IDENTITY;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;

/**
 * ProductSale generated by hbm2java
 */

@Getter
@Setter
@Entity
@Table(name = "ProductSale")
public class ProductSale implements Serializable {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "product_sale_id", unique = true, nullable = false)
	private Integer productSaleId;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_sale_type_id", nullable = false)
	private ProductSaleType productSaleType;

	@Column(name = "sale_name", nullable = false)
	private String saleName;

	@Column(name = "discount", nullable = false)
	private int discount;

	@Column(name = "description")
	private String description;

	@Column(name = "active")
	private boolean active;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "started_at", length = 23)
	private Date startedAt;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "expired_at", length = 23)
	private Date expiredAt;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "productSale")
	private Set<Product> products = new HashSet<Product>(0);

	public ProductSale() {
	}

	public ProductSale(ProductSaleType productSaleType, int discount, boolean active, Date startedAt, Date expiredAt) {
		this.productSaleType = productSaleType;
		this.discount = discount;
		this.active = active;
		this.startedAt = startedAt;
		this.expiredAt = expiredAt;
	}

	public ProductSale(ProductSaleType productSaleType, int discount, boolean active, String description, Date startedAt,
			Date expiredAt, Set<Product> products) {
		this.productSaleType = productSaleType;
		this.discount = discount;
		this.active = active;
		this.description = description;
		this.startedAt = startedAt;
		this.expiredAt = expiredAt;
		this.products = products;
	}

}
