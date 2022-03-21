import { Observable } from "rxjs";
import { map, pluck } from "rxjs/operators";
import HttpService, {
  PaginationOption,
} from "@core/services/http/http.service";
import { HttpOptions } from "@core/services/http/http.type";
import { Product } from "@app/models/product.model";

class _ProductService {
  public getList(options?: PaginationOption): Observable<any> {
    return HttpService.get("/products", {
      queryParams: options,
    } as HttpOptions).pipe(pluck("result"));
  }

  public deleteProduct(productId: number): Observable<Product> {
    return HttpService.delete(`/products/${productId}`).pipe(
      map((response: any) => new Product(response.result.data))
    );
  }
}

const ProductService = new _ProductService();
export default ProductService;
