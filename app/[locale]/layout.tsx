import {NextIntlClientProvider} from 'next-intl'
import {notFound} from 'next/navigation'
import '../globals.css'

export default async function LocaleLayout({
  children,
  params: {locale}
}: {
  children: React.ReactNode
  params: {locale: string}
}) {
  let messages
  try {
    messages = (await import(`../../messages/${locale}.json`)).default
  } catch {
    notFound()
  }

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          <div className="min-h-screen bg-gradient-to-br from-brand-50 to-accent-50">
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
