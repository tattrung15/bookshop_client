import { map } from "rxjs/operators";
import { CreateUserDto, UpdateUserDto, User } from "@app/models/user.model";
import HttpService, {
  PaginationOption,
  ResponseResult,
} from "@core/services/http/http.service";

class _UserService {
  public getList(options?: PaginationOption) {
    return HttpService.get("/users", {
      queryParams: { ...options },
    }).pipe(map<any, ResponseResult>((response) => response.result));
  }

  public createUser(user: CreateUserDto) {
    return HttpService.post("/users", {
      body: { ...user },
    }).pipe(map<any, User>((response) => response.result.data));
  }

  public getUserById(userId: number) {
    return HttpService.get(`/users/${userId}`).pipe(
      map<any, User>((response) => response.result.data)
    );
  }

  public updateUser(userId: number, updateUserDto: Partial<UpdateUserDto>) {
    return HttpService.patch(`/users/${userId}`, {
      body: { ...updateUserDto },
    }).pipe(map<any, User>((response) => response.result.data));
  }

  public changePassword(oldPassword: string, newPassword: string) {
    return HttpService.patch(`/users/password`, {
      body: { oldPassword, newPassword },
    }).pipe(map<any, User>((response) => response.result.data));
  }

  public deleteUser(userId: number) {
    return HttpService.delete(`/users/${userId}`).pipe(
      map<any, User>((response) => response.result.data)
    );
  }
}

const UserService = new _UserService();
export default UserService;
