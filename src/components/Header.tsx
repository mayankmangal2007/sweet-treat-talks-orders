import { ShoppingCart, Phone, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CartItem } from '@/types/menu';

interface HeaderProps {
  cartItems: CartItem[];
  onCartClick: () => void;
}

export const Header = ({ cartItems, onCartClick }: HeaderProps) => {
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        {/* Brand Section */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-bakery-brown rounded-full flex items-center justify-center">
              <span className="text-bakery-cream font-bold text-xl">YHB</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">YUMM HEALTHY BITES</h1>
              <p className="text-sm text-muted-foreground">by Ruchira Agrawal</p>
            </div>
          </div>
          
          <Button 
            onClick={onCartClick}
            variant="outline" 
            size="lg"
            className="relative bg-bakery-orange text-bakery-deep border-bakery-orange hover:bg-bakery-orange/80"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Cart
            {totalItems > 0 && (
              <Badge 
                variant="secondary" 
                className="absolute -top-2 -right-2 bg-bakery-brown text-bakery-cream"
              >
                {totalItems}
              </Badge>
            )}
          </Button>
        </div>

        {/* Health Features */}
        <div className="flex flex-wrap gap-2 mb-4">
          {['No Sugar', 'No Egg', 'No Refined Flour', 'No Palm Oil'].map((feature) => (
            <Badge key={feature} variant="secondary" className="bg-bakery-deep text-bakery-cream">
              {feature}
            </Badge>
          ))}
        </div>

        {/* Tagline */}
        <p className="text-foreground text-center mb-4 font-medium">
          Indulge your cravings without the guilt. Our baked goods are crafted with whole grains and jaggery.
        </p>

        {/* Contact Info */}
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>Candeur Sunshine, Kodigehalli, Bengaluru</span>
          </div>
          <div className="flex items-center gap-1">
            <Phone className="w-4 h-4" />
            <span>+91 9767519630</span>
          </div>
        </div>
      </div>
    </header>
  );
};