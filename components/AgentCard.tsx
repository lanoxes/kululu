
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
      className={`relative cursor-pointer transition-all duration-300 group ${
        isSelected ? 'scale-105' : 'hover:scale-[1.02]'
      }`}
    >
      <div className={`absolute inset-0 bg-[#ff4655] transform -skew-x-6 transition-transform ${isSelected ? 'opacity-100 scale-100' : 'opacity-0 scale-95 group-hover:opacity-20'}`}></div>
      <div className={`relative flex items-center gap-6 p-4 bg-white border border-[#0f1923]/10 transform -skew-x-6 overflow-hidden ${isSelected ? 'border-transparent shadow-xl' : 'hover:bg-gray-50'}`}>
        {/* Undo skew for inner content */}
        <div className="flex items-center gap-6 transform skew-x-6 w-full">
          <div className="w-16 h-16 bg-[#0f1923] overflow-hidden rounded-sm relative shrink-0">
            <img 
              src={agent.image} 
              alt={agent.name} 
              className={`w-full h-full object-cover transition-all duration-500 ${isSelected ? 'scale-110' : 'grayscale group-hover:grayscale-0'}`} 
            />
            {isSelected && <div className="absolute inset-0 bg-[#ff4655]/30"></div>}
          </div>
          
          <div className="flex-1">
            <h3 className={`val-font text-xl font-black italic uppercase leading-none ${isSelected ? 'text-[#ff4655]' : 'text-[#0f1923]'}`}>
              {agent.name}
            </h3>
            <p className="text-[10px] font-bold text-[#0f1923]/50 uppercase tracking-widest mt-1">
              {agent.role}
            </p>
          </div>

          <div className="opacity-10">
            <span className="val-font text-2xl font-black italic">{agent.role[0]}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentCard;
