import { apiRequest } from "./queryClient";

export interface CartItemRequest {
  productId: number;
  quantity: number;
}

export const api = {
  // Cart operations
  addToCart: async (item: CartItemRequest) => {
    const response = await apiRequest("POST", "/api/cart", item);
    return response.json();
  },

  updateCartItem: async (id: number, quantity: number) => {
    const response = await apiRequest("PATCH", `/api/cart/${id}`, { quantity });
    return response.json();
  },

  removeFromCart: async (id: number) => {
    await apiRequest("DELETE", `/api/cart/${id}`);
  },

  clearCart: async () => {
    await apiRequest("DELETE", "/api/cart");
  },

  // Order operations
  createOrder: async (orderData: { shippingAddress: any; items: any[] }) => {
    const response = await apiRequest("POST", "/api/orders", orderData);
    return response.json();
  },
};
