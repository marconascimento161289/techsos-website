"use client";

import { motion } from "framer-motion";
import { Smartphone, Gamepad2, Laptop, Tv, ArrowRight, RefreshCw, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const services = [
  {
    id: "smartphones",
    title: "Smartphones & Tablets",
    description: "Substituição de ecrãs, baterias e componentes internos. Recuperação de FaceID e micro-soldadura avançada.",
    icon: Smartphone,
    image: "https://images.unsplash.com/photo-1597740985671-2a8a3b80502e?q=80&w=2070&auto=format&fit=crop",
    features: ["Peças Originais", "Garantia 6 Meses", "Check-up Grátis"]
  },
  {
    id: "consolas",
    title: "Consolas & Gaming",
    description: "Limpeza profunda, manutenção térmica, reparação de HDMI e leitores. Especialistas em PS5, Xbox e Switch.",
    icon: Gamepad2,
    image: "https://images.unsplash.com/photo-1607853202273-797f1c22a38e?q=80&w=2070&auto=format&fit=crop",
    features: ["Limpeza Artística", "Reparação na Hora", "Garantia Total"]
  },
  {
    id: "pc",
    title: "Computadores & Mac",
    description: "Formatação, recuperação de dados, upgrades de SSD/RAM e reparação de motherboards complexas.",
    icon: Laptop,
    image: "https://images.unsplash.com/photo-1591405351990-4726e331f141?q=80&w=2070&auto=format&fit=crop",
    features: ["Upgrade Velocidade", "MacOS & Windows", "Suporte PT/EN"]
  },
  {
    id: "tv",
    title: "TV & Som",
    description: "Reparação de painéis, fontes de alimentação e sistemas de som Hi-Fi. Colunas Bluetooth e sistemas Home Cinema.",
    icon: Tv,
    image: "https://images.unsplash.com/photo-1593784991095-a205069470b6?q=80&w=2070&auto=format&fit=crop",
    features: ["Orçamento Grátis", "Peças Próprias", "Áudio Hi-Res"]
  }
];

export default function ServicesPage() {
  return (
    <div className="pt-20 pb-20">

      {/* Header Section */}
      <section className="relative py-20 bg-zinc-900 overflow-hidden">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold mb-6"
          >
            Laboratório <span className="text-primary">Técnico</span>
          </motion.h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Diagnóstico gratuito e reparação profissional para todos os seus equipamentos.
            Utilizamos peças originais e oferecemos garantia em todas as intervenções.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              id={service.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="group bg-zinc-900/50 border border-white/5 rounded-[40px] overflow-hidden hover:border-primary/40 transition-all duration-500 shadow-2xl flex flex-col md:flex-row h-full min-h-[320px]"
            >
              <div className="w-full md:w-[45%] relative h-72 md:h-auto overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/80 via-transparent to-transparent hidden md:block" />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent md:hidden" />

                {/* Confidence Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  <div className="bg-primary px-3 py-1 rounded-full border border-white/20 flex items-center gap-2 shadow-lg">
                    <ShieldCheck size={12} className="text-white" />
                    <span className="text-[10px] font-black text-white uppercase tracking-wider">Premium</span>
                  </div>
                  <div className="bg-black/40 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 flex items-center gap-2">
                    <Zap size={10} className="text-primary" />
                    <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">Rápido</span>
                  </div>
                </div>
              </div>

              <div className="p-8 md:p-10 flex-1 flex flex-col justify-center bg-zinc-900/30 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all duration-500 shadow-inner">
                    <service.icon size={24} />
                  </div>
                  <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                    Tech SOS Lab
                  </div>
                </div>

                <h3 className="text-2xl font-black text-white mb-3 group-hover:text-primary transition-colors tracking-tight">{service.title}</h3>
                <p className="text-slate-400 mb-6 leading-relaxed text-sm">
                  {service.description}
                </p>

                {/* New Features List */}
                <div className="grid grid-cols-2 gap-3 mb-8">
                  {service.features.map(feature => (
                    <div key={feature} className="flex items-center gap-2">
                      <div className="w-1 h-1 rounded-full bg-primary" />
                      <span className="text-[11px] font-bold text-slate-300 uppercase tracking-tighter">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link
                  href="/contactos"
                  className="inline-flex items-center text-white text-xs font-black hover:text-primary transition-colors group/link uppercase tracking-widest bg-white/5 self-start px-4 py-2 rounded-lg border border-white/5 hover:border-primary/50"
                >
                  Saber mais
                  <ArrowRight size={14} className="ml-2 group-hover/link:translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Trade-in Section (Retomas) - REDESIGNED TO NOT COVER IMAGE */}
      <section className="py-24 container mx-auto px-4">
        <div className="grid md:grid-cols-2 items-center gap-16 bg-gradient-to-br from-zinc-900 to-black p-8 md:p-16 rounded-[60px] border border-white/5 shadow-3xl relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full bg-primary/5 opacity-20 pointer-events-none" />

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative z-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-sm font-bold mb-8">
              <RefreshCw size={14} className="animate-spin-slow" />
              Upgrade Elite
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 text-white uppercase italic tracking-tighter leading-tight">
              A Sua Felicidade, <br />
              <span className="text-primary">O Nosso Foco.</span>
            </h2>
            <p className="text-slate-400 text-xl mb-10 leading-relaxed max-w-md">
              Dê uma nova vida ao seu telemóvel antigo. Na Tech SOS, garantimos a melhor avaliação do mercado para que saia sempre com um sorriso e tecnologia de ponta.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <Link
                href="/contactos"
                className="bg-primary hover:bg-primary/90 text-white px-10 py-5 rounded-full font-black text-lg shadow-xl shadow-primary/20 hover:scale-105 transition-all flex items-center justify-center gap-3 uppercase tracking-widest"
              >
                Avaliar Agora <ArrowRight size={20} />
              </Link>
              <div className="flex items-center gap-3 px-6 py-4 bg-white/5 rounded-full border border-white/10">
                <ShieldCheck size={20} className="text-primary" />
                <span className="text-xs font-black text-slate-300 uppercase tracking-widest leading-none">Satisfação Garantida</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            className="relative h-[450px] md:h-[600px] rounded-[50px] overflow-hidden shadow-2xl border-4 border-white/10"
          >
            <Image
              src="https://images.unsplash.com/photo-1556742031-c6961e8560b0?q=80&w=2070&auto=format&fit=crop"
              alt="Cliente Feliz TechSOS"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute bottom-8 left-8 right-8 p-6 bg-black/40 backdrop-blur-xl rounded-3xl border border-white/10 transform -rotate-1">
              <p className="text-white font-bold text-center">&quot;O melhor sítio de Lisboa para trocar de telemóvel!&quot;</p>
            </div>
          </motion.div>
        </div>
      </section>

    </div>
  );
}
