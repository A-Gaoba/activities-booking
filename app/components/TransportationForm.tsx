import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

import { transportationOptions } from '../data/transportation';

const TransportationForm: React.FC = () => {
  return (
    <div className="neumorphic p-8 rounded-lg mb-8 h-[90vh]">
      <h2 className="text-2xl font-bold mb-4 ">خدمات النقل</h2>
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
          <Input id="destination" placeholder="أدخل وجهتك" className="neumorphic-inset " />
        </div>
        <Button className=" hover:text-white w-full">حجز وسيلة النقل</Button>
      </div>
    </div>
  );
};

export default TransportationForm;
