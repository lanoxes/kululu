
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
      className={`relative group cursor-pointer transition-all duration-500 overflow-hidden border-2 ${
        isSelected 
          ? 'border-[#ff4655] bg-[#ff4655]/10 shadow-[0_0_30px_rgba(255,70,85,0.1)]' 
          : 'border-white/10 bg-white/5 hover:border-white/30'
      }`}
    >
      <div className="h-40 overflow-hidden relative">
        <img 
          src={agent.image} 
          alt={agent.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1923] via-[#0f1923]/20 to-transparent"></div>
        <div className="absolute top-3 left-3">
          <div className="text-[8px] font-black tracking-[0.3em] text-[#ff4655] uppercase bg-[#0f1923]/80 px-2 py-0.5 rounded-sm mb-1">
            {agent.role}
          </div>
          <h3 className="val-font text-2xl font-black italic tracking-tighter uppercase">{agent.name}</h3>
        </div>
      </div>
      {isSelected && (
        <div className="absolute bottom-0 right-0 w-8 h-8 bg-[#ff4655] flex items-center justify-center">
           <div className="w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
        </div>
      )}
    </div>
  );
};

export default AgentCard;
