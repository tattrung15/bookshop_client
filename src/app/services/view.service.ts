import { StorageService } from "@core/services/storage/storage.service";

class _ViewService extends StorageService {
  private key = "last_view_productIds";

  public getLastView(): number[] {
    const productIds = this.getObject(this.key);
    if (!productIds || !Array.isArray(productIds)) {
      return [];
    }
    if (!productIds.every((item) => Number.isInteger(item))) {
      return productIds.filter(Number);
    }
    return productIds;
  }

  public addLastView(productId: number) {
    const productIds = this.getLastView();
    if (!productIds.includes(productId)) {
      const newData = [productId, ...productIds];
      this.setObject(this.key, newData);
    }
  }
}

const ViewService = new _ViewService();
export default ViewService;
