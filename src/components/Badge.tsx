import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'anxious' | 'excited' | 'confused' | 'fearful' | 'conflicted' | 'default';
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className = '',
  variant = 'default',
}) => {
  const variantClasses = {
    anxious: 'bg-anxious/10 text-anxious',
    excited: 'bg-excited/10 text-excited',
    confused: 'bg-confused/10 text-confused',
    fearful: 'bg-fearful/10 text-fearful',
    conflicted: 'bg-conflicted/10 text-conflicted',
    default: 'bg-gray-100 text-gray-700',
  };
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${variantClasses[variant]} ${className}`}>
      {children}
    </span>
  );
};