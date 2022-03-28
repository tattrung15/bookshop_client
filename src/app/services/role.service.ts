import { Role } from "@app/shared/types/user.type";
import { StorageService } from "@core/services/storage/storage.service";

class _RoleSerivice extends StorageService {
  public getRole(): string {
    return this.get("role") || this.getSession("role") || Role.GUEST;
  }
}

const RoleService = new _RoleSerivice();
export default RoleService;
