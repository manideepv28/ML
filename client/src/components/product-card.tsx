import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart } from "lucide-react";
import { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
  onAddToCart: () => void;
}

export default function ProductCard({ product, onAddToCart }: ProductCardProps) {
  return (
    <Card className="group overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="aspect-square overflow-hidden">
        <img
          src={product.imageUrl || ''}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-primary">
            ${parseFloat(product.price).toFixed(2)}
          </span>
          <Button
            onClick={onAddToCart}
            className="bg-primary hover:bg-primary/90 text-white"
            size="sm"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add
          </Button>
        </div>
        {product.stock !== undefined && product.stock < 10 && (
          <p className="text-sm text-orange-600 mt-2">
            Only {product.stock} left in stock
          </p>
        )}
      </CardContent>
    </Card>
  );
}
