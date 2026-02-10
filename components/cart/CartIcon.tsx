"use client";

import { ShoppingCart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "./CartContext";
import { useState, useEffect } from "react";

export default function CartIcon() {
    const { itemCount, openCart } = useCart();
    const [justAdded, setJustAdded] = useState(false);

    // Animate when item count changes
    useEffect(() => {
        if (itemCount > 0) {
            setJustAdded(true);
            const timer = setTimeout(() => setJustAdded(false), 300);
            return () => clearTimeout(timer);
        }
    }, [itemCount]);

    return (
        <button
            onClick={openCart}
            className="relative p-2 hover:bg-white/5 rounded-lg transition-colors"
            aria-label={`Carrinho com ${itemCount} ${itemCount === 1 ? 'item' : 'itens'}`}
        >
            <motion.div
                animate={justAdded ? { scale: [1, 1.2, 1] } : {}}
                transition={{ duration: 0.3 }}
            >
                <ShoppingCart size={24} className="text-white" />
            </motion.div>

            {/* Item Count Badge */}
            <AnimatePresence>
                {itemCount > 0 && (
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute -top-1 -right-1 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-zinc-900"
                    >
                        {itemCount > 9 ? '9+' : itemCount}
                    </motion.div>
                )}
            </AnimatePresence>
        </button>
    );
}
