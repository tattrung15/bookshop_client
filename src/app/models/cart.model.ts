import { Delivery } from "./delivery.model";
import { Model } from "./model";
import { OrderItem } from "./order-item.model";
import { User } from "./user.model";

export class Cart extends Model {
  id: number;
  customerAddress: string;
  phone: string;
  user: User;
  delivery: Delivery;
  orderItems: OrderItem[];
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    super();
    this.fill(data);
  }
}

export interface CreateCartDto {
  productId: number;
  quantity: number;
}
