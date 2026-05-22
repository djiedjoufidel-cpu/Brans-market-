"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

const links = [
  { href: "/", label: "Accueil" },
  { href: "/shop", label: "Boutique" },
  { href: "/cart", label: "Panier" },
  { href: "/boutiques", label: "Boutiques" },
  { href: "/admin/dashboard", label: "Admin" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        
        <Link href="/" className="flex items-center">
          <Image 
            src="/logo.png" 
            alt="BransMarket" 
            width={120} 
            height={40}
            priority
          />
        </Link>
        
        <div className="flex gap-4 overflow-x-auto">
          {links.map(link => (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap px-3 py-2 rounded ${
                pathname === link.href 
                  ? "bg-black text-white" 
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
        
      </div>
    </nav>
  );
}
