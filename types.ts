
export interface Ability {
  slot: string;
  name: string;
  description: string;
}

export interface Agent {
  id: string;
  name: string;
  role: 'Duelist' | 'Initiator' | 'Sentinel' | 'Controller';
  image: string;
  origin: string;
  bio: string;
  abilities: Ability[];
  stats: {
    aggression: number;
    tactical: number;
    difficulty: number;
  };
}

export interface ChatMessage {
  role: 'user' | 'assistant';
  content: string;
}
