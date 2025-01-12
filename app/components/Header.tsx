'use client'

import Link from 'next/link'
import { useStore } from './StoreProvider'
import { ShoppingCart } from 'lucide-react'

export default function Header() {
  const { state } = useStore()

  return (
    <header className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          حجز الأنشطة والجولات
        </Link>
        <nav>
          <ul className="flex space-x-4 space-x-reverse">
            <li>
              <Link href="/" className="hover:text-blue-200">
                الرئيسية
              </Link>
            </li>
            <li>
              <Link href="/activities" className="hover:text-blue-200">
                الأنشطة
              </Link>
            </li>
            <li>
              <Link href="/locations" className="hover:text-blue-200">
                المواقع
              </Link>
            </li>
            <li>
              <Link href="/transportation" className="hover:text-blue-200">
                النقل
              </Link>
            </li>
            <li>
              <Link href="/store" className="hover:text-blue-200 relative">
                <ShoppingCart />
                {state.activities.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                    {state.activities.length}
                  </span>
                )}
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

