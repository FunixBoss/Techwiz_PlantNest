package com.project.api.services;


import com.project.api.dtos.*;
import com.project.api.entities.Product;
import com.project.api.entities.ProductSale;
import com.project.api.entities.ProductSize;

import java.math.BigDecimal;
import java.util.List;

public interface ProductService {

    ProductDetailDTO findById(Integer productId);
    List<ProductFindAllDTO> findAllDTO();
    Product save(Product product);
    Boolean update(Product product);
    Boolean updateNewStatus(List<Product> products, boolean new_);
    Boolean updateTopStatus(List<Product> products, boolean top);
    Boolean updateActiveStatus(List<Product> products, boolean active);
    Boolean updateProductSale(List<Product> products, ProductSale productSale);
    Boolean updateStatuses(List<Product> products, boolean new_, boolean top, boolean active, ProductSale productSale);
    Boolean delete(Integer productId);
    Boolean delete(List<Product> products);
    Boolean existById(Integer productId);
    List<ProductFindAllDTO> findByNameKeyword(String keyword);
    List<ProductSizeDTO> findSizesByProductId(Integer productId);
    BigDecimal findPrice(Integer productId, ProductSize productSize);
    Integer findMaxQuantity(Integer productId, ProductSize productSize, BigDecimal price);
    List<ProductReviewDTO> findProductReviews(Integer productId);
    Integer countTotalComments(Integer productId);

}
