package com.project.api.dtos;

import com.project.api.entities.*;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Date;

@Data
public class ProductFindAllDTO {
    private Integer productId;
    private String productName;

    private CatalogDTO catalog;
    private ProductSaleDTO productSale;
    private PlantingDifficultyLevelDTO plantingDifficultyLevel;

    private String imageUrl;
    private Boolean active;
    private Boolean sale;
    private Boolean top;
    private Boolean new_;
    private Date createdAt;
    private Date updatedAt;
    private Integer totalSold;
    private Integer totalLikes;
    private Integer totalRating;
    private Double avgRating;
    private BigDecimal minPrice;
    private BigDecimal maxPrice;

    public ProductFindAllDTO(Product product) {
        this.productId = product.getProductId();
        this.productName = product.getProductName();
        if(product.getCatalog() != null ) {
            this.catalog = new CatalogDTO(product.getCatalog());
        }
        if(product.getProductSale() != null) {
            this.productSale = new ProductSaleDTO(product.getProductSale());
        }
        if(product.getPlantingDifficultyLevel() != null) {
            this.plantingDifficultyLevel = new PlantingDifficultyLevelDTO(product.getPlantingDifficultyLevel());
        }
        this.imageUrl = product.getImages().iterator().next().getImageUrl();
        this.active = product.getActive();
        this.sale = product.getSale();
        this.top = product.getTop();
        this.new_ = product.getNew_();
        this.createdAt = product.getCreatedAt();
        this.updatedAt = product.getUpdatedAt();
    }
}
