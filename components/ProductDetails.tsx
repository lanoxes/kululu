
import React, { useState, useEffect } from 'react';
import { Product, ChatMessage, Review } from '../types';
import { getTechAdvisorResponse } from '../services/gemini';
import { Send, Leaf, Cpu, MessageSquare, ShoppingCart, Info, Star, UserCircle } from 'lucide-react';

interface ProductDetailsProps {
  product: Product;
  initialTab?: 'info' | 'specs' | 'advisor' | 'reviews';
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, initialTab = 'info' }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'specs' | 'advisor' | 'reviews'>(initialTab);
  const [input, setInput] = useState('');
  const [chatHistory, setChatHistory] = useState<ChatMessage[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const [newComment, setNewComment] = useState('');
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
      user: 'Anonymous Mechanic',
      rating: 5,
      comment: newComment,
      date: new Date().toISOString().split('T')[0]
    };
    
    setLocalReviews(prev => [review, ...prev]);
    setNewComment('');
  };

  return (
    <div className="bg-slate-900/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden flex flex-col h-full shadow-2xl">
      <div className="flex border-b border-white/5 bg-slate-900/50 flex-wrap">
        {(['info', 'specs', 'advisor', 'reviews'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`flex-1 min-w-[80px] py-4 val-font text-lg tracking-wider transition-all relative ${
              activeTab === tab ? 'text-emerald-400' : 'text-gray-500 hover:text-white'
            }`}
          >
            {tab === 'advisor' ? 'SUPPORT' : tab.toUpperCase()}
            {activeTab === tab && (
              <div className="absolute bottom-0 left-0 w-full h-1 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]"></div>
            )}
          </button>
        ))}
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {activeTab === 'info' && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
                <Leaf size={14} className="text-emerald-500" />
                <span className="text-[10px] font-bold uppercase text-emerald-400">{product.recycledContent}% Sustained</span>
              </div>
              <div className="flex items-center gap-2 bg-blue-500/10 px-3 py-1.5 rounded-full border border-blue-500/20">
                <Cpu size={14} className="text-blue-500" />
                <span className="text-[10px] font-bold uppercase text-blue-400">{product.category}</span>
              </div>
              <div className="flex items-center gap-2 bg-yellow-500/10 px-3 py-1.5 rounded-full border border-yellow-500/20 text-yellow-500">
                <Star size={14} fill="currentColor" />
                <span className="text-[10px] font-bold">{product.rating} Rating</span>
              </div>
            </div>
            
            <p className="text-gray-300 leading-relaxed font-light text-lg">
              {product.description}
            </p>

            <div className="pt-6 border-t border-white/5">
              <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold py-4 rounded-xl flex items-center justify-center gap-2 transition-all val-font text-xl transform hover:scale-[1.02]">
                <ShoppingCart size={20} /> Deploy to Inventory — ${product.price.toFixed(0)}
              </button>
              <p className="text-[10px] text-center text-gray-500 mt-4 uppercase tracking-[0.2em]">ijong-certified Refurbishment</p>
            </div>
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="space-y-3 animate-in fade-in duration-500">
            {product.specs.map((spec, i) => (
              <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-xl border border-white/5 group hover:bg-white/10 transition-colors">
                <span className="text-sm text-gray-400 uppercase tracking-tighter font-semibold">{spec.label}</span>
                <span className="text-sm text-emerald-400 font-mono">{spec.value}</span>
              </div>
            ))}
            <div className="mt-8 p-4 bg-emerald-500/5 rounded-xl border border-emerald-500/10 flex gap-4">
              <Info size={24} className="text-emerald-500 shrink-0" />
              <p className="text-xs text-gray-400 italic">Technical data verified by ijong-mechanics Lab. Prices reflect current global market aggregates for sustainable sourcing.</p>
            </div>
          </div>
        )}

        {activeTab === 'advisor' && (
          <div className="flex flex-col h-full animate-in fade-in duration-500">
            <div className="flex-1 space-y-4 mb-4 min-h-[300px]">
              {chatHistory.length === 0 && (
                <div className="text-center py-10 opacity-40">
                  <MessageSquare size={48} className="mx-auto mb-4 text-emerald-500" />
                  <p className="text-sm val-font tracking-widest uppercase">Technician Online. Ready for Diagnostics.</p>
                </div>
              )}
              {chatHistory.map((msg, idx) => (
                <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] p-4 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-emerald-600 text-white rounded-tr-none' 
                      : 'bg-slate-800 border border-white/10 text-gray-200 rounded-tl-none'
                  }`}>
                    {msg.content}
                  </div>
                </div>
              ))}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-slate-800 border border-white/10 p-4 rounded-2xl flex gap-1">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce"></div>
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                  </div>
                </div>
              )}
            </div>
            
            <div className="mt-auto flex items-center gap-2 p-2 bg-slate-950 rounded-xl border border-white/5">
              <input 
                type="text" 
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask Mechanic..."
                className="flex-1 bg-transparent border-none outline-none text-sm p-2 focus:ring-0 text-white"
              />
              <button 
                onClick={handleSendMessage}
                disabled={isTyping}
                className="p-2 bg-emerald-500 text-slate-950 rounded-lg hover:bg-emerald-400 transition-colors disabled:opacity-50"
              >
                <Send size={18} />
              </button>
            </div>
          </div>
        )}

        {activeTab === 'reviews' && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <form onSubmit={handleAddReview} className="space-y-4 mb-8">
              <h4 className="val-font text-xl text-white uppercase tracking-widest">Post a Field Report</h4>
              <textarea 
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                className="w-full bg-slate-950 border border-white/10 rounded-xl p-4 text-sm focus:border-emerald-500 outline-none transition-colors"
                placeholder="Share your experience with this component..."
                rows={3}
              ></textarea>
              <button className="px-6 py-2 bg-emerald-500 text-slate-950 val-font text-lg font-bold rounded-lg hover:bg-emerald-400 transition-all">SUBMIT REPORT</button>
            </form>

            <div className="space-y-4">
              {localReviews.length === 0 ? (
                <div className="text-center py-10 text-gray-600 italic">No field reports yet for this item.</div>
              ) : (
                localReviews.map((review) => (
                  <div key={review.id} className="bg-white/5 border border-white/5 rounded-2xl p-4 space-y-2">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <UserCircle size={20} className="text-emerald-500" />
                        <span className="text-sm font-bold text-gray-300">{review.user}</span>
                      </div>
                      <div className="flex gap-0.5">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} size={12} className={i < review.rating ? "text-yellow-500 fill-current" : "text-gray-700"} />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-gray-400">{review.comment}</p>
                    <p className="text-[10px] text-gray-600 uppercase tracking-widest">{review.date}</p>
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
