import './globals.css'
import { Tajawal } from 'next/font/google'
import StoreProvider from './components/StoreProvider'

const tajawal = Tajawal({ subsets: ['arabic'], weight: ['400', '700'] })

export const metadata = {
  title: 'حجز الأنشطة والجولات',
  description: 'موقع حجز الأنشطة والجولات في روسيا',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={tajawal.className}>
        <StoreProvider>
          {children}
        </StoreProvider>
      </body>
    </html>
  )
}

