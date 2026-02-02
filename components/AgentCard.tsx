
import React from 'react';
import { Agent } from '../types';

interface AgentCardProps {
  agent: Agent;
  isSelected: boolean;
  onClick: () => void;
}

const AgentCard: React.FC<AgentCardProps> = ({ agent, isSelected, onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`relative group cursor-pointer transition-all duration-300 transform ${
        isSelected ? 'scale-105 z-10' : 'scale-100 opacity-70 hover:opacity-100 hover:scale-102'
      }`}
    >
      <div className={`agent-card-mask h-64 md:h-80 w-full overflow-hidden border-b-4 ${
        isSelected ? 'border-valorant-red ring-2 ring-rose-500/50' : 'border-white/10'
      } bg-[#1a2b3c] transition-colors`}>
        <img 
          src={agent.image} 
          alt={agent.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1923] via-transparent to-transparent"></div>
        
        <div className="absolute bottom-4 left-4">
          <p className="val-font text-xs tracking-widest text-valorant-red opacity-80">{agent.role}</p>
          <h3 className="val-font text-3xl font-bold italic">{agent.name}</h3>
        </div>
      </div>
      
      {isSelected && (
        <div className="absolute -top-2 -right-2 bg-valorant-red text-white text-[10px] val-font px-2 py-0.5 animate-pulse">
          SELECTED
        </div>
      )}
    </div>
  );
};

export default AgentCard;
