import HttpService from "@core/services/http/http.service";
import { Observable } from "rxjs";

class _AuthService {
  public login(username: string, password: string): Observable<any> {
    return HttpService.post("/auth/login", {
      body: {
        username,
        password,
      },
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
