import { useState, useMemo } from 'react';
import { Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Header } from '@/components/Header';
import { MenuFilters } from '@/components/MenuFilters';
import { MenuItemCard } from '@/components/MenuItemCard';
import { Cart } from '@/components/Cart';
import { menuItems } from '@/data/menuData';
import { CartItem, MenuItem } from '@/types/menu';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [isAdminMode, setIsAdminMode] = useState(false);
  const [itemAvailability, setItemAvailability] = useState<Record<string, boolean>>(
    Object.fromEntries(menuItems.map(item => [item.id, item.isAvailable]))
  );
  const { toast } = useToast();

  // Filter menu items based on category, search, and availability
  const filteredItems = useMemo(() => {
    return menuItems
      .map(item => ({ ...item, isAvailable: itemAvailability[item.id] }))
      .filter(item => {
        const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
        const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase());
        return matchesCategory && matchesSearch;
      });
  }, [selectedCategory, searchTerm, itemAvailability]);

  const addToCart = (newItem: CartItem) => {
    setCartItems(prev => {
      const existingItemIndex = prev.findIndex(
        item => item.menuItem.id === newItem.menuItem.id && item.selectedSize === newItem.selectedSize
      );

      if (existingItemIndex >= 0) {
        const updated = [...prev];
        updated[existingItemIndex].quantity += newItem.quantity;
        return updated;
      } else {
        return [...prev, newItem];
      }
    });

    toast({
      title: "Added to cart!",
      description: `${newItem.menuItem.name} (${newItem.selectedSize}) added to your cart.`,
    });
  };

  const updateCartQuantity = (itemId: string, size: string, quantity: number) => {
    setCartItems(prev =>
      prev.map(item =>
        item.menuItem.id === itemId && item.selectedSize === size
          ? { ...item, quantity }
          : item
      )
    );
  };

  const removeFromCart = (itemId: string, size: string) => {
    setCartItems(prev =>
      prev.filter(item => !(item.menuItem.id === itemId && item.selectedSize === size))
    );
    
    toast({
      title: "Removed from cart",
      description: "Item has been removed from your cart.",
    });
  };

  const toggleItemAvailability = (itemId: string) => {
    setItemAvailability(prev => ({
      ...prev,
      [itemId]: !prev[itemId]
    }));
    
    const item = menuItems.find(i => i.id === itemId);
    toast({
      title: "Availability Updated",
      description: `${item?.name} is now ${itemAvailability[itemId] ? 'unavailable' : 'available'}.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header cartItems={cartItems} onCartClick={() => setIsCartOpen(true)} />
      
      <main className="container mx-auto px-4 py-6">
        {/* Admin Controls */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Quick Controls
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center space-x-2">
              <Switch
                id="admin-mode"
                checked={isAdminMode}
                onCheckedChange={setIsAdminMode}
              />
              <Label htmlFor="admin-mode">
                Admin Mode (Toggle item availability)
              </Label>
            </div>
          </CardContent>
        </Card>

        {/* Menu Filters */}
        <MenuFilters
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <MenuItemCard
              key={item.id}
              item={item}
              onAddToCart={addToCart}
              isAdmin={isAdminMode}
              onToggleAvailability={toggleItemAvailability}
            />
          ))}
        </div>

        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground text-lg">
              No items found. Try adjusting your search or category filter.
            </p>
          </div>
        )}

        {/* Additional Info */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <div className="text-sm text-muted-foreground space-y-2">
              <p>• We curate customized gift hampers on pre-orders.</p>
              <p>• Premium packaging charges are extra based on occasion.</p>
            </div>
          </CardContent>
        </Card>
      </main>

      {/* Cart Sidebar */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
      />
    </div>
  );
};

export default Index;
