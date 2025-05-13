import React from 'react';

interface CardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  colorClass?: string;
  change?: {
    value: number;
    isPositive: boolean;
  };
}

const Card: React.FC<CardProps> = ({ 
  title, 
  value, 
  icon, 
  colorClass = 'bg-blue-500', 
  change 
}) => {
  return (
    <div className="rounded-xl bg-white dark:bg-gray-800 p-6 shadow-lg transition-all duration-200 hover:shadow-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-gray-500 dark:text-gray-400 font-medium text-sm uppercase tracking-wider">
          {title}
        </h3>
        <div className={`p-2 rounded-lg ${colorClass} bg-opacity-20 dark:bg-opacity-10`}>
          {icon}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">
            {value}
          </p>
          {change && (
            <p className={`text-sm mt-1 ${change.isPositive ? 'text-green-500' : 'text-red-500'}`}>
              {change.isPositive ? '↑' : '↓'} {Math.abs(change.value)}%
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;