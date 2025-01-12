'use client'

import { useState } from 'react'
import Image from 'next/image'
import { useStore } from './StoreProvider'
import { Calendar } from '@/components/ui/calendar'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from '@/components/ui/use-toast'

type ActivityCardProps = {
  id: string
  name: string
  price: number
  duration: string
  distance: string
  images: string[]
}

export default function ActivityCard({
  id,
  name,
  price,
  duration,
  distance,
  images,
}: ActivityCardProps) {
  const [quantity, setQuantity] = useState(1)
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [currentImage, setCurrentImage] = useState(0)
  const { dispatch } = useStore()

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ACTIVITY',
      payload: {
        id,
        name,
        price,
        quantity,
        date: date ? date.toISOString() : new Date().toISOString(),
      },
    })
    toast({
      title: 'تمت الإضافة إلى السلة',
      description: `تمت إضافة ${name} إلى سلة التسوق.`,
    })
  }

  return (
    <div className="neumorphic p-6 rounded-lg">
      <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
        <Image
          src={images[currentImage]}
          alt={name}
          fill
          className="object-cover"
        />
      </div>
      <div className="flex space-x-2 space-x-reverse mb-4">
        {images.map((image, index) => (
          <div
            key={index}
            className={`w-12 h-12 relative rounded-md overflow-hidden cursor-pointer ${
              index === currentImage ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setCurrentImage(index)}
          >
            <Image
              src={image}
              alt={`${name} thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </div>
        ))}
      </div>
      <h3 className="text-xl font-bold mb-2">{name}</h3>
      <p className="text-lg font-bold mb-2">{price} روبل</p>
      <p className="mb-2">{duration}</p>
      <p className="mb-4">{distance}</p>
      <div className="space-y-4">
        <div>
          <Label htmlFor={`quantity-${id}`}>عدد التذاكر</Label>
          <Input
            id={`quantity-${id}`}
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
            className="neumorphic-inset w-full"
          />
        </div>
        <div>
          <Label>تاريخ النشاط</Label>
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            className="neumorphic rounded-lg border-none"
          />
        </div>
      </div>
      <Button onClick={handleAddToCart} className="neumorphic-button w-full mt-4 text-black hover:text-white">
        إضافة إلى السلة
      </Button>
    </div>
  )
}

