import { Observable } from "rxjs";
import { map, pluck } from "rxjs/operators";
import { CreateUserDto, UpdateUserDto, User } from "@app/models/user.model";
import HttpService, {
  PaginationOption,
} from "@core/services/http/http.service";

class _UserService {
  public getList(options?: PaginationOption): Observable<any> {
    return HttpService.get("/users", {
      queryParams: { ...options },
    }).pipe(pluck("result"));
  }

  public createUser(user: CreateUserDto): Observable<User> {
    return HttpService.post("/users", {
      body: { ...user },
    }).pipe(map((response: any) => new User(response.result.data)));
  }

  public getUserById(userId: number): Observable<User> {
    return HttpService.get(`/users/${userId}`).pipe(
      map((response: any) => new User(response.result.data))
    );
  }

  public updateUser(
    userId: number,
    updateUserDto: Partial<UpdateUserDto>
  ): Observable<User> {
    return HttpService.patch(`/users/${userId}`, {
      body: { ...updateUserDto },
    }).pipe(map((response: any) => new User(response.result.data)));
  }

  public changePassword(
    oldPassword: string,
    newPassword: string
  ): Observable<User> {
    return HttpService.patch(`/users/password`, {
      body: { oldPassword, newPassword },
    }).pipe(map((response: any) => new User(response.result.data)));
  }

  public deleteUser(userId: number): Observable<User> {
    return HttpService.delete(`/users/${userId}`).pipe(
      map((response: any) => new User(response.result.data))
    );
  }
}

const UserService = new _UserService();
export default UserService;
