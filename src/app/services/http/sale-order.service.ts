import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import HttpService from "@core/services/http/http.service";
import { SaleOrder } from "@app/models/sale-order.model";

class _SaleOrderService {
  public paymentSaleOrder(saleOrderId: number): Observable<SaleOrder> {
    return HttpService.patch(`/sale-orders/${saleOrderId}/payment`).pipe(
      map((response: any) => new SaleOrder(response.result.data))
    );
  }
}

const SaleOrderService = new _SaleOrderService();
export default SaleOrderService;
