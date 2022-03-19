import { User } from "@app/models/user.model";
import { Role } from "@app/shared/types/user.type";

export class CreateUserDto {
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

export type UpdateUserDto = Omit<User, "role" | "fill"> & {
  password?: string;
  cfPassword?: string;
  roleId: string;
};

export const initialUserValues: UpdateUserDto = {
  id: 0,
  lastName: "",
  firstName: "",
  email: "",
  phone: "",
  address: "",
  username: "",
  password: "",
  cfPassword: "",
  amount: 0,
  roleId: Role.MEMBER,
  createdAt: new Date(),
  updatedAt: new Date(),
};
