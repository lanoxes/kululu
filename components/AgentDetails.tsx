
import React, { useState } from 'react';
import { Agent, ChatMessage } from '../types';
import { getAgentResponse } from '../services/gemini';
import { Send, MapPin, Shield, Info, MessageSquare, Zap } from 'lucide-react';

interface AgentDetailsProps {
  agent: Agent;
}

const AgentDetails: React.FC<AgentDetailsProps> = ({ agent }) => {
  const [activeTab, setActiveTab] = useState<'BIODATA' | 'ABILITIES' | 'CHAT'>('BIODATA');
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (!input.trim() || isTyping) return;
    
    const userMsg: ChatMessage = { role: 'user', content: input };
    setChatHistory(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await getAgentResponse(agent, input);
      setChatHistory(prev => [...prev, { role: 'assistant', content: response }]);
    } catch (error) {
      setChatHistory(prev => [...prev, { role: 'assistant', content: "SYSTEM ERROR: Uplink compromised." }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full animate-in fade-in slide-in-from-bottom-6 duration-500">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="flex items-center gap-3 text-[#ff4655] mb-2">
            <Shield size={18} />
            <span className="val-font text-sm tracking-[0.2em] font-black uppercase">{agent.role}</span>
          </div>
          <h1 className="val-font text-7xl md:text-9xl font-black italic tracking-tighter uppercase leading-none">
            {agent.name}
          </h1>
          <div className="flex items-center gap-2 mt-4 text-[#ece8e1]/60">
            <MapPin size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">{agent.origin}</span>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-8 p-6 bg-white/5 border border-white/10 backdrop-blur-sm transform -skew-x-6">
          <div className="transform skew-x-6 text-center">
            <span className="text-[10px] font-bold opacity-50 block mb-1">AGGRESSION</span>
            <span className="val-font text-2xl font-black text-[#ff4655]">{agent.stats.aggression}</span>
          </div>
          <div className="transform skew-x-6 text-center">
            <span className="text-[10px] font-bold opacity-50 block mb-1">TACTICAL</span>
            <span className="val-font text-2xl font-black">{agent.stats.tactical}</span>
          </div>
          <div className="transform skew-x-6 text-center">
            <span className="text-[10px] font-bold opacity-50 block mb-1">DIFFICULTY</span>
            <span className="val-font text-2xl font-black text-blue-400">{agent.stats.difficulty}</span>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-white/10 mb-8 overflow-x-auto no-scrollbar">
        {(['BIODATA', 'ABILITIES', 'CHAT'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-8 py-4 val-font text-lg tracking-widest font-black uppercase transition-all relative ${
              activeTab === tab ? 'text-[#ff4655]' : 'text-white/40 hover:text-white'
            }`}
          >
            {tab}
            {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-1 bg-[#ff4655]"></div>}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="flex-1 min-h-[400px]">
        {activeTab === 'BIODATA' && (
          <div className="max-w-3xl animate-in fade-in duration-500">
            <h3 className="val-font text-2xl font-black uppercase mb-4 italic text-[#ff4655]">Background</h3>
            <p className="text-xl md:text-2xl leading-relaxed font-light opacity-80 italic">
              "{agent.bio}"
            </p>
          </div>
        )}

        {activeTab === 'ABILITIES' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
            {agent.abilities.map((ability) => (
              <div key={ability.slot} className="group p-6 bg-white/5 border border-white/5 hover:border-[#ff4655]/50 transition-all flex gap-6">
                <div className="w-14 h-14 bg-[#ff4655]/10 border border-[#ff4655]/30 flex items-center justify-center shrink-0">
                  <span className="val-font text-2xl font-black text-[#ff4655]">{ability.slot}</span>
                </div>
                <div>
                  <h4 className="val-font text-xl font-black uppercase italic mb-2 group-hover:text-[#ff4655] transition-colors">{ability.name}</h4>
                  <p className="text-sm opacity-60 leading-relaxed uppercase tracking-wide">{ability.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'CHAT' && (
          <div className="flex flex-col h-full max-w-4xl mx-auto bg-black/20 rounded-xl border border-white/10 overflow-hidden animate-in fade-in duration-500">
            <div className="flex-1 p-6 overflow-y-auto space-y-4 max-h-[500px] custom-scrollbar">
              {chatHistory.length === 0 && (
                <div className="text-center py-20 opacity-30">
                  <MessageSquare size={48} className="mx-auto mb-4" />
                  <p className="val-font tracking-widest uppercase font-black text-sm">ARCHIVE UPLINK READY // START COMMUNICATION</p>
                </div>
              )}
              {chatHistory.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-4 rounded-lg text-sm tracking-wide ${
                    msg.role === 'user' 
                      ? 'bg-[#ff4655] text-[#0f1923] font-bold' 
                      : 'bg-white/10 text-white border border-white/5'
                  }`}>
                    <p className="uppercase">{msg.content}</p>
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-lg flex gap-2">
                    <div className="w-2 h-2 bg-[#ff4655] rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-[#ff4655] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-2 h-2 bg-[#ff4655] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="p-4 bg-white/5 border-t border-white/10 flex gap-4">
              <input 
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={`UPLINK TO ${agent.name}...`}
                className="flex-1 bg-transparent border-none outline-none text-sm font-bold uppercase tracking-widest focus:ring-0 placeholder:text-white/20"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isTyping}
                className="bg-[#ff4655] text-white p-3 rounded hover:bg-white hover:text-[#ff4655] transition-all disabled:opacity-50"
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
