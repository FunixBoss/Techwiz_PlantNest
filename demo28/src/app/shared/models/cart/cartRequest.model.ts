import { Account } from "../account/account.model";

export class CartRequest {
    accountId?: number;
    productId?: number
    productVariantId?: number;
    quantity?: number
}