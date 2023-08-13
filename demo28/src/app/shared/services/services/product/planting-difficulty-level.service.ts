import { Injectable } from '@angular/core';
import { BaseURLService } from '../base-url.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs-compat';
import { GetPlantDifficultyLevelResponse } from 'src/app/shared/models/product/planting-difficulty-level.model';
import { Catalog } from 'src/app/shared/models/product/catalog.model';

@Injectable({
  providedIn: 'root'
})
export class PlantingDifficultyLevelService {
  constructor(
    private baseUrlService: BaseURLService,
    private httpClient: HttpClient
  ) { }

  findAll(): Observable<GetPlantDifficultyLevelResponse> {
    const url: string = `${this.baseUrlService.baseURL}/planting-difficulty-levels`
    return this.httpClient.get<GetPlantDifficultyLevelResponse>(url)
  }
}
