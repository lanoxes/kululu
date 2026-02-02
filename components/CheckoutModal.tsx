
import React, { useState } from 'react';
import { 
  CreditCard, ShieldCheck, Loader2, 
  CheckCircle2, QrCode, Smartphone, 
  Globe, Banknote 
} from 'lucide-react';

interface CheckoutModalProps {
  onClose: () => void;
  onSuccess?: () => void;
  total: number;
}

type PaymentMethod = 'QRIS' | 'GoPay' | 'Dana' | 'PayPal' | 'SeaBank';

const CheckoutModal: React.FC<CheckoutModalProps> = ({ onClose, onSuccess, total }) => {
  const [step, setStep] = useState<'info' | 'processing' | 'success'>('info');
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod>('QRIS');

  const handlePay = () => {
    setStep('processing');
    setTimeout(() => {
      setStep('success');
      if (onSuccess) onSuccess();
    }, 3500);
  };

  const paymentOptions: { id: PaymentMethod; label: string; icon: any; color: string }[] = [
    { id: 'QRIS', label: 'QRIS Universal', icon: QrCode, color: 'text-rose-500' },
    { id: 'GoPay', label: 'GoPay Wallet', icon: Smartphone, color: 'text-blue-400' },
    { id: 'Dana', label: 'DANA Balance', icon: Smartphone, color: 'text-blue-500' },
    { id: 'PayPal', label: 'PayPal Global', icon: Globe, color: 'text-blue-300' },
    { id: 'SeaBank', label: 'SeaBank Transfer', icon: Banknote, color: 'text-orange-500' },
  ];

  return (
    <div className="fixed inset-0 z-[100] bg-slate-950/95 backdrop-blur-3xl flex items-center justify-center p-6">
      <div className="w-full max-w-xl bg-slate-900 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_100px_rgba(16,185,129,0.05)]">
        {step === 'info' && (
          <div className="p-10 space-y-8 animate-in fade-in zoom-in duration-300">
            <div className="text-center">
              <h3 className="heading-font text-3xl font-bold uppercase italic tracking-tight mb-2">Secure <span className="text-emerald-500 text-4xl">Handshake</span></h3>
              <p className="text-slate-500 text-[10px] font-black uppercase tracking-[0.4em]">Encrypted Financial Pipeline</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-4">
                 <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest px-2">Select Method</p>
                 <div className="space-y-2 max-h-[240px] overflow-y-auto pr-2 custom-scrollbar">
                    {paymentOptions.map((opt) => (
                      <button 
                        key={opt.id}
                        onClick={() => setSelectedMethod(opt.id)}
                        className={`w-full flex items-center justify-between p-4 rounded-2xl border transition-all ${
                          selectedMethod === opt.id 
                            ? 'bg-emerald-500/10 border-emerald-500 text-white' 
                            : 'bg-white/5 border-white/5 text-slate-500 hover:border-white/10'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <opt.icon size={20} className={selectedMethod === opt.id ? 'text-emerald-500' : opt.color} />
                          <span className="text-xs font-bold uppercase tracking-wide">{opt.label}</span>
                        </div>
                        {selectedMethod === opt.id && <CheckCircle2 size={16} className="text-emerald-500" />}
                      </button>
                    ))}
                 </div>
              </div>

              <div className="flex flex-col justify-between p-6 bg-white/[0.02] rounded-3xl border border-white/5">
                <div className="space-y-4">
                  <div className="flex flex-col gap-1">
                    <span className="text-[9px] font-black text-slate-500 uppercase tracking-widest">Grand Total</span>
                    <span className="heading-font text-3xl font-bold text-white">${total.toLocaleString()}</span>
                  </div>
                  <div className="h-px bg-white/5"></div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                      <span>Service Fee</span>
                      <span>$0.00</span>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold text-slate-500 uppercase">
                      <span>Inventory Sync</span>
                      <span className="text-emerald-500">Live</span>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={handlePay}
                  className="w-full bg-emerald-500 text-slate-950 font-black py-4 rounded-2xl heading-font text-lg tracking-widest uppercase hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 mt-6"
                >
                  Confirm Payment
                </button>
              </div>
            </div>

            <button onClick={onClose} className="w-full py-2 text-[10px] font-black uppercase tracking-widest text-slate-600 hover:text-white transition-colors">Terminate Request</button>
          </div>
        )}

        {step === 'processing' && (
          <div className="p-24 text-center space-y-10 animate-in fade-in duration-300">
            <div className="relative mx-auto w-20 h-20">
              <Loader2 className="absolute inset-0 text-emerald-500 animate-spin" size={80} strokeWidth={1} />
              <div className="absolute inset-0 flex items-center justify-center">
                 <ShieldCheck className="text-emerald-500 animate-pulse" size={32} />
              </div>
            </div>
            <div className="space-y-4">
              <h3 className="heading-font text-2xl font-bold uppercase italic tracking-tight">Syncing <span className="text-emerald-500">Ledger</span></h3>
              <div className="font-mono text-[9px] text-slate-600 uppercase tracking-widest leading-loose max-w-xs mx-auto">
                Validating {selectedMethod} Gateway...<br/>
                Allocating Assets to Inventory...<br/>
                Finalizing Node confirmation
              </div>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="p-24 text-center space-y-8 animate-in zoom-in duration-500">
            <div className="w-24 h-24 bg-emerald-500 text-slate-950 rounded-full flex items-center justify-center mx-auto shadow-2xl shadow-emerald-500/40">
              <CheckCircle2 size={56} />
            </div>
            <div className="space-y-4">
              <h3 className="heading-font text-4xl font-bold uppercase italic tracking-tighter">Assets <span className="text-emerald-500">Secured</span></h3>
              <p className="text-slate-500 text-xs font-bold uppercase tracking-widest leading-relaxed">Transaction verified. Your supply nodes have been added to your personal inventory.</p>
            </div>
            <button 
              onClick={onClose} 
              className="px-12 py-4 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-[0.3em] hover:bg-emerald-500 hover:text-slate-950 transition-all"
            >
              Uplink Complete
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutModal;
