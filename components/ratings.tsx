import { Star } from 'lucide-react';
import React from 'react';

type RatingsProps = {
  rating: number;
  count: number;
};

const Ratings = ({ rating, count }: RatingsProps) => {
  return (
    <div className='flex justify-between items-center'>
      <div className='flex items-center gap-2'>
        {[...Array(count)].map((_, index) => (
          <Star
            key={index}
            className={`cursor-pointer h-5 w-5 ${
              rating > index ? 'fill-primary' : 'fill-muted stroke-muted'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Ratings;
