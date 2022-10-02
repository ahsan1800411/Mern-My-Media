import React from 'react';

const WrapperMin = ({ className = '', children }) => {
  return (
    <div
      className={`container mx-auto px-6 lg:px-24 xl:px-32 pt-16 lg:pt-20 pb-10 ${className}`}
    >
      {children}
    </div>
  );
};

export default WrapperMin;
