import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Heart, Trash2 } from 'lucide-react';
import { useWishlist } from '../context/WishlistContext';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const WishlistDrawer: React.FC<WishlistDrawerProps> = ({ isOpen, onClose }) => {
  const { wishlist, removeFromWishlist } = useWishlist();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 h-full w-full max-w-[400px] bg-white shadow-2xl z-[101] flex flex-col"
          >
            {/* Header */}
            <div className="bg-[#480607] text-white p-6 flex justify-between items-center">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-md border border-white/30">
                  <Heart size={20} className="text-white fill-white" />
                </div>
                <h2 className="text-xl font-bold tracking-wider font-calisto">My Wishlist</h2>
              </div>
              <button 
                onClick={onClose}
                className="p-2 transition-colors rounded-full hover:bg-white/10"
              >
                <X size={24} />
              </button>
            </div>

            {/* Content */}
            <div className="flex-grow p-6 overflow-y-auto">
              {wishlist.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full space-y-4 text-stone-400">
                  <div className="flex items-center justify-center w-16 h-16 rounded-full bg-stone-50">
                    <Heart size={32} className="text-stone-300 opacity-50" />
                  </div>
                  <p className="font-serif italic">Your wishlist is empty</p>
                  <button 
                    onClick={onClose}
                    className="text-[#480607] font-bold uppercase tracking-widest text-sm hover:underline"
                  >
                    Start Browsing
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {wishlist.map((item) => (
                    <div key={item.id} className="flex gap-4 group">
                      <div className="flex-shrink-0 w-24 h-24 overflow-hidden rounded-lg bg-stone-50">
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="flex flex-col justify-between flex-grow py-1">
                        <div>
                          <p className="text-[10px] text-stone-400 uppercase tracking-widest mb-1">{item.category}</p>
                          <h3 className="font-bold leading-tight text-stone-800">{item.name}</h3>
                          <p className="text-[#480607] font-bold mt-1">{item.price}</p>
                        </div>
                        <button 
                          onClick={() => removeFromWishlist(item.id)}
                          className="flex items-center gap-1 text-[11px] text-red-500 hover:text-red-600 transition-colors uppercase font-bold tracking-tighter w-fit"
                        >
                          <Trash2 size={12} />
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer Action */}
            <div className="p-6 border-t border-stone-100 bg-stone-50/50">
              <button 
                disabled={wishlist.length === 0}
                onClick={() => {
                  const itemsList = wishlist.map((item, index) => 
                    `${index + 1}. Product Name: ${item.name}\n   Link: ${window.location.origin}/product/${item.id}`
                  ).join('\n\n');

                  const message = `Hello Santhi Jewellers,\n\nI would like to enquire about the following products:\n\n${itemsList}\n\nPlease share price and availability.\n\nThank you.`;
                  
                  const encodedMessage = encodeURIComponent(message);
                  window.open(`https://wa.me/919443211809?text=${encodedMessage}`, '_blank');
                }}
                className={`w-full py-4 px-6 rounded-xl font-bold uppercase tracking-[0.2em] text-sm flex items-center justify-center gap-3 transition-all duration-300 ${
                  wishlist.length > 0 
                  ? 'bg-[#480607] text-white shadow-xl hover:bg-[#5D0E2E] active:scale-[0.98] shadow-[#480607]/20' 
                  : 'bg-stone-200 text-stone-400 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center justify-center w-6 h-6 bg-green-500 rounded-full animate-pulse">
                  <Heart size={14} className="fill-white text-white" />
                </div>
                Order via WhatsApp
              </button>
              <p className="mt-3 text-[10px] text-center text-stone-400 uppercase tracking-widest font-medium">
                {wishlist.length} {wishlist.length === 1 ? 'Item' : 'Items'} in your wishlist
              </p>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default WishlistDrawer;
