
import React, { useState, useRef, useEffect } from 'react';
import { PRODUCTS } from '../constants';
import { Product } from '../types';
import { Box, Play, RefreshCw, Zap, Filter, Shield, Package } from 'lucide-react';

interface CaseOpeningProps {
  inventory: string[];
  onCaseOpened: (id: string) => void;
}

const CaseOpening: React.FC<CaseOpeningProps> = ({ inventory, onCaseOpened }) => {
  const [isSpinning, setIsSpinning] = useState(false);
  const [reward, setReward] = useState<Product | null>(null);
  const [reelItems, setReelItems] = useState<Product[]>([]);
  const [activeCaseId, setActiveCaseId] = useState<string | null>(null);
  const reelRef = useRef<HTMLDivElement>(null);

  // Get unique cases from inventory
  const inventoryCases = PRODUCTS.filter(p => 
    p.category === 'Supply Cases' && inventory.includes(p.id)
  ).map(p => ({
    ...p,
    count: inventory.filter(id => id === p.id).length
  }));

  const generateReel = () => {
    const items = [];
    const highEndHardware = PRODUCTS.filter(p => 
      p.category !== 'Supply Cases' && p.category !== 'Steam Balance'
    );
    for (let i = 0; i < 60; i++) {
      items.push(highEndHardware[Math.floor(Math.random() * highEndHardware.length)]);
    }
    setReelItems(items);
    return items;
  };

  const handleOpenCase = (id: string) => {
    if (isSpinning) return;
    
    setActiveCaseId(id);
    const items = generateReel();
    setIsSpinning(true);
    setReward(null);

    // Remove from inventory immediately when decryption starts
    onCaseOpened(id);

    setTimeout(() => {
      const winningIndex = 50 + Math.floor(Math.random() * 5);
      const winningItem = items[winningIndex];
      
      if (reelRef.current) {
        const itemWidth = 160;
        const offset = winningIndex * itemWidth - (window.innerWidth / 4);
        reelRef.current.style.transition = 'transform 6s cubic-bezier(0.1, 0, 0, 1)';
        reelRef.current.style.transform = `translateX(-${offset}px)`;
      }

      setTimeout(() => {
        setReward(winningItem);
        setIsSpinning(false);
      }, 6500);
    }, 100);
  };

  const resetReel = () => {
    if (reelRef.current) {
      reelRef.current.style.transition = 'none';
      reelRef.current.style.transform = 'translateX(0)';
    }
    setReward(null);
    setActiveCaseId(null);
  };

  return (
    <div className="flex flex-col items-center py-6 animate-in fade-in zoom-in duration-500">
      <div className="text-center mb-10">
        <h2 className="heading-font text-5xl font-bold italic tracking-tighter uppercase mb-3">Personal <span className="text-emerald-500">Inventory</span></h2>
        <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">Decipher your acquired digital assets from the grid.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20 w-full max-w-6xl">
        {inventoryCases.length === 0 ? (
          <div className="col-span-full py-24 text-center border-2 border-dashed border-white/5 rounded-[3rem] bg-white/[0.01]">
            <Package size={64} className="mx-auto mb-6 text-slate-800" />
            <h4 className="heading-font text-xl font-bold uppercase tracking-widest text-slate-600">Inventory Empty</h4>
            <p className="text-[10px] text-slate-700 font-black uppercase tracking-[0.3em] mt-2">Purchase supply nodes from the market to begin decryption.</p>
          </div>
        ) : (
          inventoryCases.map(c => (
            <div 
              key={c.id} 
              className={`bg-slate-900 border p-6 rounded-[2.5rem] flex flex-col gap-5 group transition-all relative overflow-hidden ${
                activeCaseId === c.id ? 'border-emerald-500 shadow-2xl shadow-emerald-500/20' : 'border-white/5 hover:border-emerald-500/30'
              }`}
            >
              <div className="flex items-center gap-4 z-10">
                <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center relative">
                  <Box size={28} className="text-emerald-500" />
                  <span className="absolute -top-2 -right-2 bg-emerald-500 text-slate-950 text-[10px] font-black w-6 h-6 rounded-full flex items-center justify-center">
                    {c.count}
                  </span>
                </div>
                <div>
                  <h4 className="heading-font text-lg font-bold uppercase italic leading-tight">{c.name}</h4>
                  <div className="flex items-center gap-2 mt-1">
                    <span className={`w-2 h-2 rounded-full ${
                      c.rarity === 'legendary' ? 'bg-yellow-500' :
                      c.rarity === 'mythical' ? 'bg-rose-500' :
                      c.rarity === 'rare' ? 'bg-purple-500' :
                      c.rarity === 'uncommon' ? 'bg-blue-500' : 'bg-slate-500'
                    }`}></span>
                    <p className="text-[9px] text-slate-500 tracking-widest font-black uppercase">{c.rarity} tier</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-auto flex items-center justify-between z-10">
                <div className="flex flex-col">
                  <span className="text-[8px] text-slate-600 font-black uppercase tracking-widest">Status</span>
                  <span className="text-xs font-bold text-emerald-500 uppercase tracking-widest">Awaiting Link</span>
                </div>
                <button 
                  disabled={isSpinning}
                  onClick={() => handleOpenCase(c.id)}
                  className="bg-emerald-500 text-slate-950 px-8 py-3 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-400 transition-all disabled:opacity-50 shadow-lg shadow-emerald-500/10"
                >
                  DECRYPT NODE
                </button>
              </div>

              <div className="absolute -bottom-10 -right-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <Box size={140} className="text-emerald-500" />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Roulette View */}
      {(isSpinning || reward) && (
        <div className="w-full relative overflow-hidden bg-slate-900/50 border-y border-white/5 py-16 mb-20 animate-in fade-in slide-in-from-bottom-10 duration-700">
          <div className="absolute left-1/2 top-0 bottom-0 w-0.5 bg-emerald-500 z-10 shadow-[0_0_20px_#10b981]"></div>
          <div 
            ref={reelRef}
            className="flex gap-4 px-[50%] will-change-transform"
          >
            {reelItems.map((item, idx) => (
              <div key={idx} className="w-36 h-48 bg-slate-800/40 border border-white/5 rounded-3xl flex flex-col p-4 shrink-0 backdrop-blur-md">
                 <div className="h-2/3 mb-3 rounded-2xl overflow-hidden bg-slate-950/50">
                    <img src={item.image} className="w-full h-full object-cover grayscale opacity-40" />
                 </div>
                 <p className="text-[8px] font-black uppercase truncate text-slate-500 tracking-tighter">{item.name}</p>
                 <div className="h-1 w-full mt-auto rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full" style={{ backgroundColor: item.color, width: '100%' }}></div>
                 </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {reward && (
        <div className="mt-4 text-center animate-in zoom-in duration-700 max-w-lg">
           <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-6 border border-emerald-500/20 shadow-2xl shadow-emerald-500/10">
              <Zap className="text-emerald-500" size={36} />
           </div>
           <h3 className="heading-font text-4xl font-bold uppercase italic mb-2">Decrypted: <span className="text-emerald-500">{reward.name}</span></h3>
           <p className="text-[10px] text-slate-500 uppercase font-black tracking-[0.4em] mb-8">Hardware Node Market Value: ${reward.price.toLocaleString()}</p>
           <button onClick={resetReel} className="flex items-center gap-3 mx-auto text-[10px] font-black uppercase tracking-[0.2em] text-slate-500 hover:text-white transition-all bg-white/5 px-8 py-4 rounded-2xl border border-white/5">
              <RefreshCw size={14} /> Clear Uplink
           </button>
        </div>
      )}
    </div>
  );
};

export default CaseOpening;
