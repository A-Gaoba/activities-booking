'use client'

import Cart from '../components/Cart'

export default function StorePage() {
  return (
    <div className="container mx-auto px-4 py-8 md:h-[70vh] h-[30vh]">
      <h1 className="text-3xl font-bold mb-8 text-center">سلة التسوق</h1>
      <Cart />
    </div>
  )
}

