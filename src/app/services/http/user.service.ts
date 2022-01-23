import { User } from "@app/models/user.model";
import HttpService from "@core/services/http/http.service";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

class _UserService {
  public getUserById(userId: number): Observable<User> {
    return HttpService.get(`/users/${userId}`).pipe(
      map((response: any) => new User(response.result.data))
    );
  }
}

const UserService = new _UserService();
export default UserService;
