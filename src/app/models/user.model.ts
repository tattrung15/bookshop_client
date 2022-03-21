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

export interface CreateUserDto {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
  address: string;
  phone: string;
  email: string;
  amount?: number;
  role?: string;
}

export interface UpdateUserDto {
  id: number;
  firstName: string;
  lastName: string;
  username: string;
  address: string;
  email: string;
  phone: string;
  amount: number;
  password?: string | null;
  cfPassword?: string;
  roleId?: string;
  role?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
