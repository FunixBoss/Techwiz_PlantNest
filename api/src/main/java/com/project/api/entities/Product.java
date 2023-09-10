package com.project.api.entities;
// Generated Jul 25, 2023, 8:08:56 PM by Hibernate Tools 4.3.6.Final

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;
import java.util.*;
import javax.persistence.*;

import static javax.persistence.GenerationType.IDENTITY;

/**
 * Product generated by hbm2java
 */

@Getter
@Setter
@Entity
@Table(name = "Product")
public class Product implements Serializable {

	@Id
	@GeneratedValue(strategy = IDENTITY)
	@Column(name = "product_id", unique = true, nullable = false)
	private Integer productId;

	@Column(name = "product_name", nullable = false)
	private String productName;

	@Column(name = "slug", unique = true, nullable = false)
	private String slug;

	@Column(name = "description")
	private String description;

	@Column(name = "active")
	private Boolean active;

	@Column(name = "sale")
	private Boolean sale;

	@Column(name = "[top]")
	private Boolean top;

	@Column(name = "new")
	private Boolean new_;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "catalog_id")
	private Catalog catalog;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "planting_difficulty_level_id")
	private PlantingDifficultyLevel plantingDifficultyLevel;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "product_sale_id")
	private ProductSale productSale;

	@OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "product_id")
	private ProductCareGuide productCareGuide;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "created_at", length = 23)
	private Date createdAt;

	@ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinColumn(name = "image_size_guide_id")
	private Image imageSizeGuide;

	@Temporal(TemporalType.TIMESTAMP)
	@Column(name = "updated_at", length = 23)
	private Date updatedAt;

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "product", cascade = CascadeType.ALL, orphanRemoval = true)
	private Set<ProductVariant> productVariants = new HashSet<ProductVariant>(0);

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "product", cascade = CascadeType.REMOVE)
	private Set<CartDetail> cartDetails = new HashSet<CartDetail>(0);

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "product")
	private Set<OrderDetail> orderDetails = new HashSet<OrderDetail>(0);

	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.REMOVE)
	@JoinTable(name = "Wishlist", joinColumns = {
			@JoinColumn(name = "product_id", nullable = false, updatable = false) }, inverseJoinColumns = {
			@JoinColumn(name = "account_id", nullable = false, updatable = false) })
	private Set<Account> wishlists = new HashSet<Account>(0);

	@ManyToMany(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
	@JoinTable(name = "ProductImage", joinColumns = {
			@JoinColumn(name = "product_id", nullable = false, updatable = false) }, inverseJoinColumns = {
			@JoinColumn(name = "image_id", nullable = false, updatable = false) })
	private List<Image> images = new ArrayList<>(0);

	@OneToMany(fetch = FetchType.LAZY, mappedBy = "product", cascade = CascadeType.REMOVE)
	private Set<ProductReview> productReviews = new HashSet<ProductReview>(0);

	public Product() {
	}

	public Product(Catalog catalog, ProductSale productSale,
			String productName, String description, Boolean active, Boolean sale, Boolean top, Boolean new_,
			Date createdAt, Date updatedAt, Set<ProductVariant> productVariants, Set<CartDetail> cartDetails,
			Set<OrderDetail> orderDetails, List<Image> images, Set<ProductReview> productReviews) {
		this.catalog = catalog;
		this.productSale = productSale;
		this.productName = productName;
		this.description = description;
		this.active = active;
		this.sale = sale;
		this.top = top;
		this.new_ = new_;
		this.createdAt = createdAt;
		this.updatedAt = updatedAt;
		this.productVariants = productVariants;
		this.cartDetails = cartDetails;
		this.orderDetails = orderDetails;
		this.images = images;
		this.productReviews = productReviews;
	}

	@Override
	public int hashCode() {
		return Objects.hash(productId);
	}

	public Integer getProductId() {
		return productId;
	}

	public void setProductId(Integer productId) {
		this.productId = productId;
	}

	public String getProductName() {
		return productName;
	}

	public void setProductName(String productName) {
		this.productName = productName;
	}

	public String getSlug() {
		return slug;
	}

	public void setSlug(String slug) {
		this.slug = slug;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public Boolean getActive() {
		return active;
	}

	public void setActive(Boolean active) {
		this.active = active;
	}

	public Boolean getSale() {
		return sale;
	}

	public void setSale(Boolean sale) {
		this.sale = sale;
	}

	public Boolean getTop() {
		return top;
	}

	public void setTop(Boolean top) {
		this.top = top;
	}

	public Boolean getNew_() {
		return new_;
	}

	public void setNew_(Boolean new_) {
		this.new_ = new_;
	}

	public Catalog getCatalog() {
		return catalog;
	}

	public void setCatalog(Catalog catalog) {
		this.catalog = catalog;
	}

	public PlantingDifficultyLevel getPlantingDifficultyLevel() {
		return plantingDifficultyLevel;
	}

	public void setPlantingDifficultyLevel(PlantingDifficultyLevel plantingDifficultyLevel) {
		this.plantingDifficultyLevel = plantingDifficultyLevel;
	}

	public ProductSale getProductSale() {
		return productSale;
	}

	public void setProductSale(ProductSale productSale) {
		this.productSale = productSale;
	}

	public ProductCareGuide getProductCareGuide() {
		return productCareGuide;
	}

	public void setProductCareGuide(ProductCareGuide productCareGuide) {
		this.productCareGuide = productCareGuide;
	}

	public Date getCreatedAt() {
		return createdAt;
	}

	public void setCreatedAt(Date createdAt) {
		this.createdAt = createdAt;
	}

	public Image getImageSizeGuide() {
		return imageSizeGuide;
	}

	public void setImageSizeGuide(Image imageSizeGuide) {
		this.imageSizeGuide = imageSizeGuide;
	}

	public Date getUpdatedAt() {
		return updatedAt;
	}

	public void setUpdatedAt(Date updatedAt) {
		this.updatedAt = updatedAt;
	}

	public Set<ProductVariant> getProductVariants() {
		return productVariants;
	}

	public void setProductVariants(Set<ProductVariant> productVariants) {
		this.productVariants = productVariants;
	}

	public Set<CartDetail> getCartDetails() {
		return cartDetails;
	}

	public void setCartDetails(Set<CartDetail> cartDetails) {
		this.cartDetails = cartDetails;
	}

	public Set<OrderDetail> getOrderDetails() {
		return orderDetails;
	}

	public void setOrderDetails(Set<OrderDetail> orderDetails) {
		this.orderDetails = orderDetails;
	}

	public Set<Account> getWishlists() {
		return wishlists;
	}

	public void setWishlists(Set<Account> wishlists) {
		this.wishlists = wishlists;
	}

	public List<Image> getImages() {
		return images;
	}

	public void setImages(List<Image> images) {
		this.images = images;
	}

	public Set<ProductReview> getProductReviews() {
		return productReviews;
	}

	public void setProductReviews(Set<ProductReview> productReviews) {
		this.productReviews = productReviews;
	}
}
