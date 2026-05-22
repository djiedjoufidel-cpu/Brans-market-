export const produits = [
  {
    id: 1,
    nom: "Samsung Galaxy A54",
    prix: 185000,
    image: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=400",
    boutiqueId: 1,
    boutique: "TechZone Douala"
  },
  {
    id: 2,
    nom: "Chaise Gaming RGB",
    prix: 45000,
    image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400",
    boutiqueId: 2,
    boutique: "Gaming Hub Yaoundé"
  },
  {
    id: 3,
    nom: "Casque Bluetooth Sony",
    prix: 32000,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400",
    boutiqueId: 3,
    boutique: "Audio Plus"
  },
  {
    id: 4,
    nom: "Montre Connectée",
    prix: 25000,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400",
    boutiqueId: 1,
    boutique: "TechZone Douala"
  },
  {
    id: 5,
    nom: "Clavier Mécanique",
    prix: 28000,
    image: "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=400",
    boutiqueId: 2,
    boutique: "Gaming Hub Yaoundé"
  },
  {
    id: 6,
    nom: "Enceinte JBL",
    prix: 35000,
    image: "https://images.unsplash.com/photo-1608042314453-ae338d80c427?w=400",
    boutiqueId: 3,
    boutique: "Audio Plus"
  }
]

export const boutiques = [
  {
    id: 1,
    nom: "TechZone Douala",
    description: "Smartphones, laptops, accessoires tech",
    rating: 4.8,
    produits: 2,
    logo: "https://ui-avatars.com/api/?name=TechZone&background=1E40AF&color=fff"
  },
  {
    id: 2,
    nom: "Gaming Hub Yaoundé",
    description: "Matériel gaming et streaming",
    rating: 4.6,
    produits: 2,
    logo: "https://ui-avatars.com/api/?name=Gaming+Hub&background=1E40AF&color=fff"
  },
  {
    id: 3,
    nom: "Audio Plus",
    description: "Casques, enceintes, audio pro",
    rating: 4.9,
    produits: 2,
    logo: "https://ui-avatars.com/api/?name=Audio+Plus&background=1E40AF&color=fff"
  }
]

export const cartItems = [
  { id: 1, produitId: 1, nom: "Samsung Galaxy A54", prix: 185000, qty: 1, image: produits[0].image },
  { id: 2, produitId: 3, nom: "Casque Bluetooth Sony", prix: 32000, qty: 2, image: produits[2].image }
]
