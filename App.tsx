
import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './constants';
import { Product, ProductCategory } from './types';
import ProductCard from './components/ProductCard';
import ProductDetails from './components/ProductDetails';
import CaseOpening from './components/CaseOpening';
import CustomerService from './components/CustomerService';
import CheckoutModal from './components/CheckoutModal';
import { 
  Wrench, ShoppingCart, Heart, X, Wallet, 
  Cpu, Monitor, Box, Sparkles, MousePointer2, Keyboard as KeyboardIcon, Package
} from 'lucide-react';

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [activeMenu, setActiveMenu] = useState<'Catalog' | 'CS' | 'GameBootd'>('Catalog');
  const [filter, setFilter] = useState<ProductCategory | 'All' | 'Recommended'>('Recommended');
  const [gameBootTab, setGameBootTab] = useState<'Market' | 'Inventory'>('Market');
  
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [inventory, setInventory] = useState<string[]>([]); // New Inventory State
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setLoading(false), 800);
          return 100;
        }
        return prev + 5;
      });
    }, 40);
    return () => clearInterval(interval);
  }, []);

  const toggleWishlist = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setWishlist(prev => prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]);
  };

  const addToCart = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCart(prev => [...prev, id]);
  };

  const handleCheckoutSuccess = () => {
    // Move cart items to inventory
    setInventory(prev => [...prev, ...cart]);
    setCart([]);
    setShowCheckout(false);
  };

  const removeFromInventory = (id: string) => {
    setInventory(prev => {
      const index = prev.indexOf(id);
      if (index > -1) {
        const next = [...prev];
        next.splice(index, 1);
        return next;
      }
      return prev;
    });
  };

  const filteredProducts = filter === 'All' 
    ? PRODUCTS 
    : filter === 'Recommended'
      ? PRODUCTS.filter(p => p.isRecommended)
      : PRODUCTS.filter(p => p.category === filter);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#020617] flex flex-col items-center justify-center z-50">
        <div className="relative mb-8">
          <div className="w-24 h-24 border-2 border-emerald-500/10 border-t-emerald-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Wrench className="text-emerald-500 animate-pulse" size={32} />
          </div>
        </div>
        <div className="heading-font text-lg font-medium text-emerald-500 tracking-[0.3em] uppercase mb-4 animate-pulse">Initializing System</div>
        <div className="w-48 h-0.5 bg-white/5 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 transition-all duration-300" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#020617] text-slate-100 flex flex-col">
      <header className="sticky top-0 z-50 bg-[#020617]/80 backdrop-blur-2xl border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-14">
            <div className="flex items-center gap-3 cursor-pointer group" onClick={() => {setActiveMenu('Catalog'); setFilter('Recommended');}}>
              <div className="w-10 h-10 bg-emerald-500 flex items-center justify-center rounded-xl shadow-lg shadow-emerald-500/10 transition-transform group-hover:scale-110">
                <Wrench className="text-slate-950" size={20} />
              </div>
              <div className="flex flex-col">
                <span className="heading-font text-xl font-bold tracking-tight">IJONG</span>
                <span className="text-emerald-500 text-[9px] uppercase font-black tracking-[0.4em] -mt-1">Mechanics</span>
              </div>
            </div>
            
            <nav className="hidden lg:flex items-center gap-10">
              <button 
                onClick={() => setActiveMenu('Catalog')}
                className={`heading-font text-sm font-semibold tracking-wide transition-all ${activeMenu === 'Catalog' ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-100'}`}
              >
                Catalog
              </button>
              <button 
                onClick={() => {setActiveMenu('GameBootd'); setGameBootTab('Market');}}
                className={`heading-font text-sm font-semibold tracking-wide transition-all ${activeMenu === 'GameBootd' ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-100'}`}
              >
                GameBootd
              </button>
              <button 
                onClick={() => setActiveMenu('CS')}
                className={`heading-font text-sm font-semibold tracking-wide transition-all ${activeMenu === 'CS' ? 'text-emerald-400' : 'text-slate-500 hover:text-slate-100'}`}
              >
                Mechanic AI
              </button>
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => setShowWishlist(!showWishlist)} className="relative p-2 text-slate-400 hover:text-rose-500 transition-colors">
              <Heart size={22} fill={wishlist.length > 0 ? "currentColor" : "none"} className={wishlist.length > 0 ? "text-rose-500" : ""} />
              {wishlist.length > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-rose-500 rounded-full"></span>}
            </button>
            <button onClick={() => setShowCart(true)} className="p-2.5 bg-emerald-500/10 rounded-2xl text-emerald-500 hover:bg-emerald-500 hover:text-slate-950 transition-all relative">
              <ShoppingCart size={22} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-emerald-500 text-slate-950 text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-[#020617]">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {activeMenu === 'Catalog' && (
        <div className="bg-[#020617] border-b border-white/5 overflow-x-auto no-scrollbar">
          <div className="container mx-auto px-6 h-14 flex items-center gap-8">
            <button onClick={() => setFilter('Recommended')} className={`text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all border-b-2 h-full px-2 flex items-center gap-2 ${filter === 'Recommended' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-500'}`}>
              <Sparkles size={14} /> Top Picks
            </button>
            <button onClick={() => setFilter(ProductCategory.KEYBOARD)} className={`text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all border-b-2 h-full px-2 flex items-center gap-2 ${filter === ProductCategory.KEYBOARD ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-500'}`}>
              <KeyboardIcon size={14} /> Keyboards
            </button>
            <button onClick={() => setFilter(ProductCategory.MOUSE)} className={`text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all border-b-2 h-full px-2 flex items-center gap-2 ${filter === ProductCategory.MOUSE ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-500'}`}>
              <MousePointer2 size={14} /> Mouse
            </button>
            <button onClick={() => setFilter(ProductCategory.HARDWARE)} className={`text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all border-b-2 h-full px-2 ${filter === ProductCategory.HARDWARE ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-500'}`}>Graphics</button>
            <button onClick={() => setFilter(ProductCategory.CPU)} className={`text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all border-b-2 h-full px-2 ${filter === ProductCategory.CPU ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-500'}`}>Processors</button>
            <button onClick={() => setFilter('All')} className={`text-xs font-bold uppercase tracking-widest whitespace-nowrap transition-all border-b-2 h-full px-2 ${filter === 'All' ? 'border-emerald-500 text-emerald-400' : 'border-transparent text-slate-500'}`}>All Archive</button>
          </div>
        </div>
      )}

      <main className="flex-1 container mx-auto px-6 py-10">
        {activeMenu === 'Catalog' && (
          <div className="flex flex-col xl:flex-row gap-12">
            <div className="xl:w-7/12">
               <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    isSelected={selectedProduct.id === product.id}
                    isWishlisted={wishlist.includes(product.id)}
                    onToggleWishlist={(e) => toggleWishlist(product.id, e)}
                    onAddToCart={(e) => addToCart(product.id, e)}
                    onClick={() => setSelectedProduct(product)}
                  />
                ))}
              </div>
            </div>
            <div className="xl:w-5/12">
              <div className="sticky top-28">
                <ProductDetails product={selectedProduct} onAddToCart={() => addToCart(selectedProduct.id)} />
              </div>
            </div>
          </div>
        )}

        {activeMenu === 'GameBootd' && (
           <div className="space-y-16">
              <div className="bg-emerald-500/5 p-1 rounded-[2.5rem] border border-emerald-500/10 max-w-2xl mx-auto">
                <div className="flex items-center justify-center gap-4 p-2">
                   <button 
                    onClick={() => setGameBootTab('Market')}
                    className={`flex-1 py-4 rounded-3xl heading-font text-xs font-bold tracking-widest transition-all flex items-center justify-center gap-3 ${gameBootTab === 'Market' ? 'bg-emerald-500 text-slate-950 shadow-xl' : 'text-slate-500 hover:bg-white/5'}`}
                   >
                     <ShoppingCart size={18} /> MARKET
                   </button>
                   <button 
                    onClick={() => setGameBootTab('Inventory')}
                    className={`flex-1 py-4 rounded-3xl heading-font text-xs font-bold tracking-widest transition-all flex items-center justify-center gap-3 relative ${gameBootTab === 'Inventory' ? 'bg-emerald-500 text-slate-950 shadow-xl' : 'text-slate-500 hover:bg-white/5'}`}
                   >
                     <Package size={18} /> MY INVENTORY
                     {inventory.length > 0 && (
                       <span className={`absolute -top-1 -right-1 w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-black ${gameBootTab === 'Inventory' ? 'bg-slate-950 text-emerald-500' : 'bg-emerald-500 text-slate-950'}`}>
                         {inventory.length}
                       </span>
                     )}
                   </button>
                </div>
              </div>
              
              {gameBootTab === 'Market' ? (
                <div className="space-y-12">
                  <div className="flex justify-center gap-4">
                     <button onClick={() => setFilter(ProductCategory.GAME_REBOOT)} className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${filter === ProductCategory.GAME_REBOOT ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'border-white/5 text-slate-500 hover:text-white'}`}>Supply Cases</button>
                     <button onClick={() => setFilter(ProductCategory.STEAM_WALLET)} className={`px-6 py-3 rounded-2xl text-[10px] font-black uppercase tracking-widest border transition-all ${filter === ProductCategory.STEAM_WALLET ? 'bg-emerald-500/10 border-emerald-500 text-emerald-400' : 'border-white/5 text-slate-500 hover:text-white'}`}>Steam Balance</button>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in duration-700">
                    {PRODUCTS.filter(p => p.category === (filter === 'Recommended' ? ProductCategory.GAME_REBOOT : filter)).map(p => (
                      <ProductCard 
                        key={p.id} 
                        product={p} 
                        isSelected={selectedProduct.id === p.id}
                        isWishlisted={wishlist.includes(p.id)}
                        onToggleWishlist={(e) => toggleWishlist(p.id, e)}
                        onAddToCart={(e) => addToCart(p.id, e)}
                        onClick={() => setSelectedProduct(p)}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <CaseOpening inventory={inventory} onCaseOpened={removeFromInventory} />
              )}
           </div>
        )}

        {activeMenu === 'CS' && <CustomerService />}
      </main>

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 z-[60] bg-slate-950/90 backdrop-blur-lg flex justify-end">
          <div className="w-full max-w-md bg-slate-900 border-l border-white/5 h-full p-8 flex flex-col animate-in slide-in-from-right duration-500">
            <div className="flex justify-between items-center mb-10">
              <h3 className="heading-font text-2xl font-bold italic tracking-tight uppercase">Cargo Bay</h3>
              <button onClick={() => setShowCart(false)} className="text-slate-500 hover:text-white transition-colors"><X size={24} /></button>
            </div>
            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full opacity-20">
                  <Box size={64} className="mb-4" />
                  <p className="text-xs font-bold uppercase tracking-widest">Inventory empty</p>
                </div>
              ) : (
                cart.map((id, idx) => {
                  const p = PRODUCTS.find(item => item.id === id);
                  if (!p) return null;
                  return (
                    <div key={`${id}-${idx}`} className="flex gap-4 bg-white/5 p-4 rounded-2xl border border-white/5 group hover:border-white/10 transition-all">
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-950">
                        <img src={p.image} className="w-full h-full object-cover" />
                      </div>
                      <div className="flex-1">
                        <p className="heading-font text-[10px] font-bold uppercase tracking-widest truncate">{p.name}</p>
                        <p className="text-emerald-500 font-bold text-sm mt-1">${p.price.toLocaleString()}</p>
                      </div>
                      <button onClick={() => setCart(prev => prev.filter((_, i) => i !== idx))} className="text-slate-600 hover:text-rose-500 self-center"><X size={18} /></button>
                    </div>
                  );
                })
              )}
            </div>
            {cart.length > 0 && (
              <div className="mt-8 pt-8 border-t border-white/5 space-y-6">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Estimated Value</span>
                  <span className="heading-font text-2xl font-bold text-emerald-400">${cart.reduce((acc, id) => acc + (PRODUCTS.find(p => p.id === id)?.price || 0), 0).toLocaleString()}</span>
                </div>
                <button 
                  onClick={() => {setShowCart(false); setShowCheckout(true);}}
                  className="w-full bg-emerald-500 text-slate-950 font-black py-4 rounded-2xl heading-font tracking-[0.2em] uppercase hover:bg-emerald-400 transition-all shadow-xl shadow-emerald-500/10"
                >
                  Confirm Shipment
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {showCheckout && (
        <CheckoutModal 
          onClose={() => setShowCheckout(false)} 
          onSuccess={handleCheckoutSuccess}
          total={cart.reduce((acc, id) => acc + (PRODUCTS.find(p => p.id === id)?.price || 0), 0)} 
        />
      )}

      <footer className="py-12 border-t border-white/5 bg-[#020617] text-center">
        <div className="flex items-center justify-center gap-4 mb-4 opacity-30">
          <div className="h-px w-10 bg-emerald-500"></div>
          <p className="heading-font text-[9px] font-bold uppercase tracking-[0.6em]">Premium Tech Recyclers</p>
          <div className="h-px w-10 bg-emerald-500"></div>
        </div>
        <p className="text-[10px] text-slate-700 font-bold uppercase">© 2024 IJONG Mechanics. Powered by Emerald-Engine.</p>
      </footer>
    </div>
  );
};

export default App;
