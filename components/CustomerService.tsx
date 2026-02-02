
import React, { useState } from 'react';
import { GoogleGenAI } from '@google/genai';
import { ChatMessage } from '../types';
import { Send, User, Shield, Terminal, Zap } from 'lucide-react';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const CustomerService: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', content: 'IJONG-SUPPORT Online. Bagaimana saya bisa membantu Anda hari ini? Saya bisa memberikan saran teknis, info stok, atau bantuan build PC.' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg: ChatMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: input,
        config: {
          systemInstruction: 'Anda adalah Asisten Customer Service Ijong Mechanics bernama "Ijong-Support". Anda ahli dalam perangkat keras komputer (GPU, CPU, Monitor) dan teknik daur ulang teknologi (upcycling). Kepribadian Anda membantu, teknis, tapi tetap "cool" dan industrial. Berikan jawaban dalam Bahasa Indonesia yang ringkas.',
          temperature: 0.7,
        }
      });
      
      setMessages(prev => [...prev, { role: 'assistant', content: response.text || 'Gagal terhubung ke pusat data.' }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: 'assistant', content: 'Terjadi gangguan sinyal. Mohon ulangi kembali.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto h-[700px] flex flex-col bg-slate-900 border border-white/10 rounded-2xl overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 duration-700">
      <div className="bg-slate-950 p-6 border-b border-white/5 flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center border border-emerald-500/30">
            <Shield className="text-emerald-500" size={24} />
          </div>
          <div>
            <h3 className="val-font text-xl font-black uppercase italic leading-none">Ijong <span className="text-emerald-500">Support</span></h3>
            <span className="text-[9px] text-emerald-500/50 uppercase tracking-[0.3em] font-black">AI Operator // Verified</span>
          </div>
        </div>
        <div className="flex gap-1">
          <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
          <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-tighter">Live Support</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-6 bg-slate-900/50">
        {messages.map((m, i) => (
          <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[75%] p-5 rounded-2xl text-sm leading-relaxed ${
              m.role === 'user' 
                ? 'bg-emerald-500 text-slate-950 font-bold rounded-tr-none' 
                : 'bg-slate-800 border border-white/5 text-gray-200 rounded-tl-none font-mono'
            }`}>
              {m.content}
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
             <div className="bg-slate-800 border border-white/5 p-4 rounded-2xl flex gap-1">
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></div>
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
             </div>
          </div>
        )}
      </div>

      <div className="p-6 bg-slate-950 border-t border-white/5 flex gap-4">
        <input 
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && sendMessage()}
          placeholder="Type your technical inquiry..."
          className="flex-1 bg-white/5 border border-white/10 rounded-xl px-6 text-sm focus:border-emerald-500 outline-none transition-colors val-font"
        />
        <button 
          onClick={sendMessage}
          disabled={isTyping}
          className="p-4 bg-emerald-500 text-slate-950 rounded-xl hover:bg-emerald-400 disabled:opacity-50 transition-all"
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
};

export default CustomerService;
