import { useState } from 'react';
import { X, Plus, Minus, MessageCircle, User, Phone, Calendar, FileText } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { CartItem } from '@/types/menu';
import { useToast } from '@/hooks/use-toast';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, size: string, quantity: number) => void;
  onRemoveItem: (itemId: string, size: string) => void;
}

export const Cart = ({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem 
}: CartProps) => {
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryDate, setDeliveryDate] = useState('');
  const [notes, setNotes] = useState('');
  const { toast } = useToast();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = getItemPrice(item);
      return total + (price * item.quantity);
    }, 0);
  };

  const getItemPrice = (item: CartItem) => {
    switch (item.selectedSize) {
      case '250g': return item.menuItem.price250g || 0;
      case '500g': return item.menuItem.price500g || 0;
      case 'piece': return item.menuItem.pricePerPiece || 0;
      case '2pieces': return item.menuItem.price2Pieces || 0;
      default: return 0;
    }
  };

  const generateWhatsAppMessage = () => {
    if (!customerName || !customerPhone || !deliveryDate) {
      toast({
        title: "Missing Information",
        description: "Please fill in your name, phone, and delivery date.",
        variant: "destructive"
      });
      return;
    }

    let message = `🧁 *YUMM HEALTHY BITES - Order Details*\n\n`;
    message += `👤 *Customer:* ${customerName}\n`;
    message += `📱 *Phone:* ${customerPhone}\n`;
    message += `📅 *Delivery Date:* ${deliveryDate}\n\n`;
    message += `🛒 *Order Items:*\n`;
    
    cartItems.forEach((item, index) => {
      const price = getItemPrice(item);
      const total = price * item.quantity;
      message += `${index + 1}. ${item.menuItem.name}\n`;
      message += `   Size: ${item.selectedSize}, Qty: ${item.quantity}\n`;
      message += `   Price: ₹${price} x ${item.quantity} = ₹${total}\n\n`;
    });

    const grandTotal = calculateTotal();
    message += `💰 *Total Amount: ₹${grandTotal}*\n\n`;
    
    if (notes) {
      message += `📝 *Special Notes:* ${notes}\n\n`;
    }
    
    message += `Please confirm this order. Thank you! 🙏`;

    // Phone number for WhatsApp (replace with actual business number)
    const phoneNumber = "919767519630";
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    window.open(whatsappUrl, '_blank');
    
    toast({
      title: "Order Sent!",
      description: "Your order has been sent via WhatsApp. You will be redirected shortly.",
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-end">
      <div className="bg-background w-full max-w-md h-full overflow-y-auto">
        <Card className="h-full rounded-none">
          <CardHeader className="border-b">
            <div className="flex items-center justify-between">
              <CardTitle className="text-xl">Your Cart</CardTitle>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            </div>
          </CardHeader>

          <CardContent className="p-4 space-y-4">
            {cartItems.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-muted-foreground">Your cart is empty</p>
                <Button onClick={onClose} className="mt-4" variant="outline">
                  Continue Shopping
                </Button>
              </div>
            ) : (
              <>
                {/* Cart Items */}
                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={`${item.menuItem.id}-${item.selectedSize}`} className="flex items-center space-x-3 p-3 border rounded-lg">
                      <div className="w-12 h-12 bg-bakery-cream rounded flex items-center justify-center">
                        <span className="text-lg">🧁</span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm line-clamp-2">{item.menuItem.name}</h4>
                        <p className="text-xs text-muted-foreground">{item.selectedSize}</p>
                        <p className="text-sm font-semibold">₹{getItemPrice(item)}</p>
                      </div>

                      <div className="flex items-center space-x-1">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onUpdateQuantity(item.menuItem.id, item.selectedSize!, Math.max(1, item.quantity - 1))}
                          disabled={item.quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </Button>
                        <span className="w-8 text-center text-sm">{item.quantity}</span>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => onUpdateQuantity(item.menuItem.id, item.selectedSize!, item.quantity + 1)}
                        >
                          <Plus className="w-3 h-3" />
                        </Button>
                      </div>

                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => onRemoveItem(item.menuItem.id, item.selectedSize!)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                  ))}
                </div>

                <Separator />

                {/* Order Total */}
                <div className="bg-bakery-cream p-4 rounded-lg">
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>Total:</span>
                    <span>₹{calculateTotal()}</span>
                  </div>
                </div>

                <Separator />

                {/* Customer Details Form */}
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <User className="w-4 h-4" />
                    Customer Details
                  </h3>
                  
                  <div className="space-y-3">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input
                        id="name"
                        placeholder="Enter your full name"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input
                        id="phone"
                        placeholder="Enter your phone number"
                        value={customerPhone}
                        onChange={(e) => setCustomerPhone(e.target.value)}
                      />
                    </div>

                    <div>
                      <Label htmlFor="delivery-date">Preferred Delivery Date *</Label>
                      <Input
                        id="delivery-date"
                        type="date"
                        value={deliveryDate}
                        onChange={(e) => setDeliveryDate(e.target.value)}
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>

                    <div>
                      <Label htmlFor="notes">Special Instructions (Optional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any special requests or notes..."
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                        rows={3}
                      />
                    </div>
                  </div>
                </div>

                {/* Place Order Button */}
                <Button 
                  onClick={generateWhatsAppMessage}
                  className="w-full bg-green-600 hover:bg-green-700 text-white"
                  size="lg"
                >
                  <MessageCircle className="w-4 h-4 mr-2" />
                  Send Order via WhatsApp
                </Button>

                <p className="text-xs text-muted-foreground text-center">
                  Your order will be sent via WhatsApp for confirmation
                </p>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};