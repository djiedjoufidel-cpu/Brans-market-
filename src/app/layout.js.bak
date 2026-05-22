import './globals.css'
import { AuthProvider } from '@/context/AuthContext'

export const metadata = {
  title: 'brans market - Vends en ligne au Cameroun',
  description: 'Crée ta boutique et encaisse par MTN MoMo, Orange Money en 5 min',
}

export default function RootLayout({ children }) {
  return (
    <html lang="fr">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
