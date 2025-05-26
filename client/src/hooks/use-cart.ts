import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { api, CartItemRequest } from "@/lib/api";
import { useToast } from "./use-toast";
import { Product, CartItem } from "@shared/schema";

interface CartItemWithProduct extends CartItem {
  product: Product;
}

interface CartStore {
  items: CartItemWithProduct[];
  setItems: (items: CartItemWithProduct[]) => void;
  totalItems: number;
  totalPrice: number;
  addToCart: (item: CartItemRequest) => Promise<void>;
  updateQuantity: (id: number, quantity: number) => Promise<void>;
  removeFromCart: (id: number) => Promise<void>;
  clearCart: () => Promise<void>;
}

const useCartStoreBase = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      totalItems: 0,
      totalPrice: 0,
      setItems: (items) => {
        const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = items.reduce((sum, item) => sum + (parseFloat(item.product.price) * item.quantity), 0);
        set({ items, totalItems, totalPrice });
      },
      addToCart: async (item) => {
        // This will be overridden by the hook
      },
      updateQuantity: async (id, quantity) => {
        // This will be overridden by the hook
      },
      removeFromCart: async (id) => {
        // This will be overridden by the hook
      },
      clearCart: async () => {
        // This will be overridden by the hook
      },
    }),
    {
      name: "cart-storage",
      partialize: (state) => ({ items: state.items }),
    }
  )
);

export const useCartStore = () => {
  const { isAuthenticated } = useAuth();
  const { toast } = useToast();
  const queryClient = useQueryClient();
  const store = useCartStoreBase();

  // Fetch cart items from server when authenticated
  const { data: serverItems = [] } = useQuery<CartItemWithProduct[]>({
    queryKey: ["/api/cart"],
    enabled: isAuthenticated,
  });

  // Sync server items with local state
  if (isAuthenticated && serverItems) {
    if (JSON.stringify(serverItems) !== JSON.stringify(store.items)) {
      store.setItems(serverItems);
    }
  }

  const addToCartMutation = useMutation({
    mutationFn: api.addToCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Added to cart",
        description: "Item has been added to your cart.",
      });
    },
    onError: (error) => {
      console.error("Add to cart error:", error);
      toast({
        title: "Error",
        description: "Failed to add item to cart.",
        variant: "destructive",
      });
    },
  });

  const updateQuantityMutation = useMutation({
    mutationFn: ({ id, quantity }: { id: number; quantity: number }) =>
      api.updateCartItem(id, quantity),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
    },
    onError: (error) => {
      console.error("Update quantity error:", error);
      toast({
        title: "Error",
        description: "Failed to update item quantity.",
        variant: "destructive",
      });
    },
  });

  const removeFromCartMutation = useMutation({
    mutationFn: api.removeFromCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Removed from cart",
        description: "Item has been removed from your cart.",
      });
    },
    onError: (error) => {
      console.error("Remove from cart error:", error);
      toast({
        title: "Error",
        description: "Failed to remove item from cart.",
        variant: "destructive",
      });
    },
  });

  const clearCartMutation = useMutation({
    mutationFn: api.clearCart,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      store.setItems([]);
    },
    onError: (error) => {
      console.error("Clear cart error:", error);
      toast({
        title: "Error",
        description: "Failed to clear cart.",
        variant: "destructive",
      });
    },
  });

  return {
    ...store,
    addToCart: (item: CartItemRequest) => {
      if (isAuthenticated) {
        return addToCartMutation.mutateAsync(item);
      } else {
        // Handle guest cart (local storage only)
        toast({
          title: "Please sign in",
          description: "You need to sign in to add items to your cart.",
          variant: "destructive",
        });
        return Promise.resolve();
      }
    },
    updateQuantity: (id: number, quantity: number) => {
      if (quantity === 0) {
        return store.removeFromCart(id);
      }
      if (isAuthenticated) {
        return updateQuantityMutation.mutateAsync({ id, quantity });
      }
      return Promise.resolve();
    },
    removeFromCart: (id: number) => {
      if (isAuthenticated) {
        return removeFromCartMutation.mutateAsync(id);
      }
      return Promise.resolve();
    },
    clearCart: () => {
      if (isAuthenticated) {
        return clearCartMutation.mutateAsync();
      } else {
        store.setItems([]);
        return Promise.resolve();
      }
    },
  };
};
