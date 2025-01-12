'use client'

import { useState } from 'react'
// import Image from 'next/image'
import { useStore } from './components/StoreProvider'
import Navbar from './components/Navbar'
import ActivityCard from './components/ActivityCard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'

const allActivities = [
  {
    id: '1',
    name: 'ركوب الخيل',
    price: 4500,
    duration: '3 ساعات',
    distance: 'المسافة من الساحة الحمراء: 10 كم',
    images: ['/hasky.jpeg', '/hasky.jpeg', '/hasky.jpeg'],
    type: 'park',
  },
  {
    id: '2',
    name: 'الدراجات العملاقة',
    price: 15000,
    duration: '2 ساعات',
    distance: 'المسافة من الساحة الحمراء: 5 كم',
    images: ['/hasky.jpeg', '/hasky.jpeg', '/hasky.jpeg'],
    type: 'park',
  },
  {
    id: '3',
    name: 'التزلج على عربه الغزلان',
    price: 4200,
    duration: '4 ساعات',
    distance: 'المسافة من الساحة الحمراء: 15 كم',
    images: ['/hasky.jpeg', '/hasky.jpeg', '/hasky.jpeg'],
    type: 'park',
  },
  {
    id: '4',
    name: 'الرماية بأسلحة غير حقيقية',
    price: 1200,
    duration: '1 ساعة',
    distance: 'المسافة من الساحة الحمراء: 8 كم',
    images: ['/hasky.jpeg', '/hasky.jpeg', '/hasky.jpeg'],
    type: 'park',
  },
  {
    id: '5',
    name: 'السرك الروسي',
    price: 2900,
    duration: '2 ساعات',
    distance: 'المسافة من الساحة الحمراء: 3 كم',
    images: ['/hasky.jpeg', '/hasky.jpeg', '/hasky.jpeg'],
    type: 'location',
  },
  {
    id: '6',
    name: 'جولة الكروز النهرية',
    price: 3000,
    duration: '3 ساعات',
    distance: 'المسافة من الساحة الحمراء: 1 كم',
    images: ['/hasky.jpeg', '/hasky.jpeg', '/hasky.jpeg'],
    type: 'location',
  },
  {
    id: '7',
    name: 'عرض الدلافين',
    price: 2900,
    duration: '1.5 ساعة',
    distance: 'المسافة من الساحة الحمراء: 7 كم',
    images: ['/hasky.jpeg', '/hasky.jpeg', '/hasky.jpeg'],
    type: 'location',
  },
  {
    id: '8',
    name: 'التلفريك',
    price: 1000,
    duration: '30 دقيقة',
    distance: 'المسافة من الساحة الحمراء: 5 كم',
    images: ['/hasky.jpeg', '/hasky.jpeg', '/hasky.jpeg'],
    type: 'location',
  },
];


const transportationOptions = [
  { id: 'bus', name: 'حافلة', price: 500 },
  { id: 'private-car', name: 'سيارة خاصة', price: 1500 },
  { id: 'luxury-car', name: 'سيارة فاخرة', price: 3000 },
]

export default function Home() {
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')
  const { state } = useStore()

  const filteredActivities = allActivities.filter(activity =>
    (filter === 'all' || activity.type === filter) &&
    activity.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <div className="container mx-auto px-4 py-8">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4 text-center">حجز الأنشطة والجولات في روسيا</h1>
          <div className="flex flex-wrap justify-center gap-4">
            <Button
              onClick={() => setFilter('all')}
              className={`neumorphic-button text-black hover:text-white ${filter === 'all' ? 'neumorphic-inset' : ''}`}
            >
              جميع الأنشطة
            </Button>
            <Button
              onClick={() => setFilter('park')}
              className={`neumorphic-button text-black hover:text-white ${filter === 'park' ? 'neumorphic-inset' : ''}`}
            >
              أنشطة الحديقة
            </Button>
            <Button
              onClick={() => setFilter('location')}
              className={`neumorphic-button text-black hover:text-white ${filter === 'location' ? 'neumorphic-inset' : ''}`}
            >
              المواقع السياحية
            </Button>
          </div>
        </header>

        <div className="mb-8">
          <Input
            type="text"
            placeholder="ابحث عن نشاط..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="neumorphic-inset w-full p-4"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
          {filteredActivities.map((activity) => (
            <ActivityCard key={activity.id} {...activity} />
          ))}
        </div>

        <div className="neumorphic p-8 rounded-lg mb-8">
          <h2 className="text-2xl font-bold mb-4">خدمات النقل</h2>
          <div className="space-y-4">
            <div>
              <Label htmlFor="transportation">اختر وسيلة النقل</Label>
              <Select>
                <SelectTrigger id="transportation">
                  <SelectValue placeholder="اختر وسيلة النقل" />
                </SelectTrigger>
                <SelectContent>
                  {transportationOptions.map((option) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.name} - {option.price} روبل
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="destination">الوجهة</Label>
              <Input id="destination" placeholder="أدخل وجهتك" className="neumorphic-inset" />
            </div>
            <Button className="neumorphic-button w-full">حجز وسيلة النقل</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

