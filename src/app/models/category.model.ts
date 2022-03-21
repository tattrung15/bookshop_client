import { Model } from "./model";

export class Category extends Model {
  id: number;
  name: string;
  description: string | null;
  slug: string;
  isAuthor: boolean;
  parentCategory?: Category | null;
  linkedCategories?: Category[];
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    super();
    this.fill(data);
  }
}

export interface CreateCategoryDto {
  name: string;
  description: string | null;
  isAuthor: boolean | null;
  parentCategoryId?: number | null;
}

export interface UpdateCategoryDto {
  id: number;
  name: string;
  description: string;
  isAuthor: boolean;
  parentCategoryId: number | null;
  createdAt?: Date;
  updatedAt?: Date;
}
