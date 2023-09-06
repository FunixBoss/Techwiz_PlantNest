import { Injectable } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { map } from 'rxjs/operators';

import { Order } from '../../models/order/order.model';
import { BaseURLService } from '../base-url.service';
import { HttpClient } from '@angular/common/http';
import { OrderStatus } from '../../models/order/order-status.model';
import { OrderStatusService } from './order-status.service';
import { PaymentMethodService } from './payment-method.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private orderChangeSubject = new Subject<void>();

  get orderChange$(): Observable<void> {
    return this.orderChangeSubject.asObservable();
  }

  notifyOrderChange(): void {
    this.orderChangeSubject.next();
  }

  constructor(
    private baseUrlService: BaseURLService,
    private httpClient: HttpClient,
  ) { }


  findById(id: number): Observable<Order> {
    const url: string = `${this.baseUrlService.baseURL}/orders/findById/${id}`
    return this.httpClient.get<Order>(url)
  }


  findAll(): Observable<Order[]> {
    const url: string = `${this.baseUrlService.baseURL}/orders/findAll`
    return this.httpClient.get<Order[]>(url)
  }

  placeOrder(order: Order): Observable<Order> {
    const url: string = `${this.baseUrlService.baseURL}/checkout/placeOrder`
    return this.httpClient.post<Order>(url, order);
  }

  findOrderStatusById(orderId: number): Observable<OrderStatus> {
    const url: string = `${this.baseUrlService.baseURL}/orders/${orderId}/orderStatus`
    return this.httpClient.get<OrderStatus>(url).pipe(
      map(data => {
        return {
          orderStatusId: data.orderStatusId,
          statusName: data.statusName,
          description: data.description
        }
      })
    );
  }
}
