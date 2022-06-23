import { map } from "rxjs/operators";
import HttpService, {
  PaginationOption,
  ResponseResult,
} from "@core/services/http/http.service";
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
  public getList(options?: ProductPaginationOption) {
    return HttpService.get("/products", {
      queryParams: { ...options },
    }).pipe(map<any, ResponseResult>((response) => response.result));
  }

  public getDetail(productId: number | string) {
    return HttpService.get(`/products/${productId}`).pipe(
      map<any, Product>((response) => response.result.data)
    );
  }

  public getListByCategory(
    categoryId: number | string,
    options?: PaginationOption
  ) {
    return HttpService.get(`/categories/${categoryId}/products`, {
      queryParams: { ...options },
    }).pipe(map<any, ResponseResult>((response) => response.result));
  }

  public createProduct(product: CreateProductDto) {
    return HttpService.post("/products", {
      body: { ...product },
    }).pipe(map<any, Product>((response) => response.result.data));
  }

  public updateProduct(
    productId: number,
    updateProductDto: Partial<UpdateProductDto>
  ) {
    return HttpService.patch(`/products/${productId}`, {
      body: { ...updateProductDto },
    }).pipe(map<any, Product>((response) => response.result.data));
  }

  public deleteProduct(productId: number) {
    return HttpService.delete(`/products/${productId}`).pipe(
      map<any, Product>((response) => response.result.data)
    );
  }
}

const ProductService = new _ProductService();
export default ProductService;
