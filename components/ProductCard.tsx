
import React from 'react';
import { Product } from '../types';
import { Recycle, Zap, Heart, Plus, Star } from 'lucide-react';

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
  return (
    <div 
      onClick={onClick}
      className={`relative group cursor-pointer transition-all duration-500 overflow-hidden rounded-xl border-2 ${
        isSelected 
          ? 'border-emerald-500 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
          : 'border-white/5 bg-slate-900 hover:border-white/20'
      }`}
    >
      <div className="h-48 overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
        
        {product.isUpcycled && (
          <div className="absolute top-3 left-3 bg-emerald-500 text-slate-950 px-2 py-1 rounded text-[10px] font-bold flex items-center gap-1 uppercase tracking-tighter z-10">
            <Recycle size={10} /> Upcycled
          </div>
        )}

        {/* Quick Actions Overlay */}
        <div className="absolute top-3 right-3 flex flex-col gap-2 translate-x-12 group-hover:translate-x-0 transition-transform duration-300 z-10">
          <button 
            onClick={onToggleWishlist}
            className={`p-2 rounded-lg backdrop-blur-md transition-all ${
              isWishlisted ? 'bg-rose-500 text-white' : 'bg-white/10 text-white hover:bg-rose-500'
            }`}
          >
            <Heart size={16} fill={isWishlisted ? "currentColor" : "none"} />
          </button>
          <button 
            onClick={onAddToCart}
            className="p-2 bg-emerald-500 text-slate-950 rounded-lg hover:bg-emerald-400 transition-all"
          >
            <Plus size={16} />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start mb-1">
          <p className="val-font text-xs tracking-widest text-emerald-500 opacity-80">{product.category}</p>
          <span className="text-emerald-400 font-bold">${product.price.toFixed(0)}</span>
        </div>
        <h3 className="val-font text-2xl font-bold leading-none mb-2 truncate">{product.name}</h3>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center gap-1">
            <Star size={12} className="text-yellow-500 fill-current" />
            <span className="text-xs font-bold">{product.rating.toFixed(1)}</span>
          </div>
          <span className="text-[10px] text-gray-500 uppercase tracking-tighter">({product.reviewsCount} REVIEWS)</span>
        </div>

        <div className="flex items-center gap-2 mt-auto">
          <div className="flex-1 h-1 bg-white/5 rounded-full overflow-hidden">
            <div 
              className="h-full bg-emerald-500" 
              style={{ width: `${product.recycledContent}%` }}
            ></div>
          </div>
          <span className="text-[10px] text-gray-500 val-font">{product.recycledContent}% RECYCLED</span>
        </div>
      </div>
      
      {isSelected && (
        <div className="absolute top-3 right-3 text-emerald-500 animate-pulse hidden group-hover:block">
          <Zap size={16} fill="currentColor" />
        </div>
      )}
    </div>
  );
};

export default ProductCard;
