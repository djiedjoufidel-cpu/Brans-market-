import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { PRODUCTS } from '../lib/products'

export const useStore = create(
  persist(
    (set, get) => ({
      cart: [],
      wishlist: [],
      notifications: [],
      user: null,
      userType: 'client', // 'client' ou 'grossiste'
      products: PRODUCTS,
      userStatus: 'online',
      lastSeen: new Date(),

      setUserType: (type) => set({ userType: type }),
      setUserStatus: (status) => set({ userStatus: status }),

      // Simuler présence
      updateLastSeen: () => {
        set({ lastSeen: new Date() })
      },

      addToCart: (product, qty = 1) => {
        const { userType, cart } = get()
        const price = userType === 'grossiste' && qty >= product.minGrossiste
        ? product.prixGrossiste
          : product.price

        const exist = cart.find(item => item.id === product.id)
        if (exist) {
          set({
            cart: cart.map(item =>
              item.id === product.id
              ? {...item, qty: item.qty + qty, price }
                : item
            )
          })
        } else {
          set({ cart: [...cart, {...product, qty, price }] })
        }
        get().addNotification(`${product.name} ajouté - ${price} FCFA/unité`)
      },

      removeFromCart: (id) => set({ cart: get().cart.filter(item => item.id!== id) }),

      getCartTotal: () => get().cart.reduce((sum, item) => sum + item.price * item.qty, 0),
      getCartCount: () => get().cart.reduce((sum, item) => sum + item.qty, 0),

      toggleWishlist: (product) => {
        const { wishlist } = get()
        const exists = wishlist.find(p => p.id === product.id)
        if (exists) {
          set({ wishlist: wishlist.filter(p => p.id!== product.id) })
        } else {
          set({ wishlist: [...wishlist, product] })
          get().addNotification(`${product.name} ajouté aux favoris`)
        }
      },

      addNotification: (text) => set({
        notifications: [{ id: crypto.randomUUID(), text, read: false, createdAt: new Date() },...get().notifications]
      }),

      getUnreadCount: () => get().notifications.filter(n =>!n.read).length,
      markAsRead: () => set({ notifications: get().notifications.map(n => ({...n, read: true })) }),

      // RECOMMANDATIONS IA SIMPLE
      getRecommended: (currentProductId) => {
        const current = get().products.find(p => p.id === currentProductId)
        if (!current) return []
        return get().products
        .filter(p => p.id!== currentProductId && p.categorie === current.categorie)
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 4)
      },

      getAlsoBought: () => get().products.sort((a, b) => b.reviews - a.reviews).slice(0, 8)
    }),
    { name: 'bransmarket-store' }
  )
)
