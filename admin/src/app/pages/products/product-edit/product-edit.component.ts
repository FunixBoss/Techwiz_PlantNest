import { CATALOG_IMAGE_DIRECTORY, PRODUCT_IMAGE_DIRECTORY, SIDE_GUIDE_IMAGE_DIRECTORY, VARIANT_IMAGE_DIRECTORY } from './../../../@core/utils/image-storing-directory';
import { Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NbAccordionItemComponent } from '@nebular/theme';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../@core/services/product/product.service';
import { Product } from '../../../@core/models/product/product.model';
import { CustomValidator } from '../../../@core/validators/custom-validator';
import { ImagesCarouselComponent } from '../images-carousel.component';
import { ProductVariant } from '../../../@core/models/product/product-variant.model';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastState, UtilsService } from '../../../@core/services/utils.service';
import { forkJoin } from 'rxjs';
import { ProductSale } from '../../../@core/models/sale/product-sale.model';
import { ProductSize } from '../../../@core/models/product/product-size.model';
import { ProductSaleService } from '../../../@core/services/product/product-sale.service';
import { ProductSizeService } from '../../../@core/services/product/product-size.service';
import { CatalogService } from '../../../@core/services/product/product-catalog.service';
import { Catalog } from '../../../@core/models/product/catalog.model';
import { PlantingDifficultyLevel } from '../../../@core/models/product/planting-difficulty-level.model';
import { PlantingDifficultyLevelService } from '../../../@core/services/product/planting-difficulty-level.service';

@Component({
  selector: 'ngx-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {
  @ViewChild(ImagesCarouselComponent) carousel: ImagesCarouselComponent;
  @ViewChildren(NbAccordionItemComponent) accordions: QueryList<NbAccordionItemComponent>;
  Editor = ClassicEditor;
  editorConfig: any = { placeholder: 'Description' };

  edittingProduct;
  edittingProductId: string;
  catalogs: Catalog[];
  levels: PlantingDifficultyLevel[]
  sales: ProductSale[];
  sizes: ProductSize[]

  editProductFormGroup: FormGroup
  images: string[] = []

  constructor(
    private formBuilder: FormBuilder,
    private catalogService: CatalogService,
    private saleService: ProductSaleService,
    private sizeService: ProductSizeService,
    private productService: ProductService,
    private activatedRoute: ActivatedRoute,
    private utilsService: UtilsService,
    private router: Router,
    private levelService: PlantingDifficultyLevelService,

  ) {
    this.activatedRoute.params.subscribe(
      params => {
        this.edittingProductId = params['id']
        this.productService.findById(+this.edittingProductId).subscribe(
          (data: Product) => {
            this.edittingProduct = data
            this.edittingProduct.imageUrls = this.edittingProduct.imageUrls
              .map(img => PRODUCT_IMAGE_DIRECTORY + img)
          }
        )
      }
    )
  }

  settingFormGroup(): void {
    this.editProductFormGroup = this.formBuilder.group({
      product: this.formBuilder.group({
        id: [],
        name: ['', [CustomValidator.notBlank, Validators.maxLength(200)]],
        catalog: [null],
        productSale: [null],
        level: [null],
        new_: [false],
        top: [false],
        active: [false],
        sale: [false],
        description: ['', [CustomValidator.notBlank, Validators.maxLength(1000)]],
        imgSizeGuide: [null],
        images: [this.images]
      }),
      careGuide: this.formBuilder.group({
        productId: [],
        watering: [null, [Validators.maxLength(500)]],
        light: [null, [Validators.maxLength(500)]],
        nutrition: [null, [Validators.maxLength(500)]],
        cleaning: [null, [Validators.maxLength(500)]],
        pruning: [null, [Validators.maxLength(500)]],
        bugs: [null, [Validators.maxLength(500)]],
        trouble: [null, [Validators.maxLength(500)]],
        warning: [null, [Validators.maxLength(500)]],
      }),
      variants: this.formBuilder.array([])
    })
  }

  get product() { return this.editProductFormGroup.controls["product"] as FormGroup }
  get variants() { return this.editProductFormGroup.controls["variants"] as FormArray }
  get careGuide() { return this.editProductFormGroup.controls["careGuide"] as FormGroup }

  ngOnInit() {
    this.settingFormGroup()
    console.log(this.product.get('catalog').value);
    
    const catalog$ = this.catalogService.findAll();
    const sale$ = this.saleService.findAll();
    const size$ = this.sizeService.findAll();
    const level$ = this.levelService.findAll()

    forkJoin([catalog$, sale$, size$, level$]).subscribe(
      ([catalogData, saleData, sizeData, levelData]) => {
        this.catalogs = this.catalogService.flattenCatalogs(catalogData).map(cata => {
          return {
            catalogId: cata.catalogId,
            catalogName: cata.catalogName,
            image: {
              imageId: cata.image.imageId,
              imageUrl: CATALOG_IMAGE_DIRECTORY + cata.image.imageUrl
            }
          }
        })
        this.sales = saleData._embedded.productSales.filter(sale => sale.active != false)
        this.sizes = sizeData._embedded.productSizes.map(size => {
          return { 
            productSizeId: size.productSizeId,
            sizeName: size.sizeName
          }
        })
        this.levels = levelData._embedded.plantingDifficultyLevels
        this.fillFormValues();
      },
      error => {
        console.error(error);
      }
    );
  }

  fillFormValues() {
    this.product.get('id').setValue(this.edittingProduct.productId);
    this.product.get('name').setValue(this.edittingProduct.productName);
    this.product.get('description').setValue(this.edittingProduct.description)
    this.product.get('new_').setValue(this.edittingProduct.new_)
    this.product.get('active').setValue(this.edittingProduct.active)
    this.product.get('top').setValue(this.edittingProduct.top)
    this.product.get('imgSizeGuide').setValue(SIDE_GUIDE_IMAGE_DIRECTORY + this.edittingProduct.imageSizeGuideUrl)
    if(this.edittingProduct.catalog != null) {
      const CATALOG = this.catalogs.find(cata => cata.catalogId == this.edittingProduct.catalog.catalogId);
      this.product.get('catalog').setValue(CATALOG)
      
    }

    if(this.edittingProduct.productSale != null) {
      const sale = this.sales.find(s => s.productSaleId == this.edittingProduct.productSale.productSaleId);
      this.product.get('productSale').setValue(sale)
      this.product.get('sale').setValue(true)
    } else {
      this.product.get('sale').setValue(false)
    }

    if(this.edittingProduct.plantingDifficultyLevel != null) {
      const level = this.levels.find(l => l.plantingDifficultyLevelId == this.edittingProduct.plantingDifficultyLevel.plantingDifficultyLevelId);
      this.product.get('level').setValue(level)
    }
    this.carousel.show(this.edittingProduct.imageUrls);

    if (this.edittingProduct.productVariants.length == 0 ||
      this.edittingProduct.productVariants == null) {
      this.addVariant();
      return;
    }

    // setting product's variants
    for (let i = 0; i < this.edittingProduct.productVariants.length; i++) {
      const variant = this.edittingProduct.productVariants[i];
      this.addVariant()
      let variantForm: FormGroup = this.variants.at(i) as FormGroup
      variantForm.get('id').setValue(variant.productVariantId)
      variantForm.get('height').setValue(variant.height)
      variantForm.get('width').setValue(variant.width)
      variantForm.get('quantity').setValue(variant.quantity)
      variantForm.get('price').setValue(variant.price)
      const SIZE = this.sizes.find(s => s.productSizeId == variant.productSize.productSizeId)
      variantForm.get('size').setValue(SIZE)
      if (variant.imageUrl != null) {
        variantForm.get('image').setValue(VARIANT_IMAGE_DIRECTORY + variant.imageUrl);
      }
    }

    this.careGuide.setValue(this.edittingProduct.productCareGuide)
  }

  
  selectProductSale() {
    if (this.product.get('productSale').value != null) {
      this.product.get('sale').setValue(true);
    } else {
      this.product.get('sale').setValue(false);
    }
  }

  // for variants
  selectFile(event: any, variantIndex: number) {
    if (event.target.files) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.variants.controls[variantIndex].get('image').setValue(event.target.result)
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  // for product
  selectFiles(event: any) {
    if (event.target.files) {
      for (let i = 0; i < event.target.files.length; i++) {
        const reader = new FileReader();
        reader.onload = (event: any) => {
          this.images.push(event.target.result);
        };
        reader.readAsDataURL(event.target.files[i]);
      }
    }

    this.carousel.show(this.images);
  }

  selectFileSizeGuide(event: any) {
    if (event.target.files) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.product.get('imgSizeGuide').setValue(event.target.result)
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }


  addVariant(event?: Event): void {
    event != undefined ? event.preventDefault() : "";
    const variantForm = this.formBuilder.group({
      id: [],
      price: [, [Validators.required, Validators.min(1), Validators.max(10000)]],
      quantity: [, [Validators.required, Validators.min(1), Validators.max(100000)]],
      height: [, [Validators.required, Validators.min(1), Validators.max(100000)]],
      width: [, [Validators.required, Validators.min(1), Validators.max(100000)]],
      size: [null, [Validators.required]],
      image: []
    })
    this.variants.push(variantForm)
  }

  removeVariant(variantIndex: number, event?: Event): void {
    event != undefined ? event.preventDefault() : "";
    this.variants.removeAt(variantIndex)
  }

  onSubmit() {
    if (this.editProductFormGroup.invalid) {
      this.editProductFormGroup.markAllAsTouched();
      this.utilsService.updateToastState(new ToastState('Edit Product Failed!', "danger"))
      return;
    }

    const editedProduct: Product = this.mapFormValue()
    console.log(editedProduct)

    this.productService.update(editedProduct).subscribe(data => {
      if (data) {
        this.utilsService.updateToastState(new ToastState('Edit Product Successfully!', "success"))
        this.router.navigate(['/admin/product/list'])
      } else {
        this.utilsService.updateToastState(new ToastState('Edit Product Failed!', "danger"))
      }
    })
  }

  mapFormValue(): Product {
    let product: Product = new Product();
    product.productId = this.product.get('id').value 
    product.productName = this.product.get('name').value;
    product.description = this.product.get('description').value;
    product.plantingDifficultyLevel = {
      plantingDifficultyLevelId: this.product.get('level').value['plantingDifficultyLevelId'],
      level: this.product.get('level').value['level']
    }
    product.catalog = this.product.get('catalog').value;
    product.productSale = this.product.get('productSale').value;
    product.active = this.product.get('active').value;
    product.top = this.product.get('top').value;
    product.new_ = this.product.get('new_').value;
    product.sale = this.product.get('sale').value;    
    // product.imageSizeGuide = { imageId: null, imageUrl: this.product.get('imgSizeGuide').value } 
    product.images = this.product.get('images').value.map(imageStr => {
      return {
        imageId: null,
        imageUrl: imageStr
      }
    })

    product.productCareGuide = this.careGuide.value

    const productVariants: ProductVariant[] = this.variants.controls.map(variantForm => {
      return {
        productVariantId: variantForm.get('id').value,
        price: +variantForm.get('price').value,
        quantity: +variantForm.get('quantity').value,
        productSize: variantForm.get('size').value,
        image: (variantForm.get('image').value != null)
          ? { imageId: null, imageUrl: variantForm.get('image').value }
          : null
      };
    });
    product.productVariants = productVariants;
    return product;
  }

}
