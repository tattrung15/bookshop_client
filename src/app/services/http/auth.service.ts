import HttpService, { CoreResponse } from "@core/services/http/http.service";
import { CreateUserDto } from "@app/models/user.model";

class _AuthService {
  public login(username: string, password: string) {
    return HttpService.post<CoreResponse>("/auth/login", {
      body: {
        username,
        password,
      },
    });
  }

  public signUp(createUserDto: CreateUserDto) {
    return HttpService.post<CoreResponse>("/auth/signup", {
      body: { ...createUserDto },
    });
  }

  public validate(token: string) {
    return HttpService.post<CoreResponse>("/auth/validate", {
      body: {
        jwt: token,
      },
    });
  }

  public resetPassword(username: string) {
    return HttpService.delete<CoreResponse>("/auth/password", {
      body: {
        username,
      },
    });
  }
}

const AuthService = new _AuthService();
export default AuthService;
