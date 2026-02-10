"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import { useCart } from "./CartContext";
import { createCart } from "@/lib/shopify";
import { useState } from "react";

export default function CartDrawer() {
    const { items, total, isOpen, closeCart, updateQuantity, removeItem, clearCart } = useCart();
    const [isCheckingOut, setIsCheckingOut] = useState(false);

    const handleCheckout = async () => {
        if (items.length === 0) return;

        setIsCheckingOut(true);
        try {
            // Create line items for Shopify cart (CartLineInput expects merchandiseId)
            const lines = items.map(item => ({
                merchandiseId: item.variantId,
                quantity: item.quantity
            }));

            const checkoutUrl = await createCart(lines);

            if (checkoutUrl) {
                window.location.href = checkoutUrl;
            } else {
                console.error("No checkout URL received");
                alert("Não foi possível iniciar o checkout. Por favor tente novamente.");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("Erro ao iniciar checkout. Tente novamente.");
        } finally {
            setIsCheckingOut(false);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeCart}
                        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed right-0 top-0 h-full w-full max-w-md bg-zinc-900 border-l border-white/10 z-50 flex flex-col shadow-2xl"
                    >
                        {/* Header */}
                        <div className="p-6 border-b border-white/10 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <ShoppingBag className="text-primary" size={24} />
                                <h2 className="text-2xl font-bold text-white">Carrinho</h2>
                            </div>
                            <button
                                onClick={closeCart}
                                className="p-2 hover:bg-white/5 rounded-lg transition-colors"
                                aria-label="Fechar carrinho"
                            >
                                <X size={24} className="text-slate-400" />
                            </button>
                        </div>

                        {/* Cart Items */}
                        <div className="flex-1 overflow-y-auto p-6 space-y-4">
                            {items.length === 0 ? (
                                <div className="flex flex-col items-center justify-center h-full text-center">
                                    <ShoppingBag size={64} className="text-slate-700 mb-4" />
                                    <p className="text-slate-400 text-lg">O seu carrinho está vazio</p>
                                    <p className="text-slate-500 text-sm mt-2">Adicione produtos para começar</p>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        className="bg-zinc-800/50 rounded-2xl p-4 border border-white/5"
                                    >
                                        <div className="flex gap-4">
                                            {/* Product Image */}
                                            <div className="relative w-20 h-20 rounded-xl overflow-hidden bg-zinc-700 flex-shrink-0">
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>

                                            {/* Product Info */}
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-white font-bold text-sm truncate">{item.name}</h3>
                                                <p className="text-slate-400 text-xs mt-1">
                                                    {item.color} {item.storage && `• ${item.storage}`}
                                                </p>
                                                <p className="text-primary font-bold mt-2">€{item.price}</p>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className="p-2 hover:bg-red-500/10 rounded-lg transition-colors self-start"
                                                aria-label="Remover item"
                                            >
                                                <Trash2 size={18} className="text-red-400" />
                                            </button>
                                        </div>

                                        {/* Quantity Controls */}
                                        <div className="flex items-center justify-between mt-4">
                                            <span className="text-slate-400 text-sm">Quantidade</span>
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                                    aria-label="Diminuir quantidade"
                                                >
                                                    <Minus size={16} className="text-white" />
                                                </button>
                                                <span className="text-white font-bold w-8 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-2 bg-white/5 hover:bg-white/10 rounded-lg transition-colors"
                                                    aria-label="Aumentar quantidade"
                                                >
                                                    <Plus size={16} className="text-white" />
                                                </button>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-6 border-t border-white/10 space-y-4">
                                {/* Klarna Info */}
                                <div className="bg-pink-600/10 border border-pink-500/20 rounded-xl p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <span className="text-sm text-slate-300">Pague em 3x sem juros</span>
                                        <Image src="/images/klarna_badge.png" alt="Klarna" width={60} height={25} />
                                    </div>
                                    <p className="text-pink-400 font-bold text-lg">€{(total / 3).toFixed(2)} /mês</p>
                                </div>

                                {/* Total */}
                                <div className="flex items-center justify-between">
                                    <span className="text-slate-400 text-lg">Total</span>
                                    <span className="text-white font-bold text-2xl">€{total.toFixed(2)}</span>
                                </div>

                                {/* Checkout Button */}
                                <button
                                    onClick={handleCheckout}
                                    disabled={isCheckingOut}
                                    className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {isCheckingOut ? "A processar..." : "Finalizar Compra"}
                                </button>

                                {/* Clear Cart */}
                                <button
                                    onClick={clearCart}
                                    className="w-full text-slate-400 hover:text-white text-sm py-2 transition-colors"
                                >
                                    Limpar Carrinho
                                </button>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
