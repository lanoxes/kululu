
export enum ProductCategory {
  HARDWARE = 'Graphics Cards',
  CPU = 'Processors',
  MONITOR = 'Displays',
  KEYBOARD = 'Keyboards',
  MOUSE = 'Mouse',
  GAME_REBOOT = 'Supply Cases',
  STEAM_WALLET = 'Steam Balance'
}

export interface Specification {
  label: string;
  value: string;
}

export interface Review {
  id: string;
  user: string;
  rating: number;
  comment: string;
  date: string;
}

export interface Product {
  id: string;
  name: string;
  category: ProductCategory;
  price: number;
  description: string;
  specs: Specification[];
  recycledContent: number;
  image: string;
  color: string;
  isUpcycled: boolean;
  isRecommended?: boolean;
  rating: number;
  reviewsCount: number;
  reviews?: Review[];
  rarity?: 'common' | 'uncommon' | 'rare' | 'mythical' | 'legendary';
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}

export interface Ability {
  slot: string;
  name: string;
  description: string;
}

export interface Agent {
  id: string;
  name: string;
  role: string;
  image: string;
  origin: string;
  bio: string;
  abilities: Ability[];
}
