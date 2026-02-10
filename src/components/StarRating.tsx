import { Star } from 'lucide-react';
import { useState } from 'react';

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  disabled?: boolean;
}

const StarRating = ({ value, onChange, disabled = false }: StarRatingProps) => {
  const [hoverValue, setHoverValue] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        const isFilled = star <= (hoverValue || value);
        return (
          <button
            key={star}
            type="button"
            onClick={() => !disabled && onChange(star)}
            onMouseEnter={() => !disabled && setHoverValue(star)}
            onMouseLeave={() => !disabled && setHoverValue(0)}
            disabled={disabled}
            className={`transition-all duration-200 ${
              disabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer hover:scale-110'
            }`}
          >
            <Star
              className={`w-8 h-8 transition-all duration-200 ${
                isFilled
                  ? 'fill-blue-500 text-blue-500'
                  : 'text-foreground/30'
              }`}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
