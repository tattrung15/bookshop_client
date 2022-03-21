import { Model } from "./model";

export class ProductImage extends Model {
  id: number;
  imageUrl: string;
  imagePublicId: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    super();
    this.fill(data);
  }
}
