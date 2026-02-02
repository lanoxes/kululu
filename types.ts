
export enum ProductCategory {
  HARDWARE = 'Hardware',
  ACCESSORY = 'Recycled Accessory',
  PERIPHERAL = 'Peripheral',
  PACKAGE = 'PC Package',
  GAME_REBOOT = 'Ijong Game-Reboots'
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
  recycledContent: number; // Percentage 0-100
  image: string;
  color: string;
  isUpcycled: boolean;
  rating: number;
  reviewsCount: number;
  reviews?: Review[];
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

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
