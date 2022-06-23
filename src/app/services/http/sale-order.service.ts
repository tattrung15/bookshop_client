import { map } from "rxjs/operators";
import HttpService, {
  PaginationOption,
  ResponseResult,
} from "@core/services/http/http.service";
import { SaleOrder } from "@app/models/sale-order.model";
import { FETCH_TYPE } from "@app/shared/constants/common";

export type SaleOrderPaginationOption = PaginationOption & {
  deliveryIndex?: string;
  fetchType?: FETCH_TYPE;
  fromDate?: string;
  toDate?: string;
};

class _SaleOrderService {
  public getListForMember(options?: SaleOrderPaginationOption) {
    return HttpService.get("/sale-orders", {
      queryParams: { ...options },
    }).pipe(map<any, ResponseResult>((response) => response.result));
  }

  public getSaleOrderForMember(saleOrderId: number) {
    return HttpService.get(`/sale-orders/${saleOrderId}`).pipe(
      map<any, SaleOrder>((response) => response.result.data)
    );
  }

  public getListForAdmin(options?: SaleOrderPaginationOption) {
    return HttpService.get("/sale-orders/admin", {
      queryParams: { ...options },
    }).pipe(map<any, ResponseResult>((response) => response.result));
  }

  public getSaleOrderForAdmin(saleOrderId: number) {
    return HttpService.get(`/sale-orders/admin/${saleOrderId}`).pipe(
      map<any, SaleOrder>((response) => response.result.data)
    );
  }

  public updateSaleOrderDelivery(saleOrderId: number, deliveryId: number) {
    return HttpService.patch(`/sale-orders/${saleOrderId}`, {
      body: {
        deliveryId,
      },
    }).pipe(map<any, SaleOrder>((response) => response.result.data));
  }

  public paymentSaleOrder(saleOrderId: number) {
    return HttpService.patch(`/sale-orders/${saleOrderId}/payment`).pipe(
      map<any, SaleOrder>((response) => response.result.data)
    );
  }

  public cancelSaleOrder(saleOrderId: number) {
    return HttpService.delete(`/sale-orders/${saleOrderId}`).pipe(
      map<any, SaleOrder>((response) => response.result.data)
    );
  }
}

const SaleOrderService = new _SaleOrderService();
export default SaleOrderService;
