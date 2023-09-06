import { Component, OnInit, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { PaymentMethod } from 'src/app/@core/models/order/payment-method.model';
import { PaymentMethodService } from 'src/app/@core/services/order/payment-method.service';

@Component({
  selector: 'molla-payment-methods',
  templateUrl: './payment-methods.component.html',
  styleUrls: ['./payment-methods.component.scss']
})

export class PaymentMethodsComponent {

  @Output() changePaymentMethod = new EventEmitter<PaymentMethod>()
  selectedPaymentMethod: PaymentMethod
  paymentMethods: PaymentMethod[]
  errorMessage: string
  constructor(
    public paymentMethodService: PaymentMethodService
  ) {
    this.paymentMethodService.findAll().subscribe(result => {
      this.paymentMethods = result._embedded.paymentMethods
    })
  }

  changePaymentMethods(type: string) {
    const selectedPaymentMethod = this.paymentMethods.find(method => method.methodName.toLowerCase() == type)
    this.selectedPaymentMethod = selectedPaymentMethod
    this.errorMessage = null
    this.changePaymentMethod.emit(selectedPaymentMethod)
  }

  getPaymentMethod(): PaymentMethod {
    if(this.selectedPaymentMethod == null) {
      this.errorMessage = 'Payment method is required'
      return null;
    }
    return this.selectedPaymentMethod
  }
}
