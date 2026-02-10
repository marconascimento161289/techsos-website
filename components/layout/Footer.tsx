import { Logo } from "./Logo";
import { Instagram, MapPin, Phone, Mail, Facebook } from "lucide-react";
import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-slate-950 border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">

          <div className="space-y-4">
            <Logo />
            <p className="text-slate-400 text-sm leading-relaxed">
              Especialistas em reparação e personalização de tecnologia.
              Dê uma nova vida aos seus equipamentos com a Tech SOS.
            </p>
            <div className="flex gap-4">
              <a
                href="https://www.instagram.com/techsostelemovel/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Tech SOS"
                className="p-2 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-colors"
              >
                <Instagram size={20} />
              </a>
              <a
                href="https://www.facebook.com/share/1GjeHRb8qa/?mibextid=wwXIfr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Tech SOS"
                className="p-2 bg-white/5 rounded-full hover:bg-primary/20 hover:text-primary transition-colors"
              >
                <Facebook size={20} />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6">Serviços</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/servicos#smartphones" className="hover:text-primary transition-colors">Reparação de Telemóveis</Link></li>
              <li><Link href="/servicos#consolas" className="hover:text-primary transition-colors">Consolas & Gaming</Link></li>
              <li><Link href="/servicos#pc" className="hover:text-primary transition-colors">Computadores e Laptops</Link></li>
              <li><Link href="/servicos#tv" className="hover:text-primary transition-colors">Televisão & Som</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6">Loja</h3>
            <ul className="space-y-3 text-sm text-slate-400">
              <li><Link href="/produtos" className="hover:text-primary transition-colors">Telemóveis Recondicionados</Link></li>
              <li><Link href="/produtos" className="hover:text-primary transition-colors">Acessórios Apple e Samsung</Link></li>
              <li><Link href="/produtos" className="hover:text-primary transition-colors">Gadgets de Última Geração</Link></li>
              <li><Link href="/retomas" className="hover:text-primary transition-colors">Avaliar Retoma</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-white mb-6">Contactos</h3>
            <ul className="space-y-4 text-sm text-slate-400">
              <li className="flex items-start gap-3">
                <MapPin className="text-primary shrink-0" size={18} />
                <span>Avenida da Igreja 15, Loja 3<br />1700-231 Lisboa (Galerias de Alvalade)</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="text-primary shrink-0" size={18} />
                <span>+351 914 312 644</span>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="text-primary shrink-0" size={18} />
                <span>techsostelemoveispt@gmail.com</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="border-t border-white/5 pt-8 text-center text-xs text-slate-600">
          <p>© {new Date().getFullYear()} Tech SOS Telemóveis. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
