"use client";

import { motion } from "framer-motion";
import { RefreshCw, ArrowRight, ShieldCheck, Zap, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function RetomasPage() {
    const steps = [
        {
            icon: <Zap className="text-primary" size={32} />,
            title: "Avaliação Rápida",
            description: "Traga o seu dispositivo à nossa loja ou envie fotos detalhadas via WhatsApp."
        },
        {
            icon: <ShieldCheck className="text-primary" size={32} />,
            title: "Inspeção Técnica",
            description: "Os nossos especialistas avaliam o estado físico e funcional do seu equipamento."
        },
        {
            icon: <RefreshCw className="text-primary" size={32} />,
            title: "Receba o seu Crédito",
            description: "Pague até 30% do valor do seu novo dispositivo com o seu antigo. Crédito imediato em loja."
        }
    ];

    return (
        <div className="pt-24 pb-20 overflow-hidden">
            {/* Hero Section */}
            <section className="container mx-auto px-4 mb-20">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest mb-6 inline-block">
                            Programa de Crédito TechSOS
                        </span>
                        <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
                            O Teu Dispositivo Antigo <br />
                            Vale <span className="text-primary">Dinheiro</span>.
                        </h1>
                        <p className="text-slate-400 text-lg mb-8 max-w-lg">
                            Atualiza para o mais recente iPhone ou Samsung entregando o teu atual.
                            Garantimos uma avaliação justa e até **30% do valor** revertido em crédito imediato.
                        </p>
                        <div className="flex flex-wrap gap-4">
                            <Link
                                href="https://wa.me/351914312644"
                                target="_blank"
                                className="bg-primary hover:bg-primary/90 text-black font-bold px-8 py-4 rounded-2xl flex items-center gap-2 transition-all"
                            >
                                <MessageCircle size={20} />
                                Avaliar Agora
                            </Link>
                            <Link
                                href="/produtos"
                                className="bg-white/5 hover:bg-white/10 text-white font-bold px-8 py-4 rounded-2xl border border-white/10 transition-all flex items-center gap-2"
                            >
                                Ver Novos Modelos
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-primary/20 blur-[120px] rounded-full" />
                        <div className="relative z-10 bg-zinc-900 border border-white/10 rounded-[40px] overflow-hidden group shadow-2xl">
                            {/* Confiança Image */}
                            <div className="relative h-64 overflow-hidden">
                                <Image
                                    src="https://images.unsplash.com/photo-1550009158-9ebf69173e03?q=80&w=2001&auto=format&fit=crop"
                                    alt="Confiança e Tecnologia"
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-700 opacity-80"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent" />
                                <div className="absolute bottom-6 left-8 bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-white/10 flex items-center gap-2">
                                    <ShieldCheck size={16} className="text-primary" />
                                    <span className="text-xs font-bold text-white uppercase tracking-tighter">Certificado TechSOS</span>
                                </div>
                            </div>

                            <div className="p-8 lg:p-10">
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-14 h-14 bg-primary/10 rounded-2xl flex items-center justify-center p-3">
                                        <Image src="/images/robot_logo.png" alt="TechSOS" width={48} height={48} className="object-contain" />
                                    </div>
                                    <div>
                                        <h3 className="text-2xl font-bold">Avaliação Transparente</h3>
                                        <p className="text-slate-500">Técnicos certificados pela Apple e Samsung</p>
                                    </div>
                                </div>

                                <div className="bg-white/5 rounded-3xl border border-white/5 p-6 mb-4">
                                    <p className="text-sm text-slate-400 mb-1 leading-none uppercase tracking-widest font-black opacity-50">Upgrade Especial</p>
                                    <h4 className="text-3xl font-black text-primary mb-2">Retomas</h4>
                                    <p className="text-white/80 font-medium">O seu usado vale até 30% do valor do novo dispositivo.</p>
                                </div>
                                <p className="text-[10px] text-slate-500 italic">
                                    *Válido para iPhones (desde o 11) e Samsung S-Series (desde o S21). Outros modelos sob consulta.
                                </p>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Steps Section */}
            <section className="bg-zinc-900/50 py-20 border-y border-white/5">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="text-3xl font-bold mb-16">Como Funciona o Processo</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {steps.map((step, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.2 }}
                                className="flex flex-col items-center"
                            >
                                <div className="w-20 h-20 bg-primary/10 rounded-3xl flex items-center justify-center mb-6">
                                    {step.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                                <p className="text-slate-400 max-w-xs">{step.description}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA section */}
            <section className="container mx-auto px-4 py-20">
                <div className="bg-primary rounded-[40px] p-8 lg:p-20 text-center relative overflow-hidden">
                    <div className="relative z-10">
                        <h2 className="text-4xl lg:text-5xl font-black text-black mb-6">Pronto para o Upgrade?</h2>
                        <p className="text-black/70 text-lg mb-10 max-w-xl mx-auto">
                            Não deixes o teu antigo smartphone perder valor na gaveta.
                            Traz-o hoje à TechSOS e sai com tecnologia de ponta.
                        </p>
                        <Link
                            href="https://wa.me/351914312644"
                            target="_blank"
                            className="bg-black text-white px-10 py-5 rounded-2xl font-black text-xl hover:scale-105 transition-all inline-block shadow-2xl"
                        >
                            Contactar Equipa comercial
                        </Link>
                    </div>
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-black/5 blur-[80px] rounded-full" />
                </div>
            </section>
        </div>
    );
}
