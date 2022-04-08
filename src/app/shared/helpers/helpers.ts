import { OrderItem } from "@app/models/order-item.model";

export const buildImageSrc = (imageUrl: string) => {
  const baseUrl = new URL(process.env.REACT_APP_BASE_API_URL || "");
  const srcImage = imageUrl.startsWith("http")
    ? imageUrl
    : `${baseUrl.origin}${imageUrl}`;
  return srcImage;
};

export const calculateTotalAmount = (orderItems: OrderItem[]) => {
  let total = 0;
  for (const orderItem of orderItems) {
    total += orderItem.product.price * orderItem.quantity;
  }
  return total;
};
