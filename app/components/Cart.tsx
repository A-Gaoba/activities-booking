'use client'

import { useStore } from './StoreProvider'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ShoppingCart } from 'lucide-react'

export default function Cart() {
  const { state, dispatch } = useStore()

  const handleRemoveActivity = (id: string) => {
    dispatch({ type: 'REMOVE_ACTIVITY', payload: id })
  }

  const handleUpdateQuantity = (id: string, quantity: number) => {
    const activity = state.activities.find((a) => a.id === id)
    if (activity) {
      dispatch({
        type: 'UPDATE_ACTIVITY',
        payload: { ...activity, quantity },
      })
    }
  }

  const handleSendToWhatsApp = () => {
    const message = state.activities
      .map(
        (activity) =>
          `${activity.name}: ${activity.quantity} تذكرة - ${activity.price * activity.quantity} روبل - التاريخ: ${new Date(
            activity.date
          ).toLocaleDateString('ar-EG')}`
      )
      .join('\n')

    const totalPrice = state.activities.reduce((total, activity) => total + activity.price * activity.quantity, 0)

    const whatsappMessage = `مرحبًا، أود حجز الأنشطة التالية:\n\n${message}\n\nالإجمالي: ${totalPrice} روبل`

    const encodedMessage = encodeURIComponent(whatsappMessage)
    window.open(`https://wa.me/79174828474?text=${encodedMessage}`, '_blank')
  }

  return (
    <div className="neumorphic p-6 rounded-lg max-w-2xl mx-auto">
      <h2 className="text-3xl font-bold mb-6 text-center">سلة التسوق</h2>
      <h2 className="text-2xl font-bold mb-4 flex items-center">
        <ShoppingCart className="mr-2" />
        سلة التسوق
      </h2>
      {state.activities.length === 0 ? (
        <p className="text-center">لا توجد أنشطة في السلة</p>
      ) : (
        <div className="space-y-4">
          {state.activities.map((activity) => (
            <div key={activity.id} className="neumorphic-inset p-4 rounded-lg">
              <h3 className="font-bold">{activity.name}</h3>
              <p>السعر: {activity.price} روبل</p>
              <p>التاريخ: {new Date(activity.date).toLocaleDateString('ar-EG')}</p>
              <div className="flex items-center space-x-2 space-x-reverse mt-2">
                <label htmlFor={`quantity-${activity.id}`}>الكمية:</label>
                <Input
                  id={`quantity-${activity.id}`}
                  type="number"
                  min="1"
                  value={activity.quantity}
                  onChange={(e) => handleUpdateQuantity(activity.id, parseInt(e.target.value))}
                  className="w-20 neumorphic-inset"
                />
                <Button
                  variant="destructive"
                  onClick={() => handleRemoveActivity(activity.id)}
                  className="neumorphic-button"
                >
                  إزالة
                </Button>
              </div>
            </div>
          ))}
          <div className="text-xl font-bold text-center">
            الإجمالي:{' '}
            {state.activities.reduce((total, activity) => total + activity.price * activity.quantity, 0)} روبل
          </div>
          <Button className="neumorphic-button w-full" onClick={handleSendToWhatsApp}>
            إرسال الطلب عبر واتساب
          </Button>
        </div>
      )}
    </div>
  )
}

