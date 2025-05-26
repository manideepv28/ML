import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useCartStore } from "@/hooks/use-cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShoppingBag, Search, ShoppingCart, User, Package, LogOut } from "lucide-react";
import { Link } from "wouter";

interface NavigationProps {
  onCartClick: () => void;
}

export default function Navigation({ onCartClick }: NavigationProps) {
  const { user } = useAuth();
  const { totalItems } = useCartStore();
  const [searchQuery, setSearchQuery] = useState("");

  const handleLogout = () => {
    window.location.href = "/api/logout";
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search functionality can be implemented here
    console.log("Search query:", searchQuery);
  };

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="bg-primary text-white p-2 rounded-lg">
              <ShoppingBag className="h-5 w-5" />
            </div>
            <span className="text-2xl font-bold text-gray-900">ShopHub</span>
          </Link>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-lg mx-8">
            <form onSubmit={handleSearch} className="relative w-full">
              <Input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            </form>
          </div>

          {/* Navigation Links & Actions */}
          <div className="flex items-center space-x-6">
            <Link href="/" className="text-gray-700 hover:text-primary transition-colors duration-200">
              Home
            </Link>
            <Link href="/orders" className="text-gray-700 hover:text-primary transition-colors duration-200">
              My Orders
            </Link>
            
            {/* Cart Icon */}
            <Button
              variant="ghost"
              size="sm"
              onClick={onCartClick}
              className="relative p-2 text-gray-700 hover:text-primary"
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {totalItems}
                </span>
              )}
            </Button>

            {/* User Menu */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user?.profileImageUrl || ''} alt={user?.firstName || ''} />
                    <AvatarFallback>
                      <User className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <span className="hidden sm:block text-sm font-medium">
                    {user?.firstName || 'User'}
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem asChild>
                  <Link href="/orders" className="flex items-center">
                    <Package className="mr-2 h-4 w-4" />
                    My Orders
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
}
