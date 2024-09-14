import { ReactNode } from 'react';

interface CardProps {
  title: string;
  children: ReactNode;
}

export function Card({ title, children }: CardProps) {
  return (
    <div className="p-6 bg-white rounded-lg shadow-md dark:bg-gray-800">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{title}</h2>
      <div className="text-gray-700 dark:text-gray-300">
        {children}
      </div>
    </div>
  );
}
