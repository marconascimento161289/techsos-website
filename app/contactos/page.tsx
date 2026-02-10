"use client";

import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, Send, Instagram, Facebook } from "lucide-react";

export default function ContactsPage() {
  return (
    <div className="pt-24 pb-20 container mx-auto px-4">
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
        
        {/* Contact Info */}
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="space-y-8"
        >
          <div>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Visite a nossa <span className="text-primary">Loja</span>
            </h1>
            <p className="text-slate-400 text-lg leading-relaxed">
              Estamos prontos para receber o seu equipamento. 
              Faça-nos uma visita para um diagnóstico gratuito ou entre em contacto 
              para esclarecer qualquer dúvida.
            </p>
          </div>

          <div className="space-y-6">
            <div className="flex items-start gap-4 p-6 bg-card border border-white/5 rounded-2xl hover:border-primary/30 transition-colors">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <MapPin size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Morada</h3>
                <p className="text-slate-400">Avenida da Igreja 15, Loja 3<br />1700-231 Lisboa (Galerias de Alvalade)</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-card border border-white/5 rounded-2xl hover:border-primary/30 transition-colors">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Phone size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Telefone / WhatsApp</h3>
                <p className="text-slate-400">+351 914 312 644</p>
                <p className="text-xs text-slate-500 mt-1">Chamada para rede móvel nacional</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-card border border-white/5 rounded-2xl hover:border-primary/30 transition-colors">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Mail size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Email</h3>
                <p className="text-slate-400">techsostelemoveispt@gmail.com</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-card border border-white/5 rounded-2xl hover:border-primary/30 transition-colors">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Instagram size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Redes Sociais</h3>
                <div className="flex gap-4 mt-2">
                  <a href="https://www.instagram.com/techsostelemovel/" target="_blank" className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors">
                    <Instagram size={18} /> Instagram
                  </a>
                  <a href="https://www.facebook.com/share/1GjeHRb8qa/?mibextid=wwXIfr" target="_blank" className="flex items-center gap-2 text-slate-400 hover:text-primary transition-colors">
                    <Facebook size={18} /> Facebook
                  </a>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-card border border-white/5 rounded-2xl hover:border-primary/30 transition-colors">
              <div className="p-3 bg-primary/10 rounded-full text-primary">
                <Clock size={24} />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white mb-1">Horário</h3>
                <p className="text-slate-400">Segunda a Sexta: 09:00 - 19:00</p>
                <p className="text-slate-400">Sábado: 10:00 - 13:00</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Form and Map */}
        <motion.div 
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="space-y-8"
        >
          {/* Contact Form */}
          <form className="bg-card border border-white/5 rounded-3xl p-8 space-y-4">
            <h3 className="text-2xl font-bold mb-2">Envie uma mensagem</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Nome</label>
                <input type="text" className="w-full bg-black/20 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary transition-colors text-white" placeholder="Seu nome" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium text-slate-400">Telemóvel</label>
                <input type="tel" className="w-full bg-black/20 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary transition-colors text-white" placeholder="+351" />
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Email</label>
              <input type="email" className="w-full bg-black/20 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary transition-colors text-white" placeholder="seu@email.com" />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-slate-400">Mensagem / Pedido de Orçamento</label>
              <textarea className="w-full bg-black/20 border border-white/10 rounded-xl p-3 focus:outline-none focus:border-primary transition-colors text-white min-h-[120px]" placeholder="Descreva o problema do seu equipamento..." />
            </div>
            <button type="submit" className="w-full bg-primary text-primary-foreground font-bold py-4 rounded-xl hover:bg-primary/90 transition-all flex items-center justify-center gap-2">
              Enviar Mensagem <Send size={18} />
            </button>
          </form>

          {/* Map Placeholder */}
          <div className="w-full h-64 bg-zinc-800 rounded-3xl border border-white/5 overflow-hidden relative group">
             {/* Simulating a map view */}
             <div className="absolute inset-0 bg-[url('https://maps.googleapis.com/maps/api/staticmap?center=38.7223,-9.1393&zoom=14&size=600x300&maptype=roadmap&style=feature:all|element:all|saturation:-100|lightness:-50&key=YOUR_API_KEY_HERE')] bg-cover bg-center grayscale opacity-50 group-hover:opacity-70 transition-opacity" />
             <div className="absolute inset-0 flex items-center justify-center">
                <div className="bg-primary text-black px-4 py-2 rounded-lg font-bold shadow-xl flex items-center gap-2 transform group-hover:-translate-y-2 transition-transform">
                  <MapPin size={16} /> Tech SOS
                </div>
             </div>
             <p className="absolute bottom-4 left-4 text-xs text-white/50 bg-black/50 px-2 py-1 rounded">Mapa Interativo (Simulado)</p>
          </div>

        </motion.div>
      </div>

    </div>
  );
}
