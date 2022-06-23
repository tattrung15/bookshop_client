import { map } from "rxjs/operators";
import HttpService, { ResponseResult } from "@core/services/http/http.service";
import { CreateCartDto } from "@app/models/cart.model";
import { OrderItem } from "@app/models/order-item.model";

class _CartService {
  public getCart() {
    return HttpService.get("/carts").pipe(
      map<any, ResponseResult>((response) => response.result)
    );
  }

  public addToCart(cartDto: CreateCartDto) {
    return HttpService.post("/carts", { body: { ...cartDto } }).pipe(
      map<any, OrderItem>((response) => response.result.data)
    );
  }
}

const CartService = new _CartService();
export default CartService;
