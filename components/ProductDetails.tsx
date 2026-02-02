
import React, { useState, useEffect } from 'react';
import { Product, ChatMessage, Review } from '../types';
import { getTechAdvisorResponse } from '../services/gemini';
import { Send, Leaf, Cpu, MessageSquare, ShoppingCart, Info, Star, UserCircle } from 'lucide-react';

interface ProductDetailsProps {
  product: Product;
  onAddToCart?: () => void;
  initialTab?: 'info' | 'specs' | 'advisor' | 'reviews';
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onAddToCart, initialTab = 'info' }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'specs' | 'advisor' | 'reviews'>(initialTab);
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [newComment, setNewComment] = useState('');
  const [userRating, setUserRating] = useState(5);
  const [localReviews, setLocalReviews] = useState<Review[]>(product.reviews || []);

  useEffect(() => {
    if (initialTab) setActiveTab(initialTab);
    setLocalReviews(product.reviews || []);
  }, [initialTab, product]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMsg: ChatMessage = { role: 'user', content: input };
    setChatHistory(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    const reply = await getTechAdvisorResponse(product, input);
    
    setChatHistory(prev => [...prev, { role: 'assistant', content: reply }]);
    setIsTyping(false);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    const review: Review = {
      id: Date.now().toString(),
      user: 'Verified Mechanic',
      rating: userRating,
      comment: newComment,
      date: new Date().toISOString().split('T')[0]
    };
    
    setLocalReviews(prev => [review, ...prev]);
    setNewComment('');
  };

  return (
    <div className="bg-white/[0.03] backdrop-blur-3xl rounded-[2rem] border border-white/10 overflow-hidden flex flex-col h-full shadow-2xl">
      <div className="flex border-b border-white/5 bg-slate-900/40 p-2">
        {(['info', 'specs', 'advisor', 'reviews'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 py-3 heading-font text-xs font-bold tracking-widest transition-all rounded-xl ${
              activeTab === tab ? 'bg-emerald-500 text-slate-950 shadow-lg' : 'text-slate-500 hover:text-slate-300'
            }`}
          >
            {tab === 'advisor' ? 'AI CHAT' : tab.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-8 space-y-8 custom-scrollbar">
        {activeTab === 'info' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-emerald-500/10 px-4 py-2 rounded-full border border-emerald-500/20">
                <Leaf size={14} className="text-emerald-500" />
                <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">{product.recycledContent}% Eco-Pure</span>
              </div>
              <div className="flex items-center gap-2 bg-slate-800/50 px-4 py-2 rounded-full border border-white/10">
                <Star size={14} className="text-yellow-500 fill-current" />
                <span className="text-[10px] font-black uppercase tracking-widest text-slate-300">{product.rating} Global Rating</span>
              </div>
            </div>
            
            <p className="text-slate-300 leading-relaxed font-normal text-lg opacity-80">
              {product.description}
            </p>

            <div className="pt-8 border-t border-white/5">
              <button 
                onClick={onAddToCart}
                className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-5 rounded-2xl flex items-center justify-center gap-3 transition-all heading-font text-lg shadow-xl shadow-emerald-500/20 group"
              >
                <ShoppingCart size={20} className="group-hover:translate-x-1 transition-transform" /> 
                Add to Inventory — ${product.price.toLocaleString()}
              </button>
              <div className="flex items-center justify-center gap-4 mt-6 opacity-30">
                <div className="h-px flex-1 bg-white/10"></div>
                <span className="text-[9px] font-black uppercase tracking-[0.3em]">Authentic Refurbished</span>
                <div className="h-px flex-1 bg-white/10"></div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="space-y-4 animate-in fade-in duration-500">
            {product.specs.map((spec, i) => (
              <div key={i} className="flex justify-between items-center p-5 bg-white/[0.02] rounded-2xl border border-white/5 hover:bg-white/[0.05] transition-colors">
                <span className="text-xs text-slate-500 uppercase font-black tracking-widest">{spec.label}</span>
                <span className="text-sm font-bold text-emerald-400 heading-font">{spec.value}</span>
              </div>
            ))}
            <div className="mt-10 p-5 bg-emerald-500/5 rounded-2xl border border-emerald-500/10 flex gap-4">
              <Info size={24} className="text-emerald-500 shrink-0" />
              <p className="text-xs text-slate-500 italic font-medium leading-relaxed">Technical certification ID: IJ-8829-X. All components stress-tested for 72 hours under maximum payload.</p>
            </div>
          </div>
        )}

        {activeTab === 'advisor' && (
          <div className="flex flex-col h-full animate-in fade-in duration-500">
            <div className="flex-1 space-y-4 mb-6 min-h-[350px]">
              {chatHistory.length === 0 && (
                <div className="text-center py-16 opacity-20">
                  <MessageSquare size={56} className="mx-auto mb-4" />
                  <p className="text-xs font-bold uppercase tracking-widest">Technician Link Ready</p>
                </div>
              )}
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-emerald-500 text-slate-950 font-bold rounded-tr-none' 
                      : 'bg-white/5 border border-white/10 text-slate-200 rounded-tl-none font-medium'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white/5 p-4 rounded-2xl flex gap-1.5">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3 p-2 bg-slate-950/50 rounded-2xl border border-white/10">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Talk to mechanic..."
                className="flex-1 bg-transparent border-none outline-none text-sm px-4 focus:ring-0 text-white placeholder:text-slate-600"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isTyping}
                className="p-3 bg-emerald-500 text-slate-950 rounded-xl hover:bg-emerald-400 transition-all disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-8 animate-in fade-in duration-500">
            <div className="bg-white/5 rounded-3xl p-6 border border-white/5">
              <h4 className="heading-font text-lg font-bold uppercase tracking-widest mb-6">Field Report</h4>
              <div className="flex gap-2 mb-4">
                 {[1,2,3,4,5].map(star => (
                   <button 
                    key={star} 
                    onClick={() => setUserRating(star)}
                    className={`transition-all ${userRating >= star ? 'text-yellow-500 scale-110' : 'text-slate-600 hover:text-slate-400'}`}
                   >
                     <Star size={24} fill={userRating >= star ? "currentColor" : "none"} />
                   </button>
                 ))}
              </div>
              <textarea 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-2xl p-4 text-sm focus:border-emerald-500 outline-none transition-all placeholder:text-slate-700"
                placeholder="How does it feel in your grid?"
                rows={3}
              ></textarea>
              <button 
                onClick={handleAddReview}
                className="mt-4 px-8 py-3 bg-white/5 text-slate-100 font-bold text-xs uppercase tracking-widest rounded-xl hover:bg-emerald-500 hover:text-slate-950 transition-all border border-white/5"
              >
                Transmit Report
              </button>
            </div>

            <div className="space-y-4">
              {localReviews.length === 0 ? (
                <div className="text-center py-10 text-slate-600 italic text-sm">No archive reports found. Be the first to verify.</div>
              ) : (
                localReviews.map((review) => (
                  <div key={review.id} className="bg-white/[0.02] border border-white/5 rounded-2xl p-5 space-y-3">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center text-emerald-500">
                          <UserCircle size={20} />
                        </div>
                        <span className="text-xs font-bold text-slate-300 uppercase tracking-widest">{review.user}</span>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={10} className={i < review.rating ? "text-yellow-500 fill-current" : "text-slate-700"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-400 leading-relaxed italic">"{review.comment}"</p>
                    <p className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{review.date}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetails;
