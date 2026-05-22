import Link from 'next/link';

export default function Home() {
  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-5xl font-bold mb-6">brans market 🇨🇲</h1>
        <p className="text-xl mb-8">Lance ta boutique en ligne et encaisse par MTN MoMo, Orange Money en 5 minutes.</p>
        <Link href="/login" className="bg-blue-600 text-white px-8 py-4 rounded-lg text-lg font-bold">
          Commencer 7j Gratuits
        </Link>
        <p className="mt-4 text-sm">Puis 5000 FCFA/mois. Sans engagement.</p>
      </div>
    </main>
  );
}
