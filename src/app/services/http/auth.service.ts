import { Observable } from "rxjs";
import HttpService from "@core/services/http/http.service";
import { CreateUserDto } from "@app/models/user.model";

class _AuthService {
  public login(username: string, password: string): Observable<any> {
    return HttpService.post("/auth/login", {
      body: {
        username,
        password,
      },
    });
  }

  public signUp(createUserDto: CreateUserDto): Observable<any> {
    return HttpService.post("/auth/signup", {
      body: { ...createUserDto },
    });
  }

  public validate(token: string): Observable<any> {
    return HttpService.post("/auth/validate", {
      body: {
        jwt: token,
      },
    });
  }
}

const AuthService = new _AuthService();
export default AuthService;
