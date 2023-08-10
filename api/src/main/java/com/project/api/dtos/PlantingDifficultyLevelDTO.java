package com.project.api.dtos;

import com.project.api.entities.PlantingDifficultyLevel;
import lombok.Data;

import javax.persistence.Column;

@Data
public class PlantingDifficultyLevelDTO {
    private Integer plantingDifficultyLevelId;
    private String level;
    public PlantingDifficultyLevelDTO(PlantingDifficultyLevel level) {
        this.plantingDifficultyLevelId = level.getPlantingDifficultyLevelId();
        this.level = level.getLevel();

    }
}
