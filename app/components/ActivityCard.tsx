import { useState } from 'react';
import Image from 'next/image';
import { useStore } from './StoreProvider';
import { Calendar } from '@/components/ui/calendar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';

type ActivityCardProps = {
  id: string;
  name: string;
  price: number;
  duration: string;
  distance: string;
  images: string[];
};

export default function ActivityCard({
  id,
  name,
  price,
  duration,
  distance,
  images,
}: ActivityCardProps) {
  const [quantity, setQuantity] = useState(1);
  const [date, setDate] = useState<Date | undefined>();
  const [currentImage, setCurrentImage] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { dispatch } = useStore();

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
    });
    toast({
      title: 'تمت الإضافة إلى السلة',
      description: `تمت إضافة ${name} إلى سلة التسوق.`,
    });
  };

  return (
    <>
      {/* Card */}
      <div
        className="neumorphic p-4 rounded-lg w-full max-w-xs cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <div className="relative h-32 mb-4 rounded-lg overflow-hidden">
          <Image
            src={images[currentImage]}
            alt={name}
            fill
            className="object-cover"
          />
        </div>
        <h3 className="text-lg font-bold mb-2 truncate">{name}</h3>
        <p className="text-md font-bold">{price} روبل</p>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-4 w-full max-w-lg max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700 text-2xl font-bold"
            >
              &times;
            </button>
            <div className="relative h-48 mb-4 rounded-lg overflow-hidden">
              <Image
                src={images[currentImage]}
                alt={name}
                fill
                className="object-cover m-2"
              />
            </div>
            <div className="flex space-x-2 space-x-reverse mb-4">
              {images.map((image, index) => (
                <div
                  key={index}
                  className={`w-10 h-10 relative rounded-md overflow-hidden cursor-pointer ${
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
            <h3 className="text-lg font-bold mb-2">{name}</h3>
            <p className="text-md font-bold mb-2">{price} روبل</p>
            <p className="text-sm mb-2">{duration}</p>
            <p className="text-sm mb-4">{distance}</p>
            <div className="space-y-4">
              <div>
                <Label htmlFor={`quantity-${id}`}>عدد التذاكر</Label>
                <Input
                  id={`quantity-${id}`}
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                  className="neumorphic-inset w-full"
                />
              </div>
              <div>
                <Label>تاريخ النشاط</Label>
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  className="neumorphic rounded-lg border-none mt-2"
                />
              </div>
            </div>
            <Button
              onClick={handleAddToCart}
              className="neumorphic-button w-full mt-4 text-black hover:text-white"
            >
              إضافة إلى السلة
            </Button>
          </div>
        </div>
      )}
    </>
  );
}

export function ActivityCardGrid({ activities }: { activities: ActivityCardProps[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {activities.map((activity) => (
        <ActivityCard key={activity.id} {...activity} />
      ))}
    </div>
  );
}
