import './globals.css'
import { CartProvider } from '../context/CartContext'
import Header from '../components/Header'

export const metadata = {
  title: 'BransMarket',
  description: 'Made in 🇨🇲',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body suppressHydrationWarning>
        <CartProvider>
          <Header />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
