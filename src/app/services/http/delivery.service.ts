import HttpService, { CoreResponse } from "@core/services/http/http.service";

class _DeliveryService {
  public getAll() {
    return HttpService.get<CoreResponse>("/deliveries");
  }
}

const DeliveryService = new _DeliveryService();
export default DeliveryService;
