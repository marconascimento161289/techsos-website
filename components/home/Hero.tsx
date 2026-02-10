"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Wrench } from "lucide-react";

export function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black">
      {/* Robot Logo Background Watermark - Giant & Subtle */}
      <div className="absolute inset-0 flex items-center justify-center z-0 opacity-[0.05] pointer-events-none select-none">
        <Image
          src="/images/logo_official.jpg"
          alt="Tech SOS Watermark"
          width={1000}
          height={1000}
          className="object-contain"
        />
      </div>

      {/* Background Elements */}
      <div className="absolute inset-0 bg-background z-0" />
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-primary/20 rounded-full blur-[128px] -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-accent/10 rounded-full blur-[128px] translate-y-1/2 -translate-x-1/2" />

      <div className="container mx-auto px-4 grid md:grid-cols-2 gap-12 items-center relative z-10">

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-6"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 text-primary text-sm font-medium">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Loja Aberta • Reparações na Hora
          </div>

          <h1 className="text-5xl md:text-7xl font-bold leading-tight">
            Tecnologia que <br />
            <span className="text-gradient">
              Ganha Vida
            </span>
          </h1>

          <p className="text-lg text-slate-400 max-w-lg leading-relaxed">
            Especialistas em reparação avançada de <span className="text-white">telemóveis</span>, personalização de consolas e eletrónicos premium. O seu equipamento merece o melhor cuidado técnico em Lisboa.
          </p>

          <div className="flex flex-wrap gap-4 pt-4">
            <Link
              href="/produtos"
              className="group bg-primary text-primary-foreground px-8 py-4 rounded-full font-bold text-lg hover:shadow-[0_0_20px_rgba(251,140,0,0.5)] transition-all flex items-center gap-2"
            >
              Explorar Loja
              <ArrowRight className="group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/servicos"
              className="px-8 py-4 rounded-full font-bold text-lg border border-white/20 hover:bg-white/5 transition-colors flex items-center gap-2"
            >
              <Wrench size={20} className="text-primary" />
              Nossos Serviços
            </Link>
          </div>

          <div className="pt-8 flex items-center gap-4 text-sm text-slate-500">
            <p>Parceiros Oficiais:</p>
            <div className="flex items-center gap-6 opacity-60 hover:opacity-100 transition-all">
              <Image src="/images/klarna_badge.png" alt="Klarna" width={70} height={30} className="object-contain" />
              <div className="h-4 w-px bg-white/20" />
              <span className="font-bold text-white/50 text-xs tracking-widest uppercase">Shopify Partner</span>
            </div>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8, rotate: 10 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative h-[600px] flex items-center justify-center"
        >
          <div className="relative z-10 w-full max-w-md">
            {/* Using the iPhone Showcase image generated earlier */}
            <Image
              src="/images/iphone_showcase.png"
              alt="iPhone 15 Pro Max Titanium"
              width={500}
              height={600}
              className="drop-shadow-2xl"
              priority
            />

            {/* Floating Elements/Badges */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
              className="absolute -top-10 -right-10 bg-black/80 backdrop-blur border border-white/10 p-4 rounded-2xl shadow-xl"
            >
              <div className="flex flex-col gap-2">
                <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">Oferta Especial</p>
                <div className="flex items-center gap-3">
                  <p className="text-xl font-black text-white">3x</p>
                  <div className="h-6 w-px bg-white/20" />
                  <Image src="/images/klarna_badge.png" alt="Klarna" width={60} height={25} className="object-contain" />
                </div>
                <p className="text-[10px] text-primary font-bold uppercase">Sem Juros</p>
              </div>
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
