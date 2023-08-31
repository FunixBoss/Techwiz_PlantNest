import { OrderDetail } from "./order-detail.model";
import { OrderStatus } from "./order-status.model";
import { PaymentMethod } from "./payment-method.model";

export class Order {
    orderId: number;
    orderTrackingNumber: string;
    accountEmail: string
    address: string;
    couponCode: string;
    orderStatus?: OrderStatus
    paymentMethod: PaymentMethod
    totalPrice: number;
    totalQuantity: number;
    orderDetails?: OrderDetail[];
    createdAt: Date
    updatedAt: Date
}
