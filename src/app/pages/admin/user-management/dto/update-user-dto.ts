import { User } from "@app/models/user.model";
import { Role } from "@app/shared/types/user.type";

export type UpdateUserType = Omit<User, "role" | "fill"> & {
  password: string;
  cfPassword: string;
  roleId: Role;
};

export const initialUserValues: UpdateUserType = {
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
