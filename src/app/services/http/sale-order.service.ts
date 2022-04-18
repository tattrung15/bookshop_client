import { Observable } from "rxjs";
import { map, pluck } from "rxjs/operators";
import HttpService, {
  PaginationOption,
} from "@core/services/http/http.service";
import { SaleOrder } from "@app/models/sale-order.model";

export type SaleOrderPaginationOption = PaginationOption & {
  deliveryIndex?: string;
};

class _SaleOrderService {
  public getListForMember(
    options?: SaleOrderPaginationOption
  ): Observable<any> {
    return HttpService.get("/sale-orders", {
      queryParams: { ...options },
    }).pipe(pluck("result"));
  }

  public getSaleOrderForMember(saleOrderId: number): Observable<SaleOrder> {
    return HttpService.get(`/sale-orders/${saleOrderId}`).pipe(
      map((response: any) => new SaleOrder(response.result.data))
    );
  }

  public getListForAdmin(options?: PaginationOption): Observable<any> {
    return HttpService.get("/sale-orders/admin", {
      queryParams: { ...options },
    }).pipe(pluck("result"));
  }

  public getSaleOrderForAdmin(saleOrderId: number): Observable<SaleOrder> {
    return HttpService.get(`/sale-orders/admin/${saleOrderId}`).pipe(
      map((response: any) => new SaleOrder(response.result.data))
    );
  }

  public updateSaleOrderDelivery(
    saleOrderId: number,
    deliveryId: number
  ): Observable<SaleOrder> {
    return HttpService.patch(`/sale-orders/${saleOrderId}`, {
      body: {
        deliveryId,
      },
    }).pipe(map((response: any) => new SaleOrder(response.result.data)));
  }

  public paymentSaleOrder(saleOrderId: number): Observable<SaleOrder> {
    return HttpService.patch(`/sale-orders/${saleOrderId}/payment`).pipe(
      map((response: any) => new SaleOrder(response.result.data))
    );
  }
}

const SaleOrderService = new _SaleOrderService();
export default SaleOrderService;
