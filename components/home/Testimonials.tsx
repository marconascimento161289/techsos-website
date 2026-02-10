"use client";

import { motion } from "framer-motion";
import { Star, Quote } from "lucide-react";

const testimonials = [
    {
        id: 1,
        name: "João Silva",
        role: "Cliente iPhone 15",
        content: "A Tech SOS salvou o meu dia! Reparação de ecrã feita em menos de 1 hora com qualidade original. Recomendo vivamente.",
        stars: 5,
    },
    {
        id: 2,
        name: "Ana Martins",
        role: "Dona de PS5",
        content: "O serviço de limpeza da minha consola foi fantástico. Já não faz barulho nenhum e o atendimento em Alvalade é top!",
        stars: 5,
    },
    {
        id: 3,
        name: "Ricardo Pereira",
        role: "Entusiasta Tech",
        content: "Comprei um iPhone recondicionado e está como novo. Transparência e profissionalismo total.",
        stars: 5,
    }
];

export function Testimonials() {
    return (
        <section className="py-24 bg-black relative overflow-hidden">
            <div className="container mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold mb-4">O que dizem os nossos <span className="text-primary">Clientes</span></h2>
                    <p className="text-slate-400 max-w-2xl mx-auto">A confiança é a base do nosso trabalho. Veja a experiência de quem já confiou na Tech SOS.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {testimonials.map((t, idx) => (
                        <motion.div
                            key={t.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                            className="glass p-8 rounded-3xl relative"
                        >
                            <Quote className="absolute top-6 right-8 text-white/5 w-12 h-12" />
                            <div className="flex gap-1 mb-4">
                                {[...Array(t.stars)].map((_, i) => (
                                    <Star key={i} size={16} className="fill-primary text-primary" />
                                ))}
                            </div>
                            <p className="text-slate-300 mb-6 italic">"{t.content}"</p>
                            <div>
                                <p className="font-bold text-white">{t.name}</p>
                                <p className="text-xs text-slate-500 uppercase tracking-widest">{t.role}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
