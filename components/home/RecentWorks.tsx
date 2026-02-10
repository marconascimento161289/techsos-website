"use client";

import { motion } from "framer-motion";
import { Play, ArrowUpRight } from "lucide-react";
import Image from "next/image";

const recentWorks = [
  {
    id: 1,
    title: "Substituição de Ecrã iPhone 15 Pro",
    category: "Apple Premium",
    image: "/images/repair_1.png",
  },
  {
    id: 2,
    title: "Limpeza e Recondicionamento PS5",
    category: "Gaming Force",
    image: "/images/repair_2.png",
  },
  {
    id: 3,
    title: "Reparação de Motherboard FaceID",
    category: "Micro-soldadura",
    image: "/images/repair_3.png",
  }
];

export function RecentWorks() {
  return (
    <section className="py-24 bg-zinc-950 relative overflow-hidden">
      <div className="container mx-auto px-4">

        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-6">
          <div className="max-w-xl">
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              Bastidores da <span className="text-primary">Excelência</span>
            </h2>
            <p className="text-slate-400 text-lg">
              Veja como cuidamos da sua tecnologia. Acompanhe nossos trabalhos mais recentes e reparações complexas.
            </p>
          </div>

          <a
            href="https://www.facebook.com/share/1GjeHRb8qa/?mibextid=wwXIfr"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Ver vídeos de reparações no Facebook"
            className="flex items-center gap-2 text-primary font-bold hover:text-white transition-colors"
          >
            Ver todos os vídeos <ArrowUpRight size={20} />
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {recentWorks.map((work, index) => (
            <motion.div
              key={work.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="group relative h-[500px] rounded-3xl overflow-hidden bg-zinc-900 border border-white/5 shadow-2xl cursor-pointer"
            >
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity" />

              {/* Play Button */}
              <div className="absolute inset-0 z-20 flex items-center justify-center">
                <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 group-hover:scale-110 transition-transform">
                  <Play className="fill-white text-white translate-x-1" size={32} />
                </div>
              </div>

              {/* Text Content */}
              <div className="absolute bottom-0 left-0 p-8 z-20 transform group-hover:-translate-y-2 transition-transform">
                <span className="inline-block px-3 py-1 rounded-full bg-primary/20 text-primary text-xs font-bold mb-3 border border-primary/20">
                  {work.category}
                </span>
                <h3 className="text-xl font-bold text-white leading-tight">
                  {work.title}
                </h3>
              </div>

              {/* Placeholder Image (To be generated) */}
              <Image
                src={work.image}
                alt={work.title}
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
