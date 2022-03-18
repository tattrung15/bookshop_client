import { UpdateUserDto, User } from "@app/models/user.model";
import HttpService, {
  PaginationOption,
} from "@core/services/http/http.service";
import { HttpOptions } from "@core/services/http/http.type";
import { Observable } from "rxjs";
import { map, pluck } from "rxjs/operators";

class _UserService {
  public getList(options?: PaginationOption): Observable<any> {
    return HttpService.get(`/users`, {
      queryParams: options,
    } as HttpOptions).pipe(pluck("result"));
  }

  public getUserById(userId: number): Observable<User> {
    return HttpService.get(`/users/${userId}`).pipe(
      map((response: any) => new User(response.result.data))
    );
  }

  public updateUser(
    userId: number,
    editUserDto: UpdateUserDto
  ): Observable<User> {
    return HttpService.patch(`/users/${userId}`, {
      body: { ...editUserDto },
    }).pipe(map((response: any) => new User(response.result.data)));
  }
}

const UserService = new _UserService();
export default UserService;
