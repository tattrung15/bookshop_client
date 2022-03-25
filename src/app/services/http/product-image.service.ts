import { Observable } from "rxjs";
import { map, pluck } from "rxjs/operators";
import HttpService from "@core/services/http/http.service";
import {
  CreateProductImageDto,
  ProductImage,
} from "@app/models/product-image.model";

class _ProductImageService {
  public createProductImages(
    productImageDto: CreateProductImageDto
  ): Observable<ProductImage> {
    const formData = {
      productId: productImageDto.productId,
      files: productImageDto.files,
    };

    return HttpService.post("/product-images", {
      body: formData,
      multipart: true,
    }).pipe(map((response: any) => new ProductImage(response.result.data)));
  }

  public deleteProductImages(productId: number): Observable<ProductImage[]> {
    return HttpService.delete(`/products/${productId}/product-images`).pipe(
      pluck("result"),
      map((result: any) =>
        result.data.map((item: ProductImage) => new ProductImage(item))
      )
    );
  }
}

const ProductImageService = new _ProductImageService();
export default ProductImageService;
