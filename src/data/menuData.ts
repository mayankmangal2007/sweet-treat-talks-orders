import { MenuItem } from '@/types/menu';

export const menuItems: MenuItem[] = [
  // CAKES
  {
    id: 'vanilla-cake',
    name: 'Vanilla (Plain with Toppings)',
    category: 'cakes',
    price250g: 179,
    price500g: 349,
    isAvailable: true,
    image: '/placeholder-cake.jpg'
  },
  {
    id: 'tooty-frooty',
    name: 'Tooty Frooty',
    category: 'cakes',
    price250g: 199,
    price500g: 379,
    isAvailable: true,
    image: '/placeholder-cake.jpg'
  },
  {
    id: 'double-chocolate',
    name: 'Double Chocolate',
    category: 'cakes',
    price250g: 220,
    price500g: 399,
    tags: ['best-seller'],
    isAvailable: true,
    image: '/placeholder-cake.jpg'
  },
  {
    id: 'occasion-special-double-chocolate',
    name: 'Occasion Special Double Chocolate (with chocolate ganache)',
    category: 'cakes',
    price250g: 299,
    price500g: 589,
    isAvailable: true,
    image: '/placeholder-cake.jpg'
  },
  {
    id: 'marble-cake',
    name: 'Marble Cake',
    category: 'cakes',
    price250g: 239,
    price500g: 449,
    isAvailable: true,
    image: '/placeholder-cake.jpg'
  },
  {
    id: 'upside-down-pineapple',
    name: 'Upside Down Pineapple',
    category: 'cakes',
    price250g: 249,
    price500g: 489,
    isAvailable: true,
    image: '/placeholder-cake.jpg'
  },
  {
    id: 'banana-double-chocolate',
    name: 'Banana Double Chocolate',
    category: 'cakes',
    price250g: 249,
    price500g: 489,
    isAvailable: true,
    image: '/placeholder-cake.jpg'
  },
  {
    id: 'dates-dry-fruits',
    name: 'Dates & Dry Fruits',
    category: 'cakes',
    price250g: 299,
    price500g: 589,
    isAvailable: true,
    image: '/placeholder-cake.jpg'
  },
  {
    id: 'banana-walnut-double-chocolate',
    name: 'Banana Walnut Double Chocolate',
    category: 'cakes',
    price250g: 299,
    price500g: 589,
    tags: ['exclusive', 'premium'],
    isAvailable: true,
    image: '/placeholder-cake.jpg'
  },
  {
    id: 'ragi-chocolate-gluten-free',
    name: 'Ragi Chocolate (Gluten Free)',
    category: 'cakes',
    price250g: 299,
    price500g: 489,
    isGlutenFree: true,
    isAvailable: true,
    image: '/placeholder-cake.jpg'
  },
  {
    id: 'upside-down-baklawa',
    name: 'Upside Down Baklawa',
    category: 'cakes',
    price250g: 299,
    price500g: 589,
    tags: ['premium'],
    isAvailable: true,
    image: '/placeholder-cake.jpg'
  },
  {
    id: 'orange-cake',
    name: 'Orange',
    category: 'cakes',
    price250g: 249,
    price500g: 489,
    tags: ['seasonal', 'premium'],
    isAvailable: true,
    image: '/placeholder-cake.jpg'
  },
  {
    id: 'lemon-cake',
    name: 'Lemon',
    category: 'cakes',
    price250g: 249,
    price500g: 489,
    isAvailable: true,
    image: '/placeholder-cake.jpg'
  },
  {
    id: 'rich-plum-cake',
    name: 'Rich Plum Cake (Non Alcoholic)',
    category: 'cakes',
    price250g: 299,
    price500g: 589,
    tags: ['exclusive', 'seasonal'],
    isAvailable: true,
    image: '/placeholder-cake.jpg'
  },

  // COOKIES
  {
    id: 'jirajmani-bites',
    name: 'JiraJmani Bites',
    category: 'cookies',
    price250g: 229,
    description: '*250gm = 12-15 Pcs.',
    isAvailable: true,
    image: '/placeholder-cookies.jpg'
  },
  {
    id: 'digestive-cookies',
    name: 'Digestive Cookies',
    category: 'cookies',
    price250g: 249,
    isAvailable: true,
    image: '/placeholder-cookies.jpg'
  },
  {
    id: 'coconut-cookies',
    name: 'Coconut Cookies',
    category: 'cookies',
    price250g: 249,
    isAvailable: true,
    image: '/placeholder-cookies.jpg'
  },
  {
    id: 'aata-naan-khatai',
    name: 'Aata Naan Khatai',
    category: 'cookies',
    price250g: 249,
    tags: ['best-seller'],
    isAvailable: true,
    image: '/placeholder-cookies.jpg'
  },
  {
    id: 'oats-choco-chips-cookies',
    name: 'Oats Choco Chips Cookies',
    category: 'cookies',
    price250g: 249,
    isAvailable: true,
    image: '/placeholder-cookies.jpg'
  },
  {
    id: 'double-chocolate-cookies',
    name: 'Double Chocolate Cookies',
    category: 'cookies',
    price250g: 249,
    tags: ['best-seller'],
    isAvailable: true,
    image: '/placeholder-cookies.jpg'
  },
  {
    id: 'oats-double-chocolate-cookies',
    name: 'Oats Double Chocolate Cookies',
    category: 'cookies',
    price250g: 259,
    isAvailable: true,
    image: '/placeholder-cookies.jpg'
  },
  {
    id: 'cherry-charmer-cookies',
    name: 'Cherry Charmer Cookies',
    category: 'cookies',
    price250g: 249,
    isAvailable: true,
    image: '/placeholder-cookies.jpg'
  },
  {
    id: 'biscoff-cookies',
    name: 'Biscoff Cookies',
    category: 'cookies',
    price250g: 269,
    tags: ['premium'],
    isAvailable: true,
    image: '/placeholder-cookies.jpg'
  },
  {
    id: 'ragi-chocolate-cookies',
    name: 'Ragi Chocolate Cookies',
    category: 'cookies',
    price250g: 269,
    isGlutenFree: true,
    isAvailable: true,
    image: '/placeholder-cookies.jpg'
  },

  // CUPCAKES
  {
    id: 'tea-cupcake-chocolate',
    name: 'Tea Cupcake (Chocolate)',
    category: 'cupcakes',
    pricePerPiece: 59,
    isAvailable: true,
    image: '/placeholder-cupcake.jpg'
  },
  {
    id: 'plum-cupcake',
    name: 'Plum Cupcake',
    category: 'cupcakes',
    pricePerPiece: 69,
    isAvailable: true,
    image: '/placeholder-cupcake.jpg'
  },
  {
    id: 'tea-cupcake-vanilla',
    name: 'Tea Cupcake (Vanilla)',
    category: 'cupcakes',
    pricePerPiece: 49,
    isAvailable: true,
    image: '/placeholder-cupcake.jpg'
  },

  // OTHERS
  {
    id: 'chocolate-donuts',
    name: 'Chocolate Donuts',
    category: 'others',
    pricePerPiece: 79,
    price2Pieces: 149,
    isAvailable: true,
    image: '/placeholder-donut.jpg'
  },
  {
    id: 'brownie',
    name: 'Brownie',
    category: 'others',
    pricePerPiece: 99,
    price2Pieces: 189,
    isAvailable: true,
    image: '/placeholder-brownie.jpg'
  },
  {
    id: 'brownie-with-chocolate-sauce',
    name: 'Brownie (with chocolate sauce)',
    category: 'others',
    pricePerPiece: 119,
    price2Pieces: 229,
    isAvailable: true,
    image: '/placeholder-brownie.jpg'
  },
  {
    id: 'choco-lava-cake',
    name: 'Choco Lava Cake',
    category: 'others',
    pricePerPiece: 99,
    price2Pieces: 189,
    isAvailable: true,
    image: '/placeholder-lava-cake.jpg'
  }
];
