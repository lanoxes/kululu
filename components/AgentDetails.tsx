
import React, { useState } from 'react';
import { Agent, ChatMessage } from '../types';
import { getAgentResponse } from '../services/gemini';
import { Send, MapPin, Shield, Info, MessageSquare, User, Zap } from 'lucide-react';

interface AgentDetailsProps {
  agent: Agent;
}

const AgentDetails: React.FC<AgentDetailsProps> = ({ agent }) => {
  const [activeTab, setActiveTab] = useState<'biodata' | 'abilities' | 'chat'>('biodata');
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
    setChatHistory(prev => [...prev, { role: 'assistant', content: reply }]);
    setIsTyping(false);
  };

  return (
    <div className="bg-white/5 border border-white/10 rounded-xl overflow-hidden flex flex-col h-full shadow-2xl animate-in fade-in slide-in-from-right-10 duration-500">
      {/* Tab Navigation */}
      <div className="flex border-b border-white/10 bg-white/5 flex-wrap">
        {(['biodata', 'abilities', 'chat'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 min-w-[100px] py-6 val-font text-lg tracking-widest transition-all relative font-black uppercase italic ${
              activeTab === tab ? 'text-[#ff4655]' : 'text-gray-500 hover:text-white'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-[#ff4655] shadow-[0_0_20px_#ff4655]"></div>
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-10 space-y-8">
        {activeTab === 'biodata' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 bg-[#ff4655]/10 px-4 py-2 rounded border border-[#ff4655]/20">
                <MapPin size={16} className="text-[#ff4655]" />
                <span className="text-xs font-black uppercase tracking-widest">{agent.origin}</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-500/10 px-4 py-2 rounded border border-blue-500/20">
                <Shield size={16} className="text-blue-500" />
                <span className="text-xs font-black uppercase tracking-widest">{agent.role}</span>
              </div>
            </div>
            
            <div className="relative">
               <div className="absolute -left-6 top-0 bottom-0 w-1 bg-[#ff4655] opacity-30"></div>
               <p className="text-2xl leading-relaxed text-gray-300 italic font-light font-serif">
                "{agent.bio}"
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-white/5">
               <div className="space-y-2">
                  <span className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.4em]">Combat Assessment</span>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-[#ff4655]" style={{ width: '85%' }}></div>
                  </div>
               </div>
               <div className="space-y-2">
                  <span className="text-[10px] text-gray-600 font-bold uppercase tracking-[0.4em]">Tactical Utility</span>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                     <div className="h-full bg-blue-500" style={{ width: '70%' }}></div>
                  </div>
               </div>
            </div>
          </div>
        )}

        {activeTab === 'abilities' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in duration-500">
            {agent.abilities.map((ability) => (
              <div key={ability.slot} className="p-6 bg-white/5 border border-white/5 rounded-lg group hover:border-[#ff4655]/30 transition-all">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-[#ff4655]/50 bg-[#ff4655]/5 text-[#ff4655] val-font font-black rounded">
                    {ability.slot}
                  </div>
                  <h4 className="val-font text-xl font-bold italic uppercase tracking-tight group-hover:text-[#ff4655] transition-colors">
                    {ability.name}
                  </h4>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed uppercase tracking-widest opacity-70">
                  {ability.description}
                </p>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'chat' && (
          <div className="flex flex-col h-full animate-in fade-in duration-500">
            <div className="flex-1 space-y-6 mb-8 min-h-[400px]">
              {chatHistory.length === 0 && (
                <div className="text-center py-20 opacity-30">
                  <MessageSquare size={64} className="mx-auto mb-4 text-[#ff4655]" />
                  <p className="val-font text-sm tracking-widest uppercase font-black">Uplink Established. Communication Ready.</p>
                </div>
              )}
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-5 rounded-xl text-xs font-bold tracking-widest uppercase leading-loose ${
                    msg.role === 'user' 
                      ? 'bg-[#ff4655] text-[#0f1923]' 
                      : 'bg-white/5 border border-white/10 text-gray-200'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 border border-white/10 p-4 rounded-xl flex gap-2">
                    <div className="w-1.5 h-1.5 bg-[#ff4655] rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-[#ff4655] rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-[#ff4655] rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-auto bg-[#0f1923] p-4 rounded-xl border border-white/10 flex items-center gap-4">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder={`Uplink to ${agent.name}...`}
                className="flex-1 bg-transparent border-none outline-none text-xs font-bold uppercase tracking-widest focus:ring-0"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isTyping}
                className="p-3 bg-[#ff4655] text-[#0f1923] rounded-lg hover:bg-white transition-all disabled:opacity-50"
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
