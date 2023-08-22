import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomValidator } from '../../../../@core/validators/custom-validator';
import { Catalog } from '../../../../@core/models/product/catalog.model';
import { ProductSale } from '../../../../@core/models/sale/product-sale.model';
import { PlantingDifficultyLevel } from '../../../../@core/models/product/planting-difficulty-level.model';
import { CatalogService } from '../../../../@core/services/product/product-catalog.service';
import { ProductSaleService } from '../../../../@core/services/product/product-sale.service';
import { PlantingDifficultyLevelService } from '../../../../@core/services/product/planting-difficulty-level.service';
import { CATALOG_IMAGE_DIRECTORY } from '../../../../@core/utils/image-storing-directory';
import { ImagesCarouselComponent } from '../../images-carousel.component';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { Product } from '../../../../@core/models/product/product.model';

@Component({
  selector: 'ngx-form-basic-information',
  templateUrl: './form-basic-information.component.html',
  styleUrls: ['./form-basic-information.component.scss']
})
export class FormBasicInformationComponent implements OnInit {
  @ViewChild(ImagesCarouselComponent) carousel: ImagesCarouselComponent;
  Editor = ClassicEditor;
  editorConfig: any = { placeholder: 'Description' };
  @Input() mode: string;

  productForm: FormGroup
  images: string[] = []
  catalogs: Catalog[];
  sales: ProductSale[];
  levels: PlantingDifficultyLevel[]

  constructor(
    private formBuilder: FormBuilder,
    private catalogService: CatalogService,
    private saleService: ProductSaleService,
    private levelService: PlantingDifficultyLevelService,
  ) { }


  ngOnInit(): void {
    this.productForm = this.formBuilder.group({
      id: [],
      name: ['', [CustomValidator.notBlank, Validators.maxLength(200)]],
      catalog: [null],
      productSale: [null],
      level: [null],
      new: [true],
      top: [false],
      active: [true],
      sale: [false],
      description: ['', [CustomValidator.notBlank, Validators.maxLength(1000)]],
      images: [this.images, [Validators.required]]
    })  
    this.loadData()
  }

  loadData() {
    this.catalogService.findAll().subscribe(data => {
      this.catalogs = this.catalogService.flattenCatalogs(data).map(cata => {
        return {
          catalogId: cata.catalogId,
          catalogName: cata.catalogName,
          image: {
            imageId: cata.image.imageId,
            imageUrl: CATALOG_IMAGE_DIRECTORY + cata.image.imageUrl
          }
        }
      })
    })
    this.saleService.findAll().subscribe(data => {
      this.sales = data._embedded.productSales.filter(sale => sale.active != false)
    })
    this.levelService.findAll().subscribe(data => this.levels = data._embedded.plantingDifficultyLevels)
  }

  selectProductSale() {
    if (this.productForm.get('productSale').value != null) {
      this.productForm.get('sale').setValue(true);
    } else {
      this.productForm.get('sale').setValue(false);
    }
  }

  selectFiles(event: any) {
    this.images = []
    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.images.push(event.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }
    this.productForm.get('images').setValue(this.images)
    this.productForm.get('images').setErrors(null)
    this.carousel.show(this.images);
  }

  getFormValue(): Product {
    let product: Product = new Product();
    product.productName = this.productForm.get('name').value;
    product.description = this.productForm.get('description').value;
    product.catalog = this.productForm.get('catalog').value;
    product.plantingDifficultyLevel = this.productForm.get('level').value != null ? 
    {
      plantingDifficultyLevelId: this.productForm.get('level').value['plantingDifficultyLevelId'],
      level: this.productForm.get('level').value['level']
    } : 
    null
    product.productSale = this.productForm.get('productSale').value;
    product.active = this.productForm.get('active').value;
    product.top = this.productForm.get('top').value;
    product.new_ = this.productForm.get('new').value;
    product.sale = this.productForm.get('sale').value;
    product.images = this.productForm.get('images').value.map(imageStr => {
      return {
        imageId: null,
        imageUrl: imageStr
      }})
      
    return product;
  }
}
