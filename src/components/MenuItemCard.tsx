import { useState } from 'react';
import { Plus, Minus, Star, Award, Leaf } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MenuItem, CartItem } from '@/types/menu';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (cartItem: CartItem) => void;
  isAdmin?: boolean;
  onToggleAvailability?: (itemId: string) => void;
}

export const MenuItemCard = ({ 
  item, 
  onAddToCart, 
  isAdmin = false, 
  onToggleAvailability 
}: MenuItemCardProps) => {
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [quantity, setQuantity] = useState(1);

  const getSizeOptions = () => {
    const options = [];
    if (item.price250g) options.push({ value: '250g', label: '250g', price: item.price250g });
    if (item.price500g) options.push({ value: '500g', label: '500g', price: item.price500g });
    if (item.pricePerPiece) options.push({ value: 'piece', label: '1 Piece', price: item.pricePerPiece });
    if (item.price2Pieces) options.push({ value: '2pieces', label: '2 Pieces', price: item.price2Pieces });
    return options;
  };

  const sizeOptions = getSizeOptions();
  const selectedSizeData = sizeOptions.find(opt => opt.value === selectedSize);

  const handleAddToCart = () => {
    if (!selectedSize || !selectedSizeData) return;
    
    const cartItem: CartItem = {
      menuItem: item,
      quantity,
      selectedSize: selectedSize as any
    };
    
    onAddToCart(cartItem);
    setQuantity(1);
    setSelectedSize('');
  };

  const getTagIcon = (tag: string) => {
    switch (tag) {
      case 'best-seller': return <Star className="w-3 h-3" />;
      case 'premium': return <Award className="w-3 h-3" />;
      case 'seasonal': return <Leaf className="w-3 h-3" />;
      case 'exclusive': return <Award className="w-3 h-3" />;
      default: return null;
    }
  };

  const getTagColor = (tag: string) => {
    switch (tag) {
      case 'best-seller': return 'bg-red-500 text-white';
      case 'premium': return 'bg-yellow-500 text-white';
      case 'seasonal': return 'bg-green-500 text-white';
      case 'exclusive': return 'bg-purple-500 text-white';
      case 'no-sugar': return 'bg-blue-500 text-white';
      case 'no sugar': return 'bg-blue-500 text-white';
      case 'no-egg': return 'bg-orange-500 text-white';
      case 'no egg': return 'bg-orange-500 text-white';
      case 'no-refined-flour': return 'bg-teal-500 text-white';
      case 'no refined flour': return 'bg-teal-500 text-white';
      case 'no-palm-oil': return 'bg-pink-500 text-white';
      case 'no palm oil': return 'bg-pink-500 text-white';
      case 'vegan': return 'bg-green-600 text-white';
      case 'gluten-free': return 'bg-indigo-500 text-white';
      case 'gluten free': return 'bg-indigo-500 text-white';
      default: return 'bg-bakery-pink text-white';
    }
  };

  return (
    <Card className={`h-full transition-all duration-200 hover:shadow-lg ${!item.isAvailable ? 'opacity-50' : ''}`}>
      <CardHeader className="p-4">
        <div className="aspect-square bg-bakery-soft-pink rounded-lg mb-3 flex items-center justify-center overflow-hidden h-32 w-32 mx-auto">
          {item.image ? (
            <img 
              src={item.image} 
              alt={item.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-bakery-pink text-3xl">🧁</div>
          )}
        </div>
        
        <div className="space-y-2">
          <h3 className="font-semibold text-foreground line-clamp-2">{item.name}</h3>
          
          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {item.tags?.map((tag) => (
              <Badge 
                key={tag} 
                className={`text-xs ${getTagColor(tag)}`}
              >
                {getTagIcon(tag)}
                <span className="ml-1 capitalize">{tag.replace('-', ' ')}</span>
              </Badge>
            ))}
            {item.isGlutenFree && (
              <Badge className="bg-green-600 text-white text-xs">
                Gluten Free
              </Badge>
            )}
          </div>

          {item.description && (
            <p className="text-xs text-muted-foreground">{item.description}</p>
          )}
        </div>
      </CardHeader>

      <CardContent className="p-4 pt-0">
        {/* Size and Price Selection */}
        <div className="space-y-3">
          <Select value={selectedSize} onValueChange={setSelectedSize}>
            <SelectTrigger>
              <SelectValue placeholder="Select size" />
            </SelectTrigger>
            <SelectContent>
              {sizeOptions.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  <div className="flex justify-between items-center w-full">
                    <span>{option.label}</span>
                    <span className="ml-2 font-semibold">₹{option.price}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Quantity Controls */}
          {selectedSize && (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="w-8 text-center font-medium">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
              
              {selectedSizeData && (
                <div className="text-right">
                  <div className="font-bold text-lg text-foreground">
                    ₹{selectedSizeData.price * quantity}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0 space-y-2">
        <Button 
          onClick={handleAddToCart}
          disabled={!selectedSize || !item.isAvailable}
          className="w-full bg-bakery-orange hover:bg-bakery-orange/80 text-bakery-deep"
        >
          {!item.isAvailable ? 'Unavailable' : 'Add to Cart'}
        </Button>
        
        {isAdmin && onToggleAvailability && (
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => onToggleAvailability(item.id)}
            className="w-full"
          >
            {item.isAvailable ? 'Mark Unavailable' : 'Mark Available'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};