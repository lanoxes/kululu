
import React, { useState } from 'react';
import { Agent, Ability, ChatMessage } from '../types';
import { getAgentResponse } from '../services/gemini';
import { Send, MapPin, User, Shield, Info } from 'lucide-react';

interface AgentDetailsProps {
  agent: Agent;
}

const AgentDetails: React.FC<AgentDetailsProps> = ({ agent }) => {
  const [activeTab, setActiveTab] = useState<'bio' | 'abilities' | 'chat'>('bio');
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg: ChatMessage = { role: 'user', content: input };
    setChatHistory(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const reply = await getAgentResponse(agent, input);
    
    // Fixed: Changed role from 'agent' to 'assistant' to match ChatMessage type definition
    setChatHistory(prev => [...prev, { role: 'assistant', content: reply }]);
    setIsTyping(false);
  };

  return (
    <div className="bg-[#1a2b3c]/50 backdrop-blur-md rounded-lg border border-white/5 overflow-hidden flex flex-col h-full shadow-2xl">
      <div className="flex border-b border-white/10 bg-[#1a2b3c]">
        {(['bio', 'abilities', 'chat'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-4 val-font text-lg tracking-wider transition-all relative overflow-hidden ${
              activeTab === tab ? 'text-valorant-red' : 'text-gray-400 hover:text-white'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-valorant-red shadow-[0_0_10px_#ff4655]"></div>
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
        {activeTab === 'bio' && (
          <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded border border-white/10">
                <MapPin size={16} className="text-valorant-red" />
                <span className="text-sm font-semibold uppercase tracking-tight">{agent.origin}</span>
              </div>
              <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded border border-white/10">
                <Shield size={16} className="text-valorant-red" />
                <span className="text-sm font-semibold uppercase tracking-tight">{agent.role}</span>
              </div>
            </div>
            
            <div className="relative">
              <p className="text-lg leading-relaxed text-gray-300 italic font-light">
                "{agent.bio}"
              </p>
              <div className="absolute -left-4 top-0 h-full w-1 bg-valorant-red opacity-30"></div>
            </div>

            <div className="mt-8">
              <h4 className="val-font text-xl text-valorant-red mb-4">Tactical Evaluation</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white/5 p-4 rounded border border-white/5">
                  <span className="text-xs text-gray-500 block mb-1 uppercase tracking-tighter">Combat Style</span>
                  <span className="text-sm">High Mobility, Aggressive</span>
                </div>
                <div className="bg-white/5 p-4 rounded border border-white/5">
                  <span className="text-xs text-gray-500 block mb-1 uppercase tracking-tighter">Difficulty</span>
                  <div className="flex gap-1">
                    <div className="h-1.5 w-6 bg-valorant-red"></div>
                    <div className="h-1.5 w-6 bg-valorant-red"></div>
                    <div className="h-1.5 w-6 bg-gray-700"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'abilities' && (
          <div className="space-y-4 animate-fadeIn">
            {agent.abilities.map((ability) => (
              <div 
                key={ability.slot} 
                className="group bg-white/5 p-4 rounded-lg border border-white/5 hover:border-valorant-red/30 transition-all cursor-default"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <span className="flex items-center justify-center w-8 h-8 rounded bg-valorant-red/20 text-valorant-red font-bold text-sm border border-valorant-red/30">
                      {ability.slot}
                    </span>
                    <h4 className="font-bold text-lg group-hover:text-valorant-red transition-colors">{ability.name}</h4>
                  </div>
                  <Info size={16} className="text-gray-600 group-hover:text-valorant-red/50" />
                </div>
                <p className="text-sm text-gray-400 leading-relaxed pl-11">
                  {ability.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="flex flex-col h-full animate-fadeIn">
            <div className="flex-1 space-y-4 mb-4">
              {chatHistory.length === 0 && (
                <div className="text-center py-10 opacity-40">
                  <User size={48} className="mx-auto mb-4" />
                  <p className="text-sm val-font tracking-widest uppercase">Protocol Initialized. Send a message to {agent.name}.</p>
                </div>
              )}
              {chatHistory.map((msg, idx) => (
                <div 
                  key={idx} 
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm shadow-sm ${
                    msg.role === 'user' 
                      ? 'bg-valorant-red text-white rounded-br-none' 
                      : 'bg-[#1a2b3c] border border-white/10 text-gray-200 rounded-bl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-[#1a2b3c] border border-white/10 p-3 rounded-lg flex gap-1 animate-pulse">
                    <div className="w-2 h-2 bg-valorant-red rounded-full"></div>
                    <div className="w-2 h-2 bg-valorant-red rounded-full delay-75"></div>
                    <div className="w-2 h-2 bg-valorant-red rounded-full delay-150"></div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="sticky bottom-0 bg-[#0f1923] p-2 rounded-lg flex items-center gap-2 border border-white/10">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={`Ask ${agent.name} something...`}
                className="flex-1 bg-transparent border-none outline-none text-sm p-2 focus:ring-0"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isTyping}
                className="p-2 text-valorant-red hover:bg-white/5 rounded-full transition-colors disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentDetails;