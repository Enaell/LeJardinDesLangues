import React from 'react';

type ProTipProps = {
  children: React.ReactNode;
  className?: string;
};

export const ProTip = ({ children, className = '' }: ProTipProps) => {
  return (
    <div className={`bg-blue-50 border-l-4 border-blue-400 p-4 ${className}`}>
      <div className="flex">
        <div className="flex-shrink-0">
          <span className="text-blue-400">💡</span>
        </div>
        <div className="ml-3">
          <p className="text-sm text-blue-700">{children}</p>
        </div>
      </div>
    </div>
  );
};
