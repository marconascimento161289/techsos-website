"use client";

import { motion } from "framer-motion";
import { Smartphone, Gamepad2, ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface BentoItemProps {
  title: string;
  subtitle: string;
  description?: string;
  image?: string;
  className?: string; // Tailwind classes for grid span
  href: string;
  dark?: boolean;
}

const BentoItem = ({ title, subtitle, description, image, className, href, dark = false }: BentoItemProps) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    transition={{ duration: 0.5 }}
    className={`group relative overflow-hidden rounded-3xl p-8 flex flex-col justify-between ${className} ${dark ? "bg-black text-white" : "bg-zinc-100 text-black border border-white/10"}`}
  >
    {/* Background Image / Overlay */}
    {image && (
      <div className="absolute inset-0 z-0">
        <Image src={image} alt={title} fill className="object-cover transition-transform duration-700 group-hover:scale-105" />
        <div className={`absolute inset-0 ${dark ? "bg-black/40" : "bg-white/0"}`} />
      </div>
    )}

    {/* Content */}
    <div className="relative z-10 max-w-md">
      <span className={`text-xs font-bold uppercase tracking-wider mb-2 block ${dark ? "text-slate-400" : "text-slate-500"}`}>{subtitle}</span>
      <h3 className={`text-3xl font-bold mb-4 ${dark ? "text-white" : "text-black"}`}>{title}</h3>
      {description && <p className={`text-lg mb-6 ${dark ? "text-slate-300" : "text-slate-600"}`}>{description}</p>}

      <Link href={href} className={`inline-flex items-center gap-2 font-bold ${dark ? "text-primary hover:text-white" : "text-primary hover:opacity-80"} transition-colors`}>
        Saber Mais <ArrowRight size={16} />
      </Link>
    </div>
  </motion.div>
);

export function BentoGrid() {
  return (
    <section className="py-20 container mx-auto px-4">
      <h2 className="text-4xl md:text-5xl font-bold text-center mb-16">Ecossistema de Serviços</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[400px]">
        {/* Large Item - Smartphones */}
        <BentoItem
          className="md:col-span-2 row-span-1 bg-zinc-900 border border-white/10"
          title="Reparação de iPhone"
          subtitle="Especialidade Master"
          description="Técnicos certificados pela Tech SOS com peças de qualidade Premium. O seu Apple em boas mãos."
          href="/servicos#smartphones"
          image="/images/repair_1.png"
          dark={true}
        />

        {/* Tall Item - Consoles */}
        <BentoItem
          className="md:col-span-1 row-span-2 bg-zinc-800 border border-white/5"
          title="Gaming & Consolas"
          subtitle="Manutenção Pro"
          description="Limpeza profunda, troca de massa térmica e reparos HDMI para PS5, Xbox e Switch."
          href="/servicos#consolas"
          image="/images/repair_2.png"
          dark={true}
        />

        {/* Medium Item - Trade In */}
        <BentoItem
          className="md:col-span-1 bg-white"
          title="Retomas"
          subtitle="Upgrade"
          description="O seu usado vale dinheiro na troca."
          href="/servicos"
          dark={false} // White card implementation akin to Apple's bright cards
        />

        {/* Medium Item - Store */}
        <BentoItem
          className="md:col-span-1 bg-zinc-950 border border-primary/20"
          title="Loja Online"
          subtitle="Showcase"
          description="Telemóveis e acessórios premium com garantia e entrega rápida em todo o país."
          href="/produtos"
          image="/images/iphone_showcase.png"
          dark={true}
        />

      </div>
    </section>
  );
}
