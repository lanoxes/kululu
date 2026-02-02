
import { Agent } from './types';

export const AGENTS: Agent[] = [
  {
    id: 'jett',
    name: 'JETT',
    role: 'Duelist',
    origin: 'South Korea',
    image: 'https://images.unsplash.com/photo-1614036417651-efe591214972?q=80&w=1000&auto=format&fit=crop',
    bio: 'Representing her home country of South Korea, Jett’s agile and evasive fighting style lets her take risks no one else can. She runs circles around every skirmish, cutting enemies before they even know what hit them.',
    stats: { aggression: 95, tactical: 40, difficulty: 60 },
    abilities: [
      { slot: 'Q', name: 'Updraft', description: 'Instantly propel Jett high into the air.' },
      { slot: 'E', name: 'Tailwind', description: 'Instantly propel Jett in the direction she is moving.' },
      { slot: 'C', name: 'Cloudburst', description: 'Instantly throw a projectile that expands into a brief vision-blocking cloud.' },
      { slot: 'X', name: 'Blade Storm', description: 'Equip a set of highly accurate throwing knives.' }
    ]
  },
  {
    id: 'sage',
    name: 'SAGE',
    role: 'Sentinel',
    origin: 'China',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000&auto=format&fit=crop',
    bio: 'The stronghold of China, Sage creates safety for herself and her team wherever she goes. Able to revive fallen friends and stave off aggressive pushes, she provides a calm center to a hellish fight.',
    stats: { aggression: 30, tactical: 90, difficulty: 40 },
    abilities: [
      { slot: 'Q', name: 'Slow Orb', description: 'Throw a slowing orb that creates a lingering field.' },
      { slot: 'E', name: 'Healing Orb', description: 'Heal an ally or yourself over time.' },
      { slot: 'C', name: 'Barrier Orb', description: 'Deploy a solid wall.' },
      { slot: 'X', name: 'Resurrection', description: 'Revive a fallen ally with full health.' }
    ]
  },
  {
    id: 'viper',
    name: 'VIPER',
    role: 'Controller',
    origin: 'USA',
    image: 'https://images.unsplash.com/photo-1552820728-8b83bb6b773f?q=80&w=1000&auto=format&fit=crop',
    bio: 'The American chemist, Viper deploys an array of poisonous chemical devices to control the battlefield and cripple the enemy’s vision. If the toxins don’t kill her prey, her mind games surely will.',
    stats: { aggression: 60, tactical: 95, difficulty: 80 },
    abilities: [
      { slot: 'Q', name: 'Poison Cloud', description: 'Deploy a gas emitter that creates a toxic smoke cloud.' },
      { slot: 'E', name: 'Toxic Screen', description: 'Deploy a long line of gas emitters that creates a tall wall of toxic gas.' },
      { slot: 'C', name: 'Snake Bite', description: 'Fire a canister that shatters and creates a chemical pool.' },
      { slot: 'X', name: 'Viper’s Pit', description: 'Create a massive chemical cloud that obscures vision and decays health.' }
    ]
  },
  {
    id: 'kayo',
    name: 'KAY/O',
    role: 'Initiator',
    origin: 'Unknown',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?q=80&w=1000&auto=format&fit=crop',
    bio: 'KAY/O is a machine of war built for a single purpose: neutralizing radiants. His power to suppress enemy abilities dismantles his opponents’ capacity to fight back, giving him and his allies the ultimate edge.',
    stats: { aggression: 80, tactical: 75, difficulty: 70 },
    abilities: [
      { slot: 'Q', name: 'FLASH/drive', description: 'Equip a flash grenade. Fire to throw a flash that explodes after a short fuse.' },
      { slot: 'E', name: 'ZERO/point', description: 'Equip a suppression blade. Throw it to suppress anyone in the radius.' },
      { slot: 'C', name: 'FRAG/ment', description: 'Equip an explosive fragment. Throw it to pulse multiple times and deal damage.' },
      { slot: 'X', name: 'NULL/cmd', description: 'Overload with polarized radianite energy that pulses and suppresses enemies.' }
    ]
  }
];
