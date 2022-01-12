import { Model } from "./model";

export class Delivery extends Model {
  id: number;
  index: string;
  value: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: any) {
    super();
    this.fill(data);
  }
}
