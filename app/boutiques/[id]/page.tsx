import Link from "next/link"

export default async function ShopPage({ params }: { params: { id: string } }) {
  const res = await fetch(`http://localhost:3000/api/shops/${params.id}`, { cache: "no-store" });
  
  if (!res.ok) return <div className="p-6">Boutique introuvable</div>
  
  const shop = await res.json();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold">{shop.name}</h1>
      <p className="text-gray-600">{shop.city} - {shop.phone}</p>
      <p className="mt-2">{shop.description}</p>
      
      <div className="mt-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">Produits</h2>
          <Link href={`/boutiques/${params.id}/add-product`} className="bg-black text-white px-4 py-2 rounded">
            + Ajouter un produit
          </Link>
        </div>
        
        {shop.products?.length > 0 ? (
          <div className="grid grid-cols-2 gap-4">
            {shop.products.map((p: any) => (
              <div key={p.id} className="border p-4 rounded">
                <h3 className="font-semibold">{p.name}</h3>
                <p className="text-lg">{p.price} FCFA</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">Aucun produit pour l’instant.</p>
        )}
      </div>
    </div>
  )
}
