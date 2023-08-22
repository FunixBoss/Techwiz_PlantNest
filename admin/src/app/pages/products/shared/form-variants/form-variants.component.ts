import { Component, OnInit, ViewChildren, QueryList, AfterViewInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NbAccordionItemComponent, NbRouteTab, NbRouteTabsetComponent } from '@nebular/theme';
import { ProductVariant } from '../../../../@core/models/product/product-variant.model';
import { Image } from '../../../../@core/models/Image';
import { ProductSize } from '../../../../@core/models/product/product-size.model';
import { ProductSizeService } from '../../../../@core/services/product/product-size.service';

@Component({
  selector: 'ngx-form-variants',
  templateUrl: './form-variants.component.html',
  styleUrls: ['./form-variants.component.scss']
})
export class FormVariantsComponent implements OnInit, AfterViewInit {
  @ViewChildren(NbAccordionItemComponent) accordions: QueryList<NbAccordionItemComponent>;

  variantsForm: FormGroup
  sizes: ProductSize[]

  constructor(
    private formBuilder: FormBuilder,
    private sizeService: ProductSizeService,
  ) {
    this.variantsForm = this.formBuilder.group({
      variants: this.formBuilder.array([]),
      imgSizeGuide: [null],
    })
  }

  get variants() { return this.variantsForm.controls["variants"] as FormArray }
  get imgSizeGuide() { return this.variantsForm.controls["imgSizeGuide"] }

  ngOnInit(): void {
    this.sizeService.findAll().subscribe(data => this.sizes = data._embedded.productSizes)
    this.addVariant()
  }

  ngAfterViewInit(): void {
    this.accordions.first.toggle()
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
      image: [null]
    })
    this.variants.push(variantForm)
  }

  removeVariant(variantIndex: number, event?: Event): void {
    event.preventDefault()
    this.variants.removeAt(variantIndex)
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

  // for size guide
  selectFileSizeGuide(event: any) {
    if (event.target.files) {
      const reader = new FileReader();
      reader.onload = (event: any) => {
        this.variantsForm.get('imgSizeGuide').setValue(event.target.result)
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  getVariantsValue(): ProductVariant[] {
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
    return productVariants;
  }
  
  getImgSizeGuideValue(): Image {
    return {
      imageId: null,
      imageUrl: this.variantsForm.get("imgSizeGuide").value
    }
  }

}
