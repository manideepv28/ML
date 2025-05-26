import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, ShoppingBag, Shield, Truck, Star } from "lucide-react";

export default function Landing() {
  const handleSignIn = () => {
    window.location.href = "/api/login";
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="bg-primary text-white p-2 rounded-lg">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold text-gray-900">ShopHub</span>
            </div>
            <Button onClick={handleSignIn} className="bg-primary hover:bg-primary/90">
              Sign In
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-blue-700 text-white py-20">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div 
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
          className="absolute inset-0 opacity-20"
        ></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Discover Amazing Products
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Shop the latest trends with confidence. Fast shipping, secure checkout, and unbeatable prices.
          </p>
          <Button onClick={handleSignIn} size="lg" className="bg-white text-primary hover:bg-gray-100">
            Get Started <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12">Why Choose ShopHub?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Truck className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Fast Shipping</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Free shipping on orders over $50. Get your products delivered quickly and safely.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Secure Checkout</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Your payment information is protected with bank-level security and encryption.
                </CardDescription>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg">
              <CardHeader>
                <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                  <Star className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Quality Products</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Carefully curated selection of high-quality products from trusted brands.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Shopping?</h2>
          <p className="text-xl text-gray-600 mb-8">
            Join thousands of satisfied customers and discover your next favorite product.
          </p>
          <Button onClick={handleSignIn} size="lg" className="bg-primary hover:bg-primary/90">
            Sign In to Shop <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="bg-primary text-white p-2 rounded-lg">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <span className="text-2xl font-bold">ShopHub</span>
            </div>
            <p className="text-gray-400">
              Your trusted e-commerce destination for quality products.
            </p>
            <div className="border-t border-gray-800 mt-8 pt-8">
              <p className="text-gray-400">&copy; 2024 ShopHub. All rights reserved.</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
