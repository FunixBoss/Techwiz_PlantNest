import { Catalog } from '../../../@core/models/product/catalog.model';
import { CatalogService } from '../../../@core/services/product/product-catalog.service';
import { AfterViewInit, Component, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { NbAccordionItemComponent } from '@nebular/theme';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProductService } from '../../../@core/services/product/product.service';
import { Product } from '../../../@core/models/product/product.model';
import { CustomValidator } from '../../../@core/validators/custom-validator';
import { ImagesCarouselComponent } from '../images-carousel.component';
import { ProductVariant } from '../../../@core/models/product/product-variant.model';
import { ToastState, UtilsService } from '../../../@core/services/utils.service';
import { Router } from '@angular/router';
import { ProductSaleService } from '../../../@core/services/product/product-sale.service';
import { ProductSale } from '../../../@core/models/sale/product-sale.model';
import { ProductSize } from '../../../@core/models/product/product-size.model';
import { ProductSizeService } from '../../../@core/services/product/product-size.service';
import { CATALOG_IMAGE_DIRECTORY } from '../../../@core/utils/image-storing-directory';
import { PlantingDifficultyLevel } from '../../../@core/models/product/planting-difficulty-level.model';
import { PlantingDifficultyLevelService } from '../../../@core/services/product/planting-difficulty-level.service';

@Component({
  selector: 'ngx-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.scss']
})
export class ProductAddComponent implements OnInit, AfterViewInit {
  @ViewChild(ImagesCarouselComponent) carousel: ImagesCarouselComponent;
  @ViewChildren(NbAccordionItemComponent) accordions: QueryList<NbAccordionItemComponent>;
  Editor = ClassicEditor;
  editorConfig: any = { placeholder: 'Description' };

  catalogs: Catalog[];
  sales: ProductSale[];
  sizes: ProductSize[]
  levels: PlantingDifficultyLevel[]


  // form chosen values
  addProductFormGroup: FormGroup
  images: string[] = []

  constructor(
    private formBuilder: FormBuilder,
    private catalogService: CatalogService,
    private saleService: ProductSaleService,
    private sizeService: ProductSizeService,
    private productService: ProductService,
    private levelService: PlantingDifficultyLevelService,
    private utilsService: UtilsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.loadData()
    this.settingFormGroup()
    this.addVariant()
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
    this.sizeService.findAll().subscribe(data => { this.sizes = data._embedded.productSizes })
    this.levelService.findAll().subscribe(data => this.levels = data._embedded.plantingDifficultyLevels)
  }

  ngAfterViewInit(): void {
    this.accordions.first.toggle()
  }

  settingFormGroup(): void {
    this.addProductFormGroup = this.formBuilder.group({
      product: this.formBuilder.group({
        name: ['', [CustomValidator.notBlank, Validators.maxLength(200)]],
        catalog: [null],
        productSale: [null],
        level: [null],
        new: [true],
        top: [false],
        active: [true],
        sale: [false],
        description: ['', [CustomValidator.notBlank, Validators.maxLength(1000)]],
        imgSizeGuide: [null],
        images: [this.images, [Validators.required]]
      }),
      careGuide: this.formBuilder.group({
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

  get product() { return this.addProductFormGroup.controls["product"] as FormGroup }
  get variants() { return this.addProductFormGroup.controls["variants"] as FormArray }
  get careGuide() { return this.addProductFormGroup.controls["careGuide"] as FormGroup }

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
    this.product.get('images').setValue(this.images)
    this.product.get('images').setErrors(null)
    this.carousel.show(this.images);
  }

  // for size guide
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
      price: [, [Validators.required, Validators.min(1), Validators.max(10000)]],
      quantity: [, [Validators.required, Validators.min(1), Validators.max(100000)]],
      height: [, [Validators.required, Validators.min(1), Validators.max(100000)]],
      width: [, [Validators.required, Validators.min(1), Validators.max(100000)]],
      size: [null, [Validators.required]],
      image: [null]
    })
    this.variants.push(variantForm)
  }

  removeVariant(variantIndex: number, event?: Event): void {
    event.preventDefault()
    this.variants.removeAt(variantIndex)
  }

  onSubmit() {
    if (this.addProductFormGroup.invalid) {
      this.addProductFormGroup.markAllAsTouched();
      this.utilsService.updateToastState(new ToastState('Add Product Failed!', 'danger'))
      return;
    }

    const insertProduct: Product = this.mapFormValue()
    console.log(insertProduct);
    this.productService.insert(insertProduct).subscribe(
      data => {
        if (data) {
          this.utilsService.updateToastState(new ToastState('Add Product Successfully!', 'success'))
          this.router.navigate(['/admin/product/list'])
        } else {
          this.utilsService.updateToastState(new ToastState('Add Product Failed!', 'danger'))
        }
      },
      error => {
        console.log(error);
        this.utilsService.updateToastState(new ToastState('Add Product Failed!', 'danger'))
      }  
    )
  }

  mapFormValue(): Product {
    let product: Product = new Product();
    product.productName = this.product.get('name').value;
    product.description = this.product.get('description').value;
    product.catalog = this.product.get('catalog').value;
    product.plantingDifficultyLevel = {
      plantingDifficultyLevelId: this.product.get('level').value['plantingDifficultyLevelId'],
      level: this.product.get('level').value['level']
    }
    product.productSale = this.product.get('productSale').value;
    product.active = this.product.get('active').value;
    product.top = this.product.get('top').value;
    product.new_ = this.product.get('new').value;
    product.sale = this.product.get('sale').value;
    product.imageSizeGuide = { imageId: null, imageUrl: this.product.get('imgSizeGuide').value } 
    product.images = this.product.get('images').value.map(imageStr => {
      return {
        imageId: null,
        imageUrl: imageStr
      }
    })
    product.productCareGuide = this.careGuide.value

    const productVariants: ProductVariant[] = this.variants.controls.map(variantForm => {
      return {
        productVariantId: null,
        height: +variantForm.get('height').value,
        width: +variantForm.get('width').value,
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

