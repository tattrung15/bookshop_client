import { Model } from "./model";
import { Product } from "./product.model";

export class OrderItem extends Model {
  id: number;
  product: Product;
  quantity: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    super();
    this.fill(data);
  }
}
