import React from 'react';
import { Button } from '@/components/ui/button';

interface FilterButtonsProps {
  filter: string;
  setFilter: (filter: string) => void;
}

const FilterButtons: React.FC<FilterButtonsProps> = ({ filter, setFilter }) => {
  const filters = [
    { id: 'all', label: 'جميع الأنشطة' },
    { id: 'park', label: 'أنشطة الحديقة' },
    { id: 'location', label: 'المواقع السياحية' },
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4">
      {filters.map(({ id, label }) => (
        <Button
          key={id}
          onClick={() => setFilter(id)}
          className={`neumorphic-button text-black hover:text-white ${filter === id ? 'neumorphic-inset' : ''}`}
        >
          {label}
        </Button>
      ))}
    </div>
  );
};

export default FilterButtons;
