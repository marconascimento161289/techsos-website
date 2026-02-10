import { Hero } from "@/components/home/Hero";
import { BentoGrid } from "@/components/home/BentoGrid";
import { RecentWorks } from "@/components/home/RecentWorks";
import { Testimonials } from "@/components/home/Testimonials";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-black">
      <Hero />
      <BentoGrid />
      <RecentWorks />
      <Testimonials />

      {/* Footer / Info Section */}
      <section className="py-20 bg-zinc-950 border-t border-white/5">
        <div className="container mx-auto px-4 text-center">
          <p className="text-slate-500">Mais secções em breve...</p>
        </div>
      </section>
    </div>
  );
}
