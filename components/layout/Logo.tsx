import Image from "next/image";
import Link from "next/link";

export function Logo({ className = "" }: { className?: string }) {
  return (
    <Link href="/" className={`flex items-center gap-3 ${className}`}>
      <div className="relative w-12 h-12 transform hover:scale-110 transition-transform duration-300">
        <Image
          src="/images/robot_logo.png"
          alt="Tech SOS Robot Icon"
          fill
          className="object-contain"
          priority
        />
      </div>
      <span className="text-xl font-bold tracking-tighter text-white">
        Tech<span className="text-primary">SOS</span>
      </span>
    </Link>
  );
}
