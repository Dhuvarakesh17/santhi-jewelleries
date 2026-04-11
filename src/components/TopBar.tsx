import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const TopBar: React.FC = () => {
    const messages = [
        "Contact : 94432 11809",
        "Shipping across India......"
    ];
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % messages.length);
        }, 3000);
        return () => clearInterval(timer);
    }, []);

    return (
        <div className="bg-[#5B0E23] text-white py-2.5 border-b border-black/10 relative z-[70] shadow-sm overflow-hidden h-11">
            <div className="max-w-[1440px] mx-auto px-4 h-full flex justify-center items-center">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={currentIndex}
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: -20, opacity: 0 }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                        className="text-[10px] lg:text-[11px] font-bold tracking-[0.3em] uppercase whitespace-nowrap"
                    >
                        {messages[currentIndex]}
                    </motion.div>
                </AnimatePresence>
            </div>
        </div>
    );
};

export default TopBar;

