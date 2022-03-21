import { Observable } from "rxjs";
import { Delivery } from "@app/models/delivery.model";
import HttpService from "@core/services/http/http.service";

class _DeliveryService {
  public getAll(): Observable<Delivery[] | undefined> {
    return HttpService.get<Delivery[]>("/deliveries");
  }
}

const DeliveryService = new _DeliveryService();
export default DeliveryService;
