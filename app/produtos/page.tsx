"use client";

import { motion } from "framer-motion";
import { ShoppingCart, CreditCard } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { useCart } from "@/components/cart/CartContext";

interface Product {
  id: string;
  name: string;
  color: string;
  storage: string;
  price: number;
  category: string;
  image: string;
  condition: string;
  variantId: string;
}

const categories = ["Todos", "Telemóveis", "Relógios", "Áudio", "Recondicionados"];

// HARDCODED PRODUCTS - This ensures they ALWAYS show
const PRODUCTS: Product[] = [
  {
    id: "gid://shopify/Product/15379580158300",
    name: "iPhone 16 Pro Max - 256GB (Novo)",
    color: "Padrão",
    storage: "256GB",
    price: 1499,
    category: "Telemóveis",
    image: "https://images.unsplash.com/photo-1632661674596-df8be070a5c5?q=80&w=2070&auto=format&fit=crop",
    condition: "Novo",
    variantId: "gid://shopify/ProductVariant/56427343479132"
  },
  {
    id: "gid://shopify/Product/15379580191068",
    name: "Samsung Galaxy S24 Ultra - 512GB (Novo)",
    color: "Padrão",
    storage: "512GB",
    price: 1349,
    category: "Telemóveis",
    image: "https://cdn.shopify.com/s/files/1/0981/1106/2364/files/photo-1610945415295-d9bbf067e59c_74ea4659-f169-46f8-a701-6ec8639fce2f.jpg?v=1767998772",
    condition: "Novo",
    variantId: "gid://shopify/ProductVariant/56427343511900"
  },
  {
    id: "gid://shopify/Product/15379580256604",
    name: "iPhone 15 Recondicionado (Grade A+)",
    color: "Padrão",
    storage: "128GB",
    price: 479,
    category: "Telemóveis",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?q=80&w=2070&auto=format&fit=crop",
    condition: "Recondicionado",
    variantId: "gid://shopify/ProductVariant/56427343577436"
  },
  {
    id: "gid://shopify/Product/15379580322140",
    name: "PlayStation 5 Slim 1TB",
    color: "Branco",
    storage: "1TB",
    price: 499,
    category: "Consolas",
    image: "https://images.unsplash.com/photo-1606813907291-d86efa9b94db?q=80&w=2070&auto=format&fit=crop&v=2",
    condition: "Novo",
    variantId: "gid://shopify/ProductVariant/56427343610204"
  },
  {
    id: "gid://shopify/Product/15379580354908",
    name: "Nintendo Switch OLED",
    color: "Neon",
    storage: "64GB",
    price: 349,
    category: "Consolas",
    image: "https://cdn.shopify.com/s/files/1/0981/1106/2364/files/photo-1578303512597-81e6cc155b3e_4fcee0d1-f713-4759-a925-6b73bc9a6525.jpg?v=1767998776",
    condition: "Novo",
    variantId: "gid://shopify/ProductVariant/56427343642972"
  },
  {
    id: "gid://shopify/Product/15379580420444",
    name: "iPhone 13 128GB Recondicionado",
    color: "Preto",
    storage: "128GB",
    price: 349,
    category: "Telemóveis",
    image: "https://cdn.shopify.com/s/files/1/0981/1106/2364/files/photo-1695048133142-1a20484d2569_17f12080-a5c1-4b50-8d59-e3ceb67c0baa.jpg?v=1767998776",
    condition: "Recondicionado",
    variantId: "gid://shopify/ProductVariant/56427343675740"
  },
  {
    id: "gid://shopify/Product/15379580453212",
    name: "MacBook Air M2 13''",
    color: "Space Gray",
    storage: "256GB SSD",
    price: 1199,
    category: "Computadores",
    image: "https://cdn.shopify.com/s/files/1/0981/1106/2364/files/photo-1611186871348-b1ce696e52c9_608f9595-0b54-45b5-81f2-b5d2f77c10ae.jpg?v=1767998776",
    condition: "Novo",
    variantId: "gid://shopify/ProductVariant/56427343708508"
  },
  {
    id: "gid://shopify/Product/15379580518748",
    name: "AirPods Pro (2.ª geração)",
    color: "Branco",
    storage: "",
    price: 279,
    category: "Áudio",
    image: "https://cdn.shopify.com/s/files/1/0981/1106/2364/files/photo-1600294037681-c80b4cb5b434_76b894b3-b8f0-499d-b8d1-c91698800151.jpg?v=1767998776",
    condition: "Novo",
    variantId: "gid://shopify/ProductVariant/56427343741276"
  },
  {
    id: "gid://shopify/Product/15379617546588",
    name: "iPhone 13 Pro Max (Gaming Special)",
    color: "Azul",
    storage: "512GB",
    price: 699,
    category: "Telemóveis",
    image: "https://cdn.shopify.com/s/files/1/0981/1106/2364/files/photo-1632661674596-df8be070a5c5.jpg?v=1767998777",
    condition: "Novo",
    variantId: "gid://shopify/ProductVariant/56427459641692"
  },
  {
    id: "gid://shopify/Product/15379617710428",
    name: "iPhone 14 Plus (Edição Bateria)",
    color: "Roxo",
    storage: "256GB",
    price: 649,
    category: "Telemóveis",
    image: "https://cdn.shopify.com/s/files/1/0981/1106/2364/files/photo-1678652197831-2d180705cd2c.jpg?v=1767998780",
    condition: "Novo",
    variantId: "gid://shopify/ProductVariant/56427459674460"
  }
];

export default function ProductsPage() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filteredProducts = activeCategory === "Todos"
    ? PRODUCTS
    : activeCategory === "Recondicionados"
      ? PRODUCTS.filter((p: Product) => p.condition.includes("Recondicionado"))
      : PRODUCTS.filter((p: Product) => p.category === activeCategory);

  const { addItem, openCart } = useCart();

  const handleAddToCart = (product: Product) => {
    addItem({
      id: product.variantId,
      variantId: product.variantId,
      name: product.name,
      price: product.price,
      image: product.image,
      storage: product.storage,
      color: product.color
    });
    openCart();
  };

  return (
    <div className="pt-24 pb-20 container mx-auto px-4">

      {/* Header */}
      <div className="mb-12 text-center md:text-left">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Loja <span className="text-primary">TechSOS</span></h1>
        <p className="text-slate-400 max-w-2xl flex flex-wrap items-center gap-x-2">
          Os melhores gadgets do mercado e recondicionados certificados.
          Pague em 3x sem juros com <Image src="/images/klarna_badge.png" alt="Klarna" width={60} height={25} className="inline-block align-middle" />.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-12">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "px-5 py-2 rounded-full text-sm font-bold border transition-all",
              activeCategory === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-transparent text-slate-400 border-white/10 hover:border-primary/50"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Retomas Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 bg-primary rounded-[32px] p-8 flex flex-col md:flex-row items-center justify-between gap-6 overflow-hidden relative"
      >
        <div className="relative z-10">
          <h2 className="text-3xl font-black text-black mb-2 uppercase italic tracking-tighter text-shadow-sm">Troca o Teu Antigo <br /> por Dinheiro</h2>
          <p className="text-black/70 font-medium mb-4 max-w-md">Recebe até 30% de crédito na compra de um dispositivo novo. Avaliação TechSOS imediata.</p>
          <Link href="/retomas" className="bg-black text-white px-6 py-3 rounded-xl font-bold hover:scale-105 transition-all inline-block shadow-lg">
            Saber Mais sobre Retomas
          </Link>
        </div>
        <div className="relative z-10 w-32 h-32 md:w-48 md:h-48 group">
          <Image
            src="/images/robot_logo.png"
            alt="Trocas"
            width={200}
            height={200}
            className="object-contain drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] group-hover:rotate-12 transition-transform duration-500"
          />
        </div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full" />
      </motion.div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product: Product) => (
          <motion.div
            key={product.id}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="group bg-card border border-white/5 rounded-3xl overflow-hidden hover:border-primary/30 transition-all hover:shadow-2xl hover:shadow-primary/5"
          >
            {/* Image Area */}
            <div className="relative h-72 bg-gradient-to-b from-zinc-800 to-black p-6 flex items-center justify-center">
              <span className="absolute top-4 left-4 px-3 py-1 bg-black/50 backdrop-blur rounded-full text-xs font-bold text-white border border-white/10">
                {product.condition}
              </span>
              <Image
                src={product.image}
                alt={product.name}
                width={300}
                height={300}
                className="object-contain h-full w-auto drop-shadow-2xl group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute bottom-4 right-4 shadow-xl hover:scale-105 transition-transform duration-300">
                <Image src="/images/klarna_badge.png" alt="Klarna 3x" width={80} height={35} className="object-contain rounded-md" />
              </div>
            </div>

            {/* Content Area */}
            <div className="p-6">
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className="text-xl font-bold text-white">{product.name}</h3>
                  <p className="text-sm text-slate-400">{product.color} {product.storage ? `• ${product.storage}` : ''}</p>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold text-primary">€{product.price}</p>
                  <div className="flex gap-1 justify-end opacity-50">
                    <CreditCard size={12} className="text-white" />
                    <span className="text-[10px] font-medium uppercase tracking-tighter">À Vista</span>
                  </div>
                </div>
              </div>

              <div className="bg-pink-600/5 border border-pink-500/10 rounded-xl p-4 mb-6 flex flex-col gap-2 relative overflow-hidden group/klarna">
                <div className="absolute top-0 right-0 w-20 h-20 bg-pink-500/5 blur-3xl rounded-full" />
                <div className="flex items-center justify-between relative z-10">
                  <div className="flex items-center gap-3">
                    <Image src="/images/klarna_badge.png" alt="Klarna" width={70} height={30} className="object-contain" />
                    <span className="text-[10px] font-bold text-pink-400/80 uppercase tracking-widest">3x Sem Juros</span>
                  </div>
                  <span className="text-lg font-black text-pink-500">€{(product.price / 3).toFixed(2)}</span>
                </div>
                <p className="text-[10px] text-slate-400 relative z-10">Divide o custo em 3 pagamentos suaves.</p>
              </div>

              {/* Actions */}
              <div className="flex gap-3">
                <button
                  onClick={() => handleAddToCart(product)}
                  className="flex-1 bg-white text-black font-bold py-3 rounded-xl hover:bg-slate-200 transition-all flex items-center justify-center gap-2 group/btn active:scale-95"
                  aria-label={`Adicionar ${product.name} ao carrinho`}
                >
                  <ShoppingCart size={18} />
                  Adicionar
                </button>
              </div>
              <div className="flex items-center justify-center gap-4 mt-4 opacity-50 grayscale hover:grayscale-0 transition-all">
                <span className="text-[10px] text-slate-500 uppercase tracking-[0.2em] font-medium">Aceitamos</span>
                <div className="flex gap-3 items-center">
                  <CreditCard size={12} className="text-slate-500" />
                  <Image src="/images/klarna_badge.png" alt="Klarna" width={40} height={18} className="object-contain" />
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
