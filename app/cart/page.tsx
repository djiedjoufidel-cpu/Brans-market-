"use client";
import { useCart } from "@/context/CartContext";
import { vendors } from "@/lib/vendors";

export default function CartPage() {
  const { cart, removeFromCart, updateQty } = useCart();

  const total = cart.reduce((sum, item) => sum + item.prix * item.quantite, 0);

  const handleCommander = () => {
    if (cart.length === 0) return;

    // Groupe par boutique
    const grouped = cart.reduce((acc, item) => {
      const boutique = item.boutique || "Boutique";
      if (!acc[boutique]) acc[boutique] = [];
      acc[boutique].push(item);
      return acc;
    }, {} as Record<string, typeof cart>);

    // On envoie 1 message par boutique. Ici on prend la 1ère
    const boutiqueName = Object.keys(grouped)[0];
    const items = grouped[boutiqueName];

    const vendor = vendors.find(v => v.nom === boutiqueName);
    const phone = vendor?.whatsapp || "237651715307";

    let message = `Salut ${boutiqueName}! Je veux commander :%0A`;
    items.forEach(i => {
      const prixItem = (i.prix * i.quantite).toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
      message += `- ${i.nom} x${i.quantite} = ${prixItem} FCFA%0A`;
    });

    const totalAffiche = total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    message += `%0ATotal: ${totalAffiche} FCFA%0A%0AMerci!`;

    window.open(`https://wa.me/${phone}?text=${message}`, "_blank");
  };

  const formatPrix = (prix: number) => {
    return prix.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  if (cart.length === 0) {
    return <div className="p-6 text-center">Ton panier est vide</div>;
  }

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Panier</h1>

      {cart.map(item => (
        <div key={item.id} className="flex items-center gap-4 border-b py-3">
          <img
            src={item.image}
            alt={item.nom}
            className="w-16 h-16 object-cover rounded"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/100x100?text=No+Image"
            }}
          />

          <div className="flex-1">
            <h3 className="font-semibold">{item.nom}</h3>
            <p className="text-sm text-gray-500">{formatPrix(item.prix)} FCFA</p>

            <div className="flex items-center gap-2 mt-2">
              <button
                onClick={() => updateQty(item.id, Math.max(1, item.quantite - 1))}
                className="px-2 py-1 border rounded"
              >-</button>
              <span>{item.quantite}</span>
              <button
                onClick={() => updateQty(item.id, item.quantite + 1)}
                className="px-2 py-1 border rounded"
              >+</button>
            </div>
          </div>

          <button onClick={() => removeFromCart(item.id)} className="text-red-500">
            Supprimer
          </button>
        </div>
      ))}

      <div className="text-right mt-6">
        <p className="text-xl font-bold mb-3">
          Total: {formatPrix(total)} FCFA
        </p>
        <button
          onClick={handleCommander}
          className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded font-semibold"
        >
          Commander sur WhatsApp
        </button>
      </div>
    </div>
  );
}
