import { Delivery } from "./delivery.model";
import { Model } from "./model";
import { OrderItem } from "./order-item.model";
import { User } from "./user.model";

export class SaleOrder extends Model {
  id: number;
  customerAddress: string;
  phone: string;
  user: User;
  delivery: Delivery;
  orderItems: OrderItem[];
  createdAt: Date;
  updatedAt: Date;
  orderedAt: Date;

  constructor(data: any) {
    super();
    this.fill(data);
  }
}
