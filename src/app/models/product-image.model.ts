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

export interface CreateProductImageDto {
  productId: number;
  files: File[];
}

export interface UpdateProductImageDto {
  productId: number;
  productImages: ProductImage[];
  title?: string;
  files?: File[];
}
