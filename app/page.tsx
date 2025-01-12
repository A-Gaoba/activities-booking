'use client'

import ActivityCard from './components/ActivityCard'
import React, { useState } from 'react';
import FilterButtons from './components/FilterButton';
import SearchInput from './components/SearchInput';
import { activities } from './data/activities';

const Home: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredActivities = activities.filter(
    (activity) =>
      (filter === 'all' || activity.type === filter) &&
      activity.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div className="min-h-screen bg-background text-foreground">
        <div className="container mx-auto px-4">
          <header className="mb-8">
            <FilterButtons filter={filter} setFilter={setFilter} />
          </header>

          <SearchInput searchTerm={searchTerm} setSearchTerm={setSearchTerm} />

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 mb-8">
            {filteredActivities.map((activity) => (
              <ActivityCard key={activity.id} {...activity} />
            ))}
          </div>
        </div>
      </div>
    </div>

  );
};

export default Home;
