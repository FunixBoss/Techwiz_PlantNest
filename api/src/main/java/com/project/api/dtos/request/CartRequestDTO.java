package com.project.api.dtos.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class CartRequestDTO {
    private Integer accountId;
    private Integer productId;
    private Integer productVariantId;
    private Integer quantity;
}
