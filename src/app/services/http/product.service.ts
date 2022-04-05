import { Observable } from "rxjs";
import { map, pluck } from "rxjs/operators";
import HttpService, {
  PaginationOption,
} from "@core/services/http/http.service";
import { HttpOptions } from "@core/services/http/http.type";
import {
  CreateProductDto,
  Product,
  UpdateProductDto,
} from "@app/models/product.model";
import { PRODUCT_TYPE } from "@app/shared/constants/common";

export type ProductPaginationOption = PaginationOption & {
  productType?: PRODUCT_TYPE;
  ids?: number[];
};

class _ProductService {
  public getList(options?: ProductPaginationOption): Observable<any> {
    return HttpService.get("/products", {
      queryParams: options,
    } as HttpOptions).pipe(pluck("result"));
  }

  public getDetail(productId: number | string): Observable<Product> {
    return HttpService.get(`/products/${productId}`).pipe(
      map((response: any) => new Product(response.result.data))
    );
  }

  public getListByCategory(
    categoryId: number | string,
    options?: PaginationOption
  ): Observable<any> {
    return HttpService.get(`/categories/${categoryId}/products`, {
      queryParams: options,
    } as HttpOptions).pipe(pluck("result"));
  }

  public createProduct(product: CreateProductDto): Observable<Product> {
    return HttpService.post("/products", {
      body: { ...product },
    }).pipe(map((response: any) => new Product(response.result.data)));
  }

  public updateProduct(
    productId: number,
    updateProductDto: Partial<UpdateProductDto>
  ): Observable<Product> {
    return HttpService.patch(`/products/${productId}`, {
      body: { ...updateProductDto },
    }).pipe(map((response: any) => new Product(response.result.data)));
  }

  public deleteProduct(productId: number): Observable<Product> {
    return HttpService.delete(`/products/${productId}`).pipe(
      map((response: any) => new Product(response.result.data))
    );
  }
}

const ProductService = new _ProductService();
export default ProductService;
