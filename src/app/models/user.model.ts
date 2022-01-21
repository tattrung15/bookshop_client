import { Model } from "./model";

export class User extends Model {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  address: string;
  amount: number;
  role: string;
  email: string;
  phone: string;
  createdAt?: Date;
  updatedAt?: Date;

  constructor(data: any) {
    super();
    this.fill(data);
  }
}
