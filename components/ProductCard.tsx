
import React from 'react';
import { Product } from '../types';
import { Recycle, Zap, Heart, Plus, Star, Box, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  isSelected: boolean;
  isWishlisted: boolean;
  onToggleWishlist: (e: React.MouseEvent) => void;
  onAddToCart: (e: React.MouseEvent) => void;
  onClick: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  isSelected, 
  isWishlisted, 
  onToggleWishlist, 
  onAddToCart, 
  onClick 
}) => {
  const isCase = product.category === 'Supply Cases';

  return (
    <div 
      onClick={onClick}
      className={`relative group cursor-pointer transition-all duration-700 overflow-hidden rounded-[2rem] border-2 ${
        isSelected 
          ? 'border-emerald-500 bg-emerald-500/5 shadow-2xl shadow-emerald-500/10' 
          : 'border-white/5 bg-white/[0.02] hover:border-white/20'
      }`}
    >
      <div className="h-60 overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-80"></div>
        
        <div className="absolute top-5 left-5 flex flex-col gap-2 z-10">
          {product.isUpcycled && (
            <div className="bg-emerald-500 text-slate-950 px-3 py-1 rounded-xl text-[9px] font-black flex items-center gap-2 uppercase tracking-widest shadow-lg">
              <Recycle size={12} /> Salvaged
            </div>
          )}
          {product.isRecommended && (
            <div className="bg-amber-500 text-slate-950 px-3 py-1 rounded-xl text-[9px] font-black flex items-center gap-2 uppercase tracking-widest shadow-lg animate-pulse">
              <Sparkles size={12} /> Top Pick
            </div>
          )}
        </div>

        <div className="absolute top-5 right-5 flex flex-col gap-2 translate-x-16 group-hover:translate-x-0 transition-transform duration-500 z-10">
          <button 
            onClick={onToggleWishlist}
            className={`p-3 rounded-2xl backdrop-blur-md transition-all ${
              isWishlisted ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20' : 'bg-white/10 text-white hover:bg-rose-500'
            }`}
          >
            <Heart size={18} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
          {!isCase && (
            <button 
              onClick={onAddToCart}
              className="p-3 bg-emerald-500 text-slate-950 rounded-2xl hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 transition-all"
            >
              <Plus size={18} />
            </button>
          )}
        </div>
      </div>

      <div className="p-7">
        <div className="flex justify-between items-center mb-3">
          <p className="text-[9px] tracking-[0.3em] text-emerald-500 font-black uppercase opacity-60">{product.category}</p>
          <div className="flex items-center gap-1.5 bg-slate-800/50 px-2 py-0.5 rounded-lg border border-white/5">
            <Star size={10} className="text-yellow-500 fill-current" />
            <span className="text-[10px] font-black text-slate-300">{product.rating}</span>
          </div>
        </div>
        <h3 className="heading-font text-xl font-bold leading-tight mb-4 truncate uppercase italic tracking-tight">{product.name}</h3>
        
        <div className="flex items-end justify-between">
           <div className="space-y-1">
              <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Pricing</span>
              <p className="heading-font text-2xl font-bold text-white tracking-tight">${product.price.toLocaleString()}</p>
           </div>
           <div className="flex flex-col items-end gap-1.5">
              <span className="text-[8px] text-slate-600 font-black uppercase tracking-widest">Purity Index</span>
              <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-emerald-500 transition-all duration-1000" 
                  style={{ width: `${product.recycledContent}%` }}
                ></div>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
