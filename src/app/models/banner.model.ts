import { Model } from "./model";
import { BANNER_TYPE } from "@app/shared/constants/common";

export class Banner extends Model {
  id: number;
  title: string;
  imageUrl: string | null;
  type: BANNER_TYPE;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    super();
    this.fill(data);
  }
}

export interface CreateBannerDto {
  title: string;
  type: BANNER_TYPE;
}

export interface UpdateBannerDto {
  bannerId: number;
  title: string;
  imageUrl: string;
  type: number;
  files?: File[];
}
