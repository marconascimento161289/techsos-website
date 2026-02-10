"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Logo } from "./Logo";
import { Menu, X, ShoppingBag, Search, Facebook, Instagram } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import CartIcon from "../cart/CartIcon";

const navLinks = [
  { name: "Início", href: "/" },
  { name: "Produtos", href: "/produtos" },
  { name: "Retomas", href: "/retomas" },
  { name: "Serviços", href: "/servicos" },
  { name: "Contactos", href: "/contactos" },
];

export function Header() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b",
        scrolled
          ? "bg-black/70 backdrop-blur-xl border-white/5 py-2"
          : "bg-transparent border-transparent py-4"
      )}
    >
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Logo className="scale-90 origin-left" />

        {/* Desktop Nav - Apple Style (Centered, Minimal) */}
        <nav className="hidden md:flex items-center gap-10">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-xs font-medium text-slate-300 hover:text-white transition-colors tracking-widest uppercase opacity-80 hover:opacity-100"
            >
              {link.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-6">
          <a href="https://www.facebook.com/share/17n7AdjMAu/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-[#1877F2] transition-colors" aria-label="Facebook">
            <Facebook size={18} />
          </a>
          <a href="https://www.instagram.com/techsostelemovel/" target="_blank" rel="noopener noreferrer" className="text-slate-300 hover:text-[#E4405F] transition-colors" aria-label="Instagram">
            <Instagram size={18} />
          </a>
          <button className="text-slate-300 hover:text-white transition-colors" aria-label="Pesquisar">
            <Search size={18} />
          </button>
          <CartIcon />
          <a
            href="https://wa.me/351914312644"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white text-black px-4 py-1.5 rounded-full text-xs font-bold hover:bg-slate-200 transition-colors"
          >
            Comprar
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-white p-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "100vh" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden absolute top-0 left-0 w-full bg-black z-40 pt-24 px-6 flex flex-col"
          >
            <nav className="flex flex-col gap-6">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="text-2xl font-bold text-slate-200 hover:text-white block border-b border-white/10 pb-4"
                  >
                    {link.name}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="mt-8 flex flex-col gap-4">
              <div className="flex justify-center gap-8 mb-4">
                <a href="https://www.facebook.com/share/17n7AdjMAu/?mibextid=wwXIfr" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#1877F2]">
                  <Facebook size={24} />
                </a>
                <a href="https://www.instagram.com/techsostelemovel/" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-[#E4405F]">
                  <Instagram size={24} />
                </a>
              </div>
              <a
                href="https://wa.me/351914312644"
                className="bg-primary text-black py-4 rounded-xl text-center font-bold"
              >
                Falar no WhatsApp
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
