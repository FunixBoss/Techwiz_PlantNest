import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'ngx-form-care-guide',
  templateUrl: './form-care-guide.component.html',
  styleUrls: ['./form-care-guide.component.scss']
})
export class FormCareGuideComponent {

  careGuideForm: FormGroup

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.careGuideForm = this.formBuilder.group({
      watering: [null, [Validators.maxLength(500)]],
      light: [null, [Validators.maxLength(500)]],
      nutrition: [null, [Validators.maxLength(500)]],
      cleaning: [null, [Validators.maxLength(500)]],
      pruning: [null, [Validators.maxLength(500)]],
      bugs: [null, [Validators.maxLength(500)]],
      trouble: [null, [Validators.maxLength(500)]],
      warning: [null, [Validators.maxLength(500)]],
    })
  }

  getFormValue() {
    return this.careGuideForm.value
  }

}
