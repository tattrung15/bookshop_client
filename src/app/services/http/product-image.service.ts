import { map } from "rxjs/operators";
import HttpService from "@core/services/http/http.service";
import {
  CreateProductImageDto,
  ProductImage,
} from "@app/models/product-image.model";

class _ProductImageService {
  public createProductImages(productImageDto: CreateProductImageDto) {
    const formData = {
      productId: productImageDto.productId,
      files: productImageDto.files,
    };

    return HttpService.post("/product-images", {
      body: formData,
      multipart: true,
    }).pipe(map<any, ProductImage>((response) => response.result.data));
  }

  public deleteProductImages(productId: number) {
    return HttpService.delete(`/products/${productId}/product-images`).pipe(
      map<any, ProductImage[]>((response) => response.result.data)
    );
  }
}

const ProductImageService = new _ProductImageService();
export default ProductImageService;
