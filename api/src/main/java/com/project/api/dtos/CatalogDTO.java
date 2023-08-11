package com.project.api.dtos;

import com.project.api.entities.Catalog;
import lombok.Data;

import java.util.List;

@Data
public class CatalogDTO {
    private Integer catalogId;
    private String catalogName;
    private String description;
    private ImageDTO image;
    private List<CatalogDTO> childCatalogs;
    private boolean hasParent;
    private CatalogDTO parentCatalog;

    public CatalogDTO () {

    }
    public CatalogDTO(Catalog catalog) {
        this.catalogId = catalog.getCatalogId();
        this.catalogName = catalog.getCatalogName();
        this.description = catalog.getDescription();
        this.image = new ImageDTO(catalog.getImage());
        this.hasParent = catalog.getParentCatalog() != null;
        this.childCatalogs = catalog.getChildCatalogs().stream()
                .map(CatalogDTO::new)
                .toList();
    }


}