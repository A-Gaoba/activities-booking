'use client'

import Link from 'next/link'
import { ShoppingCart, Car } from 'lucide-react'
import { useStore } from './StoreProvider'
import { Button } from '@/components/ui/button'

export default function Navbar() {
  const { state } = useStore()

  return (
    <nav className="bg-primary text-primary-foreground p-4 mb-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          الفعاليات
        </Link>
        <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary-foreground hover:text-primary">
          <Link href="/transportation" className="flex items-center">
            <Car className="mr-2" />
            <span className="inline">المواصلات</span>
            {state.activities.length > 0 && (
              <span className="ml-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {state.activities.length}
              </span>
            )}
          </Link>
        </Button>
        <Button asChild variant="ghost" className="text-primary-foreground hover:bg-primary-foreground hover:text-primary">
          <Link href="/store" className="flex items-center">
            <ShoppingCart className="mr-2" />
            <span className="hidden md:inline">عربة التسوق</span>
            {state.activities.length > 0 && (
              <span className="ml-1 bg-destructive text-destructive-foreground rounded-full w-5 h-5 flex items-center justify-center text-xs">
                {state.activities.length}
              </span>
            )}
          </Link>
        </Button>
      </div>
    </nav>
  )
}

