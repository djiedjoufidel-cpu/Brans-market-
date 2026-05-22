import Link from "next/link";
import { Home, Store, ShoppingCart, User, Package } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 py-3">
        
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-xl font-bold text-black">
            <img src="/logo.png" alt="Brans Market" className="w-8 h-8" />
            Brans Market
          </Link>

          <Link href="/cart" className="relative">
            <ShoppingCart className="w-6 h-6 text-gray-700" />
            <span className="absolute -top-2 -right-2 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              0
            </span>
          </Link>
        </div>

        <nav className="flex items-center gap-6 mt-3 text-sm text-gray-700 overflow-x-auto pb-1">
          <Link href="/" className="flex items-center gap-1 hover:text-black shrink-0">
            <Home className="w-4 h-4" />
            Accueil
          </Link>
          
          <Link href="/boutiques" className="flex items-center gap-1 hover:text-black shrink-0">
            <Store className="w-4 h-4" />
            Boutiques
          </Link>
          
          <Link href="/seller" className="flex items-center gap-1 hover:text-black shrink-0">
            <Package className="w-4 h-4" />
            Espace vendeur
          </Link>
          
          <Link href="/compte" className="flex items-center gap-1 hover:text-black shrink-0">
            <User className="w-4 h-4" />
            Compte
          </Link>
        </nav>
      </div>
    </header>
  );
}
