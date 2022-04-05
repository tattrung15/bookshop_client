import { Observable } from "rxjs";
import { map, pluck } from "rxjs/operators";
import HttpService from "@core/services/http/http.service";
import { Cart, CreateCartDto } from "@app/models/cart.model";

class _CartService {
  public getCart(): Observable<any> {
    return HttpService.get("/carts").pipe(pluck("result"));
  }

  public addToCart(cartDto: CreateCartDto): Observable<any> {
    return HttpService.post("/carts", { body: { ...cartDto } }).pipe(
      map((response: any) => new Cart(response.result.data))
    );
  }
}

const CartService = new _CartService();
export default CartService;
