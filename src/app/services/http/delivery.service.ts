import { Delivery } from "@app/models/delivery.model";
import { _HttpService } from "@core/services/http/http.service";
import { Observable } from "rxjs";

class _DeliveryService extends _HttpService {
  public getAll(): Observable<Delivery[] | undefined> {
    return this.get<Delivery[]>("/deliveries");
  }
}

const DeliveryService = new _DeliveryService();
export default DeliveryService;
