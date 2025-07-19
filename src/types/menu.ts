export interface MenuItem {
  id: string;
  name: string;
  category: 'cakes' | 'cookies' | 'cupcakes' | 'others';
  price250g?: number;
  price500g?: number;
  pricePerPiece?: number;
  price2Pieces?: number;
  description?: string;
  tags?: ('best-seller' | 'premium' | 'seasonal' | 'exclusive')[];
  isGlutenFree?: boolean;
  isAvailable?: boolean;
  image?: string;
}

export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  selectedSize?: '250g' | '500g' | 'piece' | '2pieces';
}

export interface OrderSummary {
  items: CartItem[];
  total: number;
  customerName: string;
  customerPhone: string;
  deliveryDate: string;
  notes?: string;
}