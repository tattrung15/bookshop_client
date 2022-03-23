import { Observable } from "rxjs";
import { map } from "rxjs/operators";
import HttpService from "@core/services/http/http.service";
import {
  CreateProductImageDto,
  ProductImage,
} from "@app/models/product-image.model";

class _ProductImageService {
  public createProductImages(
    productImage: CreateProductImageDto
  ): Observable<ProductImage> {
    const formData = new FormData();
    formData.append("productId", productImage.productId.toString());
    for (const file of productImage.files) {
      formData.append("files", file);
    }
    return HttpService.post("/product-images", {
      body: formData,
      multipart: true,
    }).pipe(map((response: any) => new ProductImage(response.result.data)));
  }
}

const ProductImageService = new _ProductImageService();
export default ProductImageService;
