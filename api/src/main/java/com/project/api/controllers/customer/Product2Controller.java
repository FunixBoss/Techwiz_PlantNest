package com.project.api.controllers.customer;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.project.api.dtos.*;
import com.project.api.entities.ProductSize;
import com.project.api.services.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("api/products")
public class Product2Controller {

    @Autowired
    private ProductService productService;

    @GetMapping("{productId}")
    public ResponseEntity<ProductDetailDTO> findById(@PathVariable Integer productId) {
        try {
            return new ResponseEntity<>(this.productService.findById(productId), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("find10SaleProduct")
    public ResponseEntity<List<ProductFindAllDTO>> find10SaleProduct() {
        try {
            return new ResponseEntity<>(productService.findTop10SaleProducts(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("findTop10Product")
    public ResponseEntity<List<ProductFindAllDTO>> findTop10Product() {
        try {
            return new ResponseEntity<>(productService.findTop10Products(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("{productId}/productReviews")
    public ResponseEntity<List<ProductReviewDTO>> findProductReviews(@PathVariable Integer productId) {
        try {
            return new ResponseEntity<>(this.productService.findProductReviews(productId), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("findAll")
    public ResponseEntity<List<ProductFindAllDTO>> findAll() {
        try {
            return new ResponseEntity<>(productService.findAllDTO(), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("isExist")
    public ResponseEntity<Boolean> isExist(@RequestParam Integer productId) {
        try {
            return new ResponseEntity<>(productService.existById(productId), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(false, HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("findByNameKeyword")
    public ResponseEntity<List<ProductFindAllDTO>> findByNameKeyword(@RequestParam String keyword) {
        try {
            return new ResponseEntity<>(productService.findByNameKeyword(keyword), HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{productId}/sizes")
    public ResponseEntity<List<ProductSizeDTO>> findSizesByProductId(@PathVariable Integer productId) {
        try {
            return new ResponseEntity<>(productService.findSizesByProductId(productId), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("/{productId}/variants")
    public ResponseEntity<List<ProductVariantDTO>> findVariantsByProductId(@PathVariable Integer productId) {
        try {
            return new ResponseEntity<>(productService.findVariantsByProductId(productId), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("findPrice")
    public ResponseEntity<BigDecimal> findPrice(
            @RequestParam Integer productId,
            @RequestParam String sizeJson) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            ProductSize productSize = mapper.readValue(sizeJson, ProductSize.class);
            return new ResponseEntity<>(productService.findPrice(productId, productSize), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("findMaxQuantity")
    public ResponseEntity<BigDecimal> findMaxQuantity(
            @RequestParam Integer productId,
            @RequestParam String sizeJson,
            @RequestParam String price) {
        try {
            ObjectMapper mapper = new ObjectMapper();
            ProductSize productSize = mapper.readValue(sizeJson, ProductSize.class);
            BigDecimal productPrice = mapper.readValue(price, BigDecimal.class);
            return new ResponseEntity<>(productService.findPrice(productId, productSize), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("{productId}/countComments")
    public ResponseEntity<Integer> countComments(@PathVariable Integer productId) {
        try {
            return new ResponseEntity<>(productService.countTotalComments(productId), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }

    @GetMapping("count")
    public ResponseEntity<Long> count() {
        try {
            return new ResponseEntity<>(productService.count(), HttpStatus.OK);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
    }
}
