import React from 'react';
import { Input } from '@/components/ui/input';

interface SearchInputProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <Input
      type="text"
      placeholder="ابحث عن نشاط..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      className="neumorphic-inset w-full p-4 mb-8"
    />
  );
};

export default SearchInput;
