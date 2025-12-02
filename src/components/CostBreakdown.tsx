import React from 'react';
import { City } from '../types';

interface CostBreakdownProps {
  cities: City[];
}

const CostBreakdown: React.FC<CostBreakdownProps> = ({ cities }) => {
  const costCategories = [
    { key: 'housing' as keyof City['costBreakdown'], label: 'Housing', color: '#13a4ec' },
    { key: 'food' as keyof City['costBreakdown'], label: 'Food', color: '#0d98ba' },
    { key: 'transport' as keyof City['costBreakdown'], label: 'Transport', color: '#4c809a' },
    { key: 'entertainment' as keyof City['costBreakdown'], label: 'Entertainment', color: '#7cb8d6' },
    { key: 'utilities' as keyof City['costBreakdown'], label: 'Utilities', color: '#a8d0e6' },
  ];

  const getCityTotal = (city: City) => {
    return costCategories.reduce((sum, category) => {
      return sum + (Number(city.costBreakdown[category.key]) || 0);
    }, 0);
  };

  const getCityBreakdownData = (city: City) => {
    const total = getCityTotal(city);
    let currentAngle = -90; // Start from top
    
    return costCategories.map(category => {
      const value = Number(city.costBreakdown[category.key]) || 0;
      const percentage = total > 0 ? (value / total) * 100 : 0;
      const angle = (percentage / 100) * 360;
      
      const startAngle = currentAngle;
      const endAngle = currentAngle + angle;
      currentAngle = endAngle;
      
      return {
        ...category,
        value,
        percentage,
        startAngle,
        endAngle
      };
    });
  };

  const polarToCartesian = (centerX: number, centerY: number, radius: number, angleInDegrees: number) => {
    const angleInRadians = (angleInDegrees * Math.PI) / 180.0;
    return {
      x: centerX + radius * Math.cos(angleInRadians),
      y: centerY + radius * Math.sin(angleInRadians)
    };
  };

  const createArc = (x: number, y: number, radius: number, startAngle: number, endAngle: number) => {
    const start = polarToCartesian(x, y, radius, endAngle);
    const end = polarToCartesian(x, y, radius, startAngle);
    const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    
    return [
      'M', start.x, start.y,
      'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y,
      'L', x, y,
      'Z'
    ].join(' ');
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
      {cities.map(city => {
        const total = getCityTotal(city);
        const breakdownData = getCityBreakdownData(city);
        
        return (
          <div key={city.id} className="flex flex-col items-center">
            {/* Circle Chart */}
            <div className="relative w-56 h-56 mb-6">
              <svg viewBox="0 0 200 200" className="w-full h-full transform -rotate-0">
                {breakdownData.map((item, idx) => (
                  <path
                    key={idx}
                    d={createArc(100, 100, 80, item.startAngle, item.endAngle)}
                    fill={item.color}
                    className="transition-all duration-300 hover:opacity-80"
                  />
                ))}
                {/* Center circle */}
                <circle cx="100" cy="100" r="50" fill="white" />
              </svg>
              
              {/* Total in center */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <div className="text-3xl font-bold text-[#13a4ec]">
                  ${total.toLocaleString()}
                </div>
                <div className="text-xs text-[#4c809a] mt-1">per month</div>
              </div>
            </div>

            {/* City Name */}
            <h4 className="font-bold text-[#0d171b] text-lg mb-1">{city.name}</h4>
            <p className="text-sm text-[#4c809a] mb-4">{city.country}</p>

            {/* Legend */}
            <div className="w-full space-y-2">
              {breakdownData.map((item, idx) => (
                <div key={idx} className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div 
                      className="w-3 h-3 rounded-full flex-shrink-0" 
                      style={{ backgroundColor: item.color }}
                    />
                    <span className="text-[#4c809a]">{item.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-[#0d171b]">${item.value}</span>
                    <span className="text-[#4c809a] text-xs">({item.percentage.toFixed(0)}%)</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CostBreakdown;