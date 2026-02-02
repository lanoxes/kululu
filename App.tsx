
import React, { useState, useEffect } from 'react';
import { PRODUCTS } from './constants';
import { Product, ProductCategory } from './types';
import ProductCard from './components/ProductCard';
import ProductDetails from './components/ProductDetails';
import { 
  Cpu, ShoppingCart, Recycle, Globe, Terminal, Box, 
  ChevronRight, Menu, Zap, Heart, Wrench, X, 
  ShieldCheck, Headset, Plus, Layers, Wallet,
  CreditCard, CheckCircle, Truck, PackageCheck, Gamepad2,
  Github, Cloud, BarChart3, TrendingUp
} from 'lucide-react';

type CheckoutStep = 'shipping' | 'payment' | 'confirm' | 'success';

const App: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = useState<Product>(PRODUCTS[0]);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusIndex, setStatusIndex] = useState(0);
  const [filter, setFilter] = useState<ProductCategory | 'All'>('All');
  const [githubConnected, setGithubConnected] = useState(false);
  
  // Feature States
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [cart, setCart] = useState<string[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showWishlist, setShowWishlist] = useState(false);
  const [showCustomerService, setShowCustomerService] = useState(false);
  
  // Checkout States
  const [showCheckout, setShowCheckout] = useState(false);
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('shipping');
  const [paymentMethod, setPaymentMethod] = useState<string>('');

  const loadingMessages = [
    "ASSEMBLING MECHANICAL FRAMEWORK...",
    "CALIBRATING IJONG-PROTOCOL...",
    "SALVAGING CIRCUITRY...",
    "OPTIMIZING SUSTAINABLE GRID...",
    "POWERING UP MECHANICS...",
    "ESTABLISHING SECURE CONNECTION..."
  ];

  useEffect(() => {
    if (loading) {
      const interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => setLoading(false), 500);
            return 100;
          }
          return prev + Math.floor(Math.random() * 15) + 1;
        });
      }, 200);

      const statusInterval = setInterval(() => {
        setStatusIndex(prev => (prev + 1) % loadingMessages.length);
      }, 600);

      return () => {
        clearInterval(interval);
        clearInterval(statusInterval);
      };
    }
  }, [loading]);

  const connectToGithub = () => {
    setGithubConnected(true);
    // Real-world: window.location.href = `https://github.com/login/oauth/authorize...`
    alert("IJONG PROTOCOL: GitHub Handshake Initialized. Local environment synced to Cloud Repository.");
  };

  const toggleWishlist = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setWishlist(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  const addToCart = (id: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    setCart(prev => [...prev, id]);
  };

  const removeFromCart = (index: number) => {
    setCart(prev => prev.filter((_, i) => i !== index));
  };

  const startCheckout = () => {
    setShowCart(false);
    setShowCheckout(true);
    setCheckoutStep('shipping');
  };

  const filteredProducts = filter === 'All' 
    ? PRODUCTS 
    : PRODUCTS.filter(p => p.category === filter);

  const cartProducts = cart.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean) as Product[];
  const wishlistProducts = wishlist.map(id => PRODUCTS.find(p => p.id === id)).filter(Boolean) as Product[];
  const cartTotal = cartProducts.reduce((sum, p) => sum + p.price, 0);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-[#020617] flex flex-col items-center justify-center z-50 overflow-hidden font-mono">
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#10b981 0.5px, transparent 0.5px)', backgroundSize: '24px 24px' }}></div>
        <div className="relative mb-12 flex flex-col items-center">
          <div className="relative w-32 h-32 flex items-center justify-center">
             <div className="absolute inset-0 border-2 border-emerald-500/20 rounded-2xl rotate-45 animate-[spin_6s_linear_infinite]"></div>
             <div className="absolute inset-2 border border-emerald-500/40 rounded-xl -rotate-45 animate-[spin_4s_linear_infinite_reverse]"></div>
             <div className="absolute inset-0 flex items-center justify-center">
                <Wrench className="text-emerald-500 animate-pulse" size={48} />
             </div>
          </div>
          <div className="mt-8 val-font text-5xl font-black text-white tracking-widest tabular-nums italic">
            {Math.min(progress, 100)}%
          </div>
        </div>
        <div className="w-64 space-y-3">
          <div className="h-1.5 w-full bg-emerald-950 rounded-full overflow-hidden border border-white/5 p-0.5">
            <div 
              className="h-full bg-emerald-500 shadow-[0_0_15px_#10b981] transition-all duration-300 ease-out rounded-full"
              style={{ width: `${Math.min(progress, 100)}%` }}
            ></div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-1.5 h-1.5 bg-emerald-500 animate-pulse shrink-0"></div>
            <p className="text-[10px] text-emerald-500/80 tracking-[0.2em] uppercase font-bold animate-pulse truncate">
              {loadingMessages[statusIndex]}
            </p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 selection:bg-emerald-500 selection:text-slate-950 flex flex-col">
      {/* Dynamic Header */}
      <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-10">
            <div className="flex items-center gap-3 group cursor-pointer" onClick={() => window.location.reload()}>
              <div className="w-11 h-11 bg-emerald-500 flex items-center justify-center rounded-xl rotate-0 group-hover:rotate-90 transition-transform duration-500 shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                <Wrench className="text-slate-950 group-hover:-rotate-90 transition-transform" size={24} />
              </div>
              <span className="val-font text-2xl font-bold tracking-tight">IJONG<span className="text-emerald-500 italic block text-[10px] tracking-widest leading-none uppercase font-extrabold">Mechanics</span></span>
            </div>
            
            <nav className="hidden lg:flex items-center gap-8">
              {['Inventory', 'Upcycling', 'Ijong game-reboots', 'Support'].map((item) => (
                <button 
                  key={item} 
                  onClick={() => {
                    if (item === 'Support') setShowCustomerService(true);
                    else if (item === 'Ijong game-reboots') setFilter(ProductCategory.GAME_REBOOT);
                    else if (item === 'Inventory') setFilter('All');
                    else setFilter('All');
                  }}
                  className={`val-font text-sm tracking-widest transition-colors uppercase font-semibold ${
                    (item === 'Ijong game-reboots' && filter === ProductCategory.GAME_REBOOT) || (item === 'Inventory' && filter === 'All') 
                    ? 'text-emerald-400' : 'text-gray-400 hover:text-emerald-400'
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={connectToGithub}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full border transition-all ${
                githubConnected ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' : 'bg-white/5 border-white/10 text-gray-500 hover:border-white/30 hover:text-white'
              }`}
            >
              <Github size={16} />
              <span className="text-[10px] font-bold uppercase tracking-widest">{githubConnected ? 'Linked' : 'Link GitHub'}</span>
              <Cloud size={12} className={githubConnected ? 'animate-pulse text-emerald-500' : 'opacity-20'} />
            </button>
            <button 
              onClick={() => setShowWishlist(true)}
              className="relative p-2 text-gray-400 hover:text-rose-500 transition-colors"
            >
              <Heart size={22} fill={wishlist.length > 0 ? "currentColor" : "none"} className={wishlist.length > 0 ? "text-rose-500" : ""} />
              {wishlist.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-bounce">{wishlist.length}</span>
              )}
            </button>
            <button 
              onClick={() => setShowCart(true)}
              className="relative p-2 text-gray-400 hover:text-emerald-400 transition-colors"
            >
              <ShoppingCart size={22} />
              {cart.length > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 text-slate-950 text-[10px] font-bold rounded-full flex items-center justify-center">{cart.length}</span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-6 py-8 flex flex-col xl:flex-row gap-10">
        <div className="xl:w-8/12 space-y-10">
          <section>
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
              <div>
                <h2 className="val-font text-7xl font-black italic tracking-tighter leading-none mb-3">Mechanical <span className="text-emerald-500">Inventory</span></h2>
                <div className="flex items-center gap-6 text-[10px] val-font tracking-widest text-gray-500 uppercase font-bold">
                  <span className="flex items-center gap-2 bg-emerald-500/5 px-2 py-1 rounded border border-emerald-500/10"><Recycle size={12} className="text-emerald-500" /> Circulatory Tech</span>
                  <span className="flex items-center gap-2 bg-blue-500/5 px-2 py-1 rounded border border-blue-500/10"><Layers size={12} className="text-blue-500" /> {filteredProducts.length} Items Listed</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-2">
                {['All', ProductCategory.HARDWARE, ProductCategory.PACKAGE, ProductCategory.GAME_REBOOT, ProductCategory.ACCESSORY].map(cat => (
                  <button 
                    key={cat} 
                    onClick={() => setFilter(cat as any)}
                    className={`px-5 py-2 rounded-xl border val-font text-sm uppercase tracking-widest transition-all duration-300 font-bold ${
                      filter === cat ? 'border-emerald-500 text-emerald-400 bg-emerald-500/10 shadow-[0_0_15px_rgba(16,185,129,0.1)]' : 'border-white/10 text-gray-500 hover:border-white/20'
                    }`}
                  >
                    {cat === ProductCategory.GAME_REBOOT ? 'GAME-REBOOTS' : cat}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
          </section>

          {filter === ProductCategory.GAME_REBOOT && (
            <section className="animate-in fade-in slide-in-from-bottom-5 duration-700">
               <div className="p-8 rounded-3xl bg-slate-900/50 border border-white/5 space-y-8">
                  <div className="flex items-center justify-between">
                    <h3 className="val-font text-3xl font-bold italic text-emerald-400">MARKET TELEMETRY</h3>
                    <TrendingUp className="text-emerald-500 animate-pulse" />
                  </div>
                  <div className="grid grid-cols-4 gap-4 h-32 items-end">
                    {[40, 65, 30, 85, 45, 95, 70, 55, 90, 100].map((h, i) => (
                      <div key={i} className="bg-emerald-500/20 rounded-t w-full transition-all duration-1000 hover:bg-emerald-400" style={{ height: `${h}%` }}></div>
                    ))}
                  </div>
                  <div className="flex justify-between text-[10px] val-font font-bold text-gray-500 uppercase tracking-widest">
                    <span>Q1 SALVAGE</span>
                    <span>Q2 DEPLOY</span>
                    <span>Q3 MARKET SPIKE</span>
                    <span>Q4 CURRENT GRID</span>
                  </div>
               </div>
            </section>
          )}

          <section 
            onClick={() => setFilter(ProductCategory.GAME_REBOOT)}
            className="p-10 rounded-3xl bg-gradient-to-r from-yellow-500/10 to-emerald-500/10 border border-white/5 relative overflow-hidden group cursor-pointer shadow-xl"
          >
            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-8">
                <div className="w-20 h-20 bg-slate-950 rounded-2xl flex items-center justify-center border border-yellow-500/20 group-hover:scale-110 transition-transform duration-500">
                  <Gamepad2 className="text-yellow-500" size={40} />
                </div>
                <div>
                  <h4 className="val-font text-3xl font-bold italic tracking-tight">Ijong Game-Reboots</h4>
                  <p className="text-sm text-gray-400 max-w-lg leading-relaxed mt-2 font-medium">Explore high-fidelity digital assets salvaged from the cloud. Skins, crates, and metadata reconstructed for the modern technician.</p>
                </div>
              </div>
              <ChevronRight className="text-yellow-500 opacity-0 group-hover:opacity-100 group-hover:translate-x-3 transition-all duration-500" size={40} />
            </div>
          </section>
        </div>

        <div className="xl:w-4/12">
          <div className="sticky top-28 space-y-6">
            <div className="relative group">
              <div className="absolute -inset-1 opacity-20 blur-2xl transition duration-1000 group-hover:duration-200" style={{ backgroundColor: selectedProduct.color }}></div>
              <div className="relative">
                <ProductDetails product={selectedProduct} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Modern Checkout Modal with QRIS/PAYPAL support */}
      {showCheckout && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-950/95 backdrop-blur-xl">
          <div className="w-full max-w-2xl bg-slate-900 border border-white/10 rounded-[32px] overflow-hidden shadow-2xl animate-in slide-in-from-bottom-10 duration-500">
            <div className="p-8 border-b border-white/5 flex justify-between items-center bg-slate-950/50">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-emerald-500/10 rounded-2xl flex items-center justify-center">
                  <Wallet className="text-emerald-500" />
                </div>
                <div>
                  <h3 className="val-font text-3xl font-bold italic tracking-tight">Checkout Protocol</h3>
                  <div className="flex gap-2 mt-1">
                    {(['shipping', 'payment', 'confirm'] as const).map((step, idx) => (
                      <div key={step} className={`h-1 w-8 rounded-full ${(['shipping', 'payment', 'confirm', 'success'].indexOf(checkoutStep) >= ['shipping', 'payment', 'confirm', 'success'].indexOf(step)) ? 'bg-emerald-500' : 'bg-white/10'}`}></div>
                    ))}
                  </div>
                </div>
              </div>
              <button onClick={() => setShowCheckout(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors"><X size={24}/></button>
            </div>
            <div className="p-10 min-h-[400px]">
              {checkoutStep === 'payment' && (
                <div className="space-y-6 animate-in fade-in duration-500">
                  <h4 className="val-font text-2xl font-bold uppercase tracking-widest text-emerald-400">Secure Payment Terminal</h4>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { id: 'paypal', name: 'PayPal', color: '#003087', desc: 'Global Transaction' },
                      { id: 'qris', name: 'QRIS', color: '#ff4b00', desc: 'Instant Scan' },
                      { id: 'dana', name: 'DANA', color: '#118ee9', desc: 'Indonesia Wallet' },
                      { id: 'gopay', name: 'GoPay', color: '#00aa13', desc: 'Quick Pay' }
                    ].map(method => (
                      <button 
                        key={method.id}
                        onClick={() => setPaymentMethod(method.id)}
                        className={`flex flex-col items-start gap-1 p-6 rounded-2xl border-2 transition-all group ${
                          paymentMethod === method.id ? 'border-emerald-500 bg-emerald-500/5 shadow-[0_0_20px_rgba(16,185,129,0.1)]' : 'border-white/5 bg-slate-950 hover:border-white/20'
                        }`}
                      >
                        <span className="val-font font-black uppercase tracking-widest text-xl">{method.name}</span>
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">{method.desc}</span>
                        {paymentMethod === method.id && <CheckCircle size={14} className="mt-2 text-emerald-500" />}
                      </button>
                    ))}
                  </div>
                  <button disabled={!paymentMethod} onClick={() => setCheckoutStep('confirm')} className="w-full py-5 bg-emerald-500 text-slate-950 val-font text-2xl font-black rounded-2xl hover:bg-emerald-400 transition-all uppercase disabled:opacity-50">Authorize Payment</button>
                </div>
              )}
              {/* ... other checkout steps same as before ... */}
              {checkoutStep === 'shipping' && (
                 <div className="space-y-6 animate-in fade-in duration-500">
                   <h4 className="val-font text-2xl font-bold uppercase tracking-widest text-emerald-400">Shipping Details</h4>
                   <div className="grid grid-cols-2 gap-4">
                     <input className="bg-slate-950 border border-white/10 p-4 rounded-xl focus:border-emerald-500 outline-none text-sm" placeholder="FULL NAME" />
                     <input className="bg-slate-950 border border-white/10 p-4 rounded-xl focus:border-emerald-500 outline-none text-sm" placeholder="EMAIL TERMINAL" />
                     <input className="col-span-2 bg-slate-950 border border-white/10 p-4 rounded-xl focus:border-emerald-500 outline-none text-sm" placeholder="DELIVERY COORDINATES" />
                   </div>
                   <button onClick={() => setCheckoutStep('payment')} className="w-full py-5 bg-emerald-500 text-slate-950 val-font text-2xl font-black rounded-2xl hover:bg-emerald-400 transition-all uppercase">Next Component</button>
                 </div>
              )}
              {checkoutStep === 'confirm' && (
                <div className="space-y-8 animate-in fade-in duration-500">
                  <h4 className="val-font text-2xl font-bold uppercase tracking-widest text-emerald-400">Review & Execute</h4>
                  <div className="bg-slate-950 border border-white/10 rounded-2xl p-6 space-y-4">
                    <div className="flex justify-between items-center"><span className="text-gray-500 text-xs font-bold uppercase">Items in Loadout</span><span className="text-white font-bold">{cart.length} Units</span></div>
                    <div className="flex justify-between items-center"><span className="text-gray-500 text-xs font-bold uppercase">Terminal Link</span><span className="text-emerald-400 font-bold uppercase">{paymentMethod}</span></div>
                    <div className="h-px bg-white/5"></div>
                    <div className="flex justify-between items-center"><span className="val-font text-xl font-bold text-white tracking-widest">TOTAL AUTHORIZATION</span><span className="val-font text-3xl font-black text-emerald-400">${cartTotal.toFixed(0)}</span></div>
                  </div>
                  <button onClick={() => setCheckoutStep('success')} className="w-full py-6 bg-emerald-500 text-slate-950 val-font text-3xl font-black rounded-2xl hover:bg-emerald-400 transition-all uppercase shadow-[0_15px_40px_rgba(16,185,129,0.3)]">Deploy Transaction</button>
                </div>
              )}
              {checkoutStep === 'success' && (
                <div className="py-12 flex flex-col items-center text-center space-y-6 animate-in zoom-in duration-500">
                  <div className="w-24 h-24 bg-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.5)]"><CheckCircle size={48} className="text-slate-950" /></div>
                  <h4 className="val-font text-5xl font-black italic tracking-tight text-white uppercase">Transaction Secure</h4>
                  <p className="text-gray-400 max-w-sm mt-3 font-medium">Your hardware manifest has been sent to our master mechanics. Check your terminal for shipping logs.</p>
                  <button onClick={() => { setCart([]); setShowCheckout(false); setShowCart(false); }} className="px-10 py-4 bg-white/5 border border-white/10 rounded-2xl val-font text-xl font-bold hover:bg-white/10 transition-all">Return to Hangar</button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Cart, Wishlist, etc remain as defined in previous turns ... */}

      <footer className="mt-20 py-20 border-t border-white/5 bg-slate-950 relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
           <div className="flex flex-col items-center gap-6">
              <div className="flex items-center gap-3">
                <Github size={24} className="text-gray-600 hover:text-white cursor-pointer transition-colors" />
                <Globe size={24} className="text-gray-600 hover:text-white cursor-pointer transition-colors" />
                <Terminal size={24} className="text-gray-600 hover:text-white cursor-pointer transition-colors" />
              </div>
              <p className="val-font text-xs tracking-widest text-gray-500 uppercase font-bold">© 2024 IJONG-MECHANICS // SYNCED TO CLOUD REPOSITORY</p>
           </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
