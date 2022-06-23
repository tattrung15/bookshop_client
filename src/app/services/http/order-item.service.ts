import { map } from "rxjs/operators";
import HttpService from "@core/services/http/http.service";
import { OrderItem } from "@app/models/order-item.model";

class _OrderItemService {
  public updateQuantity(orderItemId: number, quantity: number) {
    return HttpService.patch(`/order-items/${orderItemId}`, {
      body: {
        quantity,
      },
    }).pipe(map<any, OrderItem>((response) => response.result.data));
  }

  public deleteOrderItem(orderItemId: number) {
    return HttpService.delete(`/order-items/${orderItemId}`).pipe(
      map<any, OrderItem>((response) => response.result.data)
    );
  }
}

const OrderItemService = new _OrderItemService();
export default OrderItemService;
