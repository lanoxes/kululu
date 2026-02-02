
import { Product, ProductCategory, Review } from './types';

const MOCK_REVIEWS: Review[] = [
  { id: '1', user: 'TechEnthusiast99', rating: 5, comment: 'Incredible build quality and the upcycling story is amazing.', date: '2024-03-10' },
  { id: '2', user: 'GreenGamer', rating: 4, comment: 'Works perfectly. Love the industrial aesthetic of the recycled parts.', date: '2024-03-12' }
];

export const PRODUCTS: Product[] = [
  {
    id: 'pkg-high',
    name: 'Apex Salvage [High-End]',
    category: ProductCategory.PACKAGE,
    price: 3499.00,
    recycledContent: 15,
    isUpcycled: true,
    description: 'Our flagship build. No-compromise 4K performance housed in a bespoke recycled industrial chassis with custom liquid cooling.',
    image: 'https://images.unsplash.com/photo-1587202377405-836165b1040b?auto=format&fit=crop&q=80&w=1000',
    color: '#a855f7',
    rating: 5.0,
    reviewsCount: 12,
    specs: [
      { label: 'CPU', value: 'Ryzen 9 7950X3D' },
      { label: 'GPU', value: 'RTX 4090 24GB' },
      { label: 'RAM', value: '128GB DDR5-6400' },
      { label: 'Thermal Load', value: 'Optimized < 65°C' }
    ]
  },
  {
    id: 'cs-dragonlore',
    name: 'AWP | Dragon Lore',
    category: ProductCategory.GAME_REBOOT,
    price: 12450.00,
    recycledContent: 100,
    isUpcycled: true,
    description: 'A legendary artifact reconstructed from archived server data. Pure digital craftsmanship with optimized shader cache.',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=800',
    color: '#eab308',
    rating: 5.0,
    reviewsCount: 24,
    specs: [
      { label: 'Float Value', value: '0.0124 (Factory New)' },
      { label: 'Market Volatility', value: '+14.2% YoY' },
      { label: 'Pattern Seed', value: '420' }
    ]
  },
  {
    id: 'cs-karambit-sapphire',
    name: 'Karambit | Doppler (Sapphire)',
    category: ProductCategory.GAME_REBOOT,
    price: 9200.00,
    recycledContent: 100,
    isUpcycled: true,
    description: 'A crystalline beauty forged from pure server-side sapphire logic. Perfectly balanced for tactical rotation.',
    image: 'https://images.unsplash.com/photo-1594132176008-62025373a0a3?auto=format&fit=crop&q=80&w=800',
    color: '#3b82f6',
    rating: 4.9,
    reviewsCount: 42,
    specs: [
      { label: 'Float Value', value: '0.0071 (Perfect Corner)' },
      { label: 'Market Trend', value: 'Bullish (Rising)' },
      { label: 'Finish', value: 'Doppler (Sapphire)' }
    ]
  },
  {
    id: 'cs-bravo-case',
    name: 'Operation Bravo Case',
    category: ProductCategory.GAME_REBOOT,
    price: 115.00,
    recycledContent: 100,
    isUpcycled: true,
    description: 'A physical-digital storage unit from the Bravo Era. High probability of rare mechanical metadata.',
    image: 'https://images.unsplash.com/photo-1593305841991-05c297ba4575?auto=format&fit=crop&q=80&w=800',
    color: '#10b981',
    rating: 4.7,
    reviewsCount: 320,
    specs: [
      { label: 'Rarity', value: 'High Value / Discontinued' },
      { label: 'Drop Rate', value: '0.01% Red Grade' },
      { label: 'Security', value: 'AES-256 Cloud Link' }
    ]
  }
];
