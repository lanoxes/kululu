
import React, { useState, useEffect } from 'react';
import { AGENTS } from './constants';
import { Agent } from './types';
import AgentCard from './components/AgentCard';
import AgentDetails from './components/AgentDetails';
import { User, Menu, X, Shield, Zap, Info, MessageSquare } from 'lucide-react';

const App: React.FC = () => {
  const [selectedAgent, setSelectedAgent] = useState<Agent>(AGENTS[0]);
  const [loading, setLoading] = useState(true);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#0f1923] flex flex-col items-center justify-center z-50">
        <div className="w-16 h-16 border-4 border-[#ff4655] border-t-transparent rounded-full animate-spin mb-4"></div>
        <h1 className="val-font text-2xl text-[#ece8e1] tracking-[0.3em] animate-pulse">VALORANT // ARCHIVE</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#ece8e1] text-[#0f1923] flex flex-col font-sans">
      {/* Navbar */}
      <header className="bg-[#0f1923] text-[#ece8e1] h-20 flex items-center px-6 md:px-12 sticky top-0 z-40">
        <div className="flex items-center gap-4 cursor-pointer" onClick={() => window.location.reload()}>
          <div className="w-10 h-10 bg-[#ff4655] flex items-center justify-center rotate-45 group">
            <Zap className="text-white -rotate-45" size={20} />
          </div>
          <div className="flex flex-col">
            <span className="val-font text-xl font-black tracking-tighter">VALORANT</span>
            <span className="text-[10px] text-[#ff4655] font-bold tracking-[0.4em] -mt-1 uppercase">Protocol</span>
          </div>
        </div>

        <nav className="hidden md:flex items-center gap-10 ml-20">
          <a href="#" className="val-font text-sm font-black tracking-widest hover:text-[#ff4655] transition-colors border-b-2 border-[#ff4655]">AGENTS</a>
          <a href="#" className="val-font text-sm font-black tracking-widest hover:text-[#ff4655] transition-colors opacity-50 cursor-not-allowed">MAPS</a>
          <a href="#" className="val-font text-sm font-black tracking-widest hover:text-[#ff4655] transition-colors opacity-50 cursor-not-allowed">ARSENAL</a>
        </nav>

        <div className="ml-auto flex items-center gap-6">
          <div className="hidden sm:flex flex-col items-end">
            <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest">Active Operator</span>
            <span className="val-font text-sm font-black tracking-wider uppercase">{selectedAgent.name}</span>
          </div>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="md:hidden p-2 hover:bg-white/10 rounded">
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden relative">
        {/* Sidebar / Roster */}
        <aside className={`fixed inset-0 lg:relative lg:inset-auto z-30 bg-[#ece8e1] lg:w-[400px] border-r border-[#0f1923]/10 transform transition-transform duration-300 ${isMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
          <div className="p-8 h-full flex flex-col">
            <div className="mb-8">
              <h2 className="val-font text-4xl font-black italic tracking-tighter uppercase mb-2">The <span className="text-[#ff4655]">Roster</span></h2>
              <div className="h-1 w-20 bg-[#ff4655]"></div>
            </div>
            
            <div className="flex-1 overflow-y-auto pr-4 space-y-4 custom-scrollbar">
              {AGENTS.map((agent) => (
                <AgentCard 
                  key={agent.id} 
                  agent={agent} 
                  isSelected={selectedAgent.id === agent.id}
                  onClick={() => {
                    setSelectedAgent(agent);
                    setIsMenuOpen(false);
                  }}
                />
              ))}
            </div>
          </div>
        </aside>

        {/* Details View */}
        <section className="flex-1 bg-[#0f1923] text-[#ece8e1] relative overflow-hidden flex flex-col">
          {/* Decorative background text */}
          <div className="absolute top-20 -right-20 pointer-events-none select-none">
            <span className="val-font text-[15rem] font-black opacity-[0.03] uppercase italic">{selectedAgent.name}</span>
          </div>
          
          <div className="flex-1 overflow-y-auto p-6 md:p-12 relative z-10 custom-scrollbar">
            <AgentDetails agent={selectedAgent} />
          </div>
        </section>
      </main>

      {/* Mobile Backdrop */}
      {isMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-20 lg:hidden" onClick={() => setIsMenuOpen(false)}></div>
      )}
    </div>
  );
};

export default App;
