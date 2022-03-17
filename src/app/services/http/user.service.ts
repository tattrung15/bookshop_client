import { UpdateUserDto, User } from "@app/models/user.model";
import HttpService, {
  PaginationOption,
} from "@core/services/http/http.service";
import { HttpOptions } from "@core/services/http/http.type";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

class _UserService {
  public getList(options?: PaginationOption): Observable<User[]> {
    return HttpService.get(`/users`, {
      queryParams: options,
    } as HttpOptions).pipe(
      map((response: any) =>
        response.result.data.map((user: User) => new User(user))
      )
    );
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
      body: {
        firstName: editUserDto.firstName,
        lastName: editUserDto.lastName,
        address: editUserDto.address,
        email: editUserDto.email,
        phone: editUserDto.phone,
      },
    }).pipe(map((response: any) => new User(response.result.data)));
  }
}

const UserService = new _UserService();
export default UserService;
