package com.project.api.dtos;

import com.project.api.entities.ProductSize;
import com.project.api.entities.ProductVariant;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ProductSizeDTO {
    private Integer productSizeId;
    private String sizeName;

    public ProductSizeDTO() {}

    public ProductSizeDTO(ProductSize productSize) {
        this.productSizeId = productSize.getProductSizeId();
        this.sizeName = productSize.getSizeName();
    }
}