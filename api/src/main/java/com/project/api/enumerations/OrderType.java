package com.project.api.enumerations;

public enum OrderType {
    DEFAULT("default"),
    MOST_RATED("most-rated"),
    BEST_SELLER("best-seller"),
    PRICE("price"),
    TOP("top"),
    SALE("sale");
    private final String value;

    OrderType(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }
}
