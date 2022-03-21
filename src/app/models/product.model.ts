import { Model } from "./model";
import { Category } from "./category.model";
import { ProductImage } from "./product-image.model";

export class Product extends Model {
  id: number;
  title: string;
  shortDescription: string;
  longDescription: string;
  category: Category;
  productImages: ProductImage[];
  price: number;
  author: string;
  currentNumber: number;
  numberOfPage: number;
  slug: string;
  quantityPurchased: number;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    super();
    this.fill(data);
  }
}
