import { Observable } from "rxjs";
import { map, pluck } from "rxjs/operators";
import HttpService from "@core/services/http/http.service";
import { CreateCartDto } from "@app/models/cart.model";
import { OrderItem } from "@app/models/order-item.model";

class _CartService {
  public getCart(): Observable<any> {
    return HttpService.get("/carts").pipe(pluck("result"));
  }

  public addToCart(cartDto: CreateCartDto): Observable<OrderItem> {
    return HttpService.post("/carts", { body: { ...cartDto } }).pipe(
      map((response: any) => new OrderItem(response.result.data))
    );
  }
}

const CartService = new _CartService();
export default CartService;
